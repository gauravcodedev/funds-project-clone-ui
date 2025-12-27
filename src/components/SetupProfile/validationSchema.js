import * as yup from 'yup'

const today = new Date()
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
const maxDateString = maxDate.toISOString().split('T')[0]
const todayString = today.toISOString().split('T')[0]

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Full Name cannot contain numbers'),
  
  dateOfBirth: yup
    .string()
    .required('Date of Birth is required')
    .test('max-date', 'You must be at least 18 years old', (value) => {
      if (!value) return false
      return value <= maxDateString
    })
    .test('not-future', 'Date of Birth cannot be in the future', (value) => {
      if (!value) return false
      return value <= todayString
    }),
  
  gender: yup
    .string()
    .required('Gender is required'),
  
  maritalStatus: yup
    .string()
    .required('Marital Status is required'),
  
  fathersName: yup
    .string()
    .required("Father's Name is required")
    .min(2, "Father's Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]*$/, "Father's Name cannot contain numbers"),
  
  mothersName: yup
    .string()
    .required("Mother's Name is required")
    .min(2, "Mother's Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]*$/, "Mother's Name cannot contain numbers"),
  
  email: yup
    .string()
    .required('Email ID is required')
    .email('Please enter a valid email address')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Email must include a domain extension (e.g., .com, .org)'
    ),
  
  currentAddress: yup
    .string()
    .required('Current Residential Address is required')
    .min(5, 'Current Residential Address must be at least 5 characters'),
  
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'City cannot contain numbers'),
  
  state: yup
    .string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'State cannot contain numbers'),
  
  pincode: yup
    .string()
    .required('Pincode is required')
    .min(6, 'Pincode must be at least 6 digits')
    .matches(/^[0-9]*$/, 'Pincode must contain only numbers'),
  
  residentialStatus: yup
    .string()
    .required('Residential Status is required'),
  
  yearsAtAddress: yup
    .number()
    .typeError('Years at address is required')
    .required('Years at address is required')
    .min(0, 'Years at address cannot be negative')
    .integer('Years must be a whole number'),
  
  monthsAtAddress: yup
    .number()
    .typeError('Months at address is required')
    .required('Months at address is required')
    .min(0, 'Months at address cannot be negative')
    .max(11, 'Months must be between 0 and 11')
    .integer('Months must be a whole number'),
  
  numberOfDependents: yup
    .number()
    .typeError('Number of Dependents is required')
    .required('Number of Dependents is required')
    .min(0, 'Number of Dependents cannot be negative')
    .integer('Number of Dependents must be a whole number'),
  
  educationalQualification: yup
    .string()
    .required('Educational Qualification is required'),
})

