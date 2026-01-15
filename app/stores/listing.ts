import { defineStore } from 'pinia'
import { useListingApi } from '~/services/listing'
import type { IListing } from '~/types/listing'

export const useListingStore = defineStore('listing', () => {
  const api = useListingApi()
  const loading = ref<boolean>(false)
  const listings = ref<IListing[]>([])

  const getListings = async () => {
    loading.value = true
    try {
      const response = await api.getListings()
      listings.value = response.data.data
      console.log(response)
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getListings,
    listings
  }
})
