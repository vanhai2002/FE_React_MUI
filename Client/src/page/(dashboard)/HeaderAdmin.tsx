import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Link,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "src/assets/logo_MUI-removebg.png";
import { useState } from "react";
import { logout } from "../../services/Auth/Auth";
const HeaderAdmin = () => {
  const handleLogout = () => {
    logout();
  };
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar
          sx={{
            height: 90,
            width: "99%",
            justifyContent: "space-between",
            padding: "0 !important",
          }}
        >
          <Link href="/">
            <img style={{ width: 110 }} src={logo} alt="" />
          </Link>
          <Link href="/admin" sx={{ color: "white", textDecoration: "none" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SoleStyle Footwear
            </Typography>
          </Link>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          ></Box>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="search"
            sx={{ mr: 2 }}
          >
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "inherit", flexGrow: 1, mr: 6 }}
            />
            <SearchIcon />
          </IconButton>
          <Badge badgeContent={4} sx={{ mr: 4 }} color="error">
            <MailIcon color="inherit" />
          </Badge>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="notifications"
            sx={{ mr: 2 }}
          >
            <NotificationsIcon />
          </IconButton>
          {user ? (
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                onClick={handleClick}
              >
                <Avatar
                  alt={user?.name}
                  src={user?.avatar}
                  sx={{
                    width: 32,
                    height: 32,
                    padding: "0 !important",
                    border: "1px solid gray",
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Grid container spacing={2} sx={{ p: 2 }}>
                  <Grid item xs={12} textAlign="center">
                    <Avatar
                      alt={user?.name}
                      src={user?.avatar}
                      sx={{ width: 80, height: 80, mx: "auto" }}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="h6">{user?.name}</Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                      {user?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Link href="/signin" color="inherit" underline="none">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: "black",
                          "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.8)",
                          },
                          color: "white",
                        }}
                        fullWidth
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Menu>
            </Box>
          ) : (
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                onClick={handleClick}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/signin" color="inherit" underline="none">
                    Login
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/signup" color="inherit" underline="none">
                    Register
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HeaderAdmin;
