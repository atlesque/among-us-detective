import allColors from '~/utils/playerColors.js'
import { translations, type SupportedLocale } from '~/utils/translations'

export interface HighlightRule {
  highlight: RegExp | string
  className: string
}

/**
 * Builds dynamic highlight patterns for colors (in English and current locale)
 * plus custom player names, with clean regex word boundaries.
 */
export function buildTextHighlighterRules(
  currentLocale: SupportedLocale = 'en-US',
  customPlayerNames: { name: string; color: string }[] = [],
  highlightColorNames: boolean = true
): HighlightRule[] {
  if (!highlightColorNames) return []

  const rules: HighlightRule[] = []

  // Add custom player names first (so specific player names take precedence)
  for (const player of customPlayerNames) {
    if (player.name && player.name.trim().length >= 2) {
      const escaped = player.name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      rules.push({
        highlight: new RegExp(`(?:^|(?<=[\\s,.;:!?()[\\]{}"'/\\\\–—]))(${escaped})(?=$|[\\s,.;:!?()[\\]{}"'/\\\\–—])`, 'gi'),
        className: `hwt-mark-${player.color}`,
      })
    }
  }

  // Add color names in English, Portuguese and current locale
  for (const color of (allColors as string[])) {
    const namesToMatch = new Set<string>()
    namesToMatch.add(color.toLowerCase())

    // Include Portuguese name
    const ptName = translations['pt-BR']?.[`color.${color}`]
    if (ptName) {
      namesToMatch.add(ptName.toLowerCase())
    }

    // Localized name in current locale
    const localized = translations[currentLocale]?.[`color.${color}`]
    if (localized) {
      namesToMatch.add(localized.toLowerCase())
    }

    // Common synonyms and variations (PT and EN)
    if (color === 'red') {
      namesToMatch.add('vermelho')
    } else if (color === 'blue') {
      namesToMatch.add('azul')
    } else if (color === 'green') {
      namesToMatch.add('verde')
      namesToMatch.add('verde-escuro')
      namesToMatch.add('verde escuro')
    } else if (color === 'pink') {
      namesToMatch.add('rosa')
      namesToMatch.add('pink')
    } else if (color === 'orange') {
      namesToMatch.add('laranja')
    } else if (color === 'yellow') {
      namesToMatch.add('amarelo')
    } else if (color === 'black') {
      namesToMatch.add('preto')
    } else if (color === 'white') {
      namesToMatch.add('branco')
    } else if (color === 'purple') {
      namesToMatch.add('roxo')
    } else if (color === 'brown') {
      namesToMatch.add('marrom')
    } else if (color === 'cyan') {
      namesToMatch.add('ciano')
      namesToMatch.add('cian')
    } else if (color === 'lime') {
      namesToMatch.add('verde-claro')
      namesToMatch.add('verde claro')
      namesToMatch.add('lima')
      namesToMatch.add('limão')
    } else if (color === 'maroon') {
      namesToMatch.add('vinho')
      namesToMatch.add('granate')
      namesToMatch.add('bordeaux')
      namesToMatch.add('marrom-escuro')
    } else if (color === 'rose') {
      namesToMatch.add('rosé')
      namesToMatch.add('rosa claro')
      namesToMatch.add('rosa-claro')
    } else if (color === 'banana') {
      namesToMatch.add('banana')
      namesToMatch.add('amarelo claro')
      namesToMatch.add('amarelo-claro')
    } else if (color === 'gray') {
      namesToMatch.add('cinza')
      namesToMatch.add('grey')
    } else if (color === 'tan') {
      namesToMatch.add('cáqui')
      namesToMatch.add('caqui')
      namesToMatch.add('bege')
      namesToMatch.add('canela')
      namesToMatch.add('tan')
    } else if (color === 'coral') {
      namesToMatch.add('coral')
    }

    // Convert terms to regex pattern with punctuation-safe boundaries
    const terms = Array.from(namesToMatch)
      .sort((a, b) => b.length - a.length)
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const pattern = new RegExp(`(?:^|(?<=[\\s,.;:!?()[\\]{}"'/\\\\–—]))(${terms.join('|')})(?=$|[\\s,.;:!?()[\\]{}"'/\\\\–—])`, 'gi')

    rules.push({
      highlight: pattern,
      className: `hwt-mark-${color}`,
    })
  }

  return rules
}
