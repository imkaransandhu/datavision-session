"use client";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import CaptureSession from "@/components/Shared/CaptureSession/CaptureSession";
import HeaderSection from "./OnboardingElements/HeaderSection";
import AnimationSection from "./OnboardingElements/AnimationSection";
import NavigationSection from "./OnboardingElements/NavigationSection";

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const [fadeLoading, setFadeLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const content = [
    {
      subHeading: "Welcome to",
      heading: "DataVision",
      description:
        "DataVision is an interactive exhibit using cutting-edge tech to showcase art inspired by Datacom values. Unleash your inner artist and experience Datacom values in a whole new way.",
      animation: "/video/onboarding1.mp4",
    },
    {
      subHeading: "Step One",
      heading: "Capture",
      description:
        "Your movements disrupt the particles on screen, creating one-of-a-kind artwork. Capture your own masterpiece and share your creations with the world.",
      animation: "/video/onboarding2.mp4",
    },
    {
      subHeading: "Step Two",
      heading: "Explore",
      description:
        "Join the creative community and explore the Gallery of unique art created by others before you. The possibilities are endless!",
      animation: "/video/onboarding3.mp4",
    },
  ];

  //Cookie Logic
  useEffect(() => {
    const hasCookie = Cookies.get("hasDoneOnboarding");

    if (hasCookie) {
      setFadeLoading(true);
      setTimeout(() => {
        router.push("/capture");
      }, 3000);
    } else {
      Cookies.set("hasDoneOnboarding", true, { expires: 14 });
      setFadeLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carousel Logic

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? content.length - 1 : prevIndex + 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  if (loading) {
    return (
      <div
        className={styles["loader-container"]}
        style={{ opacity: fadeLoading ? 0 : 1 }}
      >
        <div className={styles.loader}>
          <p>LOADING</p>
          <h1>DataVision</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["carousel-container"]} {...handlers}>
      <CaptureSession />
      <HeaderSection currentIndex={currentIndex} content={content} />
      <AnimationSection currentIndex={currentIndex} content={content} />
      <NavigationSection
        currentIndex={currentIndex}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        content={content}
      />
    </div>
  );
}
