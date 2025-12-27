
import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Alert,
} from "@mui/material";
import login from '../images/loginpic.jpg'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PhoneInputAllCountries from "./PhoneInputWithFlag";
import VerifyOtp from "./VerifyOtp";
import { countries } from "./countries";
import { useAxios } from "../../hooks";

// Mobile number validation function
const validateMobileNumber = (phone, countryCode) => {
    // Remove any non-digit characters first
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

    if (!cleanPhone || cleanPhone === '') {
        return { isValid: false, error: 'Mobile number is required' };
    }

    // Validation rules based on country code
    const validationRules = {
        'IN': { // India
            minLength: 10,
            maxLength: 10,
            pattern: /^[6-9]\d{9}$/,
            error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
        },
        'US': { // United States
            minLength: 10,
            maxLength: 10,
            pattern: /^[2-9]\d{9}$/,
            error: 'Please enter a valid 10-digit US phone number'
        },
        'GB': { // United Kingdom
            minLength: 10,
            maxLength: 10,
            pattern: /^[1-9]\d{9}$/,
            error: 'Please enter a valid 10-digit UK phone number'
        },
        'AU': { // Australia
            minLength: 9,
            maxLength: 9,
            pattern: /^[4-5]\d{8}$/,
            error: 'Please enter a valid 9-digit Australian mobile number'
        },
        'CA': { // Canada
            minLength: 10,
            maxLength: 10,
            pattern: /^[2-9]\d{9}$/,
            error: 'Please enter a valid 10-digit Canadian phone number'
        },
        'AE': { // UAE
            minLength: 9,
            maxLength: 9,
            pattern: /^[5]\d{8}$/,
            error: 'Please enter a valid 9-digit UAE mobile number starting with 5'
        },
        'SG': { // Singapore
            minLength: 8,
            maxLength: 8,
            pattern: /^[89]\d{7}$/,
            error: 'Please enter a valid 8-digit Singapore mobile number starting with 8 or 9'
        },
    };

    const rule = validationRules[countryCode];

    if (!rule) {
        // Generic validation for other countries
        if (cleanPhone.length < 7 || cleanPhone.length > 15) {
            return { isValid: false, error: 'Please enter a valid mobile number (7-15 digits)' };
        }
        return { isValid: true, error: '' };
    }

    if (cleanPhone.length < rule.minLength || cleanPhone.length > rule.maxLength) {
        return { isValid: false, error: rule.error };
    }

    if (rule.pattern && !rule.pattern.test(cleanPhone)) {
        return { isValid: false, error: rule.error };
    }

    return { isValid: true, error: '' };
};

const LoginPage = () => {
    const [submitForOTP, setSubmitForOTP] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [selectedCountry, setSelectedCountry] = React.useState(
        countries.find((c) => c.code === "IN") || countries[0]
    );
    const [phoneError, setPhoneError] = React.useState("");
    const { execute, loading, error: apiError, setError } = useAxios();

    const handleSendOtp = async () => {
        if (!selectedCountry) {
            setPhoneError("Please select a country");
            return;
        }

        const validation = validateMobileNumber(phoneNumber, selectedCountry.code);

        if (!validation.isValid) {
            setPhoneError(validation.error);
        } else {
            setPhoneError("");
            try {
                const response = await execute({
                    url: '/api/auth/send-otp',
                    method: 'POST',
                    data: {
                        mobileNumber: phoneNumber
                    }
                });

                if (response.success) {
                    setSubmitForOTP(true);
                } else {
                    setError(response.message || "Failed to send OTP. Please try again.");
                }
            } catch (err) {
                // Error is handled by the hook and available in apiError
            }
        }
    };
    return (
        <Box sx={{ height: "100vh" }}>
            <Grid container sx={{ height: "100%" }}>
                {/* LEFT IMAGE SECTION */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    size={4}
                    sx={{
                        backgroundImage:
                            `url(${login})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        height: "100%",
                    }}
                >
                    {/* Overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.55)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            p: 6,
                            color: "#fff",
                        }}
                    >
                        <Box sx={{ position: "absolute", top: "50%" }}>
                            <Typography variant="h5" fontWeight={600}>
                                Instant Loans, Zero Paperwork.
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, maxWidth: 420 }}>
                                Get approved in minutes with Fund Projector's secure and
                                hassle-free process. Join over 1 million happy customers.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* RIGHT FORM SECTION */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    size={8}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ffffff",
                    }}
                >

                    {!submitForOTP ? <Box sx={{ width: "100%", maxWidth: 420 }}>
                        <Typography variant="h6" fontWeight={600} textAlign="left">
                            Welcome to Fund Projector
                        </Typography>

                        <Typography variant="body2" color="text.secondary" textAlign="left">
                            Enter your mobile number to login or create an account
                        </Typography>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Mobile Number <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <PhoneInputAllCountries
                                onPhoneChange={(phone) => {
                                    setPhoneNumber(phone);
                                    // Clear error when user starts typing to fix it
                                    if (phoneError) {
                                        setPhoneError("");
                                    }
                                }}
                                onCountryChange={(country) => {
                                    setSelectedCountry(country);
                                    // Clear error when user changes country
                                    if (phoneError) {
                                        setPhoneError("");
                                    }
                                }}
                                error={!!phoneError}
                                helperText={phoneError || ""}
                            />

                            {(phoneError || apiError) && (
                                <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                                    {phoneError || apiError}
                                </Alert>
                            )}

                            <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
                                By continuing, I agree to Fund Projector's{" "}
                                <span style={{ color: "#00bf63" }}>Privacy Policy</span> and{" "}
                                <span style={{ color: "#00bf63" }}>Terms & Conditions</span> and
                                receive communications via SMS, E-Mail and WhatsApp
                            </Typography>

                            <Button
                                fullWidth
                                sx={{
                                    mt: 3,
                                    backgroundColor: "#00bf63",
                                    color: "#fff",
                                    textTransform: "none",
                                    py: 1.2,
                                    "&:hover": {
                                        backgroundColor: "#00bf63",
                                    },
                                }}
                                onClick={handleSendOtp}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Continue"}
                            </Button>
                        </Box>
                    </Box> :
                        <Box sx={{ width: "100%", maxWidth: 420 }}>
                            <VerifyOtp
                                phoneNumber={phoneNumber}
                                countryCode={selectedCountry?.phone}
                            />
                        </Box>
                    }

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mt: 3,
                            position: "fixed",
                            bottom: 0,
                            borderTop: "1px solid #e0e0e0",
                            width: "inherit",
                            pb: 2,
                            pt: 2,
                        }}
                    >
                        <Typography variant="caption">
                            <LockOutlinedIcon
                                fontSize="14"
                                sx={{ verticalAlign: "text-top" }}
                            />{" "}
                            SSL Secured
                        </Typography>
                        <Typography variant="caption">
                            <VerifiedUserOutlinedIcon
                                fontSize="14"
                                sx={{ verticalAlign: "text-top" }}
                            />{" "}
                            PCI-DSS Compliant
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
