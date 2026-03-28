import { useTypingEffect } from '../hooks/useTypingEffect'

const IBRA_SOURCE = `[speaker: "Elena"]
"Welcome to the village, traveler."
"What brings you to these lands?"

[choice]
  "Tell me about the quest" -> quest_info
  "I'm just passing through" -> farewell

[speaker: "Elena" #quest_info]
"There's a dragon in the northern cave..."
"We need someone brave enough to face it."
`

/** Tokenize .ibra syntax for color highlighting */
function highlightIbra(source: string) {
  return source.split('\n').map((line, i) => {
    const trimmed = line.trimStart()
    const indent = line.length - trimmed.length
    const pad = '\u00A0'.repeat(indent)

    // [speaker: ...] or [choice] blocks
    if (trimmed.startsWith('[')) {
      const bracketMatch = trimmed.match(/^(\[.*?\])(.*)$/)
      if (bracketMatch) {
        return (
          <div key={i} className="leading-6">
            {pad}
            <span className="text-teal-500 font-medium">{bracketMatch[1]}</span>
            {bracketMatch[2] && (
              <span className="text-ink-faint">{bracketMatch[2]}</span>
            )}
          </div>
        )
      }
    }

    // Quoted dialogue lines
    if (trimmed.startsWith('"')) {
      // Choice line with arrow
      const arrowMatch = trimmed.match(/^(".*?")\s*(->)\s*(\w+)$/)
      if (arrowMatch) {
        return (
          <div key={i} className="leading-6">
            {pad}
            <span className="text-gold-500">{arrowMatch[1]}</span>
            <span className="text-ink-faint"> {arrowMatch[2]} </span>
            <span className="text-teal-300">{arrowMatch[3]}</span>
          </div>
        )
      }
      return (
        <div key={i} className="leading-6">
          {pad}
          <span className="text-gold-500">{trimmed}</span>
        </div>
      )
    }

    // Empty or other lines
    return (
      <div key={i} className="leading-6">
        {pad}{trimmed}
      </div>
    )
  })
}

/** Mock Unity-style dialogue box that shows the "rendered" result */
function DialogueBox({ source }: { source: string }) {
  const lines = source.split('\n').filter((l) => l.trim().length > 0)

  // Find the current speaker
  let speaker = ''
  let dialogueLines: string[] = []
  let choices: string[] = []
  let inChoice = false

  for (const line of lines) {
    const trimmed = line.trim()
    const speakerMatch = trimmed.match(/^\[speaker:\s*"(.+?)"/)
    if (speakerMatch) {
      speaker = speakerMatch[1]
      inChoice = false
      continue
    }
    if (trimmed === '[choice]') {
      inChoice = true
      continue
    }
    if (inChoice && trimmed.startsWith('"')) {
      const choiceText = trimmed.match(/^"(.+?)"/)?.[1]
      if (choiceText) choices.push(choiceText)
      continue
    }
    if (trimmed.startsWith('"') && !inChoice) {
      const text = trimmed.match(/^"(.+?)"/)?.[1]
      if (text) dialogueLines.push(text)
    }
  }

  // Show the last dialogue line typed so far
  const currentLine = dialogueLines[dialogueLines.length - 1] || ''
  const showChoices = choices.length > 0 && source.includes('-> farewell')

  return (
    <div className="rounded-lg border border-surface-dim bg-white shadow-card overflow-hidden">
      {/* Title bar mimicking Unity editor */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted border-b border-surface-dim">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>
        <span className="text-[11px] font-mono text-ink-faint tracking-wide uppercase">
          Dialogue Preview
        </span>
      </div>

      {/* Dialogue content */}
      <div className="p-5 min-h-[160px] flex flex-col justify-between">
        <div>
          {speaker && (
            <p className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-2">
              {speaker}
            </p>
          )}
          {currentLine && (
            <p className="text-ink text-[15px] leading-relaxed">
              {currentLine}
            </p>
          )}
        </div>

        {showChoices && (
          <div className="mt-4 flex flex-col gap-1.5">
            {choices.map((choice, i) => (
              <button
                key={i}
                className="text-left text-sm px-3 py-1.5 rounded border border-surface-dim bg-surface-muted hover:border-teal-300 hover:bg-teal-50 text-ink-muted hover:text-teal-600 transition-all cursor-default"
              >
                {choice}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  const { displayed, isTyping } = useTypingEffect(IBRA_SOURCE, {
    speed: 40,
    pauseAtEnd: 5000,
  })

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      {/* Headline */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-4 tracking-tight">
          Dialogue for{' '}
          <span className="text-teal-500">Unity</span>
        </h1>
        <p className="text-lg text-ink-muted max-w-lg mx-auto mb-8">
          A simple, extendable dialogue system. Write conversations in{' '}
          <code className="text-sm">.ibra</code> files with rich syntax,
          branching logic, and localization.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://ibralogue.github.io/Ibralogue/manual/quickstart.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors shadow-card"
          >
            Get Started
          </a>
          <a
            href="https://github.com/Ibralogue/Ibralogue"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink text-sm font-medium rounded-lg border border-surface-dim hover:border-ink-faint transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Dual-panel showcase */}
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {/* Left: .ibra source code */}
        <div className="rounded-lg border border-surface-dim bg-surface-warm shadow-card overflow-hidden">
          {/* File tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted border-b border-surface-dim">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
            </div>
            <span className="text-[11px] font-mono text-ink-faint tracking-wide">
              village.ibra
            </span>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-[13px] text-ink-muted min-h-[240px]">
            {highlightIbra(displayed)}
            {isTyping && (
              <span className="inline-block w-[7px] h-[15px] bg-teal-500 ml-0.5 animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: rendered dialogue box */}
        <DialogueBox source={displayed} />
      </div>
    </section>
  )
}
