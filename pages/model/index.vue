<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { $axios } = useNuxtApp();
const models = ref<any[]>([]); // Store actors

const router = useRouter(); // To navigate to actor details page

const fetchModel = async () => {
  try {
    const response = await $axios.get('/actors');
    console.log('Raw API response:', response.data); // Debugging

    // Extract actors array from response
    models.value = response.data.data || [];

    console.log('Stored models:', models.value); // Debugging
  } catch (error) {
    console.error('Error fetching models:', error);
  }
};

onMounted(() => {
  fetchModel();
});

// Navigate to actor details page
const viewActorDetails = (id: string) => {
  router.push(`/model/${id}`);
};
</script>

<template>
  <div class="m-12 text-4xl p-10 font-100 op-50 text-center">
    <h1>This is Actor List Page</h1>
  </div>

  <div class="m-4">
    <h2 class="text-xl font-bold">Actor List</h2>

    <ul v-if="models.length">
      <li v-for="model in models" :key="model.RecID" class="p-2 border-b">
        {{ model.Description }} ({{ model.Role }})
        <button 
          @click="viewActorDetails(model.RecID)" 
          class="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </li>
    </ul>

    <p v-else>Loading actors...</p>
  </div>
</template> -->
<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { $axios } = useNuxtApp();
const actors = ref<any[]>([]); // Store actors

const router = useRouter(); // To navigate to actor details page

const fetchActors = async () => {
  try {
    const response = await $axios.get('/actors');
    console.log('Raw API response:', response.data); // Debugging

    // Extract actors array from response
    actors.value = response.data.data || [];

    console.log('Stored actors:', actors.value); // Debugging
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
};

onMounted(() => {
  fetchActors();
});

// Navigate to actor details page
const viewActorDetails = (id: string) => {
  router.push(`/model/${id}`);
};
</script>

<template>
  <div class="m-12 text-4xl p-10 font-bold text-center text-gray-800">
    <h1>Actor & Actress List</h1>
  </div>

  <div class="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div 
      v-for="actor in actors" 
      :key="actor.RecID" 
      class="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition"
    >
      <img 
        :src="`/images/${actor.ActorsProfile}`" 
        :alt="actor.Name" 
        class="w-full h-48 object-cover rounded-lg"
      />


      <div class="p-2 text-center">
        <h3 class="text-lg font-semibold text-gray-900">{{ actor.Name }}</h3>
        <p class="text-gray-600">{{ actor.Description }}</p>
        <p class="text-sm text-gray-500">🎭 Role: {{ actor.Role }}</p>
        <p class="text-sm text-gray-500">🌍 {{ actor.Nationality }} | 📅 {{ actor.BirthYear }}</p>
        

        <button 
          @click="viewActorDetails(actor.RecID)" 
          class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template> -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNuxtApp } from '#app';

const { $axios } = useNuxtApp();
const actors = ref<any[]>([]);
const router = useRouter();

const fetchActors = async () => {
  try {
    const response = await $axios.get('/actors');
    console.log('Raw API response:', response.data);

    actors.value = response.data.data || [];
    console.log('Stored actors:', actors.value);
  } catch (error) {
    console.error('Error fetching actors:', error);
  }
};

// Navigate to actor details page
const viewActorDetails = (id: string) => {
  router.push(`/model/${id}`);
};

onMounted(() => {
  fetchActors();
});
</script>

<template>
  <div class="mt-12 ml-0 text-4xl pt-10 font-bold text-center text-gray-800">
    <div class="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <div 
      v-for="actor in actors" 
      :key="actor.RecID" 
      @click="viewActorDetails(actor.RecID)" 
      class=" text-white rounded-xl text-center cursor-pointer"
    >
      <!-- Actor Image -->
      <div class="relative mx-auto w-35 h-35">
        <!-- <img 
          :src="`/images/${actor.ActorsProfile}`" 
          :alt="actor.Name" 
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        /> -->
        <img src="assets/image/802033_user_512x512.png" :alt="actor.Name" 
        class="w-35 h-35 rounded-full border-white shadow-lg object-cover" />
        <!-- <img 
          :src="`/image/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.jpg`" 
          :alt="actor.Name" 
          class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        /> -->
      </div>

      <!-- Actor Details -->
      <div>
        <h3 class="text-lg font-semibold">{{ actor.Name }}</h3>
        <p class="text-sm">🎭 Role: {{ actor.Role }}</p>
        <p class="text-sm">🌍 {{ actor.Nationality }} | 📅 {{ actor.BirthYear }}</p>
      </div>
    </div>
  </div>
  </div>

  
</template>

<style scoped>
/* Optional: Add a slight hover effect */
.cursor-pointer:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
