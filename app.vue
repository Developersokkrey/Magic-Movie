<script setup lang="ts">
import '@unocss/reset/tailwind.css';
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp();

// Reactive variable to store fetched users
const users = ref([]);
const actors = ref([]);

// Function to fetch users
const fetchUsers = async () => {
  try {
    // const response = await $axios.get('/users');
    const responseActors = await $axios.get('/actors');
    // const response = await $axios.get('/user');
    // users.value = response.data; // Store the users in the reactive variable
    actors.value = responseActors.data;
    // console.log('Users:', users.value);
    console.log('Actors', actors.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Fetch users when the component is mounted
onMounted(() => {
  fetchUsers();
});

// Set meta tags and page head configuration
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  // charset: 'utf-8',
  title: 'Magic Movies',
  titleTemplate: title => title !== 'Nuxt Movies' ? `${title} · Nuxt Movies` : title,
  meta: [
    { name: 'description', content: 'A TMDB client built with Nuxt Image to show the potential of it ✨' },
    { property: 'og:image', content: 'https://movies.nuxt.space/social-card.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@nuxt_js' },
    { name: 'twitter:creator', content: '@nuxt_js' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/movies.webp',
    },
  ],
});
</script>
<template>
  
  <div class="fixed top-0 left-0.4 w-full z-50">
        <nav class="bg-black border-black dark:bg-black">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png" class="h-8"
                alt="Flowbite Logo" />
              <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> -->
            </a>
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png"
                  alt="user photo">
              </button>
              <button data-collapse-toggle="navbar-user" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
              <ul
                class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <!-- <a href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">Home</a> -->
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    <!-- <nav class="bg-black border-black dark:bg-black">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png"
              alt="user photo">
          </button>
          <button data-collapse-toggle="navbar-user" type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->
    
  <NuxtLoadingIndicator />
  <div h-full w-full font-sans grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]" of-hidden
    view-transition-app transition duration-0>
    <div id="app-scroller" of-x-hidden of-y-auto relative>
      <div class="fixed top-12 left-17.4 w-full z-50">
        <nav class="bg-black border-black dark:bg-black">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-2 pb-1">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png" class="h-8"
                alt="Flowbite Logo" />
              <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> -->
            </a>
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="assets/image/Screenshot_2024-12-28_221349-removebg-preview.png"
                  alt="user photo">
              </button>
              <button data-collapse-toggle="navbar-user" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
              <ul
                class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <!-- <a href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">Home</a> -->
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <NuxtPage />
      <!-- <HomePage /> -->
    </div>

    <NavBar lg:order-first />
    <IframeModal />
    <!-- <PhotoModal /> -->

  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}
</style>
