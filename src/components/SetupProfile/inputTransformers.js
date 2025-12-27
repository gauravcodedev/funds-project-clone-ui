// Helper functions for transforming input values based on field type

export const transformInputValue = (field, value) => {
  if (field === 'dateOfBirth') {
    const today = new Date()
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    const maxDateString = maxDate.toISOString().split('T')[0]
    const todayString = today.toISOString().split('T')[0]
    
    if (value > todayString || value > maxDateString) {
      return null
    }
    return value
  }
  
  if (['fullName', 'fathersName', 'mothersName', 'city', 'state'].includes(field)) {
    return value.replace(/[0-9]/g, '')
  }
  
  if (field === 'pincode') {
    return value.replace(/[^0-9]/g, '')
  }
  
  if (field === 'email') {
    let transformed = value.replace(/\s/g, '')
    const atCount = (transformed.match(/@/g) || []).length
    if (atCount > 1) {
      return null
    }
    const emailPattern = /^[a-zA-Z0-9._%+-@]*$/
    if (transformed && !emailPattern.test(transformed)) {
      return null
    }
    return transformed
  }
  
  if (['yearsAtAddress', 'monthsAtAddress', 'numberOfDependents'].includes(field)) {
    if (value === '') {
      return ''
    }
    const numValue = parseInt(value, 10)
    if (isNaN(numValue) || numValue < 0) {
      return ''
    }
    return value
  }
  
  return value
}

