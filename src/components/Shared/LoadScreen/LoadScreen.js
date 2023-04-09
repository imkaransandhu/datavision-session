import { useState } from "react";
import styles from "./LoadScreen.module.css";

export default function LoadScreen({ first, second }) {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles.loader}>
        <p>{first}</p>
        <h1>{second}</h1>
      </div>
    </div>
  );
}
