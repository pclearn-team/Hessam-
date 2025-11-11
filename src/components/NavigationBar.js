import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          دوره‌های آموزشی
        </Typography>

        {/* منوی کشویی */}
        <Button
          color="inherit"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>خانه</MenuItem>
          <MenuItem onClick={handleMenuClose}>دوره‌ها</MenuItem>
          <MenuItem onClick={handleMenuClose}>ارتباط با ما</MenuItem>
        </Menu>

        {/* دکمه‌های منوی بزرگتر */}
        <Container sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
          <Button color="inherit">خانه</Button>
          <Button color="inherit">دوره‌ها</Button>
          <Button color="inherit">ارتباط با ما</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
