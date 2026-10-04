const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')

function loadTypeScript(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const exports = {}
  vm.runInNewContext(output, { exports, require }, { filename: relativePath })
  return exports
}

function structure(value) {
  if (Array.isArray(value)) return ['array', ...value.map(structure)]
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, structure(value[key])]),
    )
  }
  return typeof value
}

const locales = loadTypeScript('app/utils/translations.ts').SUPPORTED_LOCALES.map(({ code }) => code)
const dictionaries = [
  ['app/utils/translations.ts', 'translations'],
  ['app/utils/taskTranslations.ts', 'taskTranslations'],
  ['app/utils/taskTranslations.ts', 'locationTranslations'],
  ['app/utils/uiTranslations.ts', 'uiTranslations'],
  ['app/utils/privacyTranslations.ts', 'privacyTranslations'],
  ['app/utils/changelogTranslations.ts', 'changelogTranslations'],
]

let failures = 0
for (const [file, exportName] of dictionaries) {
  const dictionary = loadTypeScript(file)[exportName]
  const expected = JSON.stringify(structure(dictionary[locales[0]]))
  for (const locale of locales) {
    if (!dictionary[locale]) {
      console.error(`${file}: missing locale ${locale}`)
      failures += 1
      continue
    }
    if (JSON.stringify(structure(dictionary[locale])) !== expected) {
      console.error(`${file}: ${locale} has different key or content structure from ${locales[0]}`)
      failures += 1
    }
  }
}

if (failures > 0) process.exitCode = 1
else console.log(`Locale key parity passed for ${locales.length} locales across ${dictionaries.length} dictionaries.`)
