<script setup lang="ts">
import { signupSchema, type SignupForm } from '~/utils/validation'
import PhoneInput from '~/components/ui/PhoneInput.vue'

const form = ref<SignupForm & { fullPhone: string }>({
  name: '',
  email: '',
  phone: '',
  fullPhone: '',
  password: '',
  role: 'tenant'
})

const errors = ref<Partial<Record<keyof SignupForm, string>>>({})
const isLoading = ref(false)

const roleOptions = [
  { value: 'tenant', label: 'Знімаю квартиру', icon: 'i-heroicons-key' },
  { value: 'landlord', label: 'Здаю квартиру', icon: 'i-heroicons-home' }
]

const handleSignup = async () => {
  try {
    errors.value = {}

    const dataToValidate = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.fullPhone,
      password: form.value.password,
      role: form.value.role
    }

    const validated = signupSchema.parse(dataToValidate)

    isLoading.value = true
    console.log('Signing up with:', validated)

    // Тут буде ваш API запит
    // await $fetch('/api/auth/signup', { method: 'POST', body: validated })

    await new Promise(resolve => setTimeout(resolve, 1000))

    // navigateTo('/login')
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors.value[err.path[0] as keyof SignupForm] = err.message
        }
      })
    }
  } finally {
    isLoading.value = false
  }
}

const handleGoogleSignup = () => {
  console.log('Google signup')
}
</script>

<template>
  <AuthLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Створити акаунт
      </h1>
      <p class="text-gray-500 text-sm">
        Заповніть форму для реєстрації нового облікового запису
      </p>
    </div>

    <form
      class="space-y-5"
      @submit.prevent="handleSignup"
    >
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          Ім'я
        </label>
        <UInput
          v-model="form.name"
          placeholder="Іван Петренко"
          class="w-full"
          :class="{ 'border-red-500': errors.name }"
        />
        <p
          v-if="errors.name"
          class="text-xs text-red-500 mt-1"
        >
          {{ errors.name }}
        </p>
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          Пошта
        </label>
        <UInput
          v-model="form.email"
          type="email"
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

      <PhoneInput
        v-model="form.phone"
        :error="errors.phone"
        @update:full-phone="form.fullPhone = $event"
      />

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">
          Пароль
        </label>
        <UInput
          v-model="form.password"
          type="password"
          placeholder="● ● ● ● ● ● ● ●"
          class="w-full"
          :class="{ 'border-red-500': errors.password }"
        />
        <p
          v-if="errors.password"
          class="text-xs text-red-500 mt-1"
        >
          {{ errors.password }}
        </p>
      </div>

      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Я хочу
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="option in roleOptions"
            :key="option.value"
            type="button"
            class="p-4 border-2 rounded-xl transition-all text-left"
            :class="form.role === option.value
              ? 'border-[#415234] bg-[#415234]/5'
              : 'border-gray-200 hover:border-gray-300'"
            @click="form.role = option.value"
          >
            <UIcon
              :name="option.icon"
              class="w-6 h-6 mb-2"
              :class="form.role === option.value ? 'text-[#415234]' : 'text-gray-400'"
            />
            <div
              class="text-sm font-medium"
              :class="form.role === option.value ? 'text-[#415234]' : 'text-gray-700'"
            >
              {{ option.label }}
            </div>
          </button>
        </div>
        <p
          v-if="errors.role"
          class="text-xs text-red-500 mt-1"
        >
          {{ errors.role }}
        </p>
      </div>

      <UButton
        type="submit"
        block
        size="lg"
        :loading="isLoading"
        class="bg-[#415234] hover:bg-[#2F3D26] text-white transition-colors duration-200"
      >
        Зареєструватися
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
        @click="handleGoogleSignup"
      >
        <UIcon
          name="i-logos-google-icon"
          class="w-5 h-5 mr-2"
        />
        <span class="text-gray-700 text-sm">Зареєструватися через Google</span>
      </UButton>

      <p class="text-center text-sm text-gray-600 mt-6">
        Вже маєте акаунт?
        <NuxtLink
          to="/auth/login"
          class="text-blue-600 font-medium hover:underline"
        >
          Увійти
        </NuxtLink>
      </p>
    </form>
  </AuthLayout>
</template>
