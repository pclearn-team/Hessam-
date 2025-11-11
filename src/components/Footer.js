// Footer.jsx
import React from "react";
import { Box, Container, Grid, Typography, Stack, IconButton } from "@mui/material";
import { Telegram, WhatsApp, Instagram, LinkedIn, GitHub } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        px: 3,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              PC Learn
            </Typography>
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              مسیر یادگیری برنامه‌نویسی را به صورت پروژه‌محور و عملی تجربه کنید.  
              دوره‌های ما به شما کمک می‌کنند مهارت‌های واقعی کسب کنید.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              لینک‌های مفید
            </Typography>
            <Stack spacing={1}>
              {["صفحه اصلی", "دوره‌ها", "درباره ما", "تماس با ما"].map((text, i) => (
                <Typography
                  key={i}
                  sx={{
                    color: "#fff",
                    cursor: "pointer",
                    "&:hover": { color: "#5563FF", transform: "translateX(5px)", transition: "0.3s" }
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              شبکه‌های اجتماعی
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#0088cc", transform: "scale(1.2)", transition: "0.3s" }
                }}
                href="https://t.me/"
                target="_blank"
              >
                <Telegram />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#25D366", transform: "scale(1.2)", transition: "0.3s" }
                }}
                href="https://wa.me/"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#E1306C", transform: "scale(1.2)", transition: "0.3s" }
                }}
                href="https://instagram.com/"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#0A66C2", transform: "scale(1.2)", transition: "0.3s" }
                }}
                href="https://linkedin.com/"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": { color: "#333", transform: "scale(1.2)", transition: "0.3s" }
                }}
                href="https://github.com/"
                target="_blank"
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 4, color: "#aaa" }}
        >
          © {new Date().getFullYear()} PC Learn. تمام حقوق محفوظ است.
        </Typography>
      </Container>
    </Box>
  );
}
