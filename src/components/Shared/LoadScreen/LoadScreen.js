import { useState } from "react";
import styles from "./LoadScreen.module.css";

export default function LoadScreen({ first, second }) {
  const [fadeLoading, setFadeLoading] = useState(false);

  return (
    <div
      className={styles["loader-container"]}
      style={{ opacity: fadeLoading ? 0 : 1 }}
    >
      <div className={styles.loader}>
        <p>{first}</p>
        <h1>{second}</h1>
      </div>
    </div>
  );
}
