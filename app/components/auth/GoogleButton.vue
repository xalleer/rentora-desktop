<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div>
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
      @click="emit('click')"
    >
      <UIcon
        name="i-logos-google-icon"
        class="w-5 h-5 mr-2"
      />
      <span class="text-gray-700 text-sm">
        <slot>Увійти через Google</slot>
      </span>
    </UButton>
  </div>
</template>
