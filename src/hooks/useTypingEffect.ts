import { useState, useEffect, useRef } from 'react'

interface UseTypingEffectOptions {
  charsPerTick?: number
  speed?: number
  pauseAtEnd?: number
  loop?: boolean
}

export function useTypingEffect(
  text: string,
  {
    charsPerTick = 1,
    speed = 45,
    pauseAtEnd = 4000,
    loop = true,
  }: UseTypingEffectOptions = {},
) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [index, setIndex] = useState(prefersReduced ? text.length : 0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (prefersReduced) return

    if (paused) {
      timerRef.current = setTimeout(() => {
        setIndex(0)
        setPaused(false)
      }, pauseAtEnd)
      return () => clearTimeout(timerRef.current)
    }

    if (index >= text.length) {
      if (loop) setPaused(true)
      return
    }

    const jitter = Math.random() * 30
    const delay = text[index] === '\n' ? speed * 4 : speed + jitter

    timerRef.current = setTimeout(() => {
      setIndex((i) => Math.min(i + charsPerTick, text.length))
    }, delay)

    return () => clearTimeout(timerRef.current)
  }, [index, paused, text, charsPerTick, speed, pauseAtEnd, loop, prefersReduced])

  return {
    displayed: text.slice(0, index),
    isTyping: !prefersReduced && !paused && index < text.length,
    isDone: index >= text.length,
  }
}
