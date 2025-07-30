import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useGameStore } from '../state/gameStore';

interface ResultsScreenProps {
  navigation: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ResultsScreen({ navigation }: ResultsScreenProps) {
  const { score, totalQuestions, currentTopic, resetGame, answeredQuestions } = useGameStore();

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Animation values
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.8);
  const emojiScale = useSharedValue(0);
  const scoreOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const glow = useSharedValue(0.3);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    // Staggered entrance animations
    cardOpacity.value = withTiming(1, { duration: 600 });
    cardScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    
    emojiScale.value = withDelay(
      300,
      withSequence(
        withSpring(1.3, { damping: 10, stiffness: 300 }),
        withSpring(1, { damping: 15, stiffness: 200 })
      )
    );
    
    scoreOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    buttonsOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    
    // Continuous glow effect
    glow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    );
    
    // Shimmer effect
    shimmer.value = withDelay(
      1000,
      withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        false
      )
    );
  }, []);

  const getPerformanceMessage = () => {
    if (percentage >= 80) return { 
      message: "LEGENDARY!", 
      emoji: "🏆", 
      gradient: ['#F59E0B', '#D97706'],
      shadowColor: '#F59E0B'
    };
    if (percentage >= 60) return { 
      message: "EXCELLENT!", 
      emoji: "🎉", 
      gradient: ['#10B981', '#059669'],
      shadowColor: '#10B981'
    };
    if (percentage >= 40) return { 
      message: "GOOD JOB!", 
      emoji: "👍", 
      gradient: ['#3B82F6', '#2563EB'],
      shadowColor: '#3B82F6'
    };
    return { 
      message: "KEEP GOING!", 
      emoji: "💪", 
      gradient: ['#EC4899', '#DB2777'],
      shadowColor: '#EC4899'
    };
  };

  const performance = getPerformanceMessage();

  const handlePlayAgain = () => {
    // Reset game state and navigate back to topic selection for a fresh start
    resetGame();
    navigation.reset({
      index: 0,
      routes: [{ name: 'TopicSelection' }],
    });
  };

  // Animated styles
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  const scoreStyle = useAnimatedStyle(() => ({
    opacity: scoreOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.4, 0]),
    transform: [{
      translateX: interpolate(shimmer.value, [0, 1], [-400, 400])
    }]
  }));

  return (
    <ScrollView className="flex-1 bg-slate-900 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[cardStyle]} className="w-full max-w-sm mt-16">
        {/* Main Results Card */}
        <View className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1 rounded-3xl mb-8">
          <Animated.View 
            style={[
              glowStyle,
              {
                shadowColor: performance.shadowColor,
                shadowOffset: { width: 0, height: 20 },
                shadowRadius: 40,
              }
            ]}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10 relative overflow-hidden"
          >
            {/* Shimmer overlay */}
            <Animated.View 
              style={[shimmerStyle]}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            
            {/* Game Over Title */}
            <Text className="text-4xl font-black text-center text-white mb-2">
              GAME OVER
            </Text>
            
            <Text className="text-lg text-center text-slate-300 mb-8 capitalize font-semibold tracking-wider">
              {currentTopic} Challenge
            </Text>

            {/* Performance Section */}
            <View className="items-center mb-8">
              <Animated.Text style={[emojiStyle]} className="text-8xl mb-4">
                {performance.emoji}
              </Animated.Text>
              
              <View 
                className="px-6 py-3 rounded-2xl border-2"
                style={{
                  backgroundColor: performance.gradient[0] + '20',
                  borderColor: performance.gradient[0]
                }}
              >
                <Text 
                  className="text-2xl font-black tracking-wider"
                  style={{ color: performance.gradient[0] }}
                >
                  {performance.message}
                </Text>
              </View>
            </View>

            {/* Score Section */}
            <Animated.View style={[scoreStyle]}>
              <View className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/10">
                <View className="items-center">
                  <Text className="text-6xl font-black text-white mb-2">
                    {score}
                    <Text className="text-3xl text-slate-400">/{totalQuestions}</Text>
                  </Text>
                  <Text className="text-slate-300 text-base font-medium mb-4">
                    Questions Correct
                  </Text>
                  
                  {/* Percentage with gradient */}
                  <View className="bg-gradient-to-r from-cyan-400 to-purple-500 p-1 rounded-xl">
                    <View className="bg-slate-900 px-4 py-2 rounded-xl">
                      <Text className="text-3xl font-black text-white">
                        {percentage}%
                      </Text>
                    </View>
                  </View>
                  <Text className="text-slate-400 text-sm mt-2">ACCURACY</Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        {/* Action Buttons */}
        <Animated.View style={[buttonsStyle]} className="space-y-4">
          {/* Play Again Button */}
          <AnimatedButton
            onPress={handlePlayAgain}
            gradient={['#10B981', '#059669']}
            shadowColor="#10B981"
            icon="refresh"
            text="PLAY AGAIN"
            primary={true}
          />

          {/* Review Answers Button */}
          <AnimatedButton
            onPress={() => navigation.navigate('ReviewAnswers')}
            gradient={['#F59E0B', '#D97706']}
            shadowColor="#F59E0B"
            icon="list-outline"
            text="REVIEW ANSWERS"
            primary={false}
          />

          {/* New Topic Button */}
          <AnimatedButton
            onPress={() => navigation.navigate('TopicSelection')}
            gradient={['#6366F1', '#4F46E5']}
            shadowColor="#6366F1"
            icon="grid-outline"
            text="NEW TOPIC"
            primary={false}
          />
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
}

// Reusable animated button component
function AnimatedButton({ 
  onPress, 
  gradient, 
  shadowColor, 
  icon, 
  text, 
  primary 
}: {
  onPress: () => void;
  gradient: string[];
  shadowColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  primary: boolean;
}) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0.3);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: glow.value,
  }));

  if (primary) {
    return (
      <AnimatedPressable
        style={[
          buttonStyle,
          {
            shadowColor: shadowColor,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 25,
          }
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View 
          className="rounded-2xl p-1"
          style={{
            backgroundColor: gradient[0]
          }}
        >
          <View className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl py-4 px-6 border border-white/10">
            <View className="flex-row items-center justify-center">
              <Ionicons name={icon} size={24} color="white" />
              <Text 
                className="font-black text-lg ml-3 tracking-wider text-white"
              >
                {text}
              </Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[buttonStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-4 px-6"
    >
      <View className="flex-row items-center justify-center">
        <Ionicons name={icon} size={24} color="#E2E8F0" />
        <Text className="text-slate-200 font-bold text-lg ml-3 tracking-wider">
          {text}
        </Text>
      </View>
    </AnimatedPressable>
  );
}