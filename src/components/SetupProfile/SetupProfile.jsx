import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material'
import BasicPersonalInformation from './BasicPersonalInformation'
import ContactInformation from './ContactInformation'
import ResidentialInformation from './ResidentialInformation'
import AdditionalDetails from './AdditionalDetails'
import styles from './SetupProfile.module.css'
import { validationSchema } from './validationSchema'

function SetupProfile() {
  const [showThankYou, setShowThankYou] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      fathersName: '',
      mothersName: '',
      email: '',
      currentAddress: '',
      city: '',
      state: '',
      pincode: '',
      residentialStatus: '',
      yearsAtAddress: undefined,
      monthsAtAddress: undefined,
      numberOfDependents: undefined,
      educationalQualification: '',
    },
    mode: 'onChange',
  })

  const handleSave = handleSubmit((data) => {
    console.log('Form Data:', data)
  })

  const handleNext = handleSubmit((data) => {
    try {
      localStorage.setItem('profileFormData', JSON.stringify(data))
      console.log('Data saved to localStorage and navigating to next page')
      alert('Form data saved successfully! Proceeding to next step...')
      setShowThankYou(true)
    } catch (error) {
      console.error('Error saving data:', error)
    }
  })

  if (showThankYou) {
    return (
      <Box className={styles.thankYouContainer}>
        <Container maxWidth="sm">
          <Paper elevation={0} className={styles.thankYouPaper}>
            <Typography
              variant="h4"
              component="h1"
              className={styles.thankYouTitle}
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              Thank You!
            </Typography>
            <Typography
              variant="body1"
              className={styles.thankYouText}
            >
              Your personal details have been submitted successfully. We will review your information and get back to you soon.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setShowThankYou(false)
                reset()
              }}
              className={styles.thankYouButton}
            >
              Submit Another Form
            </Button>
          </Paper>
        </Container>
      </Box>
    )
  }

  return (
    <Box className={styles.setupProfileContainer}>
      <Container maxWidth="lg" className={styles.formContainer} sx={{ px: { xs: 2, sm: 3 } }}>
        <Paper elevation={0} className={styles.formPaper}>
          <Box className={styles.titleContainer}>
            <Typography
              variant="h4"
              component="h1"
              className={styles.title}
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
            >
              Setup Profile - Personal Details
            </Typography>
            <Typography
              variant="body1"
              className={styles.subtitle}
            >
              Please provide your personal and residential information to continue your loan application.
            </Typography>
          </Box>

          <BasicPersonalInformation control={control} errors={errors} />
          <ContactInformation control={control} errors={errors} />
          <ResidentialInformation control={control} errors={errors} />
          <AdditionalDetails control={control} errors={errors} />

          <Box className={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={handleSave}
              className={styles.saveButton}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              className={styles.nextButton}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>

    </Box>
  )
}
export default SetupProfile

