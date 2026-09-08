import { getCollection, type CollectionEntry } from 'astro:content'

// ============================================================
// Функции для статей (blog)
// ============================================================

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export function groupPostsByYear(
  posts: CollectionEntry<'blog'>[],
): Record<string, CollectionEntry<'blog'>[]> {
  return posts.reduce(
    (acc, post) => {
      const year = post.data.date.getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    },
    {} as Record<string, CollectionEntry<'blog'>[]>,
  )
}

// ============================================================
// Функции для новостей (news)
// ============================================================

export async function getAllNews(): Promise<CollectionEntry<'news'>[]> {
  const news = await getCollection('news')
  return news.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export function groupNewsByYear(
  news: CollectionEntry<'news'>[],
): Record<string, CollectionEntry<'news'>[]> {
  return news.reduce(
    (acc, item) => {
      const year = item.data.date.getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(item)
      return acc
    },
    {} as Record<string, CollectionEntry<'news'>[]>,
  )
}
// ============================================================
// Типы и функции для оглавления (TOC) и подпостов
// ============================================================

export interface TOCHeading {
  slug: string
  text: string
  depth: number
}

export interface TOCSection {
  type: 'parent' | 'subpost'
  title: string
  subpostId: string
  headings: TOCHeading[]
}

// Проверяет, является ли пост подпостом (ID содержит дефис)
export function isSubpost(postId: string): boolean {
  return postId.includes('-')
}

// Получает ID родительского поста из ID подпоста
// Например: "my-post-part-1" -> "my-post"
export function getParentId(postId: string): string {
  const parts = postId.split('-')
  // Берем первую часть до первого дефиса
  return parts[0] || postId
}
