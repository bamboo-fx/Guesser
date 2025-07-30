import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TopicSelectionScreen } from './src/screens/TopicSelectionScreen';
import { GameScreen } from './src/screens/GameScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { ReviewAnswersScreen } from './src/screens/ReviewAnswersScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator 
            initialRouteName="TopicSelection"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen 
              name="TopicSelection" 
              component={TopicSelectionScreen} 
            />
            <Stack.Screen 
              name="Game" 
              component={GameScreen} 
            />
            <Stack.Screen 
              name="Results" 
              component={ResultsScreen} 
            />
            <Stack.Screen 
              name="ReviewAnswers" 
              component={ReviewAnswersScreen} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}