// Shared style objects for Material-UI components
// These styles are scoped to SetupProfile components and won't affect other files

export const inputFieldStyles = {
  backgroundColor: '#ffffff',
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#14b8a6',
      borderWidth: '1px',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#333333',
    py: 1.375,
    fontSize: '0.875rem',
    '&::placeholder': {
      color: '#000000',
      opacity: 1,
    },
  },
}

export const selectFieldStyles = {
  backgroundColor: '#ffffff',
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#14b8a6',
      borderWidth: '1px',
    },
  },
  '& .MuiSelect-select': {
    py: 1.375,
    fontSize: '0.875rem',
  },
}

export const dateInputStyles = {
  backgroundColor: '#ffffff',
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#14b8a6',
      borderWidth: '1px',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#333333',
    py: 1.375,
    fontSize: '0.875rem',
  },
}

export const numberInputStyles = {
  backgroundColor: '#ffffff',
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#14b8a6',
      borderWidth: '1px',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#333333',
    py: 1.375,
    fontSize: '0.875rem',
  },
}

