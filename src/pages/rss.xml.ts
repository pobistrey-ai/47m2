import { SITE } from '@/consts'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getAllPosts } from '@/lib/data-utils'
import { getAllNews } from '@/lib/data-utils'

export async function GET(context: APIContext) {
  try {
    // Получаем статьи и новости
    const posts = await getAllPosts()
    const news = await getAllNews()

    // Объединяем и сортируем по дате (новые сначала)
    const allItems = [
      ...posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
        content: post.body, // Полный контент (если есть)
      })),
      ...news.map((item) => ({
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.date,
        link: `/news/${item.id}/`,
        content: item.body,
      })),
    ].sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )

    // Ограничиваем до последних 20 записей
    const recentItems = allItems.slice(0, 20)

    return rss({
      title: SITE.title,
      description: SITE.description,
      site: context.site ?? SITE.href,
      items: recentItems,
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}
