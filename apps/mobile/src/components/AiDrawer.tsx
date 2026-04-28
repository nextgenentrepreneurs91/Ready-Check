
// apps/mobile/src/components/AiDrawer.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import { Sparkles, X, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react-native";
export type SuggestionActionType = "navigate" | "info" | "warning";
export interface AiSuggestion {
  id: string;
  label: string;
  actionType?: SuggestionActionType;
}
export interface AiDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  summary: string;
  suggestions?: AiSuggestion[];
  onSelectSuggestion?: (suggestion: AiSuggestion) => void;
}
/**
 * Returns an operational icon mapped to the suggestion intent.
 * Keeps the interface calm but semantically communicative.
 */
function getSuggestionIcon(type?: SuggestionActionType, color: string = "#4F46E5") {
  switch (type) {
    case "warning":
      return <AlertTriangle size={14} color="#D97706" />;
    case "navigate":
      return <ArrowRight size={14} color={color} />;
    case "info":
    default:
      return <CheckCircle2 size={14} color={color} />;
  }
}
export function AiDrawer({
  isVisible,
  onClose,
  title = "ReadyCheck Assistant",
  summary,
  suggestions = [],
  onSelectSuggestion,
}: AiDrawerProps): React.JSX.Element {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlayContainer}>
        {/* Dark overlay backdrop. Tapping it dismisses the drawer. */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        {/* Bottom Sheet Area */}
        <View style={styles.sheetPanel}>
          
          {/* Subtle drag indicator */}
          <View style={styles.handleContainer}>
            <View style={styles.dragHandle} />
          </View>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconWrapper}>
                <Sparkles size={16} color="#4F46E5" />
              </View>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <TouchableOpacity 
              onPress={onClose} 
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              style={styles.closeButton}
            >
              <X size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>
          {/* AI Summary / Briefing */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
          {/* Actionable Suggestions */}
          {suggestions.length > 0 && (
            <View style={styles.suggestionsWrapper}>
              <Text style={styles.suggestionsLabel}>Suggested Actions</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {suggestions.map((item) => {
                  const isWarning = item.actionType === "warning";
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      style={[
                        styles.chipButton,
                        isWarning && styles.chipButtonWarning
                      ]}
                      onPress={() => onSelectSuggestion?.(item)}
                    >
                      <Text style={[
                        styles.chipText,
                        isWarning && styles.chipTextWarning
                      ]}>
                        {item.label}
                      </Text>
                      {getSuggestionIcon(item.actionType, isWarning ? "#D97706" : "#4F46E5")}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Slate 900 with 40% opacity
  },
  sheetPanel: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24, // Safe area padding
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
    maxHeight: "85%",
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0", // Slate 200
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F1F5F9", // Slate 100
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#EEF2FF", // Indigo 50
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A", // Slate 900
    letterSpacing: -0.3,
  },
  closeButton: {
    padding: 2,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#334155", // Slate 700
    letterSpacing: -0.1,
  },
  suggestionsWrapper: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  suggestionsLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#64748B", // Slate 500
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16, // So first chip matches 20px edge after its 4px margin
    gap: 8,
  },
  chipButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC", // Slate 50
    borderWidth: 1,
    borderColor: "#E2E8F0", // Slate 200
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginHorizontal: 4,
    gap: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A", // Slate 900
  },
  chipButtonWarning: {
    backgroundColor: "#FFFBEB", // Amber 50
    borderColor: "#FDE68A", // Amber 200
  },
  chipTextWarning: {
    color: "#92400E", // Amber 900
  },
});
