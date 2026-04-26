// apps/mobile/src/screens/AssessmentScreen.tsx
```tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle2, ChevronRight, AlertCircle } from "lucide-react-native";

export interface AssessmentScreenProps {
  route: {
    params: {
      deploymentId: string;
      roleId: string;
    };
  };
  navigation: any; // Use NativeStackNavigationProp in strict implementation
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// Mock data: Role-specific practical prompts for the "Mobile Medic"
const MOCK_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "If Route 9 is heavily flooded during your transit, what is your mandatory fallback protocol?",
    options: [
      "Wait at the border until the water recedes.",
      "Switch immediately to the highway bypass route.",
      "Attempt to cross slowly behind heavy transport.",
    ],
    correctIndex: 1, // "Switch immediately to the highway bypass route."
  },
  {
    id: "q2",
    question: "What is your primary responsibility upon reaching the shelter hub?",
    options: [
      "Begin dispensing general food supply.",
      "Establish cold-chain hookups for arriving field vaccines.",
      "Direct traffic flow outside the loading zone.",
    ],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "At 18:00 Local time, what operational challenge should you be prepared for?",
    options: [
      "Shift changes and low volunteer staffing.",
      "A complete communication and network blackout.",
      "Shortage of cold storage capacity.",
    ],
    correctIndex: 1,
  },
];

export function AssessmentScreen({ route, navigation }: AssessmentScreenProps): React.JSX.Element {
  const { deploymentId, roleId } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const totalQuestions = MOCK_QUESTIONS.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  
  const hasSelectedCurrent = selectedAnswers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNextSubmit = () => {
    if (!hasSelectedCurrent) return;

    if (isLastQuestion) {
      // Evaluate mock readiness
      let correctCount = 0;
      MOCK_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });
      
      const passed = correctCount === totalQuestions;
      
      navigation.replace("KnowledgeCheckResult", { 
        passed, 
        deploymentId, 
        roleId 
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      
      {/* Header & Progress */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Readiness Check</Text>
        <Text style={styles.headerSubtitle}>
          Question {currentIndex + 1} of {totalQuestions}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionContainer}>
          <AlertCircle size={24} color="#4F46E5" style={{ marginBottom: 16 }} />
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsList}>
          {currentQuestion.options.map((optionLabel, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => handleSelectOption(idx)}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected
                ]}
              >
                <View style={styles.optionCircle}>
                  {isSelected && <View style={styles.optionCircleInner} />}
                </View>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected
                ]}>
                  {optionLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !hasSelectedCurrent && styles.submitButtonDisabled
          ]}
          activeOpacity={0.8}
          disabled={!hasSelectedCurrent}
          onPress={handleNextSubmit}
        >
          {isLastQuestion ? (
            <>
              <Text style={styles.submitButtonText}>Submit Answers</Text>
              <CheckCircle2 size={20} color="#FFFFFF" />
            </>
          ) : (
            <>
              <Text style={styles.submitButtonText}>Next Question</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate 50
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 16,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#F1F5F9", // Slate 100
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4F46E5", // Indigo 600
    borderRadius: 3,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A", // Slate 900
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E2E8F0", // Slate 200
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  optionCardSelected: {
    borderColor: "#4F46E5",
    backgroundColor: "#EEF2FF", // Indigo 50
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CBD5E1", // Slate 300
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4F46E5",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#475569", // Slate 600
    lineHeight: 22,
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#0F172A",
    fontWeight: "600",
  },
  footer: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
  },
  submitButton: {
    backgroundColor: "#0F172A", // Slate 900
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#94A3B8", // Slate 400
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
```
