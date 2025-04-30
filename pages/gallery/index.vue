<template>
    <div class="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="mt-23 image-item relative mx-auto"
        @click="openFullscreen(index)"
      >
        <img :src="img" alt="Thumbnail" />
      </div>
      
      <!-- Fullscreen Viewer -->
      <div v-if="isFullscreen" class="fullscreen-overlay" @click.self="closeFullscreen">
        <img :src="images[currentIndex]" class="fullscreen-image" />
        <button class="mt-10 close-btn" @click="closeFullscreen">✕</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const images = [
  'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
 'https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
 'https://plus.unsplash.com/premium_photo-1672116453187-3aa64afe04ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
  ]
  
  const isFullscreen = ref(false)
  const currentIndex = ref(0)
  
  function openFullscreen(index) {
    currentIndex.value = index
    isFullscreen.value = true
  }
  
  function closeFullscreen() {
    isFullscreen.value = false
  }
  
  function handleKeydown(e) {
    if (!isFullscreen.value) return
    if (e.key === 'ArrowRight') {
      currentIndex.value = (currentIndex.value + 1) % images.length
    } else if (e.key === 'ArrowLeft') {
      currentIndex.value =
        (currentIndex.value - 1 + images.length) % images.length
    } else if (e.key === 'Escape') {
      closeFullscreen()
    }
  }
  
  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
  </script>
  
  <style scoped>
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 900px;
    margin: 0 auto;
  }
  .image-item img {
    width: 100%;
    cursor: pointer;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  .image-item img:hover {
    transform: scale(1.03);
  }
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .fullscreen-image {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
  }
  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  