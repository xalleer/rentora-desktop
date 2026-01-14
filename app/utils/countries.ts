export const countries = [
  { code: 'UA', name: 'Україна', dialCode: '+380', mask: '## ### ## ##' }
  // { code: 'PL', name: 'Польща', dialCode: '+48', mask: '### ### ###' }
]

export const getCountryByDialCode = (dialCode: string) => {
  return countries.find(c => c.dialCode === dialCode) || countries[0]
}

export const formatPhoneNumber = (phone: string, mask: string): string => {
  const digits = phone.replace(/\D/g, '')
  let formatted = ''
  let digitIndex = 0

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === '#') {
      formatted += digits[digitIndex]
      digitIndex++
    } else {
      formatted += mask[i]
    }
  }

  return formatted
}
