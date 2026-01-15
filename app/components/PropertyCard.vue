<template>
  <UCard class="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300">
    <template #header>
      <div class="relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          :alt="property.title"
          class="w-full h-50 object-cover"
        >

        <!--        <div class="absolute top-4 left-4 flex gap-2"> -->
        <!--          <UBadge -->
        <!--            :color="property.listingType === 'rent' ? 'primary' : 'neutral'" -->
        <!--            variant="solid" -->
        <!--            size="lg" -->
        <!--          > -->
        <!--            {{ property.listingType === 'rent' ? 'For Rent' : 'For Sale' }} -->
        <!--          </UBadge> -->

        <!--          <UBadge -->
        <!--            color="neutral" -->
        <!--            variant="solid" -->
        <!--            size="lg" -->
        <!--          > -->
        <!--            <UIcon -->
        <!--              name="i-lucide-home" -->
        <!--              class="w-4 h-4 mr-1" -->
        <!--            /> -->
        <!--            {{ property.propertyType }} -->
        <!--          </UBadge> -->
        <!--        </div> -->
      </div>
    </template>

    <div class="space-y-4">
      <h3 class="text-xl font-semibold">
        {{ property.title }}
      </h3>

      <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <UIcon
          name="i-lucide-map-pin"
          class="w-5 h-5"
        />
        <span>{{ property.city }}</span>
      </div>

      <div class="flex items-center gap-6 text-gray-700 dark:text-gray-300">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-bed"
            class="w-5 h-5"
          />
          <span>{{ property.rooms }} Beds</span>
        </div>

        <!--        <div class="flex items-center gap-2"> -->
        <!--          <UIcon -->
        <!--            name="i-lucide-bath" -->
        <!--            class="w-5 h-5" -->
        <!--          /> -->
        <!--          <span>{{ property.baths }} Baths</span> -->
        <!--        </div> -->

        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-maximize-2"
            class="w-5 h-5"
          />
          <span>{{ property.area }} sqft</span>
        </div>
      </div>

      <USeparator />

      <div class="flex items-center justify-between">
        <div>
          <span class="text-xl font-bold text-primary">
            ₴{{ property.price.toLocaleString() }}
          </span>
        </div>

        <UButton
          icon="i-lucide-arrow-right"
          color="primary"
          variant="ghost"
          size="lg"
          trailing
        >
          Детальніше
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { IListing } from '~/types/listing'

interface Props {
  property: IListing
}

defineProps<Props>()
</script>
