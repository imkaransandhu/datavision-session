import { useState, useEffect } from "react";
import styles from "./ScrollBtn.module.css";
import Image from "next/image";

export default function ScrollBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setIsVisible(scrollTop > height * 0.25);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      className={`${styles["scroll-to-top-button"]} ${
        isVisible ? styles["is-visible"] : ""
      }`}
      onClick={scrollToTop}
    >
      <Image
        src="/images/chevron-up.svg"
        alt="dropdown arrow"
        width={20}
        height={11}
        style={{ marginTop: "0.25rem" }}
      ></Image>
    </button>
  );
}
