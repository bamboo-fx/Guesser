import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, Topic, Fact } from '../types/game';
import { getFactsForTopic } from '../data/facts';

interface GameStore extends GameState {
  setTopic: (topic: Topic) => void;
  startGame: () => void;
  endGame: () => void;
  submitAnswer: (userAnswer: boolean) => void;
  nextFact: () => void;
  decrementTimer: () => void;
  resetGame: () => void;
  hideFeedback: () => void;
}

const initialState: GameState = {
  currentTopic: null,
  currentFactIndex: 0,
  score: 0,
  totalQuestions: 0,
  timeRemaining: 60,
  gameActive: false,
  facts: [],
  showFeedback: false,
  lastAnswerCorrect: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setTopic: (topic: Topic) => {
        const facts = getFactsForTopic(topic);
        set({ 
          currentTopic: topic,
          facts,
          currentFactIndex: 0,
          score: 0,
          totalQuestions: 0,
          timeRemaining: 60,
          showFeedback: false,
          lastAnswerCorrect: null,
        });
      },

      startGame: () => {
        set({ 
          gameActive: true,
          timeRemaining: 60,
          currentFactIndex: 0,
          score: 0,
          totalQuestions: 0,
        });
      },

      endGame: () => {
        set({ gameActive: false });
      },

      submitAnswer: (userAnswer: boolean) => {
        const state = get();
        const currentFact = state.facts[state.currentFactIndex];
        const isCorrect = userAnswer === currentFact.isTrue;
        
        set({
          score: isCorrect ? state.score + 1 : state.score,
          totalQuestions: state.totalQuestions + 1,
          showFeedback: true,
          lastAnswerCorrect: isCorrect,
        });
      },

      nextFact: () => {
        const state = get();
        const nextIndex = (state.currentFactIndex + 1) % state.facts.length;
        set({ 
          currentFactIndex: nextIndex,
          showFeedback: false,
          lastAnswerCorrect: null,
        });
      },

      decrementTimer: () => {
        const state = get();
        if (state.timeRemaining > 0) {
          set({ timeRemaining: state.timeRemaining - 1 });
        } else {
          set({ gameActive: false });
        }
      },

      resetGame: () => {
        set(initialState);
      },

      hideFeedback: () => {
        set({ showFeedback: false, lastAnswerCorrect: null });
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        // Only persist high scores or user preferences, not game state
      }),
    }
  )
);