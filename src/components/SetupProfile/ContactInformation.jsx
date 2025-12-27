import { Controller } from 'react-hook-form'
import { Box, Typography, TextField, Grid } from '@mui/material'
import styles from './ContactInformation.module.css'
import { inputFieldStyles } from './styles'
import { transformInputValue } from './inputTransformers'

function ContactInformation({ control, errors = {} }) {
  return (
    <Box className={styles.sectionContainer}>
      <Typography
        variant="h6"
        className={styles.sectionTitle}
      >
        Contact Information
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Email ID <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  placeholder="your.email@example.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={inputFieldStyles}
                  onChange={(e) => {
                    const transformed = transformInputValue('email', e.target.value)
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

export default ContactInformation

