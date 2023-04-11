"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

// Components
import WallMenu from "@/components/Shared/WallHeader/WallHeader";
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import DropDown from "@/components/dropdown";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import ImageView from "@/components/Shared/ImageView/ImageView";
import SessionContext from "@/Context/SessionContext";
import LoadScreen from "@/components/Shared/LoadScreen/LoadScreen";

// css
import styles from "./page.module.css";
import ScrollBtn from "@/components/ScrollBtn/ScrollBtn";

export default function Home() {
  const [isListView, setIsListView] = useState(true); // Lisitng View of images
  const [imgSrc, setImgSrc] = useState(null); // Image Preview Screen
  const [data, setData] = useState(); // data from blob storage
  const [defaultSortingOption, setDefaultSortingOption] = useState("Latest"); // Sorting of data
  const router = useRouter(); // router from next.js
  const { blobName } = router.query;
  const [session, setSession] = useContext(SessionContext); // session from useContext

  // fecthing data from api
  async function fetchData() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/gallery3/route",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const sortdata = sortByLastModified(response.data);
        setData(sortdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function sortByLastModified(arr) {
    arr.sort(function (a, b) {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    });
    return arr;
  }

  // Use effect to look if the cookie has session in it
  useEffect(() => {
    fetchData();
    const hasSessionCookie = Cookies.get("userSession");
    if (hasSessionCookie) {
      setSession(JSON.parse(hasSessionCookie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Blob routea and data to show image
  useEffect(() => {
    if (blobName && data) {
      setImgSrc(data[0].url);
    }
  }, [blobName, data]);

  // Show Image Preview by setting the Src
  const loadImageView = (e) => {
    const imageSource = e.target.getAttribute("src");
    setImgSrc(imageSource);
  };

  // Cross button to show gallery page from image preivew screen
  const handleImageViewCrossBtn = () => {
    setImgSrc(null);
  };

  // Loading screen while thye fetcing the data
  if (!data || !session) {
    return <LoadScreen first={"Please Wait"} second={"Loading ..."} />;
  }
  return (
    <div>
      {session.isVerified && <CaptureSession />}
      <WallMenu />
      <main className={styles["gallery-outer-container"]}>
        <h1>Gallery</h1>
        <div className={styles["gallery-options"]}>
          <Image
            src={
              isListView
                ? "/images/ListViewIcon.svg"
                : "/images/GridViewIcon.svg"
            }
            alt="grid view"
            width={21}
            height={21}
            onClick={() => {
              setIsListView(!isListView);
            }}
          ></Image>
          <DropDown
            defaultSortingOption={defaultSortingOption}
            setDefaultSortingOption={setDefaultSortingOption}
          />
        </div>
      </main>
      <GalleryGrid
        data={data}
        isListView={isListView}
        loadImageView={loadImageView}
        defaultSortingOption={defaultSortingOption}
      />

      {session.isVerified && (
        <div className={styles.button}>
          <Link href={"/capture"} className={styles.link}>
            <Image
              src={"/images/capture-icon.svg"}
              alt="grid view"
              width={64}
              height={64}
              className={styles["capture-icon"]}
            ></Image>
          </Link>
        </div>
      )}
      {imgSrc && (
        <ImageView
          imgSrc={imgSrc}
          handleImageViewCrossBtn={handleImageViewCrossBtn}
        />
      )}
      <ScrollBtn />
    </div>
  );
}
