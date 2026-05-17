import { compileMDX } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/MDXComponents'

export async function serializeMDX(content: string) {
  const result = await compileMDX({
    source: content,
    components: MDXComponents,
    options: {
      parseFrontmatter: false,
    },
  })
  return result
}
