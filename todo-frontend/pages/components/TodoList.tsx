import React from "react";

import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import { useAppState } from "../../state";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TodoList: React.FC = () => {
  const styles = useStyles();
  const { todos } = useAppState();
  return (
    <div className={styles.root}>
      <List>
        {todos.length > 0 ? (
          todos.map(({ id, description, completed }) => (
            <ListItem key={id} button>
              <ListItemText primary={description} />
              <ListItemIcon>{completed ? <CheckBox /> : <CheckBoxOutlineBlank />}</ListItemIcon>
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
