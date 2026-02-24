const { execSync } = require('node:child_process')

try {
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
  execSync('git config core.hooksPath .githooks', { stdio: 'inherit' })
  console.log('Git hooks path set to .githooks')
} catch {
  console.warn('Skipped hook setup (not a git repo or git unavailable).')
}