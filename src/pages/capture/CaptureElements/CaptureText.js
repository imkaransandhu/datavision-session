import Image from "next/image";
import styles from "./CaptureElements.module.css";

const CaptureText = () => {
  return (
    <div className={styles["capture-text"]}>
      <div className={styles["capture-text-heading"]}>
        <h2>Capture </h2>
        <Image
          src="/images/CaptureIcon.png"
          height={25}
          width={30}
          alt="capture icon"
        />
      </div>
      <p>{`Click the button below to capture your creation. You'll have 3 seconds to move around and create a unique impression on the large display before your image is captured. \n\nGet creative and have fun!`}</p>
    </div>
  );
};

export default CaptureText;
