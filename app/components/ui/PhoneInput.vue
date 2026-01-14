<script setup lang="ts">
import { countries } from '~/utils/countries'

const props = defineProps<{
  modelValue: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:fullPhone': [value: string]
}>()

const { selectedCountry, phoneNumber, fullPhoneNumber, formattedPhone, setCountry } = usePhoneInput()

const isDropdownOpen = ref(false)

watch(phoneNumber, (newVal) => {
  emit('update:modelValue', newVal)
  emit('update:fullPhone', fullPhoneNumber.value)
})

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const cleaned = input.value.replace(/\D/g, '')
  phoneNumber.value = cleaned

  nextTick(() => {
    input.value = formattedPhone.value
  })
}
</script>

<template>
  <div class="space-y-1">
    <label class="block text-sm font-medium text-gray-700">
      Номер телефону
    </label>
    <div class="flex gap-2 items-center">
      <UPopover v-model:open="isDropdownOpen">
        <UButton
          variant="outline"
          color="neutral"
          class="min-w-[120px] justify-between py-[2px]"
        >
          <span class="flex items-center gap-2">
            <span class="text-lg">{{ selectedCountry.flag }}</span>
            <span class="text-sm">{{ selectedCountry.dialCode }}</span>
          </span>
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="w-4 h-4"
          />
        </UButton>

        <template #content>
          <div class="p-2 w-64">
            <button
              v-for="country in countries"
              :key="country.code"
              class="w-full px-3 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-3 transition-colors"
              @click="setCountry(country); isDropdownOpen = false"
            >
              <span class="text-lg">{{ country.flag }}</span>
              <div class="flex-1">
                <div class="text-sm font-medium">
                  {{ country.name }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ country.dialCode }}
                </div>
              </div>
            </button>
          </div>
        </template>
      </UPopover>

      <div class="flex-1">
        <UInput
          :model-value="formattedPhone"
          :placeholder="selectedCountry.mask.replace(/#/g, '0')"
          class="w-full"
          @input="handleInput"
        />
      </div>
    </div>
    <p
      v-if="error"
      class="text-xs text-red-500 mt-1"
    >
      {{ error }}
    </p>
  </div>
</template>
