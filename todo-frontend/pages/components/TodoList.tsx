import React from "react";

import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const todos = [
  {
    id: "1",
    description: "Foo 1",
    completed: false,
  },
  {
    id: "2",
    description: "Foo 2",
    completed: true,
  },
];

export const TodoList: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <List>
        {todos.map(({ id, description, completed }) => (
          <ListItem key={id} button>
            <ListItemText primary={description} />
            <ListItemIcon>{completed ? <CheckBox /> : <CheckBoxOutlineBlank />}</ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
