import type { IListing } from '~/types/listing'
import type { MetaPagination } from '~/types/meta'

export const useListingApi = () => {
  const { $api } = useNuxtApp()

  return {
    getListings: () => $api.get<MetaPagination<Array<IListing>>>('/listings')
  }
}
