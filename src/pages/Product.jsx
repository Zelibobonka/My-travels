import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="img-1.jpg" alt="Картинка" />
        <div>
          <h2>Просто страница :)</h2>
        </div>
      </section>
    </main>
  );
}
