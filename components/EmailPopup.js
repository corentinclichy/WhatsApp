import Button from "@material-ui/core/Button";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function EmailPopup({ open, setOpen, chatSnapshot }) {
  const [user] = useAuthState(auth);

  const [input, setInput] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const createChat = () => {
    const emailAdress = input;

    if (!emailAdress) return null;

    if (
      EmailValidator.validate(emailAdress) &&
      !chatAlreadyExists(emailAdress) &&
      emailAdress !== user.email
    ) {
      // We need to add the chat into the DB 'chats' collection
      db.collection("chats").add({
        users: [user.email, emailAdress.toLocaleLowerCase()],
      });
    }

    setOpen(false);
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a valid email adress to speak with your friends
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createChat} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailPopup;
