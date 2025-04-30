<template>
  <div
    flex="~ row lg:col"
    justify-evenly items-center
    py5 lg:px5
    border="t lg:r base"
    bg-black
  >
    <NuxtLink v-slot="{ isActive }" to="/" :title="$t('Home')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-house-fill text-primary' : 'i-ph-house'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/model" :title="$t('Models')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-user-circle-fill text-primary' : 'i-ph-user-circle'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/studio" :title="$t('TV Shows')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-television-simple-fill text-primary' : 'i-ph-television-simple'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/gallery" :title="$t('Gallery')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-images-fill text-primary' : 'i-ph-images'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/search" :title="$t('')">
      <div
        text-2xl
        :class="isActive ? 'i-ph-magnifying-glass-fill text-primary' : 'i-ph-magnifying-glass'"
      />
    </NuxtLink>
  </div>
</template>
