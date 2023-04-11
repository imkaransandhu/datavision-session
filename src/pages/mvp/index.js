"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import Ably from "ably";

// Components
import WorkingElements from "./WorkingElements/WorkingElements";
import handleScreenChange from "@/functions/HandleScreenChange";
import ScreenShotElements from "./ScreenShotElements/ScreenShotElements";

// Functions
import PutScreenShotToBlob from "@/axiosRequest/PutScreenShotToBlob";
import PostGuid from "@/axiosRequest/PostGuid";
import RemoveBackground from "../../functions/RemoveBackground";
import URL from "@/functions/Url";

// CSS
import styles from "./WorkingElements/WorkingElements.module.css";

export default function Home() {
  const canvas = useRef(); //First canvas on which the the Silhouette is drawn with black background
  const webcam = useRef(); // Camera
  const flashRef = useRef(); // Camera
  const videoToReveal = useRef(); // Video that will be played inside the Silhouette
  const imgRef = useRef(); // background Image
  const newCanvas1 = useRef(); // clone 1
  const newCanvas2 = useRef(); // clone 2
  const newCanvas3 = useRef(); // clone 3
  const newCanvas4 = useRef(); // clone 4
  const newCanvas5 = useRef(); // clone 5
  const ScreenShotElementsRef = useRef();

  const [currentScreen, setCurrentScreen] = useState(0); // Change to next screen based on number 0, 1, 2
  const [displayValueText, setDisplayValueText] = useState(false); // Variable to store if the person is detected
  const [url, setUrl] = useState();
  const [showQrCode, setShowQrCode] = useState(true);
  const [mySocket, setMySocket] = useState({});

  useEffect(() => {
    // Assigning the current states
    const canvasEl = canvas.current;
    const webcamEl = webcam.current;
    const videoToRevealEl = videoToReveal.current;
    const newCanvasEl1 = newCanvas1.current;
    const newCanvasEl2 = newCanvas2.current;
    const newCanvasEl3 = newCanvas3.current;
    const newCanvasEl4 = newCanvas4.current;
    const newCanvasEl5 = newCanvas5.current;

    // Addding some css to body elements
    document.body.style.overflow = "hidden";
    document.body.style.maxHeight = screen.height;

    // TensorFlow Modal to remove background and detect person to show text on screen
    RemoveBackground(
      canvasEl,
      webcamEl,
      videoToRevealEl,
      newCanvasEl1,
      newCanvasEl2,
      newCanvasEl3,
      newCanvasEl4,
      newCanvasEl5,
      setDisplayValueText
    );

    socketInitializer();
    // Generate a new GUID
    const newGuid = uuidv4();

    PostGuid(newGuid);
    console.log(`${URL}/session/${newGuid}`);
    setUrl(`${URL}/session/${newGuid}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socketInitializer = async () => {
    const ably = new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ALBY_KEY);
    await ably.connection.once("connected");
    console.log("Connected to Ably!");
    const channel = ably.channels.get("quickstart");
    await channel.subscribe("send-blob", (name) => {
      setTimeout(() => {
        takeScreenshot(channel);
        setTimeout(() => {
          handleScreenChange(setCurrentScreen);
        }, 1000);
      }, 3000);
    });

    await channel.subscribe("change-qr-code", (time) => {
      console.log("creating a new qr code");
      let newTime = +time.data;
      setShowQrCode(false);
      const newGuid = uuidv4();
      PostGuid(newGuid);
      setUrl(`${URL}/session/${newGuid}`);

      setTimeout(() => {
        setShowQrCode(true);
      }, newTime * 1000);
    });

    setMySocket(channel);
  };

  function takeScreenshot(socket) {
    let dataUrl;
    const canvasElement = ScreenShotElementsRef.current; //getting the container in which the canvas element is
    html2canvas(canvasElement).then((canvas) => {
      dataUrl = canvas.toDataURL("image/png");
      console.log(dataUrl);
      PutScreenShotToBlob(dataUrl, socket);
    });
    flashRef.current.classList.add(styles["flash-active"]);
    setTimeout(() => {
      flashRef.current.classList.remove(styles["flash-active"]);
    }, 1000);
  }
  return (
    <Fragment>
      {/* Elements to capture from screen on socket call */}
      <ScreenShotElements
        ScreenShotElementsRef={ScreenShotElementsRef}
        newCanvas1={newCanvas1}
        newCanvas2={newCanvas2}
        newCanvas3={newCanvas3}
        newCanvas4={newCanvas4}
        newCanvas5={newCanvas5}
        imgRef={imgRef}
        currentScreen={currentScreen}
        displayValueText={displayValueText}
        mySocket={mySocket}
      />

      {/* Grabbing data elements the webcam and video that is revealed in Silhouette */}
      <WorkingElements
        canvas={canvas}
        webcam={webcam}
        flashRef={flashRef}
        videoToReveal={videoToReveal}
        currentScreen={currentScreen}
        url={url}
        showQrCode={showQrCode}
      />
    </Fragment>
  );
}
