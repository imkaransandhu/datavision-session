"use client";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import Cookies from "js-cookie";
import Ably from "ably";

// Context
import SessionContext from "./../../Context/SessionContext";

// Components
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import WallMenu from "@/components/Shared/WallHeader/WallHeader";
import CaptureElements from "./CaptureElements/CaptureElements";
import LoadingCapture from "./LoadingCapture/LoadingCapture";
import ImageView from "@/components/Shared/ImageView/ImageView";
import LoadScreen from "@/components/Shared/LoadScreen/LoadScreen";

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
      socketInitializer();
    } else {
      setExpired(true);
      setTimeout(() => {
        routeToGalleryImageView.push("/");
      }, 1000);
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
    const ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ALBY_KEY);
    await ably.connection.once("connected");
    const channel = ably.channels.get("quickstart");
    await channel.subscribe("uploaded-blob", (blobName) => {
      setImgSrc(
        `https://interactivewallgallery.blob.core.windows.net/gallery/${blobName.data}`
      );
    });

    setSocket(channel);
  };

  const handlecapture = () => {
    setLoadingScreen(!loadingScreen);
    socket.publish("send-blob", "clicked");
  };

  function handleImageViewCrossBtn() {
    routeToGalleryImageView.push("/");
    setImgSrc(null);
  }

  if (expired) {
    return (
      <LoadScreen first={"Please Scan the Qr code..."} second={"Expired"} />
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
