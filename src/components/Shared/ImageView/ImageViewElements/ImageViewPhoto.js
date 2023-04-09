/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./../ImageView.module.css";
import LoadScreen from "../../LoadScreen/LoadScreen";

const ImageViewPhoto = ({ imgSrc }) => {
  return (
    <div className={styles["image-view-photo"]}>
      <Image width={500} height={500} src={imgSrc} alt="Your Scene" />
    </div>
  );
};

export default ImageViewPhoto;
