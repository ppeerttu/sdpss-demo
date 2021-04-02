import Head from "next/head";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

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
  return (
    <div>
      <Head>
        <title>Todos</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <h1>Todos</h1>
          <TodoInput />
          <TodoList />
        </div>
      </Container>
    </div>
  );
}
