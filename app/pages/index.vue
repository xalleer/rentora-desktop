<template>
  <div>
    <div class="my-10">
      <section class="flex flex-col gap-3">
        <h1 class="text-2xl font-bold">
          Discover Your Perfect Home
        </h1>
        <p>Browse through our collection of properties for rent and sale</p>
      </section>

      <section class="p-6 mt-10 rounded-2xl w-full gap-4 flex flex-col items-center bg-neutral shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
        <div class="flex w-full gap-4">
          <UInput
            v-model="searchQuery"
            class="w-full rounded-2xl"
            icon="i-lucide-search"
            size="xl"
            variant="outline"
            placeholder="Search..."
          />

          <UButton
            icon="i-lucide-filter"
            class="cursor-pointer"
            size="xl"
            color="neutral"
            variant="outline"
            @click="isShowFilters = !isShowFilters"
          >
            Фільтри
          </UButton>
        </div>

        <PropertyFilters
          ref="filtersRef"
          v-model="isShowFilters"
          @reset="handleFiltersReset"
          @apply="handleFiltersApply"
        />
      </section>
    </div>

    <div class="mt-10">
      <UEmpty
        v-if="isEmpty"
        title="Оголошень не знайдено"
        description="Спробуйте скинути фільтри або змінити пошуковий запит"
      >
        <template #actions>
          <UButton
            icon="i-lucide-refresh-ccw"
            label="Скинути фільтри"
            color="neutral"
            variant="outline"
            @click="handleResetFromEmpty"
          />
        </template>
      </UEmpty>

      <div v-else>
        <h2 class="text-md mb-4">
          Знайдено {{ properties.length }} оголошення
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard
            v-for="property in properties"
            :key="property.id"
            :property="property"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isShowFilters = ref(false)
const isEmpty = ref(false)
const searchQuery = ref('')
const filtersRef = ref()

const properties = ref([
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    title: 'Modern Downtown Apartment',
    location: 'Downtown, Mumbai',
    beds: 2,
    baths: 2,
    sqft: 1200,
    price: 25000,
    listingType: 'rent',
    propertyType: 'Apartment'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    title: 'Luxury Villa with Pool',
    location: 'Bandra, Mumbai',
    beds: 4,
    baths: 3,
    sqft: 2500,
    price: 85000,
    listingType: 'rent',
    propertyType: 'House'
  }
])

const handleFiltersApply = (filters: any) => {
  console.log('Застосовані фільтри:', filters)

  // Тут робіть фільтрацію або запит до API
  // Приклад:
  // const filtered = properties.value.filter(...)
  // isEmpty.value = filtered.length === 0
}

const handleFiltersReset = () => {
  console.log('Фільтри скинуто')
  searchQuery.value = ''
  isEmpty.value = false
}

const handleResetFromEmpty = () => {
  // Викликаємо метод reset з компонента через ref
  filtersRef.value?.reset()
}
</script>
