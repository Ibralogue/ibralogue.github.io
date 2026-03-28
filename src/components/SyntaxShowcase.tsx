import { useState } from 'react'

interface SyntaxTab {
  label: string
  filename: string
  description: string
  lines: SyntaxLine[]
}

type SyntaxLine =
  | { type: 'blank' }
  | { type: 'speaker'; text: string }
  | { type: 'dialogue'; text: string }
  | { type: 'choice'; text: string; target: string }
  | { type: 'keyword'; text: string }
  | { type: 'comment'; text: string }
  | { type: 'invocation'; text: string }
  | { type: 'inline'; prefix: string; invocation: string; suffix?: string }

const TABS: SyntaxTab[] = [
  {
    label: 'Speakers',
    filename: 'tavern.ibra',
    description: 'Define speakers with square brackets. Each tag starts a new dialogue line the player advances through.',
    lines: [
      { type: 'speaker', text: '[Ava]' },
      { type: 'dialogue', text: 'Hey there!' },
      { type: 'speaker', text: '[Claire]' },
      { type: 'dialogue', text: 'Oh, hey Ava.' },
      { type: 'speaker', text: '[Ava]' },
      { type: 'dialogue', text: 'How have you been?' },
    ],
  },
  {
    label: 'Choices',
    filename: 'quest.ibra',
    description: 'Branch dialogue with choices. Players pick an option and jump to the target conversation.',
    lines: [
      { type: 'keyword', text: '{{ConversationName(Initial)}}' },
      { type: 'speaker', text: '[NPC]' },
      { type: 'dialogue', text: 'How are you doing today?' },
      { type: 'choice', text: 'I\'m fine', target: 'Fine' },
      { type: 'choice', text: 'Not great', target: 'NotGreat' },
      { type: 'blank' },
      { type: 'keyword', text: '{{ConversationName(Fine)}}' },
      { type: 'speaker', text: '[NPC]' },
      { type: 'dialogue', text: 'Good to hear!' },
      { type: 'blank' },
      { type: 'keyword', text: '{{ConversationName(NotGreat)}}' },
      { type: 'speaker', text: '[NPC]' },
      { type: 'dialogue', text: "I'm sorry to hear that." },
    ],
  },
  {
    label: 'Invocations',
    filename: 'cutscene.ibra',
    description: 'Call game functions inline or on their own line. Control portraits, audio, timing, and custom C# methods.',
    lines: [
      { type: 'speaker', text: '[NPC]' },
      { type: 'invocation', text: '{{Image(Portraits/Happy)}}' },
      { type: 'invocation', text: '{{Audio(Voiceover/greeting)}}' },
      { type: 'dialogue', text: 'Hello there!' },
      { type: 'blank' },
      { type: 'speaker', text: '[NPC]' },
      { type: 'inline', prefix: 'And the winner is... ', invocation: '{{Wait(2)}}', suffix: ' you!' },
      { type: 'blank' },
      { type: 'comment', text: '// silent line — runs logic without showing dialogue' },
      { type: 'speaker', text: '[>>]' },
      { type: 'invocation', text: '{{PlayCutscene(intro)}}' },
    ],
  },
  {
    label: 'Conditionals',
    filename: 'shop.ibra',
    description: 'Use variables and conditionals to change dialogue based on game state.',
    lines: [
      { type: 'keyword', text: '{{Set($visited, true)}}' },
      { type: 'keyword', text: '{{Global($gold, 100)}}' },
      { type: 'blank' },
      { type: 'keyword', text: '{{If($gold >= 50)}}' },
      { type: 'speaker', text: '[Merchant]' },
      { type: 'dialogue', text: "Welcome back! I see you've got coin." },
      { type: 'choice', text: 'Buy the sword', target: 'BuySword' },
      { type: 'choice', text: 'Just looking', target: '>>' },
      { type: 'keyword', text: '{{Else}}' },
      { type: 'speaker', text: '[Merchant]' },
      { type: 'dialogue', text: "Come back when you have some gold." },
      { type: 'keyword', text: '{{EndIf}}' },
    ],
  },
]

function renderLine(line: SyntaxLine, i: number) {
  switch (line.type) {
    case 'blank':
      return <div key={i} className="h-5" />
    case 'speaker':
      return (
        <div key={i} className="leading-6">
          <span className="text-teal-500 font-medium">{line.text}</span>
        </div>
      )
    case 'dialogue':
      return (
        <div key={i} className="leading-6">
          <span className="text-gold-500">{line.text}</span>
        </div>
      )
    case 'choice':
      return (
        <div key={i} className="leading-6">
          <span className="text-ink-faint">- </span>
          <span className="text-gold-500">{line.text}</span>
          <span className="text-ink-faint"> -&gt; </span>
          <span className="text-teal-300">{line.target}</span>
        </div>
      )
    case 'keyword':
      return (
        <div key={i} className="leading-6">
          <span className="text-violet-400">{line.text}</span>
        </div>
      )
    case 'invocation':
      return (
        <div key={i} className="leading-6">
          <span className="text-violet-400">{line.text}</span>
        </div>
      )
    case 'inline':
      return (
        <div key={i} className="leading-6">
          <span className="text-gold-500">{line.prefix}</span>
          <span className="text-violet-400">{line.invocation}</span>
          {line.suffix && <span className="text-gold-500">{line.suffix}</span>}
        </div>
      )
    case 'comment':
      return (
        <div key={i} className="leading-6">
          <span className="text-ink-faint italic">{line.text}</span>
        </div>
      )
  }
}

export default function SyntaxShowcase() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <section id="syntax" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">
          Syntax
        </h2>
        <p className="text-ink-muted max-w-md mx-auto">
          The <code className="text-sm">.ibra</code> format is designed to be readable, writable, and version-control friendly.
        </p>
      </div>

      <div className="rounded-lg border border-surface-dim bg-white shadow-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-surface-dim bg-surface-muted overflow-x-auto">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                i === active
                  ? 'text-teal-600 border-b-2 border-teal-500 bg-white -mb-px'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr,280px]">
          {/* Code panel */}
          <div className="bg-surface-warm p-5 font-mono text-[13px] text-ink-muted min-h-[260px] border-r border-surface-dim">
            <div className="flex items-center gap-1.5 mb-3 text-[11px] text-ink-faint tracking-wide">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <rect x="2" y="1" width="12" height="14" rx="1.5" />
                <path d="M5 4.5h6M5 7h4" />
              </svg>
              {tab.filename}
            </div>
            {tab.lines.map((line, i) => renderLine(line, i))}
          </div>

          {/* Description panel */}
          <div className="p-5 flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-ink mb-2">{tab.label}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              {tab.description}
            </p>
            <a
              href="https://ibralogue.github.io/Ibralogue/manual/basic-syntax.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-teal-500 hover:text-teal-600 transition-colors mt-4"
            >
              Read the docs
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
