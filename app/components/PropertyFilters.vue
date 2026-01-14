<template>
  <div class="w-full">
    <div
      v-if="activeFiltersCount > 0 && !isShowFilters"
      class="w-full flex flex-wrap gap-2"
    >
      <UBadge
        v-for="filter in activeFiltersList"
        :key="filter.key"
        color="primary"
        variant="soft"
        size="md"
      >
        {{ filter.label }}
        <UIcon
          name="i-lucide-x"
          class="w-3 h-3 ml-1 cursor-pointer"
          @click="removeFilter(filter.key)"
        />
      </UBadge>
      <UButton
        size="xs"
        variant="ghost"
        @click="resetFilters"
      >
        Скинути всі
      </UButton>
    </div>

    <!-- Фільтри з анімацією -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <section
        v-if="isShowFilters"
        class="w-full overflow-hidden"
      >
        <USeparator class="mb-4" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-home"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Тип нерухомості</span>
            </div>
            <URadioGroup
              v-model="filters.propertyType"
              size="sm"
              indicator="hidden"
              variant="card"
              orientation="horizontal"
              :items="propertyTypeItems"
            />
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-map-pin"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Місто</span>
            </div>
            <UInputMenu
              v-model="filters.city"
              placeholder="Оберіть місто..."
              :items="ukrainianCities"
              size="md"
            />
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-banknote"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Ціна (₴/міс)</span>
            </div>
            <div class="flex gap-2">
              <UInput
                v-model="filters.priceFrom"
                type="number"
                placeholder="Від"
                size="md"
              />
              <UInput
                v-model="filters.priceTo"
                type="number"
                placeholder="До"
                size="md"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bed"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Кількість кімнат</span>
            </div>
            <UCheckboxGroup
              v-model="filters.rooms"
              size="sm"
              orientation="horizontal"
              :items="roomsItems"
            />
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-maximize-2"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Площа (м²)</span>
            </div>
            <div class="flex gap-2">
              <UInput
                v-model="filters.areaFrom"
                type="number"
                placeholder="Від"
                size="md"
              />
              <UInput
                v-model="filters.areaTo"
                type="number"
                placeholder="До"
                size="md"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-layers"
                class="w-4 h-4 text-gray-500"
              />
              <span class="text-sm font-semibold">Поверх</span>
            </div>
            <div class="flex gap-2">
              <UInput
                v-model="filters.floorFrom"
                type="number"
                placeholder="Від"
                size="md"
              />
              <UInput
                v-model="filters.floorTo"
                type="number"
                placeholder="До"
                size="md"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-sparkles"
              class="w-4 h-4 text-gray-500"
            />
            <span class="text-sm font-semibold">Зручності</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <UCheckbox
              v-for="amenity in amenitiesItems"
              :key="amenity.value"
              :model-value="filters.amenities.includes(amenity.value)"
              :label="amenity.label"
              @update:model-value="toggleAmenity(amenity.value)"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-dog"
              class="w-4 h-4 text-gray-500"
            />
            <span class="text-sm font-semibold">З тваринами</span>
          </div>
          <URadioGroup
            v-model="filters.petsAllowed"
            size="sm"
            indicator="hidden"
            variant="card"
            orientation="horizontal"
            :items="petsAllowedItems"
          />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton
            color="primary"
            size="sm"
            icon="i-lucide-search"
            @click="handleApply"
          >
            Застосувати
          </UButton>
          <UButton
            variant="outline"
            size="sm"
            icon="i-lucide-x"
            @click="handleReset"
          >
            Скинути
          </UButton>
        </div>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Filters {
  propertyType: string
  city: string
  priceFrom: string
  priceTo: string
  rooms: string[]
  areaFrom: string
  areaTo: string
  floorFrom: string
  floorTo: string
  amenities: string[]
  petsAllowed: string
}

interface Props {
  modelValue?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'apply', filters: Filters): void
  (e: 'reset'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emit = defineEmits<Emits>()

const isShowFilters = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const defaultFilters: Filters = {
  propertyType: 'apartment',
  city: '',
  priceFrom: '',
  priceTo: '',
  rooms: [],
  areaFrom: '',
  areaTo: '',
  floorFrom: '',
  floorTo: '',
  amenities: [],
  petsAllowed: 'any'
}

const filters = ref<Filters>({ ...defaultFilters })
const appliedFilters = ref<Filters>({ ...defaultFilters })

const propertyTypeItems = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Будинок' }
]

const roomsItems = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4+' }
]

const amenitiesItems = [
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'ac', label: 'Кондиціонер' },
  { value: 'heating', label: 'Опалення' },
  { value: 'parking', label: 'Паркінг' },
  { value: 'elevator', label: 'Ліфт' },
  { value: 'balcony', label: 'Балкон' }
]

