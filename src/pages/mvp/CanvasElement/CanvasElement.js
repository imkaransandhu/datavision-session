import styles from "./CanvasElement.module.css";

const CanvasElement = ({ canvavrefDetail }) => {
  return (
    <canvas
      width={1920}
      height={1080}
      className={styles["canvas-element"]}
      ref={canvavrefDetail}
    ></canvas>
  );
};

export default CanvasElement;
