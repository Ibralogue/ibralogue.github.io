import { useState } from 'react'
import { URLS, VERSION } from '../constants'
import { GitHubIcon } from './icons'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Syntax', href: '#syntax' },
  { label: 'Docs', href: URLS.docs, external: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-teal-500 shadow-card">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white tracking-tight">Ibralogue</span>
          <span className="text-xs font-mono text-white/60 bg-white/10 px-1.5 py-0.5 rounded">{VERSION}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 hover:text-white focus-visible:outline-none focus-visible:underline transition-colors"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
          <a
            href={URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </nav>

        <button
          className="md:hidden text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            {mobileOpen
              ? <path strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
              : <path strokeLinecap="round" d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-white/10 bg-teal-600 px-6 py-3 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
          <a
            href={URLS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        </nav>
      )}
    </header>
  )
}
