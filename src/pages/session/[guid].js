import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Ably from "ably";

// Context
import SessionContext from "./../../Context/SessionContext";

// Components
import LoadScreen from "@/components/Shared/LoadScreen/LoadScreen";

export default function ValidatingUser() {
  const router = useRouter();
  const { guid } = router.query;
  const [guidFromFile, setGuidFromFile] = useState(null);
  const [session, setSession] = useContext(SessionContext);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [env, setEnv] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading guif from azure blob file
    axios
      .get("/api/GetBlobGuid")
      .then((response) => setGuidFromFile(response.data))
      .catch((error) => console.error(error));

    getUrlEnv();

    if (guid && env) {
      if (guid === guidFromFile) {
        setLoading(true);
        setSessionExpired(false);
        const expirationTime = new Date(Date.now() + 40 * 1 * 1000); // 40 seconds from now
        Cookies.set(
          "userSession",
          `{ "guid" : "${guid}", "expirationTime" : "${expirationTime}", "isVerified": "${true}" }`,
          { expires: expirationTime }
        );
        setSession({ guid, expirationTime, isVerified: true });
        async function socketRun() {
          const ably = new Ably.Realtime.Promise(env);
          await ably.connection.once("connected");
          // get the channel to subscribe to
          const channel = ably.channels.get("quickstart");
          const timeToCreateQrCode = "40";
          await channel.publish("change-qr-code", timeToCreateQrCode);
          setLoading(false);
        }
        socketRun();
        router.push("/onboarding");
      } else {
        setLoading(false);
        setSessionExpired(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guid, guidFromFile, env]);

  function getUrlEnv() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/getEnv",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setEnv(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
