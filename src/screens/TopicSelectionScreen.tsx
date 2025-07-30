import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../state/gameStore';
import { Topic } from '../types/game';

interface TopicSelectionScreenProps {
  navigation: any;
}

const topics: { id: Topic; name: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
  { id: 'history', name: 'History', icon: 'library-outline', color: 'bg-amber-500' },
  { id: 'science', name: 'Science', icon: 'flask-outline', color: 'bg-green-500' },
  { id: 'technology', name: 'Technology', icon: 'hardware-chip-outline', color: 'bg-blue-500' },
  { id: 'pop-culture', name: 'Pop Culture', icon: 'musical-notes-outline', color: 'bg-pink-500' },
  { id: 'psychology', name: 'Psychology', icon: 'brain-outline', color: 'bg-purple-500' },
  { id: 'geography', name: 'Geography', icon: 'earth-outline', color: 'bg-teal-500' },
];

export function TopicSelectionScreen({ navigation }: TopicSelectionScreenProps) {
  const setTopic = useGameStore((state) => state.setTopic);

  const handleTopicSelect = (topic: Topic) => {
    setTopic(topic);
    navigation.navigate('Game');
  };

  return (
    <View className="flex-1 bg-gray-50 px-4 py-8">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          Fact or Fiction
        </Text>
        <Text className="text-lg text-center text-gray-600">
          Choose a topic to begin your 60-second challenge!
        </Text>
      </View>

      <View className="flex-1">
        <View className="flex-row flex-wrap justify-center gap-4">
          {topics.map((topic) => (
            <Pressable
              key={topic.id}
              onPress={() => handleTopicSelect(topic.id)}
              className="w-40 h-40 items-center justify-center rounded-2xl shadow-lg active:scale-95"
              style={{ backgroundColor: topic.color.replace('bg-', '').split('-')[0] }}
            >
              <View className={`w-36 h-36 ${topic.color} rounded-xl items-center justify-center shadow-md`}>
                <Ionicons name={topic.icon} size={48} color="white" />
                <Text className="text-white font-semibold text-center mt-2 px-2">
                  {topic.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-center text-gray-500 text-sm">
          🎯 Swipe right for TRUE, left for FALSE
        </Text>
        <Text className="text-center text-gray-500 text-sm mt-1">
          ⏱️ 60 seconds to answer as many as you can!
        </Text>
      </View>
    </View>
  );
}