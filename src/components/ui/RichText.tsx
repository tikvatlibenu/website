import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Renders Payload rich text with the memorial prose styling. Typography
 * spacing uses logical properties so Hebrew lists and quotes sit correctly.
 */
export function RichText({
  data,
  className = '',
}: {
  data: SerializedEditorState | null | undefined
  className?: string
}) {
  if (!data) return null

  return (
    <LexicalRichText
      data={data}
      className={`prose prose-memorial max-w-none prose-headings:font-medium prose-a:underline prose-a:underline-offset-4 prose-img:rounded-lg ${className}`}
    />
  )
}
