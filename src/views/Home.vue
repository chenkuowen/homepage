<script setup>
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

const hero = {
  displayName: 'Xinghan Li 「李星汉」',
  description: [
    '<strong>Personal Profile</strong>',
    `I am an undergraduate student in the <a href="https://iiis.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer"><strong>Institute for Interdisciplinary Information Sciences (Yao Class)</strong></a> at <a href="https://www.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer"><strong>Tsinghua University</strong></a>. My research focuses on <strong>reinforcement learning for mathematical reasoning</strong> and understanding the <strong>learning dynamics of optimizers</strong> with the goal of building intelligent systems that are interpretable and trustworthy for humans.`,
    `My research experience includes an internship at the <a href="https://www.washington.edu/" target="_blank" rel="noopener noreferrer"><strong>University of Washington</strong></a>, where I worked under the guidance of Prof. <a href="https://simonshaoleidu.com/" target="_blank" rel="noopener noreferrer"><strong>Simon Shaolei Du</strong></a>. At Tsinghua, I have been working with Prof. <a href="https://kaifeng.ac/" target="_blank" rel="noopener noreferrer"><strong>Kaifeng Lyu</strong></a>, leading to a <strong>NeurIPS 2025 Poster</strong>.`,
    'I am actively seeking <strong>PhD opportunities starting Fall 2026.</strong>'
  ],
  avatar: '/images/avatar.png',
  links: [
    { label: 'CV', href: '/files/cv.pdf' },
    { label: 'Email', href: 'mailto:xh-li22@mails.tsinghua.edu.cn' },
    { label: 'GitHub', href: 'https://github.com/XinghanLi66' },
    { label: 'Twitter', href: 'https://x.com/XinghanLi66' }
  ]
}

const publications = [
  {
    title: 'Adam Reduces a Unique Form of Sharpness: Theoretical Insights Near the Minimizer Manifold',
    // simple inline HTML to bold your name
    authors:
      '<strong>Xinghan Li</strong>*, Haodong Wen*, Kaifeng Lyu',
    venue: 'NeurIPS 2025',
    venueHref: 'https://neurips.cc/virtual/2025/loc/san-diego/poster/116405',
    summary: String.raw`We use an SDE to capture Adam's dynamics for $O(\eta^{-2})$ time, showing that Adam implicitly minimizes a new kind of sharpness: $\mathrm{tr}\big(\mathrm{Diag}(H)^{1/2}\big)$ with label noise, instead of SGD's $\mathrm{tr}(H)$.`,
    links: [
      { label: 'ArXiv', href: 'https://arxiv.org/abs/2511.02773' },
      { label: 'Poster', href: '/files/adam_poster.pdf' }
    ]
  }
]



const projects = [
  {
    title: 'Accelerating Model-based Learning of Locomotion with Pretrained Demonstrations',
    summary:
      'PPO-trained A1 robot locomotion in IsaacGym with Dreamer-based online fine-tuning in MuJoCo.',
    image: '/images/projects/gym2mjc.png',
    badges: ['Model-based RL', 'Robotics']
  }
]
</script>

<template>
  <v-container class="page" tag="main">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="page-heading">{{ hero.displayName }}</h1>
        <v-divider class="heading-divider" />
      </v-col>
    </v-row>

    <v-row class="bio-row" align="start">
      <v-col cols="12" md="4" class="bio-photo">
        <v-sheet class="portrait-frame" elevation="0">
          <v-img :src="hero.avatar" :alt="`Portrait of ${hero.displayName}`" cover class="portrait" />
        </v-sheet>
        <v-list class="link-list" density="comfortable">
          <v-list-item class="link-line">
            <template #title>
              <span class="link-pipe">|</span>
              <span v-for="(link, index) in hero.links" :key="link.href">
                <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
                <span class="link-pipe">|</span>
                <!--<span v-if="index === 1" class="link-break" />-->
              </span>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="8" class="bio-text">
        <v-list class="bio-list" density="comfortable">
          <v-list-item v-for="line in hero.description" :key="line" class="bio-line">
            <template #title>
              <span v-html="line" />
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Publications -->
    <v-row class="section">
      <v-col cols="12">
        <h2 class="section-heading">Publications</h2>
        <v-divider class="section-divider" />
      </v-col>

      <v-col cols="12" v-for="item in publications" :key="item.title">
        <article class="pub-card">
          <a
            v-if="item.venue"
            class="pub-badge"
            :href="item.venueHref || '#'"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.venue }}
          </a>

          <h3 class="entry-title">{{ item.title }}</h3>

          <div class="entry-meta">
            <!-- render authors HTML directly; keep this safe since authors are hardcoded -->
            <span class="entry-authors" v-html="item.authors"></span>
          </div>

          <div class="entry-summary" v-html="renderMd(item.summary)"></div>

          <div v-if="item.links?.length" class="entry-links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
        </article>

        <v-divider class="entry-divider" />
      </v-col>
    </v-row>

    <!-- Project Highlights (temporarily commented out)
    <v-row class="section">
      <v-col cols="12">
        <h2 class="section-heading">Project Highlights</h2>
        <v-divider class="section-divider" />
      </v-col>
      <v-col cols="12" v-for="item in projects" :key="item.title">
        <v-row class="entry" align="start">
          <v-col cols="12" sm="4" class="entry-media">
            <v-sheet class="entry-frame" elevation="0">
              <v-img :src="item.image" :alt="`${item.title} preview`" cover class="entry-image" />
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8" class="entry-body">
            <h3 class="entry-title">{{ item.title }}</h3>
            <p class="entry-summary">{{ item.summary }}</p>
            <div class="entry-tags">
              <span v-for="badge in item.badges" :key="badge" class="tag">{{ badge }}</span>
            </div>
            <div class="entry-links" v-if="item.links?.length">
              <a
                v-for="link in item.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
              </a>
            </div>
          </v-col>
        </v-row>
        <v-divider class="entry-divider" />
      </v-col>
    </v-row>
    -->
  </v-container>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 72px auto 96px;
  padding: 0 24px;
}

