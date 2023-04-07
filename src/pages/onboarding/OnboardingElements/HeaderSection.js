"use client";
import styles from "../page.module.css";

export default function HeaderSection({ currentIndex, content }) {
  if (!content) {
    return null;
  }

  return (
    <div
      className={`${styles["carousel-content"]} ${styles["header-content"]}`}
      style={{
        transform: `translateX(-${(currentIndex * 100) / content.length}%)`,
        width: `calc(100vw * ${content.length})`,
      }}
    >
      {content.map((item, index) => (
        <div key={index} className={styles["map-container"]}>
          <h4>{item.subHeading}</h4>
          <h1>{item.heading}</h1>
          {item.description.split("\n").map((line) => (
            <section key={line}>
              <p>{line}</p>
              <br />
            </section>
          ))}
        </div>
      ))}
    </div>
  );
}
