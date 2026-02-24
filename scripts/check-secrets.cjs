const { execSync } = require('node:child_process')
const { readFileSync } = require('node:fs')

const patterns = [
  {
    name: 'Google API key pattern',
    regex: /AIza[0-9A-Za-z\-_]{35}/g,
  },
  {
    name: 'OpenAI API key pattern',
    regex: /sk-[A-Za-z0-9]{20,}/g,
  },
  {
    name: 'Non-placeholder VITE key assignment',
    regex: /VITE_[A-Z0-9_]*KEY\s*=\s*(?!REPLACE_WITH_YOUR_)[^\s#]+/g,
  },
]

function getTrackedFiles() {
  const raw = execSync('git ls-files -z', { encoding: 'utf8' })
  return raw.split('\u0000').filter(Boolean)
}

function isProbablyText(content) {
  return !content.includes('\u0000')
}

const findings = []

for (const file of getTrackedFiles()) {
  let content
  try {
    content = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  if (!isProbablyText(content)) continue

  for (const { name, regex } of patterns) {
    const matches = content.match(regex)
    if (matches && matches.length > 0) {
      findings.push({ file, name })
      break
    }
  }
}

if (findings.length > 0) {
  console.error('\nPush blocked: possible secrets detected in tracked files.\n')
  for (const item of findings) {
    console.error(`- ${item.file}: ${item.name}`)
  }
  console.error('\nFix the files, then try pushing again.')
  process.exit(1)
}

console.log('Secret scan passed.')