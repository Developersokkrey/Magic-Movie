<script setup lang="ts">
import { ref, onMounted } from 'vue';

const { $axios } = useNuxtApp();
const movies = ref<any[]>([]); // Store movies
const router = useRouter();
const fetchMovie = async () => {
  try {
    const response = await $axios.get('/movie');
    console.log('Raw API response:', response.data); // Debugging

    // Extract movies array from response
    movies.value = response.data.data || [];

    console.log('Stored movies:', movies.value); // Debugging
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
const viewActorDetails = (id: string) => {
  router.push(`/movie/${id}`);
};
onMounted(() => {
  fetchMovie();
});
</script>

<template>
  <div class="mt- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
    <div v-for="movie in movies" 
            :key="movie.RecID" 
            @click="viewActorDetails(movie.RecID)" 
    class="max-w-sm w-full cursor-pointer">
    <!-- Thumbnail -->
    <div class="relative rounded-xl overflow-hidden">
      <img src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" alt="Video thumbnail" class="w-full h-48 object-cover">
      <!-- Duration -->
      <span class="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
        {{ movie.Duration }}
      </span>
    </div>

    <!-- Video Info -->
    <div class="flex mt-3 space-x-3">
      <img src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg?s=1024x1024&w=is&k=20&c=NSCos5LBSYm6xAUotJyH3Wul7dzhyr_oVYMIC5NFQgw=" class="w-9 h-9 rounded-full" alt="Channel Avatar">
      <div class="flex flex-col">
        <p class="font-medium text-sm line-clamp-2">
          {{ movie.Title }}
        </p>
        <p class="text-xs text-gray-500">{{ movie.Years }}</p>
        <p class="text-xs text-gray-500">{{ movie.Description }} • {{ movie.Code }}</p>
      </div>
    </div>
  </div>
</div>
  <div class="m-12 text-4xl p-10 font-100 op-50 text-center">
    <h1>This is Home Page</h1>
  </div>

  <div class="m-4">
    <h2 class="text-xl font-bold">Movie List</h2>

    <ul v-if="movies.length">
      <li v-for="movie in movies" :key="movie.RecID">
        {{ movie.Title }} ({{ movie.Code }})
      </li>
    </ul>

    <p v-else>Loading movies...</p>

    <!-- Debugging -->
    <pre>{{ movies }}</pre>
  </div>
</template>
