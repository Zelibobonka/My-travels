import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";

export default function Homepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>Путешествия по всему миру.</h1>
        <h2>
          Никогда не забывай о своих замечательных впечатлениях и покажи своим
          друзьям, как ты путешествовал по миру.
        </h2>
        <Button
          type="primary"
          onClick={() => navigate(isAuthenticated ? "app" : "login")}
        >
          Начать путешествие
        </Button>
      </section>
    </main>
  );
}
