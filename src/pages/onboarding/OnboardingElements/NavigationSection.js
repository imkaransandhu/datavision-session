"use client";
import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function NavigationSection({
  currentIndex,
  handleNext,
  handlePrevious,
  content,
}) {
  if (!content) {
    return null;
  }

  return (
    <div>
      <section className={styles["navigation-section"]}>
        <div
          className={styles["arrow-box"]}
          style={{ justifyContent: "flex-start" }}
        >
          <Image
            src="/images/arrow-left.svg"
            alt="left-arrow"
            width={21}
            height={21}
            onClick={handlePrevious}
            className={`${styles["arrow-hidden"]} ${
              currentIndex !== 0 && styles["arrow-left"]
            }`}
          ></Image>
        </div>
        <div className={styles["dots-container"]}>
          {content?.map((item, index) => (
            <div
              key={index}
              className={`${styles.dots} ${
                currentIndex === index && styles["dot-active"]
              }`}
            ></div>
          ))}
        </div>
        <div className={styles["arrow-box"]}>
          {currentIndex === content.length - 1 ? (
            <Link href={"/capture"} className={styles.link}>
              <p>Done</p>
            </Link>
          ) : (
            <Image
              src="/images/arrow-right.svg"
              alt="right-arrow"
              width={21}
              height={21}
              onClick={handleNext}
            ></Image>
          )}
        </div>
      </section>
      <Link href={"/capture"} className={styles.link}>
        <p
          className={`${styles.skip} ${
            currentIndex === content.length - 1 && styles["hide-skip"]
          }`}
        >
          Skip
        </p>
      </Link>
    </div>
  );
}
