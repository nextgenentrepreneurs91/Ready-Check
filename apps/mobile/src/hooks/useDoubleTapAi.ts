
// apps/mobile/src/hooks/useDoubleTapAi.ts
```typescript
import { useCallback, useRef } from "react";

export interface UseDoubleTapAiOptions {
  /** Maximum time between taps in milliseconds. Default is 300ms. */
  delay?: number;
  /** Callback fired when a double tap is successfully detected. */
  onDoubleTap: () => void;
  /** Optional callback fired on a single tap. */
  onSingleTap?: () => void;
}

/**
 * A lightweight, dependency-free React Native hook to detect double-tap gestures.
 * Perfect for triggering the global ReadyCheck AI Assistant from any touchable surface.
 * 
 * @returns A handler function to be attached to the `onPress` prop of a Touchable component.
 */
export function useDoubleTapAi({
  delay = 300,
  onDoubleTap,
  onSingleTap,
}: UseDoubleTapAiOptions): () => void {
  const lastTapTimeRef = useRef<number | null>(null);
  const singleTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePress = useCallback(() => {
    const now = Date.now();

    if (lastTapTimeRef.current && now - lastTapTimeRef.current < delay) {
      // It's a double tap
      if (singleTapTimerRef.current) {
        clearTimeout(singleTapTimerRef.current);
        singleTapTimerRef.current = null;
      }
      
      onDoubleTap();
      lastTapTimeRef.current = null; // Reset
    } else {
      // It's the first tap
      lastTapTimeRef.current = now;
      
      if (onSingleTap) {
        singleTapTimerRef.current = setTimeout(() => {
          onSingleTap();
          lastTapTimeRef.current = null;
        }, delay);
      }
    }
  }, [delay, onDoubleTap, onSingleTap]);

  // Cleanup timeout on unmount
  useCallback(() => {
    return () => {
      if (singleTapTimerRef.current) {
        clearTimeout(singleTapTimerRef.current);
      }
    };
  }, []);

  return handlePress;
}
```
