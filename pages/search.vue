<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">YouTube Player</h2>

    <div class="aspect-video mb-4">
      <iframe
        v-if="selectedVideoId"
        :src="`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full rounded-lg"
      ></iframe>
    </div>

    <ul class="space-y-2">
      <li
        v-for="(link, index) in videoLinks"
        :key="index"
        @click="selectVideo(link)"
        class="cursor-pointer hover:underline text-blue-600"
      >
        ▶️ {{ getVideoTitle(link) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoLinks = ref<string[]>([
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  'https://www.youtube.com/watch?v=ltrMfT4Qz5Y',
])

const selectedVideoId = ref<string | null>(null)

function selectVideo(link: string) {
  const id = extractVideoId(link)
  if (id) selectedVideoId.value = id
}

function extractVideoId(link: string): string | null {
  const regex = /(?:v=|youtu\.be\/)([^&]+)/;
  const match = link.match(regex);
  return match ? match[1] : null;
}

function getVideoTitle(link: string): string {
  const id = extractVideoId(link)
  return id ? `Video ID: ${id}` : 'Invalid Link'
}
</script>

<style scoped>
iframe {
  border-radius: 12px;
}
</style>
