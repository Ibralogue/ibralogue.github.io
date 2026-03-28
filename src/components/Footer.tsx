import { URLS } from '../constants'

const LINKS = {
  project: [
    { label: 'Documentation', href: URLS.docs },
    { label: 'GitHub', href: URLS.github },
    { label: 'Release Notes', href: URLS.release },
  ],
  community: [
    { label: 'Discord', href: URLS.discord },
    { label: 'Patreon', href: URLS.patreon },
    { label: 'Report a Bug', href: URLS.issues },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-dim">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-semibold text-ink mb-2">Ibralogue</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              A simple, extendable dialogue system library for the Unity Game Engine.
            </p>
          </div>
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
                {group}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted hover:text-teal-500 focus-visible:outline-none focus-visible:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-surface-dim">
          <p className="text-xs text-ink-faint">MIT License &middot; Unity 2022.3+</p>
        </div>
      </div>
    </footer>
  )
}
