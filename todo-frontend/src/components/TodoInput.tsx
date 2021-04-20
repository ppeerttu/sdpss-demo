import React, { useCallback, useEffect, useState } from "react";

import { Button, makeStyles, TextField } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { useAppState } from "../state";

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: theme.spacing(2),
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
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
  const [deadline, setDeadline] = useState<Date | null>(null);

  useEffect(() => {
    setValid(description.length >= 3 && description.length <= 255);
  }, [setValid, description]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!valid) {
        return;
      }
      postTodo(description, deadline)
        .then(() => {
          setDescription("");
          setDeadline(null);
        })
        .catch(console.error);
    },
    [description, setDescription, postTodo, valid, deadline]
  );

  return (
    <form noValidate autoComplete="off" className={styles.container} onSubmit={onSubmit}>
      <div className={styles.row}>
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
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <DateTimePicker
            inputVariant="outlined"
            emptyLabel="Deadline"
            disablePast
            value={deadline}
            onChange={setDeadline}
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={!valid}>
          Add
        </Button>
      </div>
    </form>
  );
};
