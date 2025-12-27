import React from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
} from "@mui/material";
import { countries } from "./countries";

const PhoneInputAllCountries = ({ onPhoneChange, onCountryChange, error, helperText }) => {
  const [country, setCountry] = React.useState(
    countries.find((c) => c.code === "IN")
  );
  const [phone, setPhone] = React.useState("");

  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.code === e.target.value);
    setCountry(selected);
    if (onCountryChange) onCountryChange(selected);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (onPhoneChange) onPhoneChange(value);
  };

  return (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      {/* Country Code */}
      <Grid item size={3} xs={4} sm={3}>
        <FormControl fullWidth>
          <Select
            value={country.code}
            onChange={handleCountryChange}
          >
            {countries.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt={option.label}
                  />
                  <Typography variant="body2">
                    +{option.phone}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Phone Number */}
      <Grid item size={9} xs={8} sm={9}>
        <TextField
          fullWidth
          placeholder="Enter mobile number"
          value={phone}
          onChange={handlePhoneChange}
          error={error}
          helperText={helperText}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneInputAllCountries;
