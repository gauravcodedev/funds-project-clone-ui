import { Controller } from 'react-hook-form'
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material'
import styles from './AdditionalDetails.module.css'
import { numberInputStyles, selectFieldStyles } from './styles'
import { transformInputValue } from './inputTransformers'

function AdditionalDetails({ control, errors = {} }) {
  return (
    <Box className={styles.sectionContainer}>
      <Typography
        variant="h6"
        className={styles.sectionTitle}
      >
        Additional Details
      </Typography>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Number of Dependents <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="numberOfDependents"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={field.value ?? ''}
                  error={!!errors.numberOfDependents}
                  helperText={errors.numberOfDependents?.message}
                  sx={numberInputStyles}
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
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              className={styles.label}
            >
              Educational Qualification <span className={styles.requiredAsterisk}>*</span>
            </Typography>
            <Controller
              name="educationalQualification"
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
                        return 'Select Qualification';
                      }
                      const options = {
                        'high-school': 'High School',
                        diploma: 'Diploma',
                        bachelor: "Bachelor's Degree",
                        master: "Master's Degree",
                        phd: 'PhD',
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
                  error={!!errors.educationalQualification}
                  helperText={errors.educationalQualification?.message}
                >
                  <MenuItem value="">Select Qualification</MenuItem>
                  <MenuItem value="high-school">High School</MenuItem>
                  <MenuItem value="diploma">Diploma</MenuItem>
                  <MenuItem value="bachelor">Bachelor's Degree</MenuItem>
                  <MenuItem value="master">Master's Degree</MenuItem>
                  <MenuItem value="phd">PhD</MenuItem>
                </TextField>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdditionalDetails

