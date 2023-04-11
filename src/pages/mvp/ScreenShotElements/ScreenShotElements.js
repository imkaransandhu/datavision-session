import BackgroundImage from "../BackgroundImage/BackgroundImage";
import CanvasElement from "../CanvasElement/CanvasElement";

import styles from "./ScreenShotElements.module.css";
const ScreenShotElements = ({
  newCanvas1,
  newCanvas2,
  newCanvas3,
  newCanvas4,
  newCanvas5,
  currentScreen,
  imgRef,
  ScreenShotElementsRef,
}) => {
  const backgroundImages = [
    "https://interactivewallgallery.blob.core.windows.net/tv-screen-gallery/LookBeyondToday.png",
    "https://interactivewallgallery.blob.core.windows.net/tv-screen-gallery/LookBeyondToday.png",
    "https://interactivewallgallery.blob.core.windows.net/tv-screen-gallery/Wellignton.png",
  ];
  return (
    <div ref={ScreenShotElementsRef} className={styles["screen-to-capture"]}>
      <BackgroundImage
        imgSrc={backgroundImages[currentScreen]}
        imgRef={imgRef}
      />
      <CanvasElement canvavrefDetail={newCanvas1} />
      <CanvasElement canvavrefDetail={newCanvas2} />
      <CanvasElement canvavrefDetail={newCanvas3} />
      <CanvasElement canvavrefDetail={newCanvas4} />
      <CanvasElement canvavrefDetail={newCanvas5} />
    </div>
  );
};

export default ScreenShotElements;
