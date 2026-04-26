// apps/mobile/src/screens/RegionalHistoryScreen.tsx
```tsx
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  Map, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingDown
} from "lucide-react-native";

export interface RegionalHistoryScreenProps {
  route: {
    params: {
      regionId?: string;
    };
  };
  navigation: any;
}

const MOCK_REGION_DATA = {
  regionName: "North River Belt",
  lastUpdated: "2 days ago",
  trustIndicator: 92, // Regional readiness trust score
  recurringRisks: [
    { type: "Infrastructure", issue: "Route 9 completely floods during heavy monsoons, requiring bypass." },
    { type: "Logistics", issue: "Cell network drops consistently after 18:00 Local time." },
  ],
  priorIncidents: [
    { date: "Oct 2025", event: "Convoy stranded due to incorrect route assumption. (Pre-ReadyCheck era)" },
    { date: "Aug 2025", event: "Medical supply sorting delayed by 4 hours due to hub congestion." },
  ],
  readinessNote: "Since implementing ReadyCheck, route-based dispatch errors have dropped by 88% in this sector. Always enforce the route verification checkpoint for drivers before dispatch.",
};

export function RegionalHistoryScreen({ route }: RegionalHistoryScreenProps): React.JSX.Element {
  
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Map size={24} color="#4F46E5" />
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.regionLabel}>REGIONAL INTELLIGENCE</Text>
            <Text style={styles.regionName}>{MOCK_REGION_DATA.regionName}</Text>
          </View>
        </View>

        {/* Global Trust / Readiness Indicator */}
        <View style={styles.trustCard}>
          <View style={styles.trustHeader}>
            <Text style={styles.trustTitle}>Deployment Trust Score</Text>
            <ShieldCheck size={20} color="#10B981" />
          </View>
          <View style={styles.trustRow}>
            <Text style={styles.trustMetric}>{MOCK_REGION_DATA.trustIndicator}%</Text>
            <View style={styles.trustDelta}>
              <ArrowUpRight size={16} color="#10B981" />
              <Text style={styles.trustDeltaText}>+14% YoY</Text>
            </View>
          </View>
          <Text style={styles.trustSubtext}>
            Based on completed Readiness Verifications and post-mission debriefs in this region.
          </Text>
        </View>

        {/* Recurring Risks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={18} color="#D97706" />
            <Text style={styles.sectionTitle}>Recurring Operational Risks</Text>
          </View>
          <View style={styles.riskList}>
            {MOCK_REGION_DATA.recurringRisks.map((risk, idx) => (
              <View key={idx} style={styles.riskItem}>
                <Text style={styles.riskCategory}>{risk.type}</Text>
                <Text style={styles.riskIssue}>{risk.issue}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lessons Learned / Readiness Note */}
        <View style={styles.lessonsCard}>
          <View style={styles.sectionHeader}>
            <BookOpen size={18} color="#4F46E5" />
            <Text style={[styles.sectionTitle, { color: "#3730A3" }]}>Historical Directive</Text>
          </View>
          <Text style={styles.lessonText}>{MOCK_REGION_DATA.readinessNote}</Text>
        </View>

        {/* Prior Incidents Timeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingDown size={18} color="#64748B" />
            <Text style={styles.sectionTitle}>Recorded Incident History</Text>
          </View>
          
          <View style={styles.timeline}>
            {MOCK_REGION_DATA.priorIncidents.map((incident, idx) => (
              <View key={idx} style={styles.timelineItem}>
                <View style={styles.timelineNode}>
                  <View style={styles.timelineDot} />
                  {idx !== MOCK_REGION_DATA.priorIncidents.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.incidentDate}>{incident.date}</Text>
                  <Text style={styles.incidentText}>{incident.event}</Text>
                </View>
              </View>
            ))}
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2FF", // Indigo 50
    alignItems: "center",
    justifyContent: "center",
  },
  headerMeta: {
    flex: 1,
  },
  regionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 1,
    marginBottom: 4,
  },
  regionName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
  },
  trustCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  trustHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  trustTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  trustRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 8,
  },
  trustMetric: {
    fontSize: 40,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -1,
  },
  trustDelta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trustDeltaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#059669",
  },
  trustSubtext: {
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  riskList: {
    gap: 12,
  },
  riskItem: {
    backgroundColor: "#FFFBEB", // Amber 50
    borderWidth: 1,
    borderColor: "#FDE68A",
    padding: 16,
    borderRadius: 12,
  },
  riskCategory: {
    fontSize: 12,
    fontWeight: "800",
    color: "#D97706",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  riskIssue: {
    fontSize: 14,
    lineHeight: 22,
    color: "#92400E",
    fontWeight: "500",
  },
  lessonsCard: {
    backgroundColor: "#EEF2FF", // Indigo 50
    borderWidth: 1,
    borderColor: "#C7D2FE",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  lessonText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#312E81", // Indigo 900
    fontWeight: "500",
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: "row",
  },
  timelineNode: {
    width: 24,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#CBD5E1",
    borderWidth: 2,
    borderColor: "#F8FAFC",
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginTop: -2,
    marginBottom: -2,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 24,
  },
  incidentDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 4,
    marginTop: -3, // Optical alignment
  },
  incidentText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#334155",
  },
});
```
