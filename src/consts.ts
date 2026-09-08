import type { Site, SocialLink } from '@/types'

export const SITE: Site = {
  title: '47m2',
  description: 'Жизнь в 47 квадратных метрах',
  href: 'https://47m2.ru',
  author: '47m2',
  locale: 'ru-RU',
  featuredPostCount: 5,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  { href: '/news', label: 'Новости' },
  { href: '/blog', label: 'Статьи' },
  { href: '/about', label: 'О себе' },
]

// Соцсети — пока оставим пустыми. Когда понадобятся — добавишь.
export const SOCIAL_LINKS: SocialLink[] = []

// Иконки пока не нужны, но тип оставим на будущее
export const ICON_MAP = {}
