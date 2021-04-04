import React, { useCallback, useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useAppState } from "../../state";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    zIndex: 100,
  },
}));

const unameRegexp = /^[a-zA-Z0-9-_.]{3,15}$/;

export const SignInForm: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [pending, setPending] = useState(false);
  const { signIn } = useAppState();

  useEffect(() => {
    setFormValid(unameRegexp.test(username));
  }, [username, setFormValid]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!formValid) {
        return;
      }
      setPending(true);
      signIn(username).catch((e) => {
        console.error(e);
        setPending(false);
      });
    },
    [username, setPending, signIn, formValid]
  );

  return (
    <>
      {pending ? <LinearProgress className={classes.loader} /> : null}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formValid}
          >
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
};
