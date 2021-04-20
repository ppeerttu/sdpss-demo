import React, { useRef, useState } from "react";

import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";

import { AppUser } from "../state";
import { ArrowDropDown } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  text: {
    flexGrow: 1,
  },
}));

interface Props {
  user: AppUser;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const options = ["Sign out", "Delete account"];

export const SignOutBar: React.FC<Props> = ({ user, signOut, deleteAccount }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMenuItemClick = (e, i) => {
    setIndex(i);
    setOpen(false);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.targeT)) {
      return;
    }

    setOpen(false);
  };

  const onSignOut = () => {
    signOut().catch(console.error);
  };

  const onDeleteAccount = () => {
    deleteAccount().catch(console.error);
  };

  const onOpenDialog = () => setDialogOpen(true);

  return (
    <div className={classes.root}>
      <Typography className={classes.text} color="textSecondary">
        Logged in as <strong>{user.username}</strong>
      </Typography>
      <ButtonGroup
        variant="text"
        color="primary"
        ref={anchorRef}
        aria-label="sign out or delete account"
      >
        <Button onClick={index === 0 ? onSignOut : onOpenDialog}>{options[index]}</Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select action"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, i) => (
                    <MenuItem
                      key={option}
                      selected={index === i}
                      onClick={(e) => handleMenuItemClick(e, i)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <DeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={onDeleteAccount}
      />
    </div>
  );
};

interface DeleteDialogProps {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="aria-dialog-description"
  >
    <DialogTitle id="aria-dialog-title">Delete account</DialogTitle>
    <DialogContent>
      <DialogContentText id="aria-dialog-description">
        Are you sure you want to delete your account?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
