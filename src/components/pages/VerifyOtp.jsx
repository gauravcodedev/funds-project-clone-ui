import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";

const VerifyOtp = ({ phoneNumber, countryCode }) => {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);
  const navigate = useNavigate();
  const { execute, loading, error: apiError, reset, setError } = useAxios();

  React.useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      // Clear OTP fields immediately when resend is clicked
      setOtp(["", "", "", "", "", ""]);
      // Clear any previous errors
      reset();
      
      await execute({
        url: '/api/auth/resend-otp',
        method: 'POST',
        data: {
          mobileNumber: phoneNumber
        }
      });
      // Reset timer on success
      setTimer(30);
      setCanResend(false);
      // Focus the first input field
      setTimeout(() => {
        document.getElementById('otp-0')?.focus();
      }, 100);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    // Reset error when user starts typing again
    if (apiError) reset();

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      return;
    }

    try {
      const response = await execute({
        url: '/api/auth/verify-otp',
        method: 'POST',
        data: {
          mobileNumber: phoneNumber,
          otp: otpString
        }
      });

      if (response.success) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        navigate("/profile");
      } else {
        // If API returns success: false even with 200 OK
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      // Error handled by hook's error state (for non-2xx statuses)
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Box sx={{ width: 400 }}>
        {/* Title */}
        <Typography fontWeight={600} fontSize={20}>
          Verify Your Number
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Enter the 6-digit code sent to{" "}
          <strong>+{countryCode} {phoneNumber}</strong>{" "}
          <EditOutlinedIcon sx={{ fontSize: 14 }} />
        </Typography>

        {/* OTP */}
        <Typography
          variant="body2"
          sx={{ mt: 3, mb: 1, textAlign: "left" }}
        >
          Enter OTP <span style={{ color: "red" }}>*</span>
        </Typography>

        <Grid container spacing={1}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                id={`otp-${index}`}
                value={digit}
                size="small"
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: 18,
                  },
                }}
                sx={{
                  width: 60,
                }}
              />
            </Grid>
          ))}
        </Grid>

        {apiError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {apiError}
          </Alert>
        )}

        {/* Resend */}
        <Box sx={{ mt: 2 }}>
          {canResend ? (
            <Typography
              variant="caption"
              onClick={handleResendOtp}
              sx={{
                color: "#00bf63",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" }
              }}
            >
              Resend OTP
            </Typography>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Resend OTP in {timer}s
            </Typography>
          )}
        </Box>

        {/* Button */}
        <Button
          fullWidth
          onClick={handleVerifyOtp}
          disabled={loading}
          sx={{
            mt: 3,
            backgroundColor: "#00bf63",
            color: "#fff",
            py: 1.2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#00bf63",
            },
          }}
        >
          {loading ? "Verifying..." : "Verify & Proceed"}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyOtp;
