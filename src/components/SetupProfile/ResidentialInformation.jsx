import { Controller } from 'react-hook-form'
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material'
import styles from './ResidentialInformation.module.css'
import { inputFieldStyles, selectFieldStyles, numberInputStyles } from './styles'
import { transformInputValue } from './inputTransformers'

function ResidentialInformation({ control, errors = {} }) {
  return (
    <Box className={styles.sectionContainer}>
      <Typography
        variant="h6"
        className={styles.sectionTitle}
      >
        Residential Information
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Current Residential Address <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="currentAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Flat No, Building, Road"
                  error={!!errors.currentAddress}
                  helperText={errors.currentAddress?.message}
                  sx={inputFieldStyles}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="City"
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={inputFieldStyles}
                onChange={(e) => {
                  const transformed = transformInputValue('city', e.target.value)
                  if (transformed !== null) {
                    field.onChange(transformed)
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="State"
                error={!!errors.state}
                helperText={errors.state?.message}
                sx={inputFieldStyles}
                onChange={(e) => {
                  const transformed = transformInputValue('state', e.target.value)
                  if (transformed !== null) {
                    field.onChange(transformed)
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Pincode"
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
                sx={inputFieldStyles}
                onChange={(e) => {
                  const transformed = transformInputValue('pincode', e.target.value)
                  if (transformed !== null) {
                    field.onChange(transformed)
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Residential Status <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="residentialStatus"
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
                        return 'Select Status';
                      }
                      const options = {
                        owned: 'Owned',
                        rented: 'Rented',
                        parental: 'Parental',
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
                  error={!!errors.residentialStatus}
                  helperText={errors.residentialStatus?.message}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="owned">Owned</MenuItem>
                  <MenuItem value="rented">Rented</MenuItem>
                  <MenuItem value="parental">Parental</MenuItem>
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
              Duration of Stay at Current Address <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Box className={styles.durationContainer}>
              <Controller
                name="yearsAtAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    inputProps={{
                      min: 0,
                    }}
                    value={field.value ?? ''}
                    error={!!errors.yearsAtAddress}
                    helperText={errors.yearsAtAddress?.message}
                    sx={{
                      flex: 1,
                      ...numberInputStyles,
                    }}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') {
                        field.onChange(undefined)
                      } else {
                        const numValue = parseInt(value, 10)
                        if (!isNaN(numValue) && numValue >= 0) {
                          field.onChange(numValue)
                        }
                      }
                    }}
                  />
                )}
              />
              <Typography
                variant="body2"
                className={styles.durationLabel}
              >
                Years
              </Typography>
              <Controller
                name="monthsAtAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 11,
                    }}
                    value={field.value ?? ''}
                    error={!!errors.monthsAtAddress}
                    helperText={errors.monthsAtAddress?.message}
                    sx={{
                      flex: 1,
                      ...numberInputStyles,
                    }}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') {
                        field.onChange(undefined)
                      } else {
                        const numValue = parseInt(value, 10)
                        if (!isNaN(numValue) && numValue >= 0 && numValue <= 11) {
                          field.onChange(numValue)
                        }
                      }
                    }}
                  />
                )}
              />
              <Typography
                variant="body2"
                className={styles.durationLabelMonths}
              >
                Months
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResidentialInformation

