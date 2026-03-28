export default function PanelHeader({ filename }: { filename: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-muted border-b border-surface-dim">
      <svg className="w-3.5 h-3.5 text-ink-faint" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
        <rect x="2" y="1" width="12" height="14" rx="1.5" />
        <path d="M5 4.5h6M5 7h4" />
      </svg>
      <span className="text-2xs font-mono text-ink-faint tracking-wide">{filename}</span>
    </div>
  )
}
