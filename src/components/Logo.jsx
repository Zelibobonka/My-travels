import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/My-travels/logo.png"
        alt="Мои путешествия"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
