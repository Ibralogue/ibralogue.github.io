import { useState } from 'react'
import { URLS } from '../constants'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // Fallback: select text for manual copy
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 text-ink-faint hover:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4 text-teal-500" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <rect x="6" y="6" width="10" height="10" rx="1.5" />
          <path d="M14 6V5a1.5 1.5 0 00-1.5-1.5H5A1.5 1.5 0 003.5 5v7.5A1.5 1.5 0 005 14h1" />
        </svg>
      )}
    </button>
  )
}

const STEPS = [
  <>Open the Unity Package Manager via <span className="font-medium text-ink">Window &rarr; Package Manager</span></>,
  <>Click <span className="font-medium text-ink">"Add package from git URL..."</span></>,
  'Paste the URL below and click Add',
]

export default function Installation() {
  return (
    <section id="installation" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">Installation</h2>
        <p className="text-ink-muted max-w-md mx-auto">Install via the Unity Package Manager in three steps.</p>
      </div>

      <div className="max-w-xl mx-auto">
        <ol className="space-y-4 mb-8">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 text-teal-500 text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-ink-muted leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>

        <div className="space-y-3">
          <div className="rounded-lg border border-surface-dim bg-surface-warm p-3 flex items-center gap-3">
            <code className="flex-1 text-sm font-mono text-ink truncate">{URLS.gitUrl}</code>
            <CopyButton text={URLS.gitUrl} />
          </div>
          <p className="text-xs text-ink-faint text-center">Or pin a specific version:</p>
          <div className="rounded-lg border border-surface-dim bg-surface-warm p-3 flex items-center gap-3">
            <code className="flex-1 text-sm font-mono text-ink truncate">{URLS.gitUrlVersioned}</code>
            <CopyButton text={URLS.gitUrlVersioned} />
          </div>
        </div>

        <p className="text-xs text-ink-faint text-center mt-6">
          Requires <span className="font-medium text-ink-muted">Unity 2022.3+</span>
          {' '}&middot;{' '}
          <span className="font-medium text-ink-muted">MIT License</span>
        </p>
      </div>
    </section>
  )
}
