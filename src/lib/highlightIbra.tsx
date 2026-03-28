/**
 * Lightweight .ibra syntax highlighter.
 * Scope colours mirror the tmLanguage grammar.
 */

const CLS = {
  punct:   'text-stone-400',
  keyword: 'text-violet-600',
  section: 'text-teal-600',
  speaker: 'text-teal-500',
  variable:'text-rose-600',
  text:    'text-ink',
  comment: 'text-stone-400 italic',
  operator:'text-violet-400',
} as const

function inlineVars(raw: string, base: string) {
  const parts = raw.split(/(\$[a-zA-Z_]\w*)/)
  if (parts.length === 1) return <span className={base}>{raw}</span>
  return <>{parts.map((p, i) =>
    p.startsWith('$')
      ? <span key={i} className={CLS.variable}>{p}</span>
      : <span key={i} className={base}>{p}</span>
  )}</>
}

function tokeniseLine(line: string) {
  const trimmed = line.trimStart()
  const pad = '\u00A0'.repeat(line.length - trimmed.length)

  if (!trimmed) return null

  // # comment
  if (/^#(?!#)/.test(trimmed))
    return <>{pad}<span className={CLS.comment}>{trimmed}</span></>

  // {{Keyword(args)}} commands
  const cmd = trimmed.match(/^(\{\{)(\w+)(?:(\()(.+?)(\)))?(\}\})$/)
  if (cmd) {
    const isConv = cmd[2] === 'ConversationName'
    return <>{pad}
      <span className={CLS.punct}>{cmd[1]}</span>
      <span className={CLS.keyword}>{cmd[2]}</span>
      {cmd[3] && <><span className={CLS.punct}>{cmd[3]}</span>
        {inlineVars(cmd[4], isConv ? CLS.section : CLS.text)}
        <span className={CLS.punct}>{cmd[5]}</span></>}
      <span className={CLS.punct}>{cmd[6]}</span>
    </>
  }

  // [Speaker]
  const spk = trimmed.match(/^\[([^\]]*)\]$/)
  if (spk)
    return <>{pad}<span className={CLS.punct}>[</span>{inlineVars(spk[1], CLS.speaker)}<span className={CLS.punct}>]</span></>

  // - Choice text -> Target
  const ch = trimmed.match(/^(-)\s+(.*?)\s*(->)\s*(\S+)(.*)$/)
  if (ch)
    return <>{pad}
      <span className={CLS.punct}>{ch[1]} </span>
      {inlineVars(ch[2], CLS.text)}
      <span className={CLS.operator}> {ch[3]} </span>
      <span className={CLS.section}>{ch[4]}</span>
      {ch[5] && <span className={CLS.comment}>{ch[5]}</span>}
    </>

  // Dialogue text (with possible $vars)
  return <>{pad}{inlineVars(trimmed, CLS.text)}</>
}

export function highlightIbra(source: string) {
  return source.split('\n').map((line, i) => (
    <div key={i} className={line.trim() ? 'leading-6' : 'h-5'}>
      {tokeniseLine(line)}
    </div>
  ))
}
