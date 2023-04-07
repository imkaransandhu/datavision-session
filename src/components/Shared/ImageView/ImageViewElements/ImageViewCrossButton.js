import Image from "next/image";
import styles from "./../ImageView.module.css";

const ImageViewCrossButton = ({ handleImageViewCrossBtn }) => {
  return (
    <button
      onClick={handleImageViewCrossBtn}
      className={styles["image-view-cross-button"]}
    >
      <Image
        src={"/images/CrossMenu.png"}
        alt="cross"
        height={"20"}
        width={"20"}
      />
    </button>
  );
};

export default ImageViewCrossButton;
