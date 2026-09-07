import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

/**
 * Flatten Lexical rich text into a plain string, used for meta descriptions
 * and structured data where no markup is allowed.
 */
export function richTextToPlainText(
  value: SerializedEditorState | null | undefined,
  maxLength = 200,
): string {
  if (!value) return ''
  const parts: string[] = []

  const walk = (node: LexicalNode) => {
    if (typeof node.text === 'string') parts.push(node.text)
    node.children?.forEach(walk)
    if (node.type === 'paragraph' || node.type === 'heading') parts.push(' ')
  }

  ;(value.root?.children as LexicalNode[] | undefined)?.forEach(walk)

  const text = parts.join('').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}\u2026`
}
