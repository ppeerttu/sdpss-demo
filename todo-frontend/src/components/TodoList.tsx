import React from "react";

import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Todo, useAppState } from "../state";
import { formatDistanceToNow, parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

interface TodosProps {
  todos: Todo[];
  onComplete: (todoId: string, completed?: boolean) => void;
  onDelete: (todoId: string) => void;
  emptyText?: string;
}

const Todos: React.FC<TodosProps> = ({ todos, onComplete, onDelete, emptyText }) => {
  return (
    <List>
      {todos.length > 0 ? (
        todos.map(({ id, description, completed, deadline }) => (
          <ListItem
            key={id}
            button
            role={undefined}
            dense
            onClick={() => onComplete(id, !completed)}
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
            <ListItemText
              id={`todo-${id}`}
              primary={description}
              secondary={
                deadline ? formatDistanceToNow(parseISO(deadline), { addSuffix: true }) : undefined
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="complete"
                onClick={() => onDelete(id)}
                color="secondary"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary={emptyText || "No todos yet"} />
        </ListItem>
      )}
    </List>
  );
};

export const TodoList: React.FC = () => {
  const styles = useStyles();
  const { todos, completedTodos, completeTodo, deleteTodo } = useAppState();

  const onCompleteTodo = (todoId: string, completed = true) => {
    completeTodo(todoId, completed).catch(console.error);
  };

  const onDeleteTodo = (todoId: string) => {
    deleteTodo(todoId).catch(console.error);
  };

  return (
    <div className={styles.root}>
      <Todos todos={todos} onComplete={onCompleteTodo} onDelete={onDeleteTodo} />
      <Divider />
      <Todos
        todos={completedTodos}
        onComplete={onCompleteTodo}
        onDelete={onDeleteTodo}
        emptyText="No completed todos yet"
      />
    </div>
  );
};
