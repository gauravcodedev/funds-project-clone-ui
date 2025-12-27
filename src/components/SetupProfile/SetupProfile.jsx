import { useState, useEffect } from 'react'
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
import { useAxios } from '../../hooks'
import { Alert } from '@mui/material'

function SetupProfile() {
  const [showThankYou, setShowThankYou] = useState(false)

  // Load saved data from localStorage
  const getSavedData = () => {
    try {
      const saved = localStorage.getItem('profileFormData')
      return saved ? JSON.parse(saved) : {}
    } catch (error) {
      console.error('Error loading saved data:', error)
      return {}
    }
  }

  const savedData = getSavedData()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: savedData.fullName || '',
      dateOfBirth: savedData.dateOfBirth || '',
      gender: savedData.gender || '',
      maritalStatus: savedData.maritalStatus || '',
      fathersName: savedData.fathersName || '',
      mothersName: savedData.mothersName || '',
      email: savedData.email || '',
      currentAddress: savedData.currentAddress || '',
      city: savedData.city || '',
      state: savedData.state || '',
      pincode: savedData.pincode || '',
      residentialStatus: savedData.residentialStatus || '',
      yearsAtAddress: savedData.yearsAtAddress,
      monthsAtAddress: savedData.monthsAtAddress,
      numberOfDependents: savedData.numberOfDependents,
      educationalQualification: savedData.educationalQualification || '',
    },
    mode: 'onChange',
  })

  const { execute, loading, error: apiError } = useAxios();
  const { execute: fetchProfile, loading: fetchingProfile } = useAxios();

  // Fetch profile data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetchProfile({
          url: '/api/profile',
          method: 'GET'
        });

        if (response.success && response.user) {
          // Transform API response back to form field names
          const apiData = response.user;
          
          // Format date from ISO string to YYYY-MM-DD format
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };

          const formData = {
            fullName: apiData.fullName || '',
            dateOfBirth: formatDate(apiData.dateOfBirth) || '',
            gender: apiData.gender || '',
            maritalStatus: apiData.maritalStatus || '',
            fathersName: apiData.fatherName || '', // Mapped from fatherName
            mothersName: apiData.motherName || '', // Mapped from motherName
            email: apiData.email || '',
            currentAddress: apiData.address || '', // Mapped from address
            city: apiData.city || '',
            state: apiData.state || '',
            pincode: apiData.zipcode || '', // Mapped from zipcode
            residentialStatus: apiData.residentialStatus || '',
            yearsAtAddress: apiData.durationOfStayYears || 0,
            monthsAtAddress: apiData.durationOfStayMonths || 0,
            numberOfDependents: apiData.numberOfDependents || 0,
            educationalQualification: apiData.educationalQualification || '',
          };

          // Populate form with fetched data
          reset(formData);
          // Also save to localStorage for consistency
          localStorage.setItem('profileFormData', JSON.stringify(formData));
        }
      } catch (err) {
        // If profile doesn't exist or error occurs, use localStorage data
        console.log('No profile data found or error fetching:', err);
        // Form will use localStorage data from defaultValues
      }
    };

    loadProfileData();
  }, [fetchProfile, reset]);

  const handleSave = handleSubmit((data) => {
    localStorage.setItem('profileFormData', JSON.stringify(data))
    alert('Progress saved successfully!')
  })

  const handleNext = handleSubmit(async (data) => {
    // Helper to capitalize first letter
    const capitalize = (val) => {
      if (typeof val !== 'string' || val.length === 0) return val;
      return val.charAt(0).toUpperCase() + val.slice(1);
    };

    // Transform form data to match the requested payload structure
    const payload = {
      fullName: capitalize(data.fullName),
      dateOfBirth: data.dateOfBirth,
      gender: capitalize(data.gender),
      maritalStatus: capitalize(data.maritalStatus),
      fatherName: capitalize(data.fathersName), // Mapped from fathersName
      motherName: capitalize(data.mothersName), // Mapped from mothersName
      email: data.email,
      address: capitalize(data.currentAddress), // Mapped from currentAddress
      city: capitalize(data.city),
      state: capitalize(data.state),
      zipcode: data.pincode,        // Mapped from pincode
      residentialStatus: capitalize(data.residentialStatus),
      durationOfStayYears: Number(data.yearsAtAddress) || 0,
      durationOfStayMonths: Number(data.monthsAtAddress) || 0,
      numberOfDependents: Number(data.numberOfDependents) || 0,
      educationalQualification: capitalize(data.educationalQualification)
    };

    try {
      const response = await execute({
        url: '/api/profile',
        method: 'PUT',
        data: payload
      });

      if (response.success) {
        localStorage.setItem('profileFormData', JSON.stringify(data));
        setShowThankYou(true);
      }
    } catch (err) {
      console.error('Error submitting profile:', err);
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
                // Clear all data
                localStorage.removeItem('profileFormData')
                localStorage.removeItem('token')
                // Force full page reload to login page
                window.location.href = '/'
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

          {fetchingProfile ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1">Loading profile data...</Typography>
            </Box>
          ) : (
            <>
              <BasicPersonalInformation control={control} errors={errors} />
              <ContactInformation control={control} errors={errors} />
              <ResidentialInformation control={control} errors={errors} />
              <AdditionalDetails control={control} errors={errors} />
            </>
          )}

          {apiError && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">{apiError}</Alert>
            </Box>
          )}

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
              disabled={loading || fetchingProfile}
              className={styles.nextButton}
            >
              {loading ? 'Processing...' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>

    </Box>
  )
}
export default SetupProfile

