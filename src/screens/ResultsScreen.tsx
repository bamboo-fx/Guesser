import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameStore } from '../state/gameStore';

interface ResultsScreenProps {
  navigation: any;
}

export function ResultsScreen({ navigation }: ResultsScreenProps) {
  const { score, totalQuestions, currentTopic, resetGame } = useGameStore();

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getPerformanceMessage = () => {
    if (percentage >= 80) return { message: "Outstanding!", emoji: "🏆", color: "text-yellow-500" };
    if (percentage >= 60) return { message: "Great job!", emoji: "🎉", color: "text-green-500" };
    if (percentage >= 40) return { message: "Not bad!", emoji: "👍", color: "text-blue-500" };
    return { message: "Keep trying!", emoji: "💪", color: "text-orange-500" };
  };

  const performance = getPerformanceMessage();

  const handlePlayAgain = () => {
    resetGame();
    navigation.navigate('TopicSelection');
  };

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center px-6">
      <View className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
          Game Over!
        </Text>
        
        <Text className="text-lg text-center text-gray-600 mb-6 capitalize">
          {currentTopic} Challenge
        </Text>

        <View className="items-center mb-6">
          <Text className="text-6xl mb-4">{performance.emoji}</Text>
          <Text className={`text-2xl font-bold ${performance.color} mb-2`}>
            {performance.message}
          </Text>
        </View>

        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <View className="items-center">
            <Text className="text-4xl font-bold text-gray-800 mb-1">
              {score}/{totalQuestions}
            </Text>
            <Text className="text-lg text-gray-600 mb-2">Questions Correct</Text>
            <Text className="text-2xl font-semibold text-blue-600">
              {percentage}% Accuracy
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handlePlayAgain}
          className="bg-blue-500 rounded-2xl py-4 px-6 mb-4 active:bg-blue-600"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="refresh" size={24} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Play Again
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('TopicSelection')}
          className="border border-gray-300 rounded-2xl py-4 px-6"
        >
          <Text className="text-gray-700 font-semibold text-lg text-center">
            Choose New Topic
          </Text>
        </Pressable>
      </View>
    </View>
  );
}