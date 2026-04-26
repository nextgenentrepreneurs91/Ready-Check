// apps/mobile/src/screens/ChecklistScreen.tsx
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
import { 
  Check, 
  Package, 
  MapRoute, 
  ShieldCheck, 
  Phone,
  CheckCircle2,
  AlertTriangle
} from "lucide-react-native";

export interface ChecklistScreenProps {
  route: {
    params: {
      deploymentId: string;
    };
  };
  navigation: any; // Strict: NativeStackNavigationProp
}

interface ChecklistItem {
  id: string;
  label: string;
  isMandatory: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: any;
  items: ChecklistItem[];
}

const CHECKLIST_DATA: ChecklistSection[] = [
  {
    id: "sec_equipment",
    title: "Equipment & Loadout",
    icon: Package,
    items: [
      { id: "eq1", label: "High-visibility operations vest", isMandatory: true },
      { id: "eq2", label: "VHF Radio (Verified 100% battery)", isMandatory: true },
      { id: "eq3", label: "Personal dry-bag with rations", isMandatory: false },
    ],
  },
  {
    id: "sec_route",
    title: "Route & Transport",
    icon: MapRoute,
    items: [
      { id: "rt1", label: "Offline maps downloaded to device", isMandatory: true },
      { id: "rt2", label: "Transport vehicle fuel above 75%", isMandatory: true },
      { id: "rt3", label: "Highway bypass coordinates verified", isMandatory: true },
    ],
  },
  {
    id: "sec_safety",
    title: "Safety & Hazard",
    icon: ShieldCheck,
    items: [
      { id: "sf1", label: "Signed in to regional incident tracker", isMandatory: true },
      { id: "sf2", label: "Medic pack sealed and accessible", isMandatory: true },
    ],
  },
  {
    id: "sec_contacts",
    title: "Comms & Contacts",
    icon: Phone,
    items: [
      { id: "cn1", label: "Sector Commander frequency locked", isMandatory: true },
    ],
  },
];

export function ChecklistScreen({ route, navigation }: ChecklistScreenProps): React.JSX.Element {
  const { deploymentId } = route.params;
  
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const totalMandatory = CHECKLIST_DATA.flatMap(s => s.items).filter(i => i.isMandatory).length;
  const completedMandatory = CHECKLIST_DATA.flatMap(s => s.items)
    .filter(i => i.isMandatory && checkedIds[i.id]).length;
    
  const completionPercent = totalMandatory > 0 
    ? Math.round((completedMandatory / totalMandatory) * 100) 
    : 100;
    
  const isFullyReady = completedMandatory === totalMandatory;

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFinalize = () => {
    if (isFullyReady) {
      // In a real app, API call to mark deployment as 'Active / En Route' happens here
      navigation.replace("Map", { deploymentId });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      
      {/* Fixed Overview Header */}
      <View style={styles.header}>
        <View style={styles.missionMetaRow}>
          <Text style={styles.deploymentId}>DEPLOYMENT {deploymentId.toUpperCase()}</Text>
          {isFullyReady ? (
            <View style={styles.statusBadgeReady}>
              <Text style={styles.statusBadgeTextReady}>CLEARED</Text>
            </View>
          ) : (
            <View style={styles.statusBadgePending}>
              <Text style={styles.statusBadgeTextPending}>PENDING</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>Final Clearance Checklist</Text>
        <Text style={styles.subtitle}>
          Verify physical possession and status of all operational requirements before proceeding to the deployment map.
        </Text>

        <View style={styles.progressSection}>
          <View style={styles.progressMeta}>
            <Text style={styles.progressLabel}>Mandatory Items Cleared</Text>
            <Text style={[styles.progressValue, isFullyReady && styles.progressValueReady]}>
              {completionPercent}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completionPercent}%` },
                isFullyReady && styles.progressFillReady
              ]} 
            />
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CHECKLIST_DATA.map((section) => {
          const SectionIcon = section.icon;
          return (
            <View key={section.id} style={styles.sectionCard}>
              
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBox}>
                  <SectionIcon size={18} color="#0F172A" />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              <View style={styles.itemGroup}>
                {section.items.map((item) => {
                  const isChecked = !!checkedIds[item.id];
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      style={[styles.itemRow, isChecked && styles.itemRowChecked]}
                      onPress={() => toggleItem(item.id)}
                    >
                      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                        {isChecked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                      </View>
                      
                      <View style={styles.itemTextContainer}>
                        <Text style={[styles.itemLabel, isChecked && styles.itemLabelChecked]}>
                          {item.label}
                        </Text>
                        {!item.isMandatory && (
                          <Text style={styles.optionalTag}>Optional</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

            </View>
          );
        })}
        
        {!isFullyReady && (
          <View style={styles.warningBox}>
            <AlertTriangle size={20} color="#D97706" />
            <Text style={styles.warningText}>
              You must physically verify all mandatory items before the system will unlock dispatch coordinates.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, !isFullyReady && styles.actionButtonDisabled]}
          activeOpacity={0.8}
          disabled={!isFullyReady}
          onPress={handleFinalize}
        >
          <Text style={styles.actionButtonText}>
            {isFullyReady ? "Initiate Deployment" : "Complete Checklist Required"}
          </Text>
          {isFullyReady && <CheckCircle2 size={20} color="#FFFFFF" />}
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
  missionMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deploymentId: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
  },
  statusBadgePending: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 6,
  },
  statusBadgeTextPending: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  statusBadgeReady: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#ECFDF5", // Emerald 50
    borderRadius: 6,
  },
  statusBadgeTextReady: {
    fontSize: 10,
    fontWeight: "800",
    color: "#059669", // Emerald 600
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#475569", // Slate 600
    lineHeight: 20,
    marginBottom: 24,
  },
  progressSection: {
    width: "100%",
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#3B82F6", // Blue 500
  },
  progressValueReady: {
    color: "#10B981", // Emerald 500
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 4,
  },
  progressFillReady: {
    backgroundColor: "#10B981",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  itemGroup: {
    gap: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 12,
  },
  itemRowChecked: {
    backgroundColor: "#F8FAFC", // Slate 50
    borderColor: "#E2E8F0", // Slate 200
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1", // Slate 300
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    borderColor: "#10B981",
    backgroundColor: "#10B981",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 15,
    color: "#334155", // Slate 700
    fontWeight: "500",
  },
  itemLabelChecked: {
    color: "#94A3B8", // Slate 400
    textDecorationLine: "line-through",
  },
  optionalTag: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB", // Amber 50
    borderWidth: 1,
    borderColor: "#FDE68A", // Amber 200
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: "#92400E", // Amber 900
    lineHeight: 20,
    fontWeight: "500",
  },
  footer: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
  },
  actionButton: {
    backgroundColor: "#10B981", // Emerald 500
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  actionButtonDisabled: {
    backgroundColor: "#94A3B8", // Slate 400
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
```
