
```tsx
// apps/mobile/src/components/StatusLegend.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type ReadinessStatus = "verified" | "needs_attention" | "blocked" | "pending";

interface LegendItem {
  id: ReadinessStatus;
  label: string;
  color: string;
  borderColor: string;
}

const LEGEND_DATA: LegendItem[] = [
  { 
    id: "verified", 
    label: "Verified", 
    color: "#10B981", // Emerald 500
    borderColor: "#059669" // Emerald 600
  },
  { 
    id: "needs_attention", 
    label: "Needs Attention", 
    color: "#F59E0B", // Amber 500
    borderColor: "#D97706" // Amber 600
  },
  { 
    id: "blocked", 
    label: "Blocked", 
    color: "#EF4444", // Rose 500
    borderColor: "#DC2626" // Rose 600
  },
  { 
    id: "pending", 
    label: "Pending", 
    color: "#94A3B8", // Slate 400
    borderColor: "#64748B" // Slate 500
  },
];

export interface StatusLegendProps {
  /**
   * Only show specific statuses in the legend to keep it minimal
   */
  filter?: ReadinessStatus[];
  style?: object;
}

export function StatusLegend({ filter, style }: StatusLegendProps): React.JSX.Element {
  const visibleItems = filter 
    ? LEGEND_DATA.filter(item => filter.includes(item.id)) 
    : LEGEND_DATA;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.headerTitle}>Readiness Status</Text>
      <View style={styles.grid}>
        {visibleItems.map((item) => (
          <View key={item.id} style={styles.legendRow}>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: item.color, borderColor: item.borderColor }
              ]} 
              aria-hidden="true" 
            />
            <Text style={styles.labelText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC", // Slate 50
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9", // Slate 100
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#64748B", // Slate 500
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12, // React Native supports 'gap' in flex layouts now
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "46%", // Creates a compact 2-column layout on mobile
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  labelText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155", // Slate 700
  },
});
```
