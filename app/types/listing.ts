export interface IListing {
  id: number
  ownerId: number
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  type: 'APARTMENT' | 'HOUSE' | 'ROOM'
  title: string
  description: string

  price: string
  currency: 'UAH' | 'USD' | 'EUR'
  rooms: number
  area: string
  deposit: string

  city: string
  address: string
  latitude: number | null
  longitude: number | null
  floor: number | null

  ownershipDocsJson: string[]

  adminNotes: string | null

  availableFrom: string // ISO date
  createdAt: string // ISO date
  updatedAt: string // ISO date
  expiresAt: string // ISO date

  videoUrl: string | null

  plan: 'FREE' | 'PREMIUM' | 'VIP'

  amenities: string[]

  totalListingCost: string
  priority: number
  bumpsRemaining: number
  lastBumpedAt: string | null

  owner: ListingOwner

  photos: ListingPhoto[]

  isSaved: boolean
  isPromoted: boolean
  isPremium: boolean
}

export interface ListingOwner {
  id: number
  displayName: string
}

export interface ListingPhoto {
  url: string
}
