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
  interpolate,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useGameStore } from '../state/gameStore';
import { Topic } from '../types/game';

interface TopicSelectionScreenProps {
  navigation: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const topics: { 
  id: Topic; 
  name: string; 
  emoji: string;
  gradient: string[];
  shadowColor: string;
}[] = [
  { 
    id: 'history', 
    name: 'History', 
    emoji: '🏛️', 
    gradient: ['#F59E0B', '#D97706'],
    shadowColor: '#F59E0B'
  },
  { 
    id: 'science', 
    name: 'Science', 
    emoji: '🧪', 
    gradient: ['#10B981', '#059669'],
    shadowColor: '#10B981'
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    emoji: '💻', 
    gradient: ['#3B82F6', '#2563EB'],
    shadowColor: '#3B82F6'
  },
  { 
    id: 'pop-culture', 
    name: 'Pop Culture', 
    emoji: '🎵', 
    gradient: ['#EC4899', '#DB2777'],
    shadowColor: '#EC4899'
  },
  { 
    id: 'psychology', 
    name: 'Psychology', 
    emoji: '🧠', 
    gradient: ['#8B5CF6', '#7C3AED'],
    shadowColor: '#8B5CF6'
  },
  { 
    id: 'geography', 
    name: 'Geography', 
    emoji: '🌍', 
    gradient: ['#14B8A6', '#0D9488'],
    shadowColor: '#14B8A6'
  },
];

export function TopicSelectionScreen({ navigation }: TopicSelectionScreenProps) {
  const setTopic = useGameStore((state) => state.setTopic);
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const shimmer = useSharedValue(0);
  const glow = useSharedValue(0.5);

  useEffect(() => {
    // Entrance animations
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    
    // Continuous shimmer effect
    shimmer.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      false
    );
    
    // Pulsing glow
    glow.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setTopic(topic);
    navigation.navigate('Game');
  };

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.4, 0]),
    transform: [{
      translateX: interpolate(shimmer.value, [0, 1], [-400, 400])
    }]
  }));

  return (
    <ScrollView className="flex-1 bg-slate-900 px-6" showsVerticalScrollIndicator={false}>
      {/* Animated header */}
      <Animated.View style={[titleStyle]} className="mt-16 mb-12">
                 <Text className="text-5xl font-black text-center text-white mb-4 shadow-2xl mt-4">
           Guesser
         </Text>
        
                          <Text className="text-lg text-center text-slate-300 font-medium mt-6">
           Choose your battleground
         </Text>
         <Text className="text-sm text-center text-slate-400 mt-1">
           60 seconds • Swipe to survive
         </Text>
      </Animated.View>

      {/* Topics grid */}
      <View className="flex-1 justify-center mt-4">
        <View className="flex-row flex-wrap justify-center gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              onPress={() => handleTopicSelect(topic.id)}
            />
          ))}
        </View>
      </View>


    </ScrollView>
  );
}

// Individual topic card component with animations
function TopicCard({ 
  topic, 
  index, 
  onPress 
}: { 
  topic: typeof topics[0]; 
  index: number; 
  onPress: () => void; 
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const pressScale = useSharedValue(1);
  const glow = useSharedValue(0.3);

  useEffect(() => {
    // Staggered entrance animation
    opacity.value = withDelay(
      index * 100,
      withTiming(1, { duration: 600 })
    );
    scale.value = withDelay(
      index * 100,
      withSpring(1, { damping: 15, stiffness: 200 })
    );
    
    // Individual glow animation
    glow.value = withDelay(
      index * 200,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: 1500 + index * 100 }),
          withTiming(0.3, { duration: 1500 + index * 100 })
        ),
        -1,
        true
      )
    );
  }, [index]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * pressScale.value }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.95, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      style={[
        cardStyle,
        glowStyle,
        {
          shadowColor: topic.shadowColor,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 25,
          borderColor: topic.gradient[0],
        }
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="w-40 h-44 mb-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl items-center justify-center border-2"
    >
      {/* Icon container with gradient */}
      <View 
        className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
        style={{
          backgroundColor: topic.gradient[0] + '40'
        }}
      >
        <Text style={{ fontSize: 32, color: topic.gradient[0] }}>
          {topic.emoji}
        </Text>
      </View>
      
      <Text className="text-white font-bold text-center text-base px-2 leading-5">
        {topic.name}
      </Text>
      
      {/* Subtle bottom accent */}
      <View 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
        style={{
          backgroundColor: topic.gradient[0]
        }}
      />
    </AnimatedPressable>
  );
}