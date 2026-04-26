// apps/mobile/src/screens/MapScreen.tsx
```tsx
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { 
  MapPin, 
  Route, 
  AlertTriangle, 
  Crosshair, 
  Navigation2,
  ShieldAlert,
  Radio
} from "lucide-react-native";

export interface MapScreenProps {
  route: {
    params: {
      deploymentId: string;
    };
  };
  navigation: any; // Strict: NativeStackNavigationProp
}

// Mock tactical data reflecting the Assam Flood scenario
const ROUTE_DATA = {
  primaryTarget: "Sector 7 Shelter Hub",
  distance: "42 km",
  estTime: "1h 15m",
  status: "ACTIVE_TRACKING",
  checkpoints: [
    { id: "cp1", name: "Rendezvous Point Alpha", passed: true },
    { id: "cp2", name: "High-Ground Waypoint", passed: true },
    { id: "cp3", name: "Sector 7 Shelter Hub (Target)", passed: false },
  ],
  hazards: [
    { type: "Flooded Road", location: "Route 9 Junction" },
    { type: "Poor Visibility", location: "River Basin Approach" },
  ],
  fallback: "Execute sharp right onto Elevated Highway 41 bypass if Route 9 is breached.",
};

export function MapScreen({ route, navigation }: MapScreenProps): React.JSX.Element {
  const { deploymentId } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      
      {/* SIMULATED MAP BACKGROUND */}
      <View style={styles.mapCanvas}>
        <View style={styles.gridPattern} />
        
        {/* Abstract tactical route rendering */}
        <View style={styles.tacticalOverlay}>
          <View style={styles.routeLine} />
          
          <View style={[styles.node, styles.nodeStart]}>
            <View style={styles.nodeCoreStart} />
          </View>
          <Text style={styles.nodeLabelStart}>HQ</Text>

          <View style={[styles.node, styles.nodeHazard]}>
            <AlertTriangle size={12} color="#FFFFFF" strokeWidth={3} />
          </View>
          <Text style={styles.nodeLabelHazard}>Washout</Text>

          <View style={[styles.node, styles.nodeTarget]}>
            <Crosshair size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.nodeLabelTarget}>TARGET</Text>
        </View>

        {/* Live GPS HUD */}
        <View style={[styles.hudTop, { top: insets.top + 16 }]}>
          <View style={styles.hudBadge}>
            <View style={styles.liveIndicator} />
            <Text style={styles.hudText}>SYNCED</Text>
          </View>
          <View style={styles.hudBadge}>
            <Radio size={14} color="#0F172A" />
            <Text style={styles.hudText}>UHF SECURE</Text>
          </View>
        </View>
      </View>

      {/* BOTTOM ACTION SHEET (Operational Info) */}
      <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        
        <View style={styles.sheetHandleContainer}>
          <View style={styles.sheetHandle} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>{ROUTE_DATA.primaryTarget}</Text>
              <View style={styles.metaRow}>
                <Route size={14} color="#64748B" />
                <Text style={styles.metaText}>{ROUTE_DATA.distance} • Est. {ROUTE_DATA.estTime}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.navButton} activeOpacity={0.8}>
              <Navigation2 size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Fallback Directive (Highlighted because of ReadCheck assessment logic) */}
          <View style={styles.fallbackBox}>
            <View style={styles.fallbackHeader}>
              <ShieldAlert size={16} color="#7F1D1D" />
              <Text style={styles.fallbackTitle}>MANDATORY FALLBACK</Text>
            </View>
            <Text style={styles.fallbackText}>{ROUTE_DATA.fallback}</Text>
          </View>

          {/* Hazards */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Active Hazards</Text>
            <View style={styles.hazardContainer}>
              {ROUTE_DATA.hazards.map((haz, idx) => (
                <View key={idx} style={styles.hazardItem}>
                  <AlertTriangle size={16} color="#D97706" />
                  <Text style={styles.hazardType}>{haz.type}</Text>
                  <Text style={styles.hazardLocation}>@ {haz.location}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Checkpoints */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Waypoints</Text>
            <View style={styles.timeline}>
              {ROUTE_DATA.checkpoints.map((cp, idx) => {
                const isLast = idx === ROUTE_DATA.checkpoints.length - 1;
                return (
                  <View key={cp.id} style={styles.timelineItem}>
                    
                    <View style={styles.timelineGraphic}>
                      <View style={[
                        styles.timelineDot, 
                        cp.passed ? styles.timelineDotPassed : styles.timelineDotPending,
                        isLast && !cp.passed && styles.timelineDotTarget
                      ]} />
                      {!isLast && (
                        <View style={[
                          styles.timelineLine,
                          cp.passed ? styles.timelineLinePassed : styles.timelineLinePending
                        ]} />
                      )}
                    </View>
                    
                    <View style={styles.timelineContent}>
                      <Text style={[
                        styles.checkpointName,
                        !cp.passed && styles.checkpointNamePending,
                        isLast && styles.checkpointNameTarget
                      ]}>
                        {cp.name}
                      </Text>
                    </View>

                  </View>
                );
              })}
            </View>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E8F0", // Slate 200 base for map
  },
  
  // -- Fake Map Canvas --
  mapCanvas: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    position: "relative",
    overflow: "hidden",
  },
  gridPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    // A primitive grid trick using borderradius/borders
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundImage: "linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  tacticalOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1.2 }, { rotate: "-15deg" }],
  },
  routeLine: {
    position: "absolute",
    width: 4,
    height: 180,
    backgroundColor: "#4F46E5",
    borderRadius: 2,
    opacity: 0.5,
  },
  node: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  nodeStart: {
    backgroundColor: "#94A3B8",
    top: "35%",
  },
  nodeCoreStart: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  nodeLabelStart: {
    position: "absolute",
    top: "35%",
    marginTop: -20,
    marginLeft: 32,
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
  },
  nodeHazard: {
    backgroundColor: "#EF4444",
    top: "50%",
    left: "40%",
  },
  nodeLabelHazard: {
    position: "absolute",
    top: "50%",
    marginLeft: -40,
    marginTop: -20,
    fontSize: 11,
    fontWeight: "800",
    color: "#EF4444",
  },
  nodeTarget: {
    backgroundColor: "#10B981",
    top: "60%",
  },
  nodeLabelTarget: {
    position: "absolute",
    top: "60%",
    marginTop: -20,
    marginLeft: 36,
    fontSize: 12,
    fontWeight: "800",
    color: "#10B981",
  },
  hudTop: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hudBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  hudText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },

  // -- Bottom Information Sheet --
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 24,
    maxHeight: "55%",
  },
  sheetHandleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  navButton: {
    backgroundColor: "#4F46E5",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fallbackBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 24,
  },
  fallbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  fallbackTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#991B1B",
    letterSpacing: 0.5,
  },
  fallbackText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#7F1D1D",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  hazardContainer: {
    gap: 8,
  },
  hazardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    gap: 8,
  },
  hazardType: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  hazardLocation: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: "row",
  },
  timelineGraphic: {
    alignItems: "center",
    width: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    zIndex: 2,
  },
  timelineDotPassed: {
    borderColor: "#10B981",
    backgroundColor: "#10B981",
  },
  timelineDotPending: {
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  timelineDotTarget: {
    borderColor: "#4F46E5",
    borderWidth: 3,
  },
  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: "#E2E8F0",
    marginTop: -2,
    marginBottom: -2,
    zIndex: 1,
  },
  timelineLinePassed: {
    backgroundColor: "#10B981",
  },
  timelineLinePending: {
    backgroundColor: "#E2E8F0",
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 24, // Matches the 24px line height
    justifyContent: "flex-start",
  },
  checkpointName: {
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "600",
    marginTop: -4, // Optical alignment with dot
  },
  checkpointNamePending: {
    color: "#64748B",
    fontWeight: "500",
  },
  checkpointNameTarget: {
    color: "#4F46E5",
    fontWeight: "700",
  },
});
```
