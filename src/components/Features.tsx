const FEATURES = [
  {
    title: 'Rich Syntax',
    description:
      'Easy-to-grasp .ibra files with speakers, dialogue, choices, and inline comments.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h12M4 10h8M4 15h10" />
      </svg>
    ),
  },
  {
    title: 'Branching Logic',
    description:
      'Conditionals and expressions let you build complex, non-linear conversation trees.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v4m0 0l-4 4m4-4l4 4M6 15h0m8 0h0" />
        <circle cx="10" cy="3" r="1" fill="currentColor" />
        <circle cx="6" cy="15" r="1.5" />
        <circle cx="14" cy="15" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Runtime Variables',
    description:
      'Global and local scoping for variables that respond to game state at runtime.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4l-3 6h6l-3 6M13 4l-3 6h6l-3 6" />
      </svg>
    ),
  },
  {
    title: 'Localization',
    description:
      'String-table localization with pluggable providers. Ship your game in any language.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <ellipse cx="10" cy="10" rx="3" ry="7" />
        <path strokeLinecap="round" d="M3.5 7.5h13M3.5 12.5h13" />
      </svg>
    ),
  },
  {
    title: 'Inline Invocations',
    description:
      'Trigger game events at precise positions within dialogue using inline calls.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L7 17M5 7l-3 3 3 3M15 7l3 3-3 3" />
      </svg>
    ),
  },
  {
    title: 'Plugin Systems',
    description:
      'Pluggable audio, portrait, and engine systems you can swap or extend.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <rect x="3" y="3" width="5" height="5" rx="1" />
        <rect x="12" y="3" width="5" height="5" rx="1" />
        <rect x="3" y="12" width="5" height="5" rx="1" />
        <rect x="12" y="12" width="5" height="5" rx="1" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-ink tracking-tight mb-3">
          Features
        </h2>
        <p className="text-ink-muted max-w-md mx-auto">
          Everything you need to ship polished dialogue in your Unity game.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-lg border border-surface-dim bg-white p-5 hover:border-teal-200 hover:shadow-card transition-all"
          >
            <div className="w-9 h-9 rounded-md bg-teal-50 text-teal-500 flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
