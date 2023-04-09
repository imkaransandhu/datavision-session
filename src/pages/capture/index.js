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
import ImageView from "@/components/Shared/ImageView/ImageView";

import Ably from "ably";

export default function Home() {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [expired, setExpired] = useState(false);
  const [socket, setSocket] = useState({});
  const [imgSrc, setImgSrc] = useState(null);

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
    // For the full code sample see here: https://github.com/ably/quickstart-js
    const ably = new Ably.Realtime.Promise(
      "KpozvA.0YAo5A:NyOJl5ifGsBr-5GlacgyQMxe0io77DeAnUiUfXe-uUI"
    );
    await ably.connection.once("connected");
    console.log("Connected to Ably!");

    // get the channel to subscribe to
    const channel = ably.channels.get("quickstart");
    console.log(typeof channel, channel);

    /* 
  Subscribe to a channel. 
  The promise resolves when the channel is attached 
  (and resolves synchronously if the channel is already attached).
*/
    await channel.subscribe("uploaded-blob", (blobName) => {
      setImgSrc(
        `https://interactivewallgallery.blob.core.windows.net/gallery/${blobName.data}`
      );
    });

    // await fetch("/api/screenshot");
    // const newSocket = io();

    // newSocket.on("connect", () => {
    //   console.log("connected");
    // });

    // newSocket.on("routeToGallery", (blobName) => {
    //   // routeToGalleryImageView.push(`/?blobName=${blobName}`);
    //   setImgSrc(
    //     `https://interactivewallgallery.blob.core.windows.net/gallery/${blobName}`
    //   );
    // });
    setSocket(channel);
  };

  const handlecapture = () => {
    setLoadingScreen(!loadingScreen);
    console.log(typeof socket);
    socket.publish("send-blob", "clicked");
    // socket.emit("send-blob");
    console.log("Capture button is Clicked");
  };

  function handleImageViewCrossBtn() {
    routeToGalleryImageView.push("/");
    setImgSrc(null);
  }

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
      {imgSrc && (
        <ImageView
          imgSrc={imgSrc}
          handleImageViewCrossBtn={handleImageViewCrossBtn}
        />
      )}
    </Fragment>
  );
}
