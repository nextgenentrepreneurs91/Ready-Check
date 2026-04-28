
// apps/mobile/src/components/TeamCard.tsx
```tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MapPin, Users, AlertTriangle, ChevronRight } from "lucide-react-native";

export interface TeamCardProps {
  id: string;
  teamName: string;
  region: string;
  /** Number of volunteer roles filled out of total required */
  roleCoverage: {
    filled: number;
    total: number;
  };
  /** Percentage of filled roles that have successfully passed Action Card verification (0-100) */
  readinessPercent: number;
  /** Number of volunteers who failed verification and cannot yet deploy */
  blockedCount: number;
  onPress?: (teamId: string) => void;
}

export function TeamCard({
  id,
  teamName,
  region,
  roleCoverage,
  readinessPercent,
  blockedCount,
  onPress,
}: TeamCardProps): React.JSX.Element {
  const isFullyReady = readinessPercent === 100 && blockedCount === 0;
  const progressWidth = `${Math.min(Math.max(readinessPercent, 0), 100)}%`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(id)}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`Team ${teamName} in ${region}. ${readinessPercent}% verified.`}
    >
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.teamName} numberOfLines={1}>
            {teamName}
          </Text>
          <View style={styles.regionRow}>
            <MapPin size={12} color="#64748B" />
            <Text style={styles.regionText}>{region}</Text>
          </View>
        </View>
        <ChevronRight size={20} color="#CBD5E1" />
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Users size={14} color="#64748B" />
          <Text style={styles.metricText}>
            <Text style={styles.metricHighlight}>{roleCoverage.filled}</Text>
            /{roleCoverage.total} Roles
          </Text>
        </View>

        {blockedCount > 0 && (
          <View style={[styles.metricItem, styles.blockedBadge]}>
            <AlertTriangle size={14} color="#EF4444" />
            <Text style={styles.blockedText}>{blockedCount} Blocked</Text>
          </View>
        )}
      </View>

      {/* Readiness Progress */}
      <View style={styles.readinessContainer}>
        <View style={styles.readinessHeader}>
          <Text style={styles.readinessLabel}>Verification Readiness</Text>
          <Text 
            style={[
              styles.readinessValue, 
              isFullyReady && styles.readinessValueReady
            ]}
          >
            {readinessPercent}%
          </Text>
        </View>
        
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: progressWidth as any },
              isFullyReady ? styles.progressFillReady : undefined,
              blockedCount > 0 ? styles.progressFillBlocked : undefined,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Slate 200
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A", // Slate 900
    marginBottom: 4,
  },
  regionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  regionText: {
    fontSize: 13,
    color: "#64748B", // Slate 500
    fontWeight: "500",
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Slate 50
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9", // Slate 100
    gap: 6,
  },
  metricText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  metricHighlight: {
    color: "#0F172A",
    fontWeight: "600",
  },
  blockedBadge: {
    backgroundColor: "#FEF2F2", // Rose 50
    borderColor: "#FECACA", // Rose 200
  },
  blockedText: {
    fontSize: 13,
    color: "#991B1B", // Rose 800
    fontWeight: "600",
  },
  readinessContainer: {
    width: "100%",
  },
  readinessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  readinessLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#64748B",
  },
  readinessValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155", // Slate 700
  },
  readinessValueReady: {
    color: "#059669", // Emerald 600
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F1F5F9", // Slate 100
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6", // Blue 500 (Processing / Partial)
    borderRadius: 3,
  },
  progressFillReady: {
    backgroundColor: "#10B981", // Emerald 500 (Verified)
  },
  progressFillBlocked: {
    backgroundColor: "#F59E0B", // Amber 500 (Needs attention)
  },
});
```
