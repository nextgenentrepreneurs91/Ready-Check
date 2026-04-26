// apps/mobile/src/screens/ProfileScreen.tsx
```tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  User, 
  ShieldCheck, 
  History, 
  Settings, 
  ChevronRight, 
  ActivitySquare,
  LogOut
} from "lucide-react-native";

export interface ProfileScreenProps {
  navigation: any; // Strict: NativeStackNavigationProp
}

// Mock Operator Data
const MOCK_PROFILE = {
  name: "Marcus Reynolds",
  primaryRole: "Senior Convoy Driver",
  regionalUnit: "Northern Corridor Ops",
  stats: {
    readinessScore: 98, // Percentage of first-try verification passes
    deployments: 14,
    verifiedChecks: 42,
    blocksResolved: 2,
  },
  history: [
    { id: "dep_91", title: "Assam Flood Supply", date: "Oct 12, 2026", status: "VERIFIED" },
    { id: "dep_88", title: "Ridge Medical Relay", date: "Sep 28, 2026", status: "VERIFIED" },
    { id: "dep_82", title: "Harbor Evacuation", date: "Aug 15, 2026", status: "NEEDS_ATTENTION_RESOLVED" },
  ]
};

export function ProfileScreen({ navigation }: ProfileScreenProps): React.JSX.Element {
  const [offlineSync, setOfflineSync] = useState(true);
  const [notifyAssignments, setNotifyAssignments] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header Profile Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>MR</Text>
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>{MOCK_PROFILE.name}</Text>
            <Text style={styles.profileRole}>{MOCK_PROFILE.primaryRole}</Text>
            <Text style={styles.profileUnit}>{MOCK_PROFILE.regionalUnit}</Text>
          </View>
        </View>

        {/* Readiness Stats Dashboard */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <ActivitySquare size={18} color="#4F46E5" />
            <Text style={styles.statValue}>{MOCK_PROFILE.stats.readinessScore}%</Text>
            <Text style={styles.statLabel}>Readiness Score</Text>
          </View>
          <View style={styles.statCard}>
            <ShieldCheck size={18} color="#10B981" />
            <Text style={styles.statValue}>{MOCK_PROFILE.stats.verifiedChecks}</Text>
            <Text style={styles.statLabel}>Total Verifications</Text>
          </View>
        </View>

        {/* Deployment History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <History size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>Recent Deployments</Text>
          </View>
          <View style={styles.historyList}>
            {MOCK_PROFILE.history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyMeta}>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={[
                  styles.historyBadge, 
                  item.status === "VERIFIED" ? styles.historyBadgeVerified : styles.historyBadgeResolved
                ]}>
                  <Text style={[
                     styles.historyBadgeText,
                     item.status === "VERIFIED" ? styles.historyBadgeTextVerified : styles.historyBadgeTextResolved
                  ]}>
                    {item.status === "VERIFIED" ? "VERIFIED" : "RESOLVED"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View full history</Text>
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Settings size={18} color="#0F172A" />
            <Text style={styles.sectionTitle}>App Preferences</Text>
          </View>
          
          <View style={styles.settingsGroup}>
            <View style={styles.settingRow}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Background Offline Sync</Text>
                <Text style={styles.settingDescription}>Keep action cards available offline</Text>
              </View>
              <Switch 
                value={offlineSync} 
                onValueChange={setOfflineSync} 
                trackColor={{ false: "#E2E8F0", true: "#4F46E5" }}
              />
            </View>
            
            <View style={styles.settingDivider} />

            <View style={styles.settingRow}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Assignment Notifications</Text>
                <Text style={styles.settingDescription}>Alert when added to a rapid deployment</Text>
              </View>
              <Switch 
                value={notifyAssignments} 
                onValueChange={setNotifyAssignments}
                trackColor={{ false: "#E2E8F0", true: "#4F46E5" }}
              />
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign out from device</Text>
        </TouchableOpacity>

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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0F172A", // Slate 900
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  profileMeta: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5", // Indigo 600
    marginBottom: 2,
  },
  profileUnit: {
    fontSize: 13,
    color: "#64748B", // Slate 500
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 32,
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
  historyList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  historyMeta: {
    flex: 1,
    paddingRight: 16,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 13,
    color: "#64748B",
  },
  historyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  historyBadgeVerified: {
    backgroundColor: "#ECFDF5",
  },
  historyBadgeResolved: {
    backgroundColor: "#EFF6FF", // Blue 50
  },
  historyBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  historyBadgeTextVerified: {
    color: "#059669",
  },
  historyBadgeTextResolved: {
    color: "#2563EB", // Blue 600
  },
  viewAllButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },
  settingsGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#64748B",
  },
  settingDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E8F0",
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
    marginTop: 16,
    backgroundColor: "#FEF2F2", // Rose 50
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA", // Rose 200
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EF4444", // Rose 500
  },
});
```
