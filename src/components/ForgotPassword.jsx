import { useState } from "react";
import { motion } from "framer-motion";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "radial-gradient(circle at top left, #1976D2, #556359 40%, #D27519 90%)",
        backgroundSize: "200% 200%",
        animation: "gradient 12s ease infinite",
        "@keyframes gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <Box
          sx={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: 3,
            borderRadius: 3,
            p: 5,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "white", mb: 4, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
            🔑 وارد کردن رمز ورود
          </Typography>

          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography align="center" sx={{ color: "white", fontWeight: 500 }}>
                اگر ایمیل شما ثبت شده باشد، کد بازیابی برایتان ارسال خواهد شد ✉️
              </Typography>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <TextField
                type="email"
                required
                fullWidth
                label="ایمیل خود را وارد کنید"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12 },
                }}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: "bold",
                    background: "linear-gradient(270deg, rgb(255, 128, 0), rgb(0, 128, 255), rgb(82, 94, 61))",
                    backgroundSize: "300% 300%",
                    animation: "gradient 6s ease infinite",
                  }}
                >
                  ارسال کد بازیابی
                </Button>
              </motion.div>
            </motion.form>
          )}

          <Box mt={4} textAlign="center">
            <Link href="/login" underline="hover" sx={{ color: "white", fontWeight: 500 }}>
              بازگشت به صفحه ورود
            </Link>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
