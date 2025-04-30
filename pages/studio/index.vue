<script setup lang="ts">
import { ref, onMounted } from 'vue';

const { $axios } = useNuxtApp();
const studios = ref<any[]>([]); // Store movies
const router = useRouter();
const fetchStudio = async () => {
  try {
    const response = await $axios.get('/studio');
    console.log('Raw API response:', response.data); // Debugging

    // Extract movies array from response
    studios.value = response.data.data || [];

    console.log('Stored studio:', studios.value); // Debugging
  } catch (error) {
    console.error('Error fetching studio:', error);
  }
};
const viewActorDetails = (id: string) => {
  router.push(`/studio/${id}`);
};
onMounted(() => {
  fetchStudio();
});
</script>

<!-- <template>
  <div class="m-12 text-4xl p-10 font-100 op-50 text-center">
    <h1>This is Home Studio</h1>
  </div>

  <div class="m-4">
    <h2 class="text-xl font-bold">Movie List</h2>

    <ul v-if="studios.length">
      <li v-for="studio in studios" :key="studio.RecID">
        {{ studio.Title }} ({{ studio.Name }})
      </li>
    </ul>
  </div>
</template> -->
<template>
  <div class="mt-12 ml-0 text-4xl pt-10 font-bold text-center text-gray-800">
    <div class="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <div 
      v-for="studio in studios" 
      :key="studio.RecID" 
      @click="viewActorDetails(studio.RecID)" 
      class=" text-white rounded-xl text-center cursor-pointer"
    >
      <!-- Actor Image -->
      <div class="relative mx-auto w-35 h-35">
        <!-- <img 
          :src="`/images/${actor.ActorsProfile}`" 
          :alt="actor.Name" 
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        /> -->
        <img src="assets/image/802033_user_512x512.png" :alt="studio.Name" 
        class="w-35 h-35 rounded-full border-white shadow-lg object-cover" />
        <!-- <img 
          :src="`/image/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg`" 
          :alt="actor.Name" 
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        /> -->
      </div>

      <!-- Actor Details -->
      <div>
        <h3 class="text-lg font-semibold">{{ studio.Name }}</h3>
        <p class="text-sm">🎭 Role: {{ studio.Title }}</p>
        <p class="text-sm">🌍 {{ studio.Description }} | 📅 {{ studio.StudioProfile }}</p>
      </div>
    </div>
  </div>
  </div>

  
</template>
