import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useGameStore } from '../state/gameStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface GameScreenProps {
  navigation: any;
}

export function GameScreen({ navigation }: GameScreenProps) {
  const {
    currentTopic,
    facts,
    currentFactIndex,
    score,
    totalQuestions,
    timeRemaining,
    gameActive,
    showFeedback,
    lastAnswerCorrect,
    startGame,
    endGame,
    submitAnswer,
    nextFact,
    decrementTimer,
    hideFeedback,
  } = useGameStore();

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!gameActive) {
      startGame();
    }
  }, []);

  useEffect(() => {
    if (gameActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        decrementTimer();
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
      navigation.navigate('Results');
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeRemaining, gameActive]);

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        hideFeedback();
        nextFact();
        resetCard();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const resetCard = () => {
    translateX.value = withSpring(0);
    opacity.value = withTiming(1);
    scale.value = withSpring(1);
  };

  const handleAnswer = (answer: boolean) => {
    submitAnswer(answer);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      opacity.value = 1 - Math.abs(event.translationX) / SCREEN_WIDTH;
    },
    onEnd: (event) => {
      scale.value = withSpring(1);
      
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const answer = event.translationX > 0; // Right = true, Left = false
        translateX.value = withTiming(event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH);
        opacity.value = withTiming(0);
        runOnJS(handleAnswer)(answer);
      } else {
        translateX.value = withSpring(0);
        opacity.value = withTiming(1);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  if (!facts.length || currentFactIndex >= facts.length) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-xl text-gray-600">Loading facts...</Text>
      </View>
    );
  }

  const currentFact = facts[currentFactIndex];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 bg-white shadow-sm">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <Text className="text-lg font-semibold text-gray-800 capitalize">
          {currentTopic}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={20} color="#6B7280" />
          <Text className="ml-1 text-lg font-bold text-gray-700">
            {timeRemaining}s
          </Text>
        </View>
      </View>

      {/* Score */}
      <View className="px-4 py-2">
        <Text className="text-center text-gray-600">
          Score: {score}/{totalQuestions}
        </Text>
      </View>

      {/* Game Area */}
      <View className="flex-1 items-center justify-center px-4">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[cardStyle]}
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <Text className="text-2xl font-semibold text-gray-800 text-center leading-8">
              {currentFact.statement}
            </Text>
          </Animated.View>
        </PanGestureHandler>

        {/* Swipe Instructions */}
        <View className="flex-row justify-between w-full max-w-sm mt-8 px-4">
          <View className="items-center">
            <View className="w-12 h-12 bg-red-500 rounded-full items-center justify-center mb-2">
              <Ionicons name="close" size={24} color="white" />
            </View>
            <Text className="text-red-500 font-semibold">FALSE</Text>
            <Text className="text-gray-500 text-sm">Swipe Left</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mb-2">
              <Ionicons name="checkmark" size={24} color="white" />
            </View>
            <Text className="text-green-500 font-semibold">TRUE</Text>
            <Text className="text-gray-500 text-sm">Swipe Right</Text>
          </View>
        </View>
      </View>

      {/* Feedback Overlay */}
      {showFeedback && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <View className={`w-32 h-32 rounded-full items-center justify-center ${
            lastAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <Ionicons 
              name={lastAnswerCorrect ? 'checkmark' : 'close'} 
              size={64} 
              color="white" 
            />
          </View>
          <Text className={`text-2xl font-bold mt-4 ${
            lastAnswerCorrect ? 'text-green-500' : 'text-red-500'
          }`}>
            {lastAnswerCorrect ? 'Correct!' : 'Wrong!'}
          </Text>
        </View>
      )}
    </View>
  );
}