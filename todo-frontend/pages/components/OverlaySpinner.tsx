import React from "react";

import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  render: boolean;
}

export const OverlaySpinner: React.FC<Props> = ({ render }) => {
  const classes = useStyles();
  return render ? (
    <div className={classes.overlay}>
      <CircularProgress />
    </div>
  ) : null;
};
