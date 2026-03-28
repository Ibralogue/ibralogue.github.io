import { useState, useEffect, useRef } from 'react'

interface UseTypingEffectOptions {
  /** Characters per keystroke tick (default 1) */
  charsPerTick?: number
  /** Ms between keystrokes (default 45) */
  speed?: number
  /** Ms to pause before restarting the loop (default 4000) */
  pauseAtEnd?: number
  /** Whether to loop (default true) */
  loop?: boolean
}

/**
 * Types out a string character-by-character, returning the visible
 * substring and a flag for whether the cursor should blink (paused).
 */
export function useTypingEffect(
  text: string,
  {
    charsPerTick = 1,
    speed = 45,
    pauseAtEnd = 4000,
    loop = true,
  }: UseTypingEffectOptions = {},
) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (paused) {
      timerRef.current = setTimeout(() => {
        setIndex(0)
        setPaused(false)
      }, pauseAtEnd)
      return () => clearTimeout(timerRef.current)
    }

    if (index >= text.length) {
      if (loop) {
        setPaused(true)
      }
      return
    }

    // Add a small random jitter so it feels human
    const jitter = Math.random() * 30
    // Pause slightly longer on newlines
    const delay = text[index] === '\n' ? speed * 4 : speed + jitter

    timerRef.current = setTimeout(() => {
      setIndex((i) => Math.min(i + charsPerTick, text.length))
    }, delay)

    return () => clearTimeout(timerRef.current)
  }, [index, paused, text, charsPerTick, speed, pauseAtEnd, loop])

  return {
    displayed: text.slice(0, index),
    isTyping: !paused && index < text.length,
    isDone: index >= text.length,
  }
}
