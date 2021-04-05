import React from "react";

import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useAppState } from "../state";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const TodoList: React.FC = () => {
  const styles = useStyles();
  const { todos, completeTodo, deleteTodo } = useAppState();

  const onCompleteTodo = (todoId: string, completed = true) => () => {
    completeTodo(todoId, completed).catch(console.error);
  };

  const onDeleteTodo = (todoId: string) => () => {
    deleteTodo(todoId).catch(console.error);
  };

  return (
    <div className={styles.root}>
      <List>
        {todos.length > 0 ? (
          todos.map(({ id, description, completed }) => (
            <ListItem
              key={id}
              button
              role={undefined}
              dense
              onClick={onCompleteTodo(id, !completed)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `todo-${id}` }}
                />
              </ListItemIcon>
              <ListItemText id={`todo-${id}`} primary={description} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="complete"
                  onClick={onDeleteTodo(id)}
                  color="secondary"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No todos yet" />
          </ListItem>
        )}
        {}
      </List>
    </div>
  );
};
