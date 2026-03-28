import { useState } from 'react'

const GIT_URL = 'https://github.com/Ibralogue/Ibralogue.git'
const VERSIONED_URL = 'https://github.com/Ibralogue/Ibralogue.git#v1.0.0'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 text-ink-faint hover:text-teal-500 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4 text-teal-500" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="6" y="6" width="10" height="10" rx="1.5" />
          <path d="M14 6V5a1.5 1.5 0 00-1.5-1.5H5A1.5 1.5 0 003.5 5v7.5A1.5 1.5 0 005 14h1" />
        </svg>
      )}
    </button>
  )
}

const STEPS = [
  {
    number: '1',
    text: (
      <>
        Open the Unity Package Manager via{' '}
        <span className="font-medium text-ink">Window &rarr; Package Manager</span>
      </>
    ),
  },
  {
    number: '2',
    text: (
      <>
        Click <span className="font-medium text-ink">"Add package from git URL..."</span>
      </>
    ),
  },
  {
    number: '3',
    text: 'Paste the URL below and click Add',
  },
]

export default function Installation() {
  return (
    <section id="installation" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">
          Installation
        </h2>
        <p className="text-ink-muted max-w-md mx-auto">
          Install via the Unity Package Manager in three steps.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Steps */}
        <ol className="space-y-4 mb-8">
          {STEPS.map((step) => (
            <li key={step.number} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 text-teal-500 text-xs font-semibold flex items-center justify-center mt-0.5">
                {step.number}
              </span>
              <p className="text-sm text-ink-muted leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        {/* URL blocks */}
        <div className="space-y-3">
          <div className="rounded-lg border border-surface-dim bg-surface-warm p-3 flex items-center gap-3">
            <code className="flex-1 text-sm font-mono text-ink bg-transparent p-0 truncate">
              {GIT_URL}
            </code>
            <CopyButton text={GIT_URL} />
          </div>

          <p className="text-xs text-ink-faint text-center">
            Or pin a specific version:
          </p>

          <div className="rounded-lg border border-surface-dim bg-surface-warm p-3 flex items-center gap-3">
            <code className="flex-1 text-sm font-mono text-ink bg-transparent p-0 truncate">
              {VERSIONED_URL}
            </code>
            <CopyButton text={VERSIONED_URL} />
          </div>
        </div>

        {/* Requirements badge */}
        <p className="text-xs text-ink-faint text-center mt-6">
          Requires{' '}
          <span className="font-medium text-ink-muted">Unity 2022.3+</span>
          {' '}&middot;{' '}
          <span className="font-medium text-ink-muted">MIT License</span>
        </p>
      </div>
    </section>
  )
}
