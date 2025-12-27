import { Controller } from 'react-hook-form'
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material'
import styles from './BasicPersonalInformation.module.css'
import { inputFieldStyles, selectFieldStyles, dateInputStyles } from './styles'
import { transformInputValue } from './inputTransformers'

function BasicPersonalInformation({ control, errors = {} }) {
  const today = new Date()
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
  const maxDateString = maxDate.toISOString().split('T')[0]
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
  const minDateString = minDate.toISOString().split('T')[0]

  return (
    <Box className={styles.sectionContainer}>
      <Typography
        variant="h6"
        className={styles.sectionTitle}
      >
        Basic Personal Information
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Full Name (as per PAN/Aadhaar) <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter your full name"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  sx={inputFieldStyles}
                  onChange={(e) => {
                    const transformed = transformInputValue('fullName', e.target.value)
                    if (transformed !== null) {
                      field.onChange(transformed)
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Date of Birth <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  inputProps={{
                    max: maxDateString,
                    min: minDateString,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  sx={dateInputStyles}
                  onChange={(e) => {
                    const transformed = transformInputValue('dateOfBirth', e.target.value)
                    if (transformed !== null) {
                      field.onChange(transformed)
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Gender <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  displayEmpty
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected || selected === '') {
                        return 'Select Gender';
                      }
                      const options = {
                        male: 'Male',
                        female: 'Female',
                        other: 'Other',
                      };
                      return options[selected] || selected;
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  sx={{
                    ...selectFieldStyles,
                    '& .MuiSelect-select': {
                      ...selectFieldStyles['& .MuiSelect-select'],
                      color: field.value ? '#333333' : '#000000',
                    },
                  }}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Marital Status <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  displayEmpty
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected || selected === '') {
                        return 'Select Marital Status';
                      }
                      const options = {
                        single: 'Single',
                        married: 'Married',
                        divorced: 'Divorced',
                        widowed: 'Widowed',
                      };
                      return options[selected] || selected;
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  sx={{
                    ...selectFieldStyles,
                    '& .MuiSelect-select': {
                      ...selectFieldStyles['& .MuiSelect-select'],
                      color: field.value ? '#333333' : '#000000',
                    },
                  }}
                  error={!!errors.maritalStatus}
                  helperText={errors.maritalStatus?.message}
                >
                  <MenuItem value="">Select Marital Status</MenuItem>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                  <MenuItem value="widowed">Widowed</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Father's Name <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="fathersName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter father's name"
                  error={!!errors.fathersName}
                  helperText={errors.fathersName?.message}
                  sx={inputFieldStyles}
                  onChange={(e) => {
                    const transformed = transformInputValue('fathersName', e.target.value)
                    if (transformed !== null) {
                      field.onChange(transformed)
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Mother's Name <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="mothersName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter mother's name"
                  error={!!errors.mothersName}
                  helperText={errors.mothersName?.message}
                  sx={inputFieldStyles}
                  onChange={(e) => {
                    const transformed = transformInputValue('mothersName', e.target.value)
                    if (transformed !== null) {
                      field.onChange(transformed)
                    }
                  }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BasicPersonalInformation

