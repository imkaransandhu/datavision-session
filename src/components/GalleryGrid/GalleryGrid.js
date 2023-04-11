/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styles from "./GalleryGrid.module.css";
import Image from "next/image";

export default function GalleryGrid({ data, isListView, loadImageView }) {
  const [numToShow, setNumToShow] = useState(10);

  const handleSeeMore = () => {
    setNumToShow((num) => num + 10);
  };

  const visibleResults = data.slice(0, numToShow);

  return (
    <div>
      <div
        className={
          isListView
            ? styles["list-outer-container"]
            : styles["grid-outer-container"]
        }
      >
        {/* <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> <div className={styles["grid-item"]}></div> */}{" "}
        {visibleResults.map((item, index) => {
          return (
            <button
              onClick={loadImageView}
              className={styles["grid-item"]}
              key={index}
            >
              <img src={item.url} alt="Captured interactive image"></img>
            </button>
          );
        })}
      </div>
      <button onClick={handleSeeMore} className={styles["show-more-btn"]}>
        <span>
          <p>Show More</p>
          <Image
            src="/images/blue-chevron.svg"
            alt="dropdown arrow"
            width={15}
            height={9}
            style={{ marginTop: "0.25rem" }}
          ></Image>
        </span>
      </button>
    </div>
  );
}
