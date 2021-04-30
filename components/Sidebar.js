import styled from "styled-components";
import { useState } from "react";
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import EmailPopup from "./EmailPopup";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import React from "react";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const [user] = useAuthState(auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(userChatRef);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    auth.signOut();
    setAnchorEl(null);
  };

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserAvatar src={user.photoURL} />
          <UserName>{user.displayName}</UserName>
        </UserContainer>
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SideBarButton onClick={handleClickOpen}>Start a new chat</SideBarButton>

      <EmailPopup open={open} setOpen={setOpen} chatSnapShot={chatSnapshot} />

      {/* List of Chats */}

      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overlay-style: none;
  scrollbar-width: none;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 10px;

  :hover {
    opacity: 0.8;
  }
`;

const UserName = styled.div`
  color: gray;
`;

const IconsContainer = styled.div``;

//Search Style

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

//Start chat button style

const SideBarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
