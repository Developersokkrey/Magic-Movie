<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';

const { $axios } = useNuxtApp();
const route = useRoute();
const actorsId = ref<any[]>([]); // Store actors
const actor = ref<any | null>(null); // Store a single actor
const id = ref(route.params.id as string);
const activeTab = ref<string>('photos');
const movies_Bymodel = ref<any[]>([]); // Store movies
const router = useRouter();
const fetchActors = async () => {
  if (!id.value) return; // Prevent API call if ID is missing
  try {
    const response = await $axios.get(`actors?RecID=${id.value}`);
    const response_movie = await $axios.get('/movie');
    console.log('Raw API response:', response.data);

    actor.value = response.data.data || []; // Ensure it's always an array
    movies_Bymodel.value = response_movie.data.data || []; // Ensure it's always an array
    console.log('Stored actors:', actorsId.value);
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
};

// onMounted(fetchActors);

// Watch for changes in route.params.id
watch(() => route.params.id, async (newId) => {
  if (newId) {
    id.value = newId as string;
    await fetchActors();
  }
}, { immediate: true });
const setTab = (tab: string) => {
  activeTab.value = tab;
};
const viewActorDetails = (id: string) => {
  router.push(`/movie/${id}`);
};
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

<!-- <template>
  <div class="m-12 text-4xl p-10 font-100 op-50 text-center">
    <h1>This is the Actors Page By Id</h1>
  </div>

  <div class="m-4">
    <h2 class="text-xl font-bold">Actor List</h2>

    <ul v-if="actorsId.length">
      <li v-for="actor in actorsId" :key="actor.RecID">
        {{ actor.Description }} ({{ actor.Role }})
      </li>
    </ul>

    <p v-else>No actors found.</p>
    <pre>{{ actorsId }}</pre>
  </div>
</template> -->
<template>
  <div v-if="actor" class="mt-25 ml-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-150 h-auto">
    <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" />
    <div class="md:col-span-2">
      <h2 class="text-2xl font-bold">{{ actor.Name }}</h2>
      <div class="grid grid-cols-2 mt-4 gap-4">
        <div class="text-lg"><strong>Studio :</strong> {{ actor.Role }}</div>
        <div class="text-lg"><strong>Birth Year :</strong> {{ actor.BirthYear }}</div>
        <div class="text-lg"><strong>Nationality :</strong> {{ actor.Nationality }}</div>
      </div>
      <h2 class="text-sm pt-3 text-gray-300">{{ actor.Description }}</h2>
    </div>
  </div>
  
  <div class="mt-12 ml-0 text-4xl pt-10 bg-black text-white min-h-screen p-6">
    <!-- Tabs -->
    <div class="flex space-x-6 text-lg font-semibold border-b border-white pb-2">
      <!-- <button @click="setTab('overview')" :class="{ 'border-b-2 border-white': activeTab === 'overview' }">
          OVERVIEW
        </button> -->
      <button @click="setTab('photos')" :class="{ 'border-b-2 border-white': activeTab === 'photos' }">
        PHOTOS
      </button>
      <button @click="setTab('videos')" :class="{ 'border-b-2 border-white': activeTab === 'videos' }">
        VIDEOS
      </button>
    </div>
  
    <!-- Tab Content -->
    <div class="mt-6">
      <!-- Overview Tab -->
      <!-- <div v-if="activeTab === 'overview' && actor" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img :src="`/images/`" :alt="actor.Name" class="w-64 rounded-lg shadow-lg" />
           <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
           <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png"/>
          <div class="md:col-span-2">
            <h2 class="text-2xl font-bold">{{ actor.Name }}</h2>
            <div class="grid grid-cols-2 mt-4 gap-4">
              <div class="text-lg"><strong>Studio :</strong> {{ actor.Role }}</div>
              <div class="text-lg" ><strong>Birth Year :</strong> {{ actor.BirthYear }}</div>
              <div class="text-lg"><strong>Nationality :</strong> {{ actor.Nationality }}</div>
            </div>
            <h2 class="text-sm pt-3 text-gray-300">{{ actor.Description }}</h2>
          </div>
        </div> -->
    </div>
      <!-- Videos Tab -->
      <div v-if="activeTab === 'videos'">
        <!-- <h2 class="text-2xl font-bold">Videos</h2> -->
        <div class="m2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          <div v-for="movie in movies_Bymodel" :key="movie.RecID" @click="viewActorDetails(movie.RecID)"
            class="max-w-sm w-full cursor-pointer">
            <!-- Thumbnail -->
            <div class="relative rounded-xl overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw="
                alt="Video thumbnail" class="w-full h-48 object-cover">
              <!-- Duration -->
              <span class="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
                {{ movie.Duration }}
              </span>
            </div>

            <!-- Video Info -->
            <div class="flex mt-3 space-x-3">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw="
                class="w-9 h-9 rounded-full" alt="Channel Avatar">
              <div class="flex flex-col">
                <p class="font-medium text-sm line-clamp-2">
                  {{ movie.Title }}
                </p>
                <p class="text-xs text-gray-500">{{ movie.Years }}</p>
                <p class="text-xs text-gray-500">{{ movie.Description }} • {{ movie.Code }}</p>
              </div>
            </div>
          </div>
          <!-- <div class="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
            <div class="relative mx-auto">
              <img
                src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" />
            </div>
          </div> -->

        </div>
      </div>
        <!-- Photos Tab -->
        <div v-if="activeTab === 'photos'">
          <!-- <h2 class="text-2xl font-bold">Photos</h2> -->
          <!-- <div class="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            <div class="relative mx-auto">
              <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" />
            </div>
            <div class="relative mx-auto">
              <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" />
            </div>
            <div class="relative mx-auto">
              <img src="https://cdn.pixabay.com/photo/2022/10/19/01/02/woman-7531315_1280.png" />
            </div>
          </div> -->
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
        </div>
      </div>
</template>

<style scoped>
button {
  color: white;
  padding-bottom: 4px;
}

button:hover {
  color: gray;
}
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
