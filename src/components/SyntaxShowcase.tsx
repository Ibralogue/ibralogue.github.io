import { useState } from 'react'
import { highlightIbra } from '../lib/highlightIbra'
import { URLS } from '../constants'
import PanelHeader from './PanelHeader'

interface Tab {
  label: string
  filename: string
  description: string
  docsUrl: string
  source: string
}

const TABS: Tab[] = [
  {
    label: 'Speakers',
    filename: 'tavern.ibra',
    description: 'Define speakers with square brackets. Each tag starts a new dialogue line the player advances through.',
    docsUrl: URLS.manual.basicSyntax,
    source: `[Ava]
Hey there!
[Claire]
Oh, hey Ava.
[Ava]
How have you been?`,
  },
  {
    label: 'Choices',
    filename: 'quest.ibra',
    description: 'Branch dialogue with choices. Players pick an option and jump to the target conversation.',
    docsUrl: URLS.manual.choices,
    source: `{{ConversationName(Initial)}}
[NPC]
How are you doing today?
- I'm fine -> Fine
- Not great -> NotGreat

{{ConversationName(Fine)}}
[NPC]
Good to hear!

{{ConversationName(NotGreat)}}
[NPC]
I'm sorry to hear that.`,
  },
  {
    label: 'Invocations',
    filename: 'cutscene.ibra',
    description: 'Call game functions from dialogue. Control portraits, audio, timing, and custom C# methods.',
    docsUrl: URLS.manual.invocations,
    source: `[NPC]
{{Image(Portraits/Happy)}}
{{Audio(Voiceover/greeting)}}
Hello there!

[NPC]
And the winner is... {{Wait(2)}} you!

# silent line — runs logic only
[>>]
{{PlayCutscene(intro)}}`,
  },
  {
    label: 'Conditionals',
    filename: 'shop.ibra',
    description: 'Use variables and conditionals to change dialogue based on game state at runtime.',
    docsUrl: URLS.manual.conditionals,
    source: `{{Set($GOLD, 100)}}

{{If($GOLD >= 50)}}
[Merchant]
Welcome! I see you've got coin.
- Buy the sword -> BuySword
- Just looking -> >>
{{Else}}
[Merchant]
Come back when you have some gold.
{{EndIf}}`,
  },
]

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
          The <code>.ibra</code> format is designed to be readable, writable, and version-control friendly.
        </p>
      </div>

      <div className="rounded-lg border border-surface-dim bg-white shadow-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-surface-dim bg-surface-muted overflow-x-auto" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 ${
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
          <div className="border-b md:border-b-0 md:border-r border-surface-dim">
            <PanelHeader filename={tab.filename} />
            <div className="bg-surface-warm p-5 font-mono text-[13px] text-ink-muted min-h-[220px]">
              {highlightIbra(tab.source)}
            </div>
          </div>

          {/* Description panel */}
          <div className="p-5 flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-ink mb-2">{tab.label}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{tab.description}</p>
            <a
              href={tab.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-teal-500 hover:text-teal-600 focus-visible:outline-none focus-visible:underline transition-colors mt-4"
            >
              Read more
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
