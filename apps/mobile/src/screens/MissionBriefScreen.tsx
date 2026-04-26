
// apps/mobile/src/screens/MissionBriefScreen.tsx
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
  Target, 
  MapPin, 
  CloudRain, 
  ShieldAlert, 
  ListChecks,
  ChevronRight
} from "lucide-react-native";

export interface MissionBriefScreenProps {
  route: {
    params: {
      deploymentId: string;
      roleId: string;
    };
  };
  navigation: any; // Use NativeStackNavigationProp in a strict setup
}

// Fixed mock data for the scaffolding. In a real app, this comes from a hook/API based on params.
const MOCK_BRIEF = {
  missionTitle: "Assam Flood: Emergency Food Distribution",
  roleName: "Mobile Medic",
  objective: "Distribute 500 emergency rationing kits and conduct structural triage in isolated villages.",
  location: "North River Belt (Sectors 4 through 9)",
  conditions: "Heavy waterlogging. Internal roads are compromised.",
  expectations: [
    "Manage cold-chain storage for incoming field vaccines.",
    "Triage level-1 injuries at the central shelter hub.",
    "Do not separate from convoy transport during shift rotation.",
  ],
  cautions: [
    "Highway bypass route must be used. Do not attempt crossing Route 9.",
    "Communication blackouts expected after 18:00 Local time.",
  ],
};

export function MissionBriefScreen({ route, navigation }: MissionBriefScreenProps): React.JSX.Element {
  const { deploymentId, roleId } = route.params;

  const handleStartVerification = () => {
    navigation.navigate("Assessment", { deploymentId, roleId });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Ribbon */}
        <View style={styles.headerRibbon}>
          <Text style={styles.ribbonLabel}>ACTION CARD</Text>
          <Text style={styles.ribbonId}>{deploymentId.toUpperCase()}</Text>
        </View>

        <Text style={styles.roleTitle}>{MOCK_BRIEF.roleName}</Text>
        <Text style={styles.missionTitle}>{MOCK_BRIEF.missionTitle}</Text>

        {/* Section: Objective */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>Objective</Text>
          </View>
          <Text style={styles.bodyText}>{MOCK_BRIEF.objective}</Text>
        </View>

        {/* Section: Location & Conditions */}
        <View style={styles.gridSection}>
          <View style={[styles.gridBox, { marginRight: 8 }]}>
            <View style={styles.gridBoxHeader}>
              <MapPin size={16} color="#4F46E5" />
              <Text style={styles.gridBoxTitle}>Location</Text>
            </View>
            <Text style={styles.gridBoxText}>{MOCK_BRIEF.location}</Text>
          </View>
          <View style={[styles.gridBox, { marginLeft: 8 }]}>
            <View style={styles.gridBoxHeader}>
              <CloudRain size={16} color="#0284C7" />
              <Text style={styles.gridBoxTitle}>Conditions</Text>
            </View>
            <Text style={styles.gridBoxText}>{MOCK_BRIEF.conditions}</Text>
          </View>
        </View>

        {/* Section: Action Expectations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ListChecks size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>Your Responsibilities</Text>
          </View>
          <View style={styles.bulletList}>
            {MOCK_BRIEF.expectations.map((exp, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.bulletText}>{exp}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Cautions */}
        <View style={styles.cautionSection}>
          <View style={styles.sectionHeader}>
            <ShieldAlert size={18} color="#EF4444" />
            <Text style={styles.cautionTitle}>Critical Cautions</Text>
          </View>
          <View style={styles.bulletList}>
            {MOCK_BRIEF.cautions.map((caution, idx) => (
              <View key={idx} style={styles.bulletItem}>
                <View style={[styles.bulletPoint, { backgroundColor: "#EF4444" }]} />
                <Text style={styles.cautionText}>{caution}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.verifyButton} 
          activeOpacity={0.8}
          onPress={handleStartVerification}
        >
          <Text style={styles.verifyButtonText}>Verify Understanding</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          You cannot deploy until verification is complete.
        </Text>
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
  headerRibbon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ribbonLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4F46E5", // Indigo 600
    letterSpacing: 1,
  },
  ribbonId: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8", // Slate 400
  },
  roleTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569", // Slate 600
    marginBottom: 32,
  },
  section: {
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#334155", // Slate 700
  },
  gridSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  gridBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridBoxHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  gridBoxTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
  gridBoxText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#0F172A",
    fontWeight: "500",
  },
  bulletList: {
    gap: 12,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4F46E5",
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: "#334155",
  },
  cautionSection: {
    backgroundColor: "#FEF2F2", // Rose 50
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FECACA", // Rose 200
  },
  cautionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#991B1B", // Rose 800
  },
  cautionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: "#991B1B",
    fontWeight: "500",
  },
  footer: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
  },
  verifyButton: {
    backgroundColor: "#10B981", // Emerald 500
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  footerNote: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
    color: "#64748B",
    fontWeight: "500",
  },
});
```
