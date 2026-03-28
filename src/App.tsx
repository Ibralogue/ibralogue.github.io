function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal shell to verify palette + typography */}
      <header className="border-b border-surface-dim">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-ink tracking-tight">
            Ibralogue
          </span>
          <nav className="flex gap-6 text-sm text-ink-muted">
            <a href="#features" className="hover:text-teal-500 transition-colors">Features</a>
            <a href="#syntax" className="hover:text-teal-500 transition-colors">Syntax</a>
            <a href="https://ibralogue.github.io/Ibralogue/index.html" className="hover:text-teal-500 transition-colors" target="_blank" rel="noopener noreferrer">Docs</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold text-ink mb-4">
          Dialogue for <span className="text-teal-500">Unity</span>
        </h1>
        <p className="text-lg text-ink-muted max-w-xl mb-8">
          A simple, extendable dialogue system. Write conversations in
          <code>.ibra</code> files with rich syntax, branching logic, and localization.
        </p>

        {/* Palette swatches for verification */}
        <div className="flex gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-teal-500 shadow-card" title="teal-500" />
          <div className="w-12 h-12 rounded-lg bg-teal-300" title="teal-300" />
          <div className="w-12 h-12 rounded-lg bg-gold-400 shadow-card" title="gold-400" />
          <div className="w-12 h-12 rounded-lg bg-surface-warm border border-surface-dim" title="surface-warm" />
          <div className="w-12 h-12 rounded-lg bg-surface-muted border border-surface-dim" title="surface-muted" />
        </div>

        {/* Code block verification */}
        <pre>
          <code>{`[speaker: "Elena"]\n"Welcome to the village, traveler."\n\n[choice]\n  "Tell me about the quest" -> quest_info\n  "I'm just passing through" -> farewell`}</code>
        </pre>
      </main>
    </div>
  )
}

export default App
