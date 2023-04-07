"use client";
import { useEffect, useState, Fragment } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";

// Components
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import WallMenu from "@/components/Shared/WallHeader/WallHeader";
import CaptureElements from "./CaptureElements/CaptureElements";
import LoadingCapture from "./LoadingCapture/LoadingCapture";

import { useContext } from "react";
import SessionContext from "./../../Context/SessionContext";
import Cookies from "js-cookie";

export default function Home() {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [socket, setSocket] = useState(null);

  const routeToGalleryImageView = useRouter();
  const [session, setSession] = useContext(SessionContext);

  useEffect(() => {
    if (session.isVerified) {
      setExpired(false);
      console.log("dd");
      socketInitializer();
    } else {
      setExpired(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const hasSessionCookie = Cookies.get("userSession");
    if (hasSessionCookie) {
      setSession(JSON.parse(hasSessionCookie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/screenshot");
    const newSocket = io();

    newSocket.on("connect", () => {
      console.log("connected");
    });

    newSocket.on("routeToGallery", (blobName) => {
      routeToGalleryImageView.push(`/?blobName=${blobName}`);
    });
    setSocket(newSocket);
  };

  const handlecapture = () => {
    setLoadingScreen(!loadingScreen);
    socket.emit("send-blob");
    console.log("Capture button is Clicked");
  };

  if (expired) {
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Expired, Please Scan the Qr code...</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <CaptureSession />
      <WallMenu />
      <CaptureElements handlecapture={handlecapture} />
      {loadingScreen && <LoadingCapture />}
    </Fragment>
  );
}
