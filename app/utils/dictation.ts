/**
 * Spoken commands that insert a line break during voice dictation.
 * Only standalone words match, so "center", "entero" or "newlines" are left alone.
 * Letter/digit lookarounds are Unicode-aware, so accented neighbours ("énter") count as part of the word.
 */
const LINE_BREAK_COMMAND = /[^\S\n]*(?<![\p{L}\p{N}])(?:new[^\S\n]*line|enter)(?![\p{L}\p{N}])[^\S\n]*/giu

/**
 * Replaces spoken line-break commands in a dictation transcript with "\n".
 *
 * @param transcript Final transcript text from the speech recognizer.
 * @returns The transcript with each standalone "new line", "newline" or "enter" turned into a line break.
 */
export function applyDictationCommands(transcript: string): string {
  return transcript.replace(LINE_BREAK_COMMAND, '\n')
}
