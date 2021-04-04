import { Container, makeStyles } from "@material-ui/core";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useAppState } from "../state";
import { SignInForm } from "./components/SignInForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Home() {
  const styles = useStyles();
  const { user } = useAppState();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        {user ? (
          <div className={styles.paper}>
            <h1>Todos</h1>
            <TodoInput />
            <TodoList />
          </div>
        ) : (
          <SignInForm />
        )}
      </Container>
    </div>
  );
}
