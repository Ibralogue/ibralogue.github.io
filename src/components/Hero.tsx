import { useRef, useEffect } from 'react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { highlightIbra } from '../lib/highlightIbra'
import { URLS } from '../constants'

const IBRA_SOURCE = `{{ConversationName(Arrival)}}
[Elena]
Welcome to the village, traveler.
[Elena]
What brings you to these lands?
- Tell me about the quest -> QuestInfo
- I'm just passing through -> Farewell

{{ConversationName(QuestInfo)}}
[Elena]
There's a dragon in the northern cave.
[Elena]
We need someone brave enough to face it.
- I'll do it -> >>
{{Set($QUEST_STARTED, true)}}
[Elena]
Thank you. Be careful out there.
`

interface DialogueEntry {
  type: 'line'
  speaker: string
  text: string
}

interface ChoiceGroup {
  type: 'choices'
  items: string[]
}

type DialogueItem = DialogueEntry | ChoiceGroup

/** Parse typed source into a chat-log of speaker lines and choice groups */
function parseDialogue(source: string): DialogueItem[] {
  const raw = source.split('\n')
  const items: DialogueItem[] = []
  let speaker = ''
  let pendingChoices: string[] = []

  for (const line of raw) {
    const t = line.trim()
    if (!t || t.startsWith('{{')) continue

    const spk = t.match(/^\[(.+)\]$/)
    if (spk) { speaker = spk[1]; continue }

    const ch = t.match(/^-\s+(.+?)\s*->/)
    if (ch) {
      pendingChoices.push(ch[1])
      continue
    }

    // Flush any pending choices before a new dialogue line
    if (pendingChoices.length > 0) {
      items.push({ type: 'choices', items: [...pendingChoices] })
      pendingChoices = []
    }

    items.push({ type: 'line', speaker, text: t })
  }

  // Flush trailing choices
  if (pendingChoices.length > 0) {
    items.push({ type: 'choices', items: pendingChoices })
  }

  return items
}

function DialogueBox({ source }: { source: string }) {
  const items = parseDialogue(source)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items.length])

  return (
    <div className="rounded-lg border border-surface-dim bg-white shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted border-b border-surface-dim">
        <div className="flex gap-1" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>
        <span className="text-[11px] font-mono text-ink-faint tracking-wide uppercase">
          Dialogue Preview
        </span>
      </div>
      <div
        ref={scrollRef}
        className="relative h-[280px] overflow-y-auto"
      >
        <div className="sticky top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

        <div className="px-5 pb-5 space-y-3">
          {items.map((item, i) =>
            item.type === 'line' ? (
              <div key={i}>
                <p className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-0.5">
                  {item.speaker}
                </p>
                <p className="text-ink text-[15px] leading-relaxed">{item.text}</p>
              </div>
            ) : (
              <div key={i} className="flex flex-col gap-1.5 pl-1">
                {item.items.map((c, j) => (
                  <div
                    key={j}
                    className="text-left text-sm px-3 py-1.5 rounded border border-surface-dim bg-surface-muted text-ink-muted"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const codeScrollRef = useRef<HTMLDivElement>(null)
  const { displayed, isTyping } = useTypingEffect(IBRA_SOURCE, {
    speed: 40,
    pauseAtEnd: 5000,
  })

  useEffect(() => {
    const el = codeScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [displayed])

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 tracking-tight">
          Ibralogue
        </h1>
        <p className="text-lg text-ink-muted max-w-lg mx-auto mb-8">
          A simple, extendable dialogue system for Unity.
          Write conversations in <code>.ibra</code> files
          with branching logic, variables, and localization.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href={URLS.quickstart}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-colors shadow-card"
          >
            Get Started
          </a>
          <a
            href={URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink text-sm font-medium rounded-lg border border-surface-dim hover:border-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div className="rounded-lg border border-surface-dim bg-surface-warm shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted border-b border-surface-dim">
            <div className="flex gap-1" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
            </div>
            <span className="text-[11px] font-mono text-ink-faint tracking-wide">village.ibra</span>
          </div>
          <div className="relative h-[280px] overflow-y-auto" ref={codeScrollRef}>
            <div className="sticky top-0 left-0 right-0 h-4 bg-gradient-to-b from-surface-warm to-transparent pointer-events-none z-10" />
            <div className="px-4 pb-4 font-mono text-[13px] text-ink-muted">
              {highlightIbra(displayed)}
              {isTyping && (
                <span className="inline-block w-[7px] h-[15px] bg-teal-500 ml-0.5 animate-pulse motion-reduce:hidden" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        <DialogueBox source={displayed} />
      </div>
    </section>
  )
}
