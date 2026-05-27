import { defineConfig } from 'vitepress'
import { promises as fs } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─────────────────────────────────────────────────────────────────────────────
// Site identity. Update these when forking.
// ─────────────────────────────────────────────────────────────────────────────
const GITHUB_USER = 'ankur-paan'
const REPO_NAME = 'signalog-docs'
const SITE_DOMAIN = 'docs.signalog.co'
const LATEST_VERSION = '1.0'
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  title: 'Signalog Docs',
  titleTemplate: ':title | Signalog Docs',
  description:
    'Official documentation for Signalog — the one-script user feedback, bug reporting, and changelog widget. Install on any platform in 30 seconds.',
  lang: 'en-US',

  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-light.svg', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-dark.svg', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
    ['meta', { name: 'theme-color', content: '#0b57d0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: 'Signalog Documentation' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@signalogco' }],
  ],

  sitemap: {
    hostname: `https://${SITE_DOMAIN}`,
  },

  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'Signalog',
    },
    siteTitle: 'Signalog Docs',

    nav: [
      { text: 'Install', link: '/install/', activeMatch: '/install/' },
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'API', link: '/api/', activeMatch: '/api/' },
      {
        text: `v${LATEST_VERSION}`,
        items: [
          { text: `v${LATEST_VERSION} (latest)`, link: '/' },
        ],
      },
      { text: 'Dashboard ↗', link: 'https://app.signalog.co/dashboard/apps' },
    ],

    sidebar: {
      '/install/': [
        {
          text: 'Get Started',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/install/' },
            { text: 'The Script Tag', link: '/install/script-tag' },
            { text: 'Get Your Site ID', link: '/install/site-id' },
            { text: 'Verifying Installation', link: '/install/verify' },
          ],
        },
        {
          text: 'Static & CMS',
          collapsed: false,
          items: [
            { text: 'Plain HTML', link: '/install/cms/html' },
            { text: 'WordPress', link: '/install/cms/wordpress' },
            { text: 'Webflow', link: '/install/cms/webflow' },
            { text: 'Shopify', link: '/install/cms/shopify' },
            { text: 'Ghost', link: '/install/cms/ghost' },
            { text: 'Joomla', link: '/install/cms/joomla' },
          ],
        },
        {
          text: 'JavaScript Frameworks',
          collapsed: false,
          items: [
            { text: 'Next.js', link: '/install/frameworks/nextjs' },
            { text: 'React (SPA)', link: '/install/frameworks/react' },
            { text: 'Vue & Nuxt', link: '/install/frameworks/vue-nuxt' },
            { text: 'Svelte & SvelteKit', link: '/install/frameworks/svelte' },
            { text: 'Angular', link: '/install/frameworks/angular' },
            { text: 'Astro', link: '/install/frameworks/astro' },
            { text: 'Remix', link: '/install/frameworks/remix' },
          ],
        },
        {
          text: 'Backend Frameworks',
          collapsed: false,
          items: [
            { text: 'Laravel', link: '/install/backend/laravel' },
            { text: 'Django', link: '/install/backend/django' },
            { text: 'Flask', link: '/install/backend/flask' },
            { text: 'PHP (Plain)', link: '/install/backend/php' },
            { text: 'Strapi (Frontend)', link: '/install/backend/strapi' },
            { text: 'Express & Node.js', link: '/install/backend/express' },
            { text: 'Ruby on Rails', link: '/install/backend/rails' },
          ],
        },
        {
          text: 'Help',
          collapsed: false,
          items: [
            { text: 'Troubleshooting', link: '/install/troubleshooting' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Using Signalog',
          collapsed: false,
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Custom Trigger Buttons', link: '/guide/triggers' },
            { text: 'JavaScript API', link: '/guide/javascript-api' },
            { text: 'TypeScript Support', link: '/guide/typescript' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'SignalogPlugin', link: '/api/signalog-plugin' },
            { text: 'Data Attributes', link: '/api/data-attributes' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
          },
        },
      },
    },

    editLink: {
      pattern: `https://github.com/${GITHUB_USER}/${REPO_NAME}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: `https://github.com/${GITHUB_USER}/${REPO_NAME}` },
      { icon: 'x', link: 'https://twitter.com/signalogco' },
    ],

    footer: {
      message: 'Released under the MIT License. Docs by Signalog.',
      copyright: `© ${new Date().getFullYear()} Signalog — <a href="https://signalog.co">signalog.co</a>`,
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    returnToTopLabel: 'Back to top',
    darkModeSwitchLabel: 'Theme',
    sidebarMenuLabel: 'Menu',
    externalLinkIcon: true,

    pageActions: {
      siteUrl: `https://${SITE_DOMAIN}`,
      githubUser: GITHUB_USER,
      githubRepo: REPO_NAME,
      githubBranch: 'main',
    },
  },

  markdown: {
    lineNumbers: false,
    image: { lazyLoading: true },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  // Copy source .md files into the build so the page-action menu has real
  // URLs to point at (View as Markdown, Open in ChatGPT, Open in Claude).
  vite: {
    plugins: [
      {
        name: 'signalog-copy-source-md',
        apply: 'build',
        async closeBundle() {
          const srcDir = resolve(__dirname, '..')
          const outDir = resolve(__dirname, 'dist')

          async function walk(dir: string): Promise<string[]> {
            const entries = await fs.readdir(dir, { withFileTypes: true })
            const collected: string[] = []
            for (const entry of entries) {
              const full = resolve(dir, entry.name)
              if (entry.isDirectory()) {
                if (['node_modules', '.vitepress', 'public'].includes(entry.name)) continue
                collected.push(...(await walk(full)))
              } else if (entry.name.endsWith('.md')) {
                collected.push(full)
              }
            }
            return collected
          }

          const files = await walk(srcDir)
          for (const src of files) {
            const rel = relative(srcDir, src)
            const dest = resolve(outDir, rel)
            await fs.mkdir(dirname(dest), { recursive: true })
            await fs.copyFile(src, dest)
          }
          // eslint-disable-next-line no-console
          console.log(`[signalog-docs] copied ${files.length} source .md files into dist/`)
        },
      },
    ],
  },
})
