import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useGameStore } from '../state/gameStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

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
  const rotation = useSharedValue(0);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Ensure game starts when component mounts or facts are loaded
    if (facts.length > 0 && !gameActive) {
      startGame();
    }
    resetCard();
  }, [facts]);

  useEffect(() => {
    resetCard();
  }, [currentFactIndex]);

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
        // Reset card after a short delay to ensure smooth transition
        setTimeout(() => {
          resetCard();
        }, 100);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const resetCard = () => {
    translateX.value = withSpring(0);
    opacity.value = withTiming(1);
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
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
      rotation.value = event.translationX * 0.05; // Added rotation
      opacity.value = 1 - Math.abs(event.translationX) / (SCREEN_WIDTH * 0.8);
    },
    onEnd: (event) => {
      scale.value = withSpring(1);
      
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const answer = event.translationX > 0;
        translateX.value = withTiming(event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH);
        opacity.value = withTiming(0);
        rotation.value = withTiming(event.translationX > 0 ? 30 : -30); // Added rotation
        runOnJS(handleAnswer)(answer);
      } else {
        translateX.value = withSpring(0);
        opacity.value = withTiming(1);
        rotation.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotation.value}deg` }, // Added rotation
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  // NEW: Animated swipe indicators
  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [{
      scale: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, 0],
        [1.2, 0.8],
        Extrapolate.CLAMP
      )
    }]
  }));

  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    ),
    transform: [{
      scale: interpolate(
        translateX.value,
        [0, SWIPE_THRESHOLD],
        [0.8, 1.2],
        Extrapolate.CLAMP
      )
    }]
  }));

  if (!facts.length) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <View className="w-20 h-20 bg-slate-800 rounded-full items-center justify-center shadow-xl mb-6">
          <Ionicons name="hourglass-outline" size={40} color="#6366F1" />
        </View>
        <Text className="text-xl text-slate-300 font-semibold">Loading facts...</Text>
      </View>
    );
  }

  const currentFact = facts[currentFactIndex];
  
  // If no current fact, show loading or reset
  if (!currentFact) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-xl text-slate-300">Loading next fact...</Text>
      </View>
    );
  }
  const progress = (currentFactIndex / facts.length) * 100;

  return (
    <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
      {/* CHANGED: Dark header with better styling */}
      <View className="flex-row justify-between items-center px-6 pt-14 pb-6 bg-slate-800/50">
        <Pressable 
          onPress={() => navigation.goBack()}
          className="w-12 h-12 items-center justify-center bg-slate-700 rounded-full"
        >
          <Ionicons name="close" size={20} color="#E2E8F0" />
        </Pressable>
        
        <View className="items-center">
          <Text className="text-lg font-bold text-white uppercase tracking-wider">
            {currentTopic}
          </Text>
        </View>
      </View>

      {/* NEW: Large centered score */}
      <View className="items-center py-8">
        {/* Timer above score */}
        <View className={`px-6 py-3 rounded-full mb-4 ${
          timeRemaining > 10 ? 'bg-green-500' : 
          timeRemaining > 5 ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          <Text className="text-white font-bold text-2xl">
            {timeRemaining}
          </Text>
        </View>
        
        <Text className="text-4xl font-bold text-indigo-400">
          {score}
        </Text>
        <Text className="text-slate-400 text-sm font-medium tracking-wider uppercase mt-1">
          Correct Answers
        </Text>
      </View>

      {/* CHANGED: Completely centered game area */}
      <View className="flex-1 items-center justify-center px-6">
        
        {/* CHANGED: Much larger, more prominent card */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[cardStyle]}
            className="w-full bg-slate-800 rounded-3xl shadow-2xl border border-slate-700"
          >
            <View className="p-10 min-h-[350px] justify-center">
              <Text className="text-3xl font-bold text-white text-center leading-relaxed">
                {currentFact.statement}
              </Text>
            </View>
            {/* NEW: Bottom accent line */}
            <View className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-3xl" />
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* CHANGED: Cleaner bottom instructions with more spacing */}
      <View className="flex-row justify-between px-16 pb-20 pt-12">
        <Pressable 
          onPress={() => {
            // Trigger the same animation as swiping left
            translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 });
            rotation.value = withTiming(-30, { duration: 300 });
            handleAnswer(false);
          }}
          className="items-center"
        >
          <View className="w-14 h-14 bg-slate-800 border-2 border-red-500 rounded-full items-center justify-center mb-3">
            <Ionicons name="arrow-back" size={20} color="#EF4444" />
          </View>
          <Text className="text-red-500 font-bold text-xs">FALSE</Text>
        </Pressable>
        
        <Pressable 
          onPress={() => {
            // Trigger the same animation as swiping right
            translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 });
            rotation.value = withTiming(30, { duration: 300 });
            handleAnswer(true);
          }}
          className="items-center"
        >
          <View className="w-14 h-14 bg-slate-800 border-2 border-green-500 rounded-full items-center justify-center mb-3">
            <Ionicons name="arrow-forward" size={20} color="#10B981" />
          </View>
          <Text className="text-green-500 font-bold text-xs">TRUE</Text>
        </Pressable>
      </View>

      {/* CHANGED: More dramatic feedback overlay */}
      {showFeedback && (
        <View className="absolute inset-0 items-center justify-center bg-black/80">
          <View className={`w-44 h-44 rounded-full items-center justify-center shadow-2xl ${
            lastAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <Ionicons 
              name={lastAnswerCorrect ? 'checkmark' : 'close'} 
              size={80} 
              color="white" 
            />
          </View>
          <Text className={`text-4xl font-bold mt-8 ${
            lastAnswerCorrect ? 'text-green-500' : 'text-red-500'
          }`}>
            {lastAnswerCorrect ? 'CORRECT!' : 'WRONG!'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}