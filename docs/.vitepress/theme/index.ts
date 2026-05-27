import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PageActions from './PageActions.vue'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'aside-outline-before' renders inside the right rail, immediately above
      // the "On this page" outline — matches EMQX's placement and avoids
      // colliding with the TOC header at the doc/aside boundary.
      'aside-outline-before': () => h(PageActions),
    })
  },
}

export default theme
