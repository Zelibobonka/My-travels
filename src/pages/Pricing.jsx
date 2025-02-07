import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>Просто страница :)</h2>
        </div>
        <img src="/My-travels/img-2.jpg" alt="Картинка" />
      </section>
    </main>
  );
}
