// apps/mobile/src/screens/OnboardingScreen.tsx
```tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClipboardCheck, Sparkles, ActivitySquare, ArrowRight } from "lucide-react-native";

export interface OnboardingScreenProps {
  navigation: any; // Using 'any' for scaffolding; replace with strict NativeStackNavigationProp
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: OnboardingStep[] = [
  {
    id: "step_role",
    title: "Role-Specific Action Cards",
    description: "Instead of massive PDFs, you'll receive a lightweight Action Card containing only the instructions critical to your exact assignment.",
    icon: <ClipboardCheck size={48} color="#0F172A" strokeWidth={1.5} />,
  },
  {
    id: "step_check",
    title: "The Readiness Check",
    description: "Before you deploy, you must answer 2-3 simple verification questions. This mathematically ensures field clarity and prevents life-threatening routing mistakes.",
    icon: <ActivitySquare size={48} color="#0F172A" strokeWidth={1.5} />,
  },
  {
    id: "step_ai",
    title: "Always-On AI Assistance",
    description: "Got confused in the field? Double-tap anywhere to pull up the AI command guide for instant operational context and route recalculations.",
    icon: <Sparkles size={48} color="#4F46E5" strokeWidth={1.5} />,
  },
];

export function OnboardingScreen({ navigation }: OnboardingScreenProps): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    // Usually onboarding is shown once, then we go to Welcome or Home
    navigation.replace("Welcome");
  };

  const stepData = STEPS[currentStep];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      
      {/* Top Header Row (Skip Button) */}
      <View style={styles.headerRow}>
        {!isLastStep ? (
          <TouchableOpacity onPress={handleComplete} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ height: 20 }} /> // Placeholder to maintain flex alignment
        )}
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          {stepData.icon}
        </View>
        <Text style={styles.title}>{stepData.title}</Text>
        <Text style={styles.description}>{stepData.description}</Text>
      </View>

      {/* Footer Area (Dots & Button) */}
      <View style={styles.footer}>
        
        {/* Pagination Dots */}
        <View style={styles.dotContainer}>
          {STEPS.map((_, index) => {
            const isActive = index === currentStep;
            return (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  isActive ? styles.dotActive : styles.dotInactive
                ]} 
              />
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionButton} 
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <Text style={styles.actionButtonText}>
            {isLastStep ? "Get Started" : "Next Step"}
          </Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B", // Slate 500
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F8FAFC", // Slate 50
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#475569", // Slate 600
    lineHeight: 24,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    gap: 32,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
    backgroundColor: "#4F46E5", // Indigo 600
  },
  dotInactive: {
    width: 6,
    backgroundColor: "#E2E8F0", // Slate 200
  },
  actionButton: {
    backgroundColor: "#0F172A", // Slate 900
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
```
