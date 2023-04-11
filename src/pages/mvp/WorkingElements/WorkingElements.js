import Webcam from "react-webcam";

import styles from "./WorkingElements.module.css";
import QrCode from "@/components/Shared/QrCode/QrCode";

const { Fragment } = require("react");

const WorkingElements = ({
  canvas,
  webcam,
  videoToReveal,
  currentScreen,
  flashRef,
  guid,
  showQrCode,
  url,
}) => {
  const videoToRevealSrc = [
    "/video/Thrive Together_01 (Animation02).mp4",
    "https://interactivewallgallery.blob.core.windows.net/tv-screen-video/lookBeyondToday.mp4",
    "https://interactivewallgallery.blob.core.windows.net/tv-screen-video/lookBeyondToday.mp4",
  ];
  console.log(guid);
  return (
    <Fragment>
      <canvas
        width={640}
        height={480}
        className={styles.canvas}
        ref={canvas}
      ></canvas>
      <div ref={flashRef} className={styles.flash}></div>

      <Webcam width={640} height={480} className={styles.webcam} ref={webcam} />
      <video
        width={640}
        height={480}
        className={styles.videoToReveal}
        ref={videoToReveal}
        controls
        src={videoToRevealSrc[currentScreen]}
        loop
        crossOrigin="anonymous"
      ></video>

      {showQrCode && <QrCode url={url} width={100} height={100} />}
    </Fragment>
  );
};

export default WorkingElements;
