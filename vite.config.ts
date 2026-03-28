import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const FALLBACK_VERSION = 'v1.0.0'

async function fetchLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/Ibralogue/Ibralogue/releases/latest',
      { headers: { Accept: 'application/vnd.github.v3+json' } },
    )
    if (!res.ok) return FALLBACK_VERSION
    const data = await res.json()
    return data.tag_name ?? FALLBACK_VERSION
  } catch {
    return FALLBACK_VERSION
  }
}

export default defineConfig(async () => {
  const version = await fetchLatestVersion()
  return {
    plugins: [react()],
    define: {
      __IBRALOGUE_VERSION__: JSON.stringify(version),
    },
  }
})
