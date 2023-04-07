/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import styles from "./BackgroundImage.module.css";

const { Fragment } = require("react");

const BackgroundImage = ({ imgSrc, imgRef }) => {
  return (
    <Fragment>
      {" "}
      {imgSrc ? (
        <Image
          width={4000}
          height={2500}
          className={styles.imgRef}
          ref={imgRef}
          src={imgSrc}
          alt="value photo"
          crossOrigin="anonymous"
        />
      ) : (
        "loading"
      )}
    </Fragment>
  );
};

export default BackgroundImage;
