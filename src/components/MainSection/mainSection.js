import {
    Box,
    Container,
    Typography,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
  } from "@mui/material";
  import bg from "../../images/hero.jpg";
  import { useState } from "react";
  import { useNavigate } from "react-router";
  import { useDispatch, useSelector } from "react-redux";
  import {LoginModal, RegisterModal} from "../Header/header";
  import {logOut} from "../../store/actions";
  
  export function MobileDrawer({
    visible,
    cleanup,
    updateLogin,
    updateRegister,
  }) {
    const navigate_to = useNavigate();
    const { userDetails, loading } = useSelector((state) => state.user);
    const dispatch_action = useDispatch();
  
    function logout() {
      navigate_to("/");
      dispatch_action(logOut());
    }
  
    return (
      <Drawer open={visible} onClose={cleanup} anchor="bottom">
        <List>
          {userDetails &&
            !loading &&
            Object.keys(userDetails).length !== 0
            ? ["My cart", "Order History", "Logout"].map((item, i) => (
              <ListItem
                button
                key={i}
                divider
                sx={{ bgcolor: i === 2 && "red" }}
                onClick={(e) => {
                  if (i === 0) {
                    navigate_to("/cart");
                    cleanup();
                  } else if (i === 1) {
                    navigate_to("/orderHistory");
                    cleanup();
                  } else if (i === 2) {
                    logout();
                    cleanup();
                  }
                }}
              >
                {item}
              </ListItem>
            ))
            : ["Sign in", "Register"].map((item, i) => (
              <ListItem
                button
                key={i}
                divider
                sx={{ bgcolor: i === 2 && "red" }}
                onClick={(e) => {
                  if (i === 0) {
                    updateLogin();
                    cleanup();
                  } else if (i === 1) {
                    updateRegister();
                    cleanup();
                  }
                }}
              >
                {item}
              </ListItem>
            ))}
        </List>
      </Drawer>
    );
  }
  
  export default function MainSection() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate_to = useNavigate();
    const isOpen = Boolean(anchorEl);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
  
    function handleClose() {
      setAnchorEl(null);
    }
  
    return (
      <Box
        sx={{
          p: (theme) => theme.spacing(4),
          minHeight: "80vh",
        }}
      >
  
        <Container maxWidth="xl">
        <Typography variant="h3" fontWeight="bold" color="white" mt="15vh">
            Step into the world of
          </Typography>
          <Typography variant="h1" fontWeight="bold" color="white">
            App-leute
          </Typography>
        </Container>
        <img
          src={bg}
          alt="ad"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          {
            ["t-shirts", "/t-shirts"]
            .map((item, i) => (
            <MenuItem
              key={i}
           onClick={() => {
                navigate_to(item[1]);
                handleClose();
              }}
            >
              {item[0]}
            </MenuItem>
          ))}
        </Menu>
        <LoginModal visible={showLogin} cleanup={() => setShowLogin(false)} />
        <RegisterModal
          visible={showRegister}
          RegisterModal
          cleanup={() => setShowRegister(false)}
        />
        <MobileDrawer
          visible={showDrawer}
          cleanup={() => setShowDrawer(false)}
          updateLogin={() => setShowLogin(true)}
          updateRegister={() => setShowRegister(true)}
        />
      </Box>
    );
  }