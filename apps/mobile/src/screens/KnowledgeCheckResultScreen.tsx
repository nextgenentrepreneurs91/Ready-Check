// apps/mobile/src/screens/KnowledgeCheckResultScreen.tsx
```tsx
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCcw, 
  ArrowRight,
  Lightbulb
} from "lucide-react-native";

export interface KnowledgeCheckResultScreenProps {
  route: {
    params: {
      passed: boolean;
      deploymentId: string;
      roleId: string;
    };
  };
  navigation: any; // Strict: NativeStackNavigationProp
}

export function KnowledgeCheckResultScreen({ 
  route, 
  navigation 
}: KnowledgeCheckResultScreenProps): React.JSX.Element {
  const { passed, deploymentId, roleId } = route.params;

  const handleProceed = () => {
    if (passed) {
      // Move forward to the physical gear checklist
      navigation.navigate("Checklist", { deploymentId });
    } else {
      // Go back to the briefing to review and try again
      navigation.replace("MissionBrief", { deploymentId, roleId });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Status Hero Area */}
        <View style={styles.heroSection}>
          <View style={[
            styles.iconCircle, 
            passed ? styles.iconCircleVerified : styles.iconCircleAttention
          ]}>
            {passed 
              ? <ShieldCheck size={48} color="#10B981" strokeWidth={2} />
              : <AlertCircle size={48} color="#D97706" strokeWidth={2} />
            }
          </View>
          
          <Text style={styles.statusTitle}>
            {passed ? "Verification Complete" : "Clarification Needed"}
          </Text>
          <Text style={styles.statusSubtitle}>
            {passed 
              ? "Your operational understanding matches the critical mission parameters. You are cleared to proceed."
              : "Let's review the Action Card to ensure you have the safest and most accurate operational details before deploying."
            }
          </Text>
        </View>

        {passed ? (
          /* PASSED STATE DETAILS */
          <>
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                <CheckCircle2 size={18} color="#10B981" />
                <Text style={styles.cardTitle}>Confirmed Operational Strengths</Text>
              </View>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>You correctly identified the highway bypass fallback route.</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>You understand the priority of cold-chain logistics at the hub.</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletSymbol}>•</Text>
                  <Text style={styles.bulletText}>You are prepared for expected evening communications blackouts.</Text>
                </View>
              </View>
            </View>

            <View style={styles.nextStepsCard}>
              <Text style={styles.nextStepsLabel}>Next Steps</Text>
              <Text style={styles.nextStepsText}>
                The coordinator has been notified of your verified status. 
                Complete your physical gear checklist to finalize dispatch.
              </Text>
            </View>
          </>
        ) : (
          /* NEEDS ATTENTION DETAILS */
          <>
            <View style={[styles.detailCard, styles.detailCardAttention]}>
              <View style={styles.cardHeader}>
                <Lightbulb size={18} color="#D97706" />
                <Text style={[styles.cardTitle, { color: "#92400E" }]}>Area for Review</Text>
              </View>
              <Text style={styles.clarificationText}>
                There was a misunderstanding regarding the mandatory fallback route. 
                Attempting to cross Route 9 is currently unsafe due to heavy waterlogging.
              </Text>
            </View>

            <View style={styles.nextStepsCard}>
              <Text style={styles.nextStepsLabel}>Recommended Action</Text>
              <Text style={styles.nextStepsText}>
                No worries—this system exists exactly for this reason. 
                Simply review your Action Card focusing on the "Cautions" section, then retry the assessment when you feel ready.
              </Text>
            </View>
          </>
        )}

      </ScrollView>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, passed ? styles.actionButtonGreen : styles.actionButtonSlate]}
          activeOpacity={0.8}
          onPress={handleProceed}
        >
          {passed ? (
            <>
              <Text style={styles.actionButtonText}>Proceed to Checklist</Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </>
          ) : (
            <>
              <Text style={styles.actionButtonText}>Review Action Card</Text>
              <RefreshCcw size={20} color="#0F172A" />
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
  },
  iconCircleVerified: {
    backgroundColor: "#ECFDF5", // Emerald 50
    borderColor: "#A7F3D0", // Emerald 200
  },
  iconCircleAttention: {
    backgroundColor: "#FFFBEB", // Amber 50
    borderColor: "#FDE68A", // Amber 200
  },
  statusTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
    marginBottom: 12,
    textAlign: "center",
  },
  statusSubtitle: {
    fontSize: 16,
    color: "#475569", // Slate 600
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  detailCardAttention: {
    backgroundColor: "#FFFBEB", // Amber 50
    borderColor: "#FDE68A", // Amber 200
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  bulletList: {
    gap: 12,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bulletSymbol: {
    fontSize: 16,
    color: "#10B981", // Emerald 500
    fontWeight: "800",
    marginTop: -2,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#334155", // Slate 700
  },
  clarificationText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#92400E", // Amber 900
    fontWeight: "500",
  },
  nextStepsCard: {
    padding: 20,
    marginTop: 8,
  },
  nextStepsLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#64748B", // Slate 500
    marginBottom: 8,
  },
  nextStepsText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#475569", // Slate 600
  },
  footer: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
  },
  actionButtonGreen: {
    backgroundColor: "#10B981", // Emerald 500
  },
  actionButtonSlate: {
    backgroundColor: "#F1F5F9", // Slate 100
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    // Slate text for the secondary retry button, White for the primary advance button
    color: "#0F172A", 
    letterSpacing: 0.5,
  },
});
```
