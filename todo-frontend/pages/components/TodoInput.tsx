import React, { useCallback, useEffect, useState } from "react";

import { Button, makeStyles, TextField } from "@material-ui/core";
import { useAppState } from "../../state";

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
  const { postTodo } = useAppState();
  const [description, setDescription] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(description.length > 3 && description.length <= 255);
  }, [setValid, description]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      postTodo(description)
        .then(() => {
          setDescription("");
        })
        .catch(console.error);
    },
    [description, setDescription, postTodo]
  );

  return (
    <form noValidate autoComplete="off" className={styles.container} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          required
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" disabled={!valid}>
        Add
      </Button>
    </form>
  );
};
