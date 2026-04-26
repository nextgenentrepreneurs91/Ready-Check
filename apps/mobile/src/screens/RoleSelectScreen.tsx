// apps/mobile/src/screens/RoleSelectScreen.tsx
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
  HeartPulse, 
  Truck, 
  HardHat, 
  Package, 
  ClipboardList, 
  ChevronRight,
  LucideIcon
} from "lucide-react-native";

export interface RoleSelectScreenProps {
  route: {
    params: {
      deploymentId: string;
    };
  };
  navigation: any; // Using 'any' for scaffolding; replace with strict NativeStackNavigationProp
}

interface RoleDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isCritical: boolean;
}

const AVAILABLE_ROLES: RoleDefinition[] = [
  {
    id: "role_medic",
    title: "Mobile Medic",
    description: "Provide emergency triage and cold-chain supply management at shelter sites.",
    icon: HeartPulse,
    isCritical: true,
  },
  {
    id: "role_driver",
    title: "Convoy Driver",
    description: "Navigate heavy supply transports through priority bypass routes.",
    icon: Truck,
    isCritical: true,
  },
  {
    id: "role_logistics",
    title: "Logistics Specialist",
    description: "Manage warehouse dispatch, inventory counts, and loading zones.",
    icon: Package,
    isCritical: false,
  },
  {
    id: "role_volunteer",
    title: "General Volunteer",
    description: "Assist with sorting, crowd direction, and basic kit distribution.",
    icon: HardHat,
    isCritical: false,
  },
  {
    id: "role_coordinator",
    title: "Field Coordinator",
    description: "Oversee sector deployment, verify clearances, and handle escalations.",
    icon: ClipboardList,
    isCritical: true,
  },
];

export function RoleSelectScreen({ route, navigation }: RoleSelectScreenProps): React.JSX.Element {
  const { deploymentId } = route.params;

  const handleSelectRole = (roleId: string) => {
    // Navigate directly to MissionBrief, passing deployment scope and the specific role
    navigation.navigate("MissionBrief", { 
      deploymentId,
      roleId 
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.deploymentNotice}>Deployment ID: {deploymentId.toUpperCase()}</Text>
        <Text style={styles.title}>Confirm your role</Text>
        <Text style={styles.subtitle}>
          Select your assignment below. You will receive an Action Card specific to this role.
        </Text>
      </View>

      <ScrollView 
        style={styles.listContainer} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {AVAILABLE_ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <TouchableOpacity
              key={role.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleSelectRole(role.id)}
            >
              <View style={styles.cardLayout}>
                <View style={styles.iconBox}>
                  <Icon size={24} color="#0F172A" />
                </View>
                
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    {role.isCritical && (
                      <View style={styles.criticalBadge}>
                        <Text style={styles.criticalText}>CRITICAL</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
                
                <View style={styles.arrowContainer}>
                  <ChevronRight size={20} color="#CBD5E1" />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  deploymentNotice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B", // Slate 500
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#475569", // Slate 600
    lineHeight: 22,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F5F9", // Slate 100
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  criticalBadge: {
    backgroundColor: "#1E293B", // Slate 800
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  criticalText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  roleDescription: {
    fontSize: 13,
    color: "#64748B", // Slate 500
    lineHeight: 18,
  },
  arrowContainer: {
    paddingLeft: 4,
  },
});
```
