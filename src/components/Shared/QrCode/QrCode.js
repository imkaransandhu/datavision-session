import { useEffect, useRef } from "react";
import QRCode from "qrcode";

import styles from "./QrCode.module.css";

export default function QrCode({ width, height, url }) {
  const canvasQrCodeRef = useRef(null);

  useEffect(() => {
    // Create a QR code from the UR L
    if (url) {
      QRCode.toCanvas(canvasQrCodeRef.current, url, {
        errorCorrectionLevel: "H",
        width,
        height,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div>
      <canvas
        className={styles["qr-code"]}
        ref={canvasQrCodeRef}
        width={width}
        height={height}
      />
    </div>
  );
}
