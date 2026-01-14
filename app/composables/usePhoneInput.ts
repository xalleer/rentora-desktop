export const usePhoneInput = () => {
  const selectedCountry = ref(countries[0])
  const phoneNumber = ref('')
  const fullPhoneNumber = computed(() => {
    const cleaned = phoneNumber.value.replace(/\D/g, '')
    return cleaned ? `${selectedCountry?.value?.dialCode}${cleaned}` : ''
  })

  const formattedPhone = computed(() => {
    if (!phoneNumber.value) return ''
    return formatPhoneNumber(phoneNumber.value, selectedCountry?.value?.mask || '')
  })

  const setCountry = (country: typeof countries[0]) => {
    selectedCountry.value = country
    phoneNumber.value = ''
  }

  return {
    selectedCountry,
    phoneNumber,
    fullPhoneNumber,
    formattedPhone,
    setCountry,
    countries
  }
}
