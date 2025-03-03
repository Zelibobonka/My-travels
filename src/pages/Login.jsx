import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import Button from "../components/Button";
import PageNav from "../components/PageNav";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app/cities");
    },
    [isAuthenticated, navigate]
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Войти</Button>
        </div>
      </form>
    </main>
  );
}
