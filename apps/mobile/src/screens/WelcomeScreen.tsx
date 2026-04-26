// apps/mobile/src/screens/WelcomeScreen.tsx
```tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShieldCheck, ArrowRight, ClipboardCheck, Zap } from "lucide-react-native";

export interface WelcomeScreenProps {
  navigation: any; // Using 'any' here for simplicity in scaffolding; replace with strict NativeStackNavigationProp
}

export function WelcomeScreen({ navigation }: WelcomeScreenProps): React.JSX.Element {
  
  const handleContinue = () => {
    navigation.navigate("RoleSelect", { deploymentId: "demo-id" });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        
        {/* Brand / Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoBadge}>
            <ShieldCheck size={36} color="#4F46E5" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>ReadyCheck</Text>
          <Text style={styles.subtitle}>
            Field operations verified.
          </Text>
        </View>

        {/* Value Proposition */}
        <View style={styles.featuresList}>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <ClipboardCheck size={20} color="#0F172A" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Role-Specific Action Cards</Text>
              <Text style={styles.featureDescription}>
                Receive only the instructions strictly relevant to your exact assignment. No overload.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <ShieldCheck size={20} color="#0F172A" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Verify Before Deployment</Text>
              <Text style={styles.featureDescription}>
                Instead of just saying "I read it", quickly verify you know the route, loadout, and objective safely.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Zap size={20} color="#0F172A" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Live Status Sync</Text>
              <Text style={styles.featureDescription}>
                Coordinators see exactly who is ready on the grid, preventing bottlenecks at dispatch.
              </Text>
            </View>
          </View>

        </View>

      </View>

      {/* Footer / CTA */}
      <View style={styles.footer}>
        <Text style={styles.footerNote}>
          Ensure maximum safety by verifying your loadout and routing.
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton} 
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text style={styles.ctaText}>Join Deployment</Text>
          <ArrowRight size={20} color="#FFFFFF" />
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#EEF2FF", // Indigo 50
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A", // Slate 900
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#475569", // Slate 600
    fontWeight: "500",
  },
  featuresList: {
    gap: 32,
  },
  featureItem: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B", // Slate 500
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  footerNote: {
    fontSize: 12,
    color: "#94A3B8", // Slate 400
    textAlign: "center",
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: "#4F46E5", // Indigo 600
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});
```
