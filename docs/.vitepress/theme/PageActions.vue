<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'

interface PageActionsCfg {
  siteUrl?: string
  githubUser?: string
  githubRepo?: string
  githubBranch?: string
}

const { page, frontmatter, site } = useData()

const cfg = computed<PageActionsCfg>(
  () => (site.value.themeConfig as { pageActions?: PageActionsCfg }).pageActions ?? {},
)

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const toast = ref('')

const relPath = computed(() => page.value.relativePath)
const siteUrl = computed(() => (cfg.value.siteUrl ?? '').replace(/\/$/, ''))
const ghBase = computed(
  () => `https://github.com/${cfg.value.githubUser}/${cfg.value.githubRepo}`,
)
const ghBranch = computed(() => cfg.value.githubBranch ?? 'main')

// Public URL of the rendered HTML page
const pageUrl = computed(() => {
  const slug = relPath.value.replace(/\.md$/, '').replace(/\/index$/, '/')
  return `${siteUrl.value}/${slug}`
})

// Public URL of the source .md (served by the build copy plugin)
const mdUrl = computed(() => `${siteUrl.value}/${relPath.value}`)

const editUrl = computed(
  () => `${ghBase.value}/edit/${ghBranch.value}/docs/${relPath.value}`,
)

const issueUrl = computed(() => {
  const title = `Docs: ${frontmatter.value.title || page.value.title}`
  const body = `**Page:** ${pageUrl.value}\n\n**Issue:**\n\n`
  return `${ghBase.value}/issues/new?title=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(body)}`
})

const llmPrompt = computed(
  () =>
    `Read the documentation page at ${mdUrl.value} and help me with questions about it.`,
)

const chatgptUrl = computed(
  () =>
    `https://chatgpt.com/?hints=search&q=${encodeURIComponent(llmPrompt.value)}`,
)

const claudeUrl = computed(
  () => `https://claude.ai/new?q=${encodeURIComponent(llmPrompt.value)}`,
)

function flash(msg: string) {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 1800)
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

async function copyPage() {
  try {
    const res = await fetch(mdUrl.value, { cache: 'no-store' })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const text = await res.text()
    const ok = await copyText(text)
    flash(ok ? 'Page copied as Markdown' : 'Copy blocked by browser')
  } catch {
    // Dev or pre-deploy fallback: copy the URL so the user has something useful
    const ok = await copyText(mdUrl.value)
    flash(ok ? 'Source unavailable — copied link instead' : 'Copy failed')
  }
  open.value = false
}

async function copyMdLink() {
  const ok = await copyText(mdUrl.value)
  flash(ok ? 'Markdown link copied' : 'Copy failed')
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) {
    open.value = false
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div v-if="!frontmatter.home" ref="root" class="page-actions">
    <button
      class="page-actions__trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span>Copy page</span>
      <svg
        class="page-actions__chevron"
        :class="{ 'is-open': open }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <div v-if="open" class="page-actions__menu" role="menu">
      <button class="page-actions__item" role="menuitem" type="button" @click="copyPage">
        <span class="page-actions__title">Copy page</span>
        <span class="page-actions__hint">Copy this page as Markdown</span>
      </button>
      <a
        class="page-actions__item"
        role="menuitem"
        :href="issueUrl"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="page-actions__title">Report docs issues</span>
        <span class="page-actions__hint">Open an issue on GitHub</span>
      </a>
      <a
        class="page-actions__item"
        role="menuitem"
        :href="editUrl"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="page-actions__title">Edit this page</span>
        <span class="page-actions__hint">Open the source on GitHub</span>
      </a>
      <button class="page-actions__item" role="menuitem" type="button" @click="copyMdLink">
        <span class="page-actions__title">Copy Markdown link</span>
        <span class="page-actions__hint">URL to the .md source</span>
      </button>
      <a
        class="page-actions__item"
        role="menuitem"
        :href="mdUrl"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="page-actions__title">View as Markdown</span>
        <span class="page-actions__hint">Open the .md file in your browser</span>
      </a>
      <a
        class="page-actions__item"
        role="menuitem"
        :href="chatgptUrl"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="page-actions__title">Open in ChatGPT</span>
        <span class="page-actions__hint">Ask ChatGPT about this page</span>
      </a>
      <a
        class="page-actions__item"
        role="menuitem"
        :href="claudeUrl"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span class="page-actions__title">Open in Claude</span>
        <span class="page-actions__hint">Ask Claude about this page</span>
      </a>
    </div>

    <Teleport to="body">
      <Transition name="page-actions-toast">
        <div v-if="toast" class="page-actions__toast" role="status">
          {{ toast }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
