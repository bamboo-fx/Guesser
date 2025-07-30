export type Topic = 'history' | 'science' | 'technology' | 'pop-culture' | 'psychology' | 'geography';

export interface Fact {
  id: string;
  statement: string;
  isTrue: boolean;
  topic: Topic;
}

export interface AnsweredQuestion {
  fact: Fact;
  userAnswer: boolean;
  isCorrect: boolean;
}

export interface GameState {
  currentTopic: Topic | null;
  currentFactIndex: number;
  score: number;
  totalQuestions: number;
  timeRemaining: number;
  gameActive: boolean;
  facts: Fact[];
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  answeredQuestions: AnsweredQuestion[];
}