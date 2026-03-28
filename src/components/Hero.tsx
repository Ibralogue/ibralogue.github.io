import { useRef, useEffect } from 'react'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { highlightIbra } from '../lib/highlightIbra'
import { URLS } from '../constants'
import { GitHubIcon } from './icons'
import PanelHeader from './PanelHeader'

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

interface DialogueEntry { type: 'line'; speaker: string; text: string }
interface ChoiceGroup { type: 'choices'; items: string[] }
type DialogueItem = DialogueEntry | ChoiceGroup

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
    if (ch) { pendingChoices.push(ch[1]); continue }

    if (pendingChoices.length > 0) {
      items.push({ type: 'choices', items: [...pendingChoices] })
      pendingChoices = []
    }
    items.push({ type: 'line', speaker, text: t })
  }

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
      <PanelHeader filename="Dialogue Preview" />
      <div ref={scrollRef} className="relative h-[280px] overflow-y-auto">
        <div className="sticky top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
        <div className="px-5 pb-5 space-y-3">
          {items.map((item, i) =>
            item.type === 'line' ? (
              <div key={i}>
                <p className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-0.5">{item.speaker}</p>
                <p className="text-ink text-[15px] leading-relaxed">{item.text}</p>
              </div>
            ) : (
              <div key={i} className="flex flex-col gap-1.5 pl-1">
                {item.items.map((c, j) => (
                  <div key={j} className="text-left text-sm px-3 py-1.5 rounded border border-surface-dim bg-surface-muted text-ink-muted">{c}</div>
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
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 tracking-tight">Ibralogue</h1>
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
            <GitHubIcon className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div className="rounded-lg border border-surface-dim bg-surface-warm shadow-card overflow-hidden">
          <PanelHeader filename="village.ibra" />
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
