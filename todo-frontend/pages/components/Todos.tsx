import React from "react";

import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { useAppState } from "../../state";
import { DoneOutline } from "@material-ui/icons";

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
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export const Todos: React.FC = () => {
  const classes = useStyles();
  const { getTodos } = useAppState();

  React.useEffect(() => {
    getTodos().catch(console.error);
  }, []);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar} variant="rounded">
        <DoneOutline />
      </Avatar>
      <Typography component="h1" variant="h3" className={classes.title}>
        Todos
      </Typography>
      <TodoInput />
      <TodoList />
    </div>
  );
};
