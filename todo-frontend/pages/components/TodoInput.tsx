import React from "react";

import { Button, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  inputContainer: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

export const TodoInput: React.FC = () => {
  const styles = useStyles();
  return (
    <form noValidate autoComplete="off" className={styles.container}>
      <div className={styles.inputContainer}>
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          required
          fullWidth
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};
