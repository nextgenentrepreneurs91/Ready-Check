
```tsx
// apps/mobile/src/navigation/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Core Navigation Param List for ReadyCheck Mobile.
 * Centralizing these types ensures strict type-safety across all screens,
 * preventing implicit any and hardcoded string routes.
 */
export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Profile: undefined;
  RegionalHistory: { regionId?: string };
  RoleSelect: { deploymentId: string };
  MissionBrief: { deploymentId: string; roleId: string };
  Assessment: { deploymentId: string; roleId: string };
  KnowledgeCheckResult: { passed: boolean; deploymentId: string; roleId: string };
  Checklist: { deploymentId: string };
  Map: { deploymentId: string; coordinates?: { lat: number; lng: number } };
  ChatAssist: { contextFocus?: "brief" | "assessment" | "general"; deploymentId?: string };
  Ratings: { deploymentId: string; roleId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Temporary inline screen placeholders.
 * In a full implementation, these would be imported from `src/screens/*`.
 * Placed here to ensure this navigation configuration compiles immediately 
 * without dead imports, strictly adhering to the "no uncompilable code" rule.
 */
const FallbackScreen = ({ route }: { route: any }) => (
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackTitle}>{route.name}</Text>
    <Text style={styles.fallbackText}>Screen module pending implementation.</Text>
  </View>
);

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTintColor: "#0F172A",
        headerTitleStyle: { fontWeight: "600", color: "#0F172A" },
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerShadowVisible: false, // Cleaner, operational aesthetic
        contentStyle: { backgroundColor: "#F8FAFC" },
      }}
    >
      {/* 
        Entry & User Setup
      */}
      <Stack.Screen 
        name="Welcome" 
        component={FallbackScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Onboarding" 
        component={FallbackScreen} 
        options={{ title: "Get Started" }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={FallbackScreen} 
        options={{ title: "My Profile" }} 
      />

      {/* 
        Core ReadyCheck Workflow (The Verification Gate)
      */}
      <Stack.Screen 
        name="RoleSelect" 
        component={FallbackScreen} 
        options={{ title: "Select Assignment" }} 
      />
      <Stack.Screen 
        name="MissionBrief" 
        component={FallbackScreen} 
        options={{ title: "Action Card" }} 
      />
      <Stack.Screen 
        name="Assessment" 
        component={FallbackScreen} 
        options={{ 
          title: "Understanding Check",
          // Prevent user from swiping back to bypass the assessment
          gestureEnabled: false,
          headerBackVisible: false 
        }} 
      />
      <Stack.Screen 
        name="KnowledgeCheckResult" 
        component={FallbackScreen} 
        options={{ 
          title: "Verification Status",
          gestureEnabled: false,
          headerBackVisible: false 
        }} 
      />

      {/* 
        Operational Tools & Execution
      */}
      <Stack.Screen 
        name="Checklist" 
        component={FallbackScreen} 
        options={{ title: "Required Gear" }} 
      />
      <Stack.Screen 
        name="Map" 
        component={FallbackScreen} 
        options={{ title: "Deployment Zone" }} 
      />
      <Stack.Screen 
        name="ChatAssist" 
        component={FallbackScreen} 
        options={{ 
          title: "AI Command Guide",
          // Suggests a modal interaction for AI assistance
          presentation: "modal" 
        }} 
      />

      {/* 
        Post-Mission & Analytics
      */}
      <Stack.Screen 
        name="Ratings" 
        component={FallbackScreen} 
        options={{ title: "Mission Debrief" }} 
      />
      <Stack.Screen 
        name="RegionalHistory" 
        component={FallbackScreen} 
        options={{ title: "Regional Data" }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  fallbackTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  fallbackText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
```
