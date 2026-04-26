// apps/mobile/src/screens/ChatAssistScreen.tsx
```tsx
import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, Sparkles, Navigation } from "lucide-react-native";

export interface ChatAssistScreenProps {
  route: {
    params?: {
      contextFocus?: "brief" | "assessment" | "general";
      deploymentId?: string;
    };
  };
  navigation: any; // Strict: NativeStackNavigationProp
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

// Mock AI guidance flow mirroring the "ReadyCheck Reality Correction" persona
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    sender: "ai",
    text: "Current reports indicate local roads in your sector are flooded and unsafe. The recommended route is via the highway.",
  },
  {
    id: "msg_2",
    sender: "user",
    text: "I will send everyone through local roads anyway, it is faster.",
  },
  {
    id: "msg_3",
    sender: "ai",
    text: "Understood, but this significantly increases the risk of delay and volunteer safety issues. Data shows clear routes reduce mission failure by 40%.\n\nWould you like me to optimize the route for safety and update the volunteers' Action Cards?",
  },
];

const SUGGESTIONS = [
  "Optimize route for safety",
  "Proceed with local roads",
  "Show detailed risk analysis"
];

export function ChatAssistScreen({ route, navigation }: ChatAssistScreenProps): React.JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom when messages update
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Mock AI response delay
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "I have updated the deployment plan based on your input. It is highly recommended to trigger a new Readiness Verification for all assigned Drivers to ensure they understand the revised routing.",
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View style={styles.aiIconBadge}>
            <Sparkles size={16} color="#4F46E5" />
          </View>
          <Text style={styles.headerTitle}>ReadyCheck AI Configurator</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Adjusting plans adjusts Readiness requirements.
        </Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        
        {/* Chat Log */}
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <View 
                key={msg.id} 
                style={[
                  styles.messageBubbleWrapper, 
                  isUser ? styles.messageUserWrapper : styles.messageAiWrapper
                ]}
              >
                {!isUser && (
                  <View style={styles.aiAvatar}>
                    <Sparkles size={12} color="#FFFFFF" />
                  </View>
                )}
                
                <View style={[
                  styles.messageBubble,
                  isUser ? styles.messageUser : styles.messageAi
                ]}>
                  <Text style={[
                    styles.messageText,
                    isUser ? styles.messageTextUser : styles.messageTextAi
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          
          {/* Quick Suggestions */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsContainer}
          >
            {SUGGESTIONS.map((sug, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.suggestionChip}
                activeOpacity={0.7}
                onPress={() => handleSend(sug)}
              >
                <Text style={styles.suggestionText}>{sug}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Text Input Row */}
          <View style={styles.inputRow}>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask about planning, risks, or role assignment..."
                placeholderTextColor="#94A3B8"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={400}
              />
            </View>
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled
              ]}
              disabled={!inputText.trim()}
              onPress={() => handleSend(inputText.trim())}
            >
              <Send size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slate 50
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  aiIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#EEF2FF", // Indigo 50
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    paddingLeft: 36, // align with text, bypassing icon
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
    paddingBottom: 32,
  },
  messageBubbleWrapper: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  messageUserWrapper: {
    justifyContent: "flex-end",
  },
  messageAiWrapper: {
    justifyContent: "flex-start",
    gap: 8,
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4F46E5", // Indigo 600
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageAi: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderBottomLeftRadius: 4,
  },
  messageUser: {
    backgroundColor: "#0F172A", // Slate 900
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextAi: {
    color: "#334155", // Slate 700
  },
  messageTextUser: {
    color: "#F8FAFC", // Slate 50
  },
  inputArea: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E2E8F0",
    paddingBottom: 16,
  },
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: "#F1F5F9", // Slate 100
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 4,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569", // Slate 600
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    gap: 12,
  },
  textInputWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12, // Needs explicit top padding for multiline to not look top-heavy
    paddingBottom: 12,
    minHeight: 48,
    maxHeight: 120,
  },
  textInput: {
    fontSize: 15,
    color: "#0F172A",
    lineHeight: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonActive: {
    backgroundColor: "#4F46E5", // Indigo 600
  },
  sendButtonDisabled: {
    backgroundColor: "#CBD5E1", // Slate 300
  },
});
```
