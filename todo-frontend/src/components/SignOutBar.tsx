import React from "react";

import { Button, makeStyles, Typography } from "@material-ui/core";

import { AppUser } from "../state";

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
}

export const SignOutBar: React.FC<Props> = ({ user, signOut }) => {
  const classes = useStyles();

  const onSignOut = () => {
    signOut().catch(console.error);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.text} color="textSecondary">
        Logged in as <strong>{user.username}</strong>
      </Typography>
      <Button color="primary" onClick={onSignOut}>
        Sign out
      </Button>
    </div>
  );
};
