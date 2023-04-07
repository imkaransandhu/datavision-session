import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import SessionContext from "./../../Context/SessionContext";
import axios from "axios";
import Cookies from "js-cookie";
import LoadScreen from "@/components/Shared/LoadScreen/LoadScreen";
import io from "socket.io-client";

export default function ValidatingUser() {
  const router = useRouter();
  const { guid } = router.query;
  const [guidFromFile, setGuidFromFile] = useState(null);
  const [session, setSession] = useContext(SessionContext);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/GetGuid")
      .then((response) => setGuidFromFile(response.data.guid))
      .catch((error) => console.error(error));

    if (guid) {
      console.log(guidFromFile, guid);
      if (guid === guidFromFile) {
        setLoading(true);
        setSessionExpired(false);
        const expirationTime = new Date(Date.now() + 40 * 1 * 1000); // 5 minutes from now
        Cookies.set(
          "userSession",
          `{ "guid" : "${guid}", "expirationTime" : "${expirationTime}", "isVerified": "${true}" }`,
          { expires: expirationTime }
        );
        setSession({ guid, expirationTime, isVerified: true });
        async function socketRun() {
          await fetch("/api/screenshot");
          const newSocket = io();

          newSocket.on("connect", () => {
            console.log("connected");
            const timeToCreateQrCode = 40;
            newSocket.emit("change-qr-code", timeToCreateQrCode);
          });
          setLoading(false);
        }
        socketRun();
        setTimeout(() => {
          router.push("/capture");
        }, 2000);
      } else {
        setLoading(false);
        setSessionExpired(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guid, guidFromFile]);

  if (loading) {
    return <LoadScreen first={"Matching"} second={"Please Wait..."} />;
  } else if (sessionExpired) {
    return (
      <LoadScreen first={"Please Scan New QR Code..."} second={"Expired"} />
    );
  } else {
    return <LoadScreen first={"Matching"} second={"Please Wait..."} />;
  }
}
