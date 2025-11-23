<script setup>

const hero = {
  displayName: 'Kuowen Chen 「陈扩文」',
  description: [
    `I am an undergraduate student in the <a href="https://iiis.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer"><strong>Institute for Interdisciplinary Information Sciences (Yao Class)</strong></a> at <a href="https://www.tsinghua.edu.cn/en/" target="_blank" rel="noopener noreferrer"><strong>Tsinghua University</strong></a>. My research focuses on algorithms and data structures.`,
  
    `At Tsinghua, I worked with <a href="https://people.iiis.tsinghua.edu.cn/~jianli/" target="_blank" rel="noopener noreferrer"><strong>Prof. Jian Li</strong></a> 
      and <a href="https://iiis.tsinghua.edu.cn/en/People/Faculty/DuanRan.htm" target="_blank" rel="noopener noreferrer"><strong>Prof. Ran Duan</strong></a>. 
      I also completed a research visit at the <a href="https://umich.edu/" target="_blank" rel="noopener noreferrer"><strong>University of Michigan</strong></a>, 
      where I primarily worked under the supervision of <a href="https://web.eecs.umich.edu/~pettie/" target="_blank" rel="noopener noreferrer"><strong>Prof. Seth Pettie</strong></a>
      , and had the opportunity to collaborate with <a href="https://web.eecs.umich.edu/~nswein/" target="_blank" rel="noopener noreferrer"><strong>Prof. Nicole Wein</strong></a> 
      and <a href="https://sites.google.com/site/thsaranurak" target="_blank" rel="noopener noreferrer"><strong>Prof. Thatchaphol Saranurak</strong></a>.`,

    'I am actively seeking <strong>PhD opportunities starting Fall 2026.</strong>'
  ],
  avatar: '/images/avatar.png',
  links: [
    { label: 'ckw22 [at] mails.tsinghua [dot] edu.cn', href: 'mailto:ckw22@mails.tsinghua.edu.cn' },
    { label: 'ckw110111 [at] gmail [dot] com', href: 'mailto:ckw110111@gmail.com'},
  ]
}

const publications = [
  {
    title: 'New Result on a General Class of Minimum Norm Optimization Problems',
    // simple inline HTML to bold your name
    authors:
      '<strong>Kuowen Chen</strong>, Jian Li, Yuval Rabani Yiran Zhang',
    venue: 'ICALP 2025',
    venueHref: 'https://icalp2025.org',
    summary: String.raw``,
    links: [
      { label: 'ArXiv', href: 'https://arxiv.org/abs/2504.13489' },
    ]
  }
]
const preprints = [
  {
    title:'The Squishy Grid Problem',
    authors:'Zixi Cai, <strong>Kuowen Chen</strong>, Shengquan Du, Arnold Filtser, Seth Pettie, Daniel Skora',
    venue:'',
    venueHref:'',
    summary:String.raw``,
    links:[
      {label: 'Arxiv', href: 'https://arxiv.org/abs/2507.23105'},
    ]
  },
  {
    title:'A Polynomial-Time Algorithm for the Next-to-Shortest Path Problem on Positively Weighted Directed Graphs',
    authors:'Kuowen Chen, Nicole Wein, Yiran Zhang',
    venue:'',
    venueHref:'',
    summary:String.raw``,
    links:[
      {label:'Arxiv', href: 'https://arxiv.org/abs/2511.04345'}
    ]
  },
  {
    title:'Contention Resolution, With and Without a Global Clock',
    authors:'Zixi Cai, Kuowen Chen, Shengquan Du, Tsvi Kopelowitz, Seth Pettie, Ben Plosk',
    venue:'',
    venueHref:'',
    summary:String.raw``,
    links:[
      {label:'PDF', href: '/files/Contention_Resolution.pdf'}
    ]
  }
]


const projects = [
  {
    title: 'New Results on a General Class of Minimum Norm Optimization Problems',
    summary:'',
    badges: ['Approximation Algorithms']
  }
]
import PublicationList from './publications.vue'
</script>

<template>
  <v-container class="page" tag="main">


    <v-row class="bio-row" align="start">
      <v-col cols="12" md="4" class="bio-photo">
        <v-sheet class="portrait-frame" elevation="0">
          <v-img :src="hero.avatar" :alt="`Portrait of ${hero.displayName}`" cover class="portrait" />
        </v-sheet>
        <v-list class="link-list" density="comfortable">
          <v-list-item v-for="(link, index) in hero.links" :key="link.href">
             <template #title>   
                <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="8" class="bio-text">
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <h1 class="page-heading">{{ hero.displayName }}</h1>
            <v-divider class="heading-divider" />
          </v-col>
        </v-row>
        <v-list class="bio-list" density="comfortable">
          <v-list-item v-for="line in hero.description" :key="line" class="bio-line">
            <template #title>
              <span v-html="line" />
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <PublicationList title="Publications" :items="publications" />
    <PublicationList title="Preprints" :items="preprints" />
    <!-- Publications -->
    <!-- Publications -->


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
.link-list a{
  color: #003366 !important;     
  font-weight:600;
  text-decoration: none;
}
.page {
  max-width: 960px;
  margin: 72px auto 96px;
  padding: 0 24px;
}

.page-heading {
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  margin: 0 0 16px;
}

.heading-divider { width: 160px; margin: 0 auto 24px; }
.bio-row { margin-bottom: 36px; }

.bio-photo { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.portrait-frame { width: 100%; overflow: hidden; border-radius: 1px; }
.portrait { width: 100%; height: 100%; }

.link-list { width: 100%;}
.link-line { justify-content: center; text-align: center;  }
.link-pipe { margin: 0 6px; font-weight: 600; color: #003366; }
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


</style>
<style scoped src="../../styles/publications.css"></style>