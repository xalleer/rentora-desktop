<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const isLogined = ref(true)

const items: NavigationMenuItem[] = [
  {
    label: 'Головна',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Збережені',
    icon: 'i-lucide-heart',
    to: '/saved'
  },
  {
    label: 'Мої оголошення',
    icon: 'i-lucide-list',
    to: '/my'
  }
]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #default>
      <template v-if="isLogined">
        <UNavigationMenu
          :items="items"
        />
      </template>

      <template v-else>
        <UButton variant="link">
          Увійти
        </UButton>
        <UButton>Зареєструватись</UButton>
      </template>
    </template>

    <template #right>
      <UUser
        class="cursor-pointer"
        name="John Doe"
        description="Software Engineer"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
          icon: 'i-lucide-image'
        }"
      />
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<style scoped>

</style>
