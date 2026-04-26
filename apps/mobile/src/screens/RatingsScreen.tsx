// apps/mobile/src/screens/RatingsScreen.tsx
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
  Star, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react-native";

export interface RatingsScreenProps {
  route: {
    params: {
      deploymentId: string;
      roleId: string;
    };
  };
  navigation: any; // Strict: NativeStackNavigationProp
}

// Mock Trust & Rating Data
const MOCK_RATING_DATA = {
  deploymentName: "Assam Flood Supply Operations",
  overallScore: 4.8,
  totalReviews: 12,
  categories: [
    { id: "cat1", label: "Readiness & Preparedness", score: 4.9, max: 5 },
    { id: "cat2", label: "Instruction Clarity", score: 4.5, max: 5 },
    { id: "cat3", label: "Teamwork & Handoffs", score: 4.8, max: 5 },
    { id: "cat4", label: "Operational Follow-through", score: 4.7, max: 5 },
  ],
  feedbackSnippet: 
    "High structural clarity during loading procedures. Route guidance was extremely accurate thanks to initial Readiness Verification catching the highway closure early.",
};

function RatingBar({ label, score, max }: { label: string; score: number; max: number }) {
  const percentage = (score / max) * 100;

  return (
    <View style={styles.ratingBarContainer}>
      <View style={styles.ratingBarHeader}>
        <Text style={styles.ratingLabel}>{label}</Text>
        <Text style={styles.ratingScoreText}>
          <Text style={styles.ratingScoreHighlight}>{score.toFixed(1)}</Text> / {max}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

export function RatingsScreen({ route, navigation }: RatingsScreenProps): React.JSX.Element {
  const { deploymentId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header / Overall Score */}
        <View style={styles.heroSection}>
          <Text style={styles.deploymentId}>DEPLOYMENT {deploymentId.toUpperCase()}</Text>
          <Text style={styles.missionTitle}>{MOCK_RATING_DATA.deploymentName}</Text>
          
          <View style={styles.overallScoreBox}>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={28} 
                  color={star <= Math.floor(MOCK_RATING_DATA.overallScore) ? "#F59E0B" : "#E2E8F0"} 
                  fill={star <= Math.floor(MOCK_RATING_DATA.overallScore) ? "#F59E0B" : "transparent"} 
                />
              ))}
            </View>
            <Text style={styles.overallScoreNumber}>
              {MOCK_RATING_DATA.overallScore.toFixed(1)}
            </Text>
            <Text style={styles.reviewCount}>Based on {MOCK_RATING_DATA.totalReviews} operator debriefs</Text>
          </View>
        </View>

        {/* Categories Breakdown */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
          </View>
          
          <View style={styles.metricsList}>
            {MOCK_RATING_DATA.categories.map((cat) => (
              <RatingBar 
                key={cat.id} 
                label={cat.label} 
                score={cat.score} 
                max={cat.max} 
              />
            ))}
          </View>
        </View>

        {/* Qualitative Feedback */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>Debrief Summary</Text>
          </View>
          
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>"{MOCK_RATING_DATA.feedbackSnippet}"</Text>
          </View>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustBadgeArea}>
          <View style={styles.trustIconWrapper}>
            <Award size={24} color="#10B981" />
          </View>
          <View style={styles.trustTextContainer}>
            <Text style={styles.trustTitle}>High Trust Operation</Text>
            <Text style={styles.trustDescription}>
              This deployment exceeded the regional average for role clarity and readiness verification.
            </Text>
          </View>
        </View>

      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  deploymentId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 24,
  },
  overallScoreBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  starRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 12,
  },
  overallScoreNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -2,
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  metricsList: {
    gap: 20,
  },
  ratingBarContainer: {
    width: "100%",
  },
  ratingBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  ratingScoreText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
  ratingScoreHighlight: {
    color: "#0F172A",
    fontWeight: "700",
  },
  track: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#4F46E5", // Indigo 600
    borderRadius: 4,
  },
  feedbackBox: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#4F46E5",
  },
  feedbackText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#334155",
    fontStyle: "italic",
  },
  trustBadgeArea: {
    flexDirection: "row",
    backgroundColor: "#ECFDF5", // Emerald 50
    borderWidth: 1,
    borderColor: "#A7F3D0", // Emerald 200
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    gap: 16,
  },
  trustIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D1FAE5", // Emerald 100
    alignItems: "center",
    justifyContent: "center",
  },
  trustTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  trustTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#065F46", // Emerald 800
    marginBottom: 4,
  },
  trustDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#059669", // Emerald 600
  },
});
```
