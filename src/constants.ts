export const VERSION = 'v1.0.0'

const DOCS_BASE = 'https://ibralogue.github.io/Ibralogue'

export const URLS = {
  github: 'https://github.com/Ibralogue/Ibralogue',
  docs: `${DOCS_BASE}/index.html`,
  quickstart: `${DOCS_BASE}/manual/quickstart.html`,
  release: 'https://github.com/Ibralogue/Ibralogue/releases/tag/v1.0.0',
  discord: 'https://discord.gg/xa3zvF6tP7',
  patreon: 'https://www.patreon.com/ibrahh',
  issues: 'https://github.com/Ibralogue/Ibralogue/issues/new/choose',
  gitUrl: 'https://github.com/Ibralogue/Ibralogue.git',
  gitUrlVersioned: 'https://github.com/Ibralogue/Ibralogue.git#v1.0.0',
  manual: {
    basicSyntax:  `${DOCS_BASE}/manual/basic-syntax.html`,
    choices:      `${DOCS_BASE}/manual/choices.html`,
    invocations:  `${DOCS_BASE}/manual/invocations.html`,
    conditionals: `${DOCS_BASE}/manual/conditionals.html`,
    comments:     `${DOCS_BASE}/manual/comments.html`,
    variables:    `${DOCS_BASE}/manual/global-variables.html`,
    conversations:`${DOCS_BASE}/manual/conversations.html`,
  },
} as const
