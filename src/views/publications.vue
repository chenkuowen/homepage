<template src="./publications.template.html"></template>

<script setup>
import MarkdownIt from 'markdown-it'
import 'katex/dist/katex.min.css'
import katex from 'katex'
import { onMounted, nextTick } from 'vue'
defineProps({
  title: String,
  items: Array
})
</script>

<style scoped src="../../styles/publications.css"></style>
