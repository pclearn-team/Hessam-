import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginSignupFlip() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!email) err.email = "وارد کردن ایمیل الزامی است.";
    if (!password) err.password = "پسورد الزامی است.";
    if (isSignup) {
      if (!name) err.name = "نام الزامی است.";
      if (password !== confirmPassword)
        err.confirmPassword = "پسوردها مطابقت ندارند.";
    }
    setErrors(err);

    if (Object.keys(err).length === 0) {
      navigate("/auth", { state: { email } });
    } else {
      setToast({ show: true, message: "لطفا فیلدها را کامل کنید", type: "error" });
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Token:", credentialResponse.credential);
    setToast({ show: true, message: "ورود با گوگل موفق بود 🎉", type: "success" });
    navigate("/auth");
  };

  const handleGoogleError = () => {
    setToast({ show: true, message: "ورود با گوگل با خطا مواجه شد", type: "error" });
  };

  // استایل‌ها
  const containerStyles = {
    perspective: "1500px",
    width: "100%",
    maxWidth: { xs: "90%", sm: 400 },
    height: { xs: 480, sm: 500 },
    mx: "auto",
  };

  const cardStyles = {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 1.5s",
    transform: isSignup ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const sideStyles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: { xs: "28px", sm: "32px" },
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  };

  const frontStyles = { ...sideStyles, transform: "rotateY(0deg)" };
  const backStyles = { ...sideStyles, transform: "rotateY(180deg)" };
  const headerStyles = {
    fontSize: { xs: "1.6rem", sm: "2rem" },
    color: "#fff",
    fontWeight: "bold",
    mb: 3,
    textAlign: "center",
  };
  const commonBtnStyles = {
    width: "100%",
    py: { xs: 1, sm: 1.5 },
    mt: 2,
    fontSize: { xs: "0.9rem", sm: "1rem" },
    fontWeight: "bold",
  };
  const secondaryBtnStyles = {
    width: "100%",
    mt: 1,
    fontSize: { xs: "0.8rem", sm: "0.9rem" },
    fontWeight: "bold",
    color: "#fff",
    textTransform: "none",
    bgcolor: "transparent",
    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
  };
  const inputPropsRight = { style: { textAlign: "right" } };
  const pulseAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #0d47a1, #bf360c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: { xs: 1.5, sm: 2 },
        }}
      >
        <Box sx={containerStyles}>
          <Box sx={cardStyles}>
            {/* Front: Login */}
            <Box sx={frontStyles}>
              <motion.div animate={pulseAnimation}>
                <Typography sx={headerStyles}>pc learn ورود در</Typography>
              </motion.div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={inputPropsRight}
                />
                <TextField
                  label="password"
                  fullWidth
                  margin="normal"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    ...inputPropsRight,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{ color: "white" }}
                      />
                    }
                    label="مرا به خاطر بسپار"
                    sx={{ color: "white", ml: 0 }}
                  />
                </Box>

                <Button
                  variant="contained"
                  sx={secondaryBtnStyles}
                  onClick={() => navigate("/forgot-password")}
                >
                  فراموشی رمز عبور؟
                </Button>

                <Button type="submit" variant="contained" sx={commonBtnStyles}>
                  ورود
                </Button>

                <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    text="signin_with"
                  />
                </Box>

                <Button
                  variant="contained"
                  sx={{ ...secondaryBtnStyles, mt: 2 }}
                  onClick={() => setIsSignup(true)}
                >
                  ثبت‌نام کن
                </Button>
              </form>
            </Box>

            {/* Back: Signup */}
            <Box sx={backStyles}>
              <motion.div animate={pulseAnimation}>
                <Typography sx={headerStyles}>pc learn ثبت نام در</Typography>
              </motion.div>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="full name"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={inputPropsRight}
                />
                <TextField
                  label="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={inputPropsRight}
                />
                <TextField
                  label="password"
                  fullWidth
                  margin="normal"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    ...inputPropsRight,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm password"
                  fullWidth
                  margin="normal"
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    ...inputPropsRight,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPass(!showConfirmPass)}>
                          {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type="submit" variant="contained" sx={commonBtnStyles}>
                  ثبت‌نام
                </Button>

                <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    text="signup_with"
                  />
                </Box>

                <Button
                  variant="contained"
                  sx={{ ...secondaryBtnStyles, mt: 2 }}
                  onClick={() => setIsSignup(false)}
                >
                  وارد شوید
                </Button>
              </form>
            </Box>
          </Box>
        </Box>

        <Snackbar
          open={toast.show}
          autoHideDuration={2000}
          onClose={() => setToast({ show: false, message: "", type: "" })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={toast.type === "success" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </GoogleOAuthProvider>
  );
}
