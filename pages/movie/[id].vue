<template>
    <div class="flex flex-col lg:flex-row gap-4 p-4">
      <!-- Main video player -->
      <div class="mt-20 flex-1">
        <div class="aspect-video bg-black rounded-lg shadow-lg">
          <!-- You can replace with an actual <video> or iframe -->
            <iframe
        :src="`https://www.youtube.com/embed/fclZ3A7Pr8Q?si=HwZSoTT8q3ZuDrmH`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full rounded-lg"
      ></iframe>
          <!-- <img
            src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg"
            class="w-full h-full object-cover rounded-lg"
            alt="Main Video" -->
          <!-- /> -->
        </div>
      </div>
  
      <!-- Sidebar with related videos (9 items) -->
      <div class="w-full lg:w-[400px] space-y-4">
        <h2 class="text-xl font-semibold">Related Videos</h2>
        <div v-for="n in 9" :key="'related-' + n" class="flex gap-2">
          <img
            class="w-36 h-20 object-cover rounded"
            src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg"
            alt="Related video thumbnail"
          />
          <div class="flex flex-col">
            <p class="font-medium text-sm">Video Title {{ n }}</p>
            <p class="text-xs text-gray-500">407 views • 3 hours ago</p>
          </div>
        </div>
      
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">Shorts</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div v-for="n in 3" :key="'short-' + n" class="rounded overflow-hidden shadow">
          <img
            class="w-full h-48 object-cover"
            src="https://media.istockphoto.com/id/2087498158/vector/group-of-abstract-diverse-people-illustration-design.jpg"
            alt="Short video"
          />
        </div>
      </div>
    </div>
      </div>
    </div>
  </template>
  