import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Rating,
  Skeleton,
  IconButton,
  Drawer,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Slide,
  Backdrop
} from "@mui/material";
import {
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Footer from "./Footer";
import "./assets/1.css";
import "./assets/fonts/fonts.css";

// نمونه داده‌ها
const sampleCourses = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `آموزش پروژه محور React — جلسه ${i + 1}`,
  author: ["Ali Reza", "Sara", "Navid", "Hessam"][i % 4],
  duration: `${2 + (i % 5)}h ${15 + (i % 45)}m`,
  price: i % 3 === 0 ? 0 : 19 + (i % 7) * 5,
  rating: 3 + (i % 3) + (i % 2) * 0.5,
  students: 120 + i * 7,
  difficulty: ["Beginner", "Intermediate", "Advanced"][i % 3],
  category: ["Frontend", "Backend", "Fullstack", "UI/UX"][i % 4],
  image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HEr6fykbgN_GnedAp8PnRmCSGi96QBnqkA&s`,
  short: "یک دورهٔ پروژه‌محور برای یادگیری عملی و سریع مفاهیم."
}));

// کارت دوره
function CourseCard({ course, onEnroll }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": { transform: "translateY(-10px)", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={course.image}
          alt={course.title}
          sx={{ transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item>
              <Chip
                label={course.category}
                size="small"
                sx={{ background: "linear-gradient(90deg, #5563FF, #55FFC3)", color: "#fff", fontWeight: "bold" }}
              />
            </Grid>
            <Grid item>
              <Chip
                label={course.difficulty}
                size="small"
                variant="outlined"
                sx={{ borderColor: "#ff7b00ff", color: "#00ff73ff", fontWeight: "500" }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>{course.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{course.short}</Typography>
          <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Grid item>
              <Rating size="small" value={Math.round(course.rating * 2) / 2} precision={0.5} readOnly />
            </Grid>
            <Grid item>
              <Typography variant="caption" color="text.secondary">({course.rating.toFixed(1)}) • {course.students}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Grid item>
              <AccessTimeIcon fontSize="small" />
            </Grid>
            <Grid item>
              <Typography variant="caption">{course.duration}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <Box sx={{ flexGrow: 1 }}>
            {course.price === 0 ? (
              <Chip label="رایگان" color="success" />
            ) : (
              <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                <MonetizationOnIcon fontSize="small" sx={{ mr: 0.5 }} />{course.price} تومان
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ background: "linear-gradient(90deg, #5563FF, #55FFC3)", "&:hover": { background: "linear-gradient(90deg, #262affff, #ff8f33ff)" } }}
            onClick={() => onEnroll(course)}
          >
            ثبت‌نام
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

// انیمیشن ورود/خروج دیالوگ
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CoursePage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [price, setPrice] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const menuItems = [
    { text: "صفحه اصلی", icon: <HomeIcon /> },
    { text: "دوره‌ها", icon: <SchoolIcon /> },
    { text: "درباره ما", icon: <InfoIcon /> },
    { text: "تماس با ما", icon: <ContactMailIcon /> }
  ];

  const toggleDrawer = (value) => setOpen(value);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 500); return () => clearTimeout(timer); }, [query, category, difficulty, price, page]);

  const filtered = useMemo(() => {
    let arr = sampleCourses.slice();
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((c) => c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q));
    }
    if (category !== "All") arr = arr.filter((c) => c.category === category);
    if (difficulty !== "All") arr = arr.filter((c) => c.difficulty === difficulty);
    if (price === "Free") arr = arr.filter((c) => c.price === 0);
    if (price === "Paid") arr = arr.filter((c) => c.price > 0);
    return arr;
  }, [query, category, difficulty, price]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / 9));
  const pageItems = filtered.slice((page - 1) * 9, page * 9);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setAgreeChecked(false);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCourse(null);
    setAgreeChecked(false);
  };

  const handleProceedToPayment = () => {
    if (!selectedCourse) return;
    const fakePaymentUrl = `/payment?courseId=${selectedCourse.id}&price=${selectedCourse.price}`;
    window.location.href = fakePaymentUrl;
  };

  const handleGoToCourse = () => {
    if (!selectedCourse) return;
    const courseUrl = `/courses/${selectedCourse.id}`;
    window.location.href = courseUrl;
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "text.primary", py: 4 }}>
      <AppBar position="sticky" color="primary" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}>
          <Typography variant="h6">PC Learn</Typography>
          <IconButton color="inherit" onClick={() => toggleDrawer(true)}><MenuIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)} PaperProps={{ sx: { width: 280, background: "linear-gradient(160deg, #ff8800ff, #2a5298)", color: "#fff", backdropFilter: "blur(12px)" } }}>
        <Box sx={{ textAlign: "center", py: 3, borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
          <Typography variant="h5" fontWeight="bold">🚀 PC Learn</Typography>
        </Box>
        <Box>
          {menuItems.map((item, index) => (
            <Button key={index} startIcon={item.icon} sx={{ width: "100%", justifyContent: "flex-start", color: "#fff", py: 1.5, textTransform: "none", fontSize: "1rem", borderBottom: index < menuItems.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              {item.text}
            </Button>
          ))}
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#fff" }}>دوره‌های آموزشی</Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="جستجو..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#fff" }} /></InputAdornment>,
                sx: { background: "rgba(255, 39, 39, 0.1)", color: "#fff", "& .MuiInputBase-input": { color: "#fff" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" } }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: "#fff" }}>دسته</InputLabel>
                <Select value={category} onChange={e => setCategory(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, "& .MuiSvgIcon-root": { color: "#fff" } }}>
                  <MenuItem value="All">همه</MenuItem>
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Fullstack">Fullstack</MenuItem>
                  <MenuItem value="UI/UX">UI/UX</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: "#fff" }}>سطح</InputLabel>
                <Select value={difficulty} onChange={e => setDifficulty(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, "& .MuiSvgIcon-root": { color: "#fff" } }}>
                  <MenuItem value="All">همه</MenuItem>
                  <MenuItem value="Beginner">مقدماتی</MenuItem>
                  <MenuItem value="Intermediate">متوسط</MenuItem>
                  <MenuItem value="Advanced">پیشرفته</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: "#fff" }}>قیمت</InputLabel>
                <Select value={price} onChange={e => setPrice(e.target.value)} sx={{ color: "#fff", "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, "& .MuiSvgIcon-root": { color: "#fff" } }}>
                  <MenuItem value="All">همه</MenuItem>
                  <MenuItem value="Free">رایگان</MenuItem>
                  <MenuItem value="Paid">پرداختی</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
                <Skeleton height={28} sx={{ mt: 1 }} />
                <Skeleton width="60%" />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={3}>
              {pageItems.map(course => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <CourseCard course={course} onEnroll={handleEnrollClick} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} color="primary" />
            </Box>
          </>
        )}
      </Container>

      {/* Backdrop برای محو کردن پس‌زمینه */}
      <Backdrop open={dialogOpen} sx={{ zIndex: 1200, backgroundColor: "rgba(0,0,0,0.5)" }} />

      {/* Dialog جذاب */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        dir="rtl"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: { xs: 280, sm: 400 },
            background: "linear-gradient(135deg, #5563FF, #8A2BE2, #55FFC3)", // رنگ جذاب
            color: "#fff",
            backdropFilter: "blur(10px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)"
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
          {selectedCourse ? `${selectedCourse.title}` : "ثبت‌نام"}
        </DialogTitle>
        <DialogContent dividers sx={{ pb: 1 }}>
          {selectedCourse && selectedCourse.price > 0 ? (
            <>
              <Typography sx={{ mb: 2, fontSize: "0.95rem" }}>
                این دوره پرداختی است. لطفاً شرایط و قوانین خرید را مطالعه کرده و موافقت خود را تأیید کنید تا به درگاه پرداخت منتقل شوید.
              </Typography>
              <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                شرایط: این یک متن نمونه برای شرایط خرید است — مبلغ نمایش‌داده‌شده نهایی نیست و پس از ایجاد جلسه پرداخت توسط سرور شما محاسبه می‌شود.
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={agreeChecked} onChange={(e) => setAgreeChecked(e.target.checked)} sx={{ color: "#fff", "&.Mui-checked": { color: "#00ff73" } }} />}
                label="با شرایط و قوانین موافقم"
              />
            </>
          ) : (
            <>
              <Typography sx={{ mb: 2, fontSize: "0.95rem" }}>این دوره رایگان است. برای دسترسی به محتوا لطفاً وارد حساب کاربری خود شوید.</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                اگر حساب کاربری ندارید، ابتدا ثبت‌نام کنید و سپس وارد شوید تا محتوای دوره برای شما فعال شود.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: "none", color: "#fff" }}>بستن</Button>
          {selectedCourse && selectedCourse.price > 0 ? (
            <Button
              variant="contained"
              disabled={!agreeChecked}
              onClick={handleProceedToPayment}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                background: "linear-gradient(90deg, #0015ffff, #d0ff00ff)",
                "&:hover": { background: "linear-gradient(90deg, #262aff, #ff8f33)" },
                transition: "0.3s"
              }}
            >
              پرداخت و ادامه ({selectedCourse.price} تومان)
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleGoToCourse}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                background: "linear-gradient(90deg, #5563FF, #55FFC3)",
                "&:hover": { background: "linear-gradient(90deg, #262aff, #ff8f33)" },
                transition: "0.3s"
              }}
            >
              ورود / ورود به دوره
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
}
