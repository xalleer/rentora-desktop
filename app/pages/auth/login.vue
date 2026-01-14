<script setup lang="ts">
import { loginSchema, type LoginForm } from '~/utils/validation'

const form = ref<LoginForm>({
  email: '',
  password: ''
})

const errors = ref<Partial<Record<keyof LoginForm, string>>>({})
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    errors.value = {}
    const validated = loginSchema.parse(form.value)

    isLoading.value = true
    console.log('Logging in with:', validated)

    // Тут буде ваш API запит
    // await $fetch('/api/auth/login', { method: 'POST', body: validated })

    await new Promise(resolve => setTimeout(resolve, 1000))

    // navigateTo('/dashboard')
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors.value[err.path[0] as keyof LoginForm] = err.message
        }
      })
    }
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  console.log('Google login')
  // Тут буде OAuth логіка
}
</script>

<template>
  <AuthLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        З поверненням!
      </h1>
      <p class="text-gray-500 text-sm">
        Введіть свої облікові дані для доступу до облікового запису
      </p>
    </div>

    <form
      class="space-y-5"
      @submit.prevent="handleLogin"
    >
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          Пошта
        </label>
        <UInput
          v-model="form.email"
          placeholder="email@example.com"
          class="w-full"
          :class="{ 'border-red-500': errors.email }"
        />
        <p
          v-if="errors.email"
          class="text-xs text-red-500 mt-1"
        >
          {{ errors.email }}
        </p>
      </div>

      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <label class="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <NuxtLink
            to="/forgot-password"
            class="text-xs text-blue-600 hover:underline font-medium"
          >
            Забули пароль?
          </NuxtLink>
        </div>
        <UInput
          v-model="form.password"
          type="password"
          class="w-full"
          placeholder="● ● ● ● ● ● ● ●"
          :class="{ 'border-red-500': errors.password }"
        />
        <p
          v-if="errors.password"
          class="text-xs text-red-500 mt-1"
        >
          {{ errors.password }}
        </p>
      </div>

      <UButton
        type="submit"
        block
        size="lg"
        :loading="isLoading"
        class="bg-[#415234] hover:bg-[#2F3D26] text-white transition-colors duration-200"
      >
        Увійти
      </UButton>

      <div class="relative py-2">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-gray-200" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 text-gray-500">Або</span>
        </div>
      </div>

      <UButton
        type="button"
        color="white"
        variant="solid"
        block
        class="border border-gray-200 shadow-none hover:bg-gray-50"
        @click="handleGoogleLogin"
      >
        <UIcon
          name="i-logos-google-icon"
          class="w-5 h-5 mr-2"
        />
        <span class="text-gray-700 text-sm">Увійти через Google</span>
      </UButton>

      <p class="text-center text-sm text-gray-600 mt-6">
        Не маєте акаунт?
        <NuxtLink
          to="/auth/signup"
          class="text-blue-600 font-medium hover:underline"
        >
          Зареєструватися
        </NuxtLink>
      </p>
    </form>
  </AuthLayout>
</template>
