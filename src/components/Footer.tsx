const LINKS = {
  project: [
    {
      label: 'Documentation',
      href: 'https://ibralogue.github.io/Ibralogue/index.html',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Ibralogue/Ibralogue',
    },
    {
      label: 'Release Notes',
      href: 'https://github.com/Ibralogue/Ibralogue/releases/tag/v1.0.0',
    },
  ],
  community: [
    {
      label: 'Discord',
      href: 'https://discord.gg/xa3zvF6tP7',
    },
    {
      label: 'Patreon',
      href: 'https://www.patreon.com/ibrahh',
    },
    {
      label: 'Report a Bug',
      href: 'https://github.com/Ibralogue/Ibralogue/issues/new/choose',
    },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-dim mt-12">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-ink mb-2">Ibralogue</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              A simple, extendable dialogue system library for the Unity Game Engine.
            </p>
          </div>

          {/* Project links */}
          <div>
            <p className="text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
              Project
            </p>
            <ul className="space-y-2">
              {LINKS.project.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <p className="text-xs font-semibold text-ink-faint uppercase tracking-wider mb-3">
              Community
            </p>
            <ul className="space-y-2">
              {LINKS.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-surface-dim flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-faint">
            MIT License &middot; Unity 2022.3+
          </p>
          <p className="text-xs text-ink-faint">
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