const petsAllowedItems = [
  { value: 'yes', label: 'Так' },
  { value: 'no', label: 'Ні' },
  { value: 'any', label: 'Не важливо' }
]

const ukrainianCities = [
  'Київ', 'Харків', 'Одеса', 'Дніпро', 'Донецьк', 'Запоріжжя',
  'Львів', 'Кривий Ріг', 'Миколаїв', 'Маріуполь', 'Луганськ',
  'Вінниця', 'Сімферополь', 'Херсон', 'Полтава', 'Чернігів',
  'Черкаси', 'Житомир', 'Суми', 'Хмельницький', 'Чернівці',
  'Рівне', 'Івано-Франківськ', 'Тернопіль', 'Луцьк', 'Ужгород'
]

const toggleAmenity = (value: string) => {
  const index = filters.value.amenities.indexOf(value)
  if (index > -1) {
    filters.value.amenities.splice(index, 1)
  } else {
    filters.value.amenities.push(value)
  }
}

const handleApply = () => {
  appliedFilters.value = JSON.parse(JSON.stringify(filters.value))
  emit('apply', appliedFilters.value)
  isShowFilters.value = false
}

const handleReset = () => {
  filters.value = { ...defaultFilters }
  appliedFilters.value = { ...defaultFilters }
  emit('reset')
  emit('apply', appliedFilters.value)
}

const resetFilters = () => {
  handleReset()
}

const removeFilter = (key: string) => {
  if (key === 'city') filters.value.city = ''
  else if (key === 'price') {
    filters.value.priceFrom = ''
    filters.value.priceTo = ''
  } else if (key === 'area') {
    filters.value.areaFrom = ''
    filters.value.areaTo = ''
  } else if (key === 'floor') {
    filters.value.floorFrom = ''
    filters.value.floorTo = ''
  } else if (key.startsWith('room-')) {
    const room = key.replace('room-', '')
    filters.value.rooms = filters.value.rooms.filter(r => r !== room)
  } else if (key.startsWith('amenity-')) {
    const amenity = key.replace('amenity-', '')
    filters.value.amenities = filters.value.amenities.filter(a => a !== amenity)
  } else if (key === 'pets') {
    filters.value.petsAllowed = 'any'
  }

  appliedFilters.value = JSON.parse(JSON.stringify(filters.value))
  emit('apply', appliedFilters.value)
}

const activeFiltersCount = computed(() => {
  let count = 0

  if (appliedFilters.value.city) count++
  if (appliedFilters.value.priceFrom || appliedFilters.value.priceTo) count++
  if (appliedFilters.value.rooms.length > 0) count += appliedFilters.value.rooms.length
  if (appliedFilters.value.areaFrom || appliedFilters.value.areaTo) count++
  if (appliedFilters.value.floorFrom || appliedFilters.value.floorTo) count++
  if (appliedFilters.value.amenities.length > 0) count += appliedFilters.value.amenities.length
  if (appliedFilters.value.petsAllowed !== 'any') count++

  return count
})

const activeFiltersList = computed(() => {
  const list = []

  if (appliedFilters.value.city) {
    list.push({ key: 'city', label: `📍 ${appliedFilters.value.city}` })
  }

  if (appliedFilters.value.priceFrom || appliedFilters.value.priceTo) {
    const from = appliedFilters.value.priceFrom || '0'
    const to = appliedFilters.value.priceTo || '∞'
    list.push({ key: 'price', label: `💰 ${from} - ${to} ₴` })
  }

  appliedFilters.value.rooms.forEach((room) => {
    list.push({ key: `room-${room}`, label: `🛏️ ${room} кімн.` })
  })

  if (appliedFilters.value.areaFrom || appliedFilters.value.areaTo) {
    const from = appliedFilters.value.areaFrom || '0'
    const to = appliedFilters.value.areaTo || '∞'
    list.push({ key: 'area', label: `📐 ${from} - ${to} м²` })
  }

  if (appliedFilters.value.floorFrom || appliedFilters.value.floorTo) {
    const from = appliedFilters.value.floorFrom || '0'
    const to = appliedFilters.value.floorTo || '∞'
    list.push({ key: 'floor', label: `🏢 ${from} - ${to} поверх` })
  }

  appliedFilters.value.amenities.forEach((amenity) => {
    const item = amenitiesItems.find(a => a.value === amenity)
    if (item) {
      list.push({ key: `amenity-${amenity}`, label: `✨ ${item.label}` })
    }
  })

  if (appliedFilters.value.petsAllowed !== 'any') {
    const label = appliedFilters.value.petsAllowed === 'yes' ? 'З тваринами' : 'Без тварин'
    list.push({ key: 'pets', label: `🐕 ${label}` })
  }

  return list
})

defineExpose({
  reset: handleReset
})
</script>
