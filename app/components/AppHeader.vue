<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

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
      <template v-if="authStore.isAuth">
        <UNavigationMenu
          :items="items"
        />
      </template>
    </template>

    <template #right>
      <UUser
        v-if="authStore.isAuth"
        class="cursor-pointer"
        :name="userStore.user?.displayName"
        description="Профіль"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
          icon: 'i-lucide-image'
        }"
        @click="router.push('/profile')"
      />
      <!--      <UColorModeButton /> -->
      <template v-if="!authStore.isAuth">
        <UButton
          variant="outline"
          @click="router.push('/auth/login')"
        >
          Увійти
        </UButton>
        <UButton>Зареєструватись</UButton>
      </template>
    </template>
  </UHeader>
</template>

<style scoped>

</style>