.page-heading {
  font-size: clamp(2.6rem, 5vw, 3.4rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  margin: 0 0 16px;
}

.heading-divider { width: 160px; margin: 0 auto 24px; }
.bio-row { margin-bottom: 36px; }

.bio-photo { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.portrait-frame { width: 100%; overflow: hidden; border-radius: 12px; }
.portrait { width: 100%; height: 100%; }

.link-list { width: 100%; }
.link-line { justify-content: center; text-align: center; }
.link-pipe { margin: 0 6px; font-weight: 600; color: #B7A3E3; }
.link-break { display: block; }

.bio-text { display: flex; flex-direction: column; }
.bio-list { padding: 0; }
.bio-line { padding-inline: 0; }
.bio-line :deep(.v-list-item-title) {
  color: #1f1f1f; font-size: 1rem; line-height: 1.7; display: block;
  white-space: normal; overflow: visible; text-overflow: initial;
}

.section { margin-top: 24px; }
.section-heading { font-size: 1.75rem; font-weight: 600; margin: 0 0 12px; }
.section-divider { margin-bottom: 0px; }

.entry { margin-bottom: 6px; }
.entry-media { display: flex; }
.entry-frame { width: 100%; overflow: hidden; border-radius: 10px; }
.entry-image { width: 100%; height: 100%; }
.entry-image :deep(img) { object-fit: cover; }

.entry-body { display: flex; flex-direction: column; gap: 8px; }

.entry-title { margin: 0; font-size: 1.3rem; font-weight: 600; color: #1a1a1a; }
.entry-summary { margin: 0; color: #343434; font-size: 0.95rem; line-height: 1.6; }
.entry-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { padding: 2px 10px; border-radius: 12px; background-color: #eef4fb; color: #1f4f8a; font-size: 0.82rem; font-weight: 600; }
.entry-links { display: flex; flex-wrap: wrap; gap: 12px; font-weight: 600; margin-top: 10px; }
.entry-divider { margin: 25px 0; }

/* --- Publications: single-column, left aligned, top-right badge --- */
.pub-card { position: relative; padding: 0px 0px; text-align: left; }

.pub-badge {
  position: absolute; top: 0; right: 0;
  background-color: #f09228; color: #fff;
  padding: 4px 10px; border-radius: 16px;
  font-weight: 700; font-size: 0.82rem; text-decoration: none;
}

/* Reserve space on right so title never runs under badge */
.pub-card .entry-title { margin-top: 0; margin-bottom: 6px; max-width: calc(100% - 160px); padding-right: 12px; }

/* Meta under title, left aligned */
.entry-meta {
  color: #55606a; font-size: 0.95rem; margin: 6px 0;
  display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: flex-start;
}
.entry-authors { color: #333; font-weight: 500; }

/* KaTeX tweaks inside summaries: keep KaTeX box metrics intact, only nudge superscripts */
:deep(.katex) {
  font-size: 1.02em;
  line-height: 1; /* keep KaTeX internal spacing tight */
  /* DO NOT change vertical-align on the root .katex element — that moves the whole formula */
}

/* Target the superscript box that KaTeX generates and lift it slightly. */
:deep(.katex .katex-html .katex-sup),
:deep(.katex .katex-html .vlist .katex-sup) {
  display: inline-block; /* allow transform on inline content */
  transform: translateY(-0.18em); /* nudge the superscript up only */
}

/* Optional: hide MathML fallback if present (prevents layout shifts) */
:deep(.katex .katex-mathml) {
  display: none;
}

@media (max-width: 960px) {
  .page { margin: 48px auto 72px; padding: 0 16px; }
  .bio-photo { align-items: flex-start; }
  .link-line { text-align: left; }
  .heading-divider { margin-bottom: 16px; }
}

@media (max-width: 600px) {
  .page-heading { font-size: 2.4rem; }
  .entry { margin-bottom: 10px; }
  /* Badge gets narrower space on small screens */
  .pub-card .entry-title { max-width: calc(100% - 120px); }
}
</style>
