import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useGameStore } from '../state/gameStore';

interface ReviewAnswersScreenProps {
  navigation: any;
}

export function ReviewAnswersScreen({ navigation }: ReviewAnswersScreenProps) {
  const { answeredQuestions, currentTopic } = useGameStore();

  const correctAnswers = answeredQuestions.filter(q => q.isCorrect);
  const wrongAnswers = answeredQuestions.filter(q => !q.isCorrect);

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.8);
  const listOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animations
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerScale.value = withTiming(1, { duration: 600 });
    listOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ scale: headerScale.value }],
  }));

  const listStyle = useAnimatedStyle(() => ({
    opacity: listOpacity.value,
  }));

  const renderQuestionCard = (question: any, index: number) => {
    const isCorrect = question.isCorrect;
    
    return (
      <View 
        key={`${question.fact.id}-${index}`}
        className={`mb-4 p-4 rounded-2xl border-2 ${
          isCorrect 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-red-500/10 border-red-500/30'
        }`}
      >
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <Text className="text-white text-lg font-semibold leading-relaxed">
              {question.fact.statement}
            </Text>
          </View>
          <View className={`w-8 h-8 rounded-full items-center justify-center ${
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <Ionicons 
              name={isCorrect ? 'checkmark' : 'close'} 
              size={20} 
              color="white" 
            />
          </View>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-slate-400 text-sm mr-2">Your answer:</Text>
            <Text className={`font-bold text-sm ${
              question.userAnswer ? 'text-green-400' : 'text-red-400'
            }`}>
              {question.userAnswer ? 'TRUE' : 'FALSE'}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Text className="text-slate-400 text-sm mr-2">Correct:</Text>
            <Text className={`font-bold text-sm ${
              question.fact.isTrue ? 'text-green-400' : 'text-red-400'
            }`}>
              {question.fact.isTrue ? 'TRUE' : 'FALSE'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-slate-900">
      {/* Header */}
      <Animated.View style={[headerStyle]} className="px-6 pt-16 pb-6 bg-slate-800/50">
        <View className="flex-row items-center justify-between">
          <Pressable 
            onPress={() => navigation.goBack()}
            className="w-12 h-12 items-center justify-center bg-slate-700 rounded-full"
          >
            <Ionicons name="arrow-back" size={20} color="#E2E8F0" />
          </Pressable>
          
          <View className="items-center">
            <Text className="text-lg font-bold text-white uppercase tracking-wider">
              Review Answers
            </Text>
            <Text className="text-slate-400 text-sm capitalize">
              {currentTopic}
            </Text>
          </View>
          
          <View className="w-12 h-12" />
        </View>
      </Animated.View>

      {/* Summary Stats */}
      <Animated.View style={[listStyle]} className="px-6 py-4">
        <View className="flex-row justify-between mb-6">
          <View className="items-center flex-1">
            <View className="w-16 h-16 bg-green-500/20 rounded-full items-center justify-center mb-2">
              <Ionicons name="checkmark" size={24} color="#10B981" />
            </View>
            <Text className="text-green-400 font-bold text-lg">{correctAnswers.length}</Text>
            <Text className="text-slate-400 text-xs">Correct</Text>
          </View>
          
          <View className="items-center flex-1">
            <View className="w-16 h-16 bg-red-500/20 rounded-full items-center justify-center mb-2">
              <Ionicons name="close" size={24} color="#EF4444" />
            </View>
            <Text className="text-red-400 font-bold text-lg">{wrongAnswers.length}</Text>
            <Text className="text-slate-400 text-xs">Wrong</Text>
          </View>
        </View>
      </Animated.View>

      {/* Questions List */}
      <Animated.View style={[listStyle]} className="flex-1 px-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          {answeredQuestions.map((question, index) => 
            renderQuestionCard(question, index)
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
} 