import { createApp } from 'vue';
import App from './App.vue';
import '../styles/global.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import MarkdownIt from 'markdown-it'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import { onMounted, nextTick } from 'vue'

const md = new MarkdownIt({ html: true, linkify: true, typographer: false })

/**
 * Replace LaTeX math in a markdown string with KaTeX-rendered HTML.
 * We render display math first ($$...$$), then inline math ($...$).
 * This ensures the generated KaTeX HTML (including inline style attributes)
 * is present before markdown-it converts the rest of the text to HTML.
 */
function renderMathToHtml(src) {
  if (!src) return ''

  // Render display math $$...$$
  const withDisplay = src.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => {
    try {
      return katex.renderToString(tex, { displayMode: true, throwOnError: false })
    } catch (e) {
      return _m
    }
  })

  // Render inline math $...$ (avoid matching $$)
  const withInline = withDisplay.replace(/(^|[^$])\$(?!\$)([^$\n]+?)\$(?!\$)/g, (_m, pfx, tex) => {
    try {
      return pfx + katex.renderToString(tex, { displayMode: false, throwOnError: false })
    } catch (e) {
      return pfx + tex
    }
  })

  return withInline
}

const renderMd = (s) => md.render(renderMathToHtml(s ?? ''))

// We use markdown-it + markdown-it-katex to render math when converting markdown to HTML.
// Avoid double-rendering with KaTeX auto-render; keep client-side auto-render disabled.
onMounted(async () => { await nextTick() })
const app = createApp(App)
app.config.globalProperties.$renderMd = renderMd
const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify).mount('#app');
