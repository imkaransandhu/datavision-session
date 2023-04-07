import SessionContext from "@/Context/SessionContext";
import styles from "./CaptureSession.module.css";
import React, { useState, useEffect, useContext } from "react";

const CaptureSession = () => {
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [showCaptureSession, setShowCaptureSession] = useState(true);
  const [session, setSession] = useContext(SessionContext);
  //This logic makes the banner fixed only when scrolling begins.
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0 && !scrolled) {
        setScrolled(true);
      } else if (scrollTop === 0 && scrolled) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (session.isVerified) {
      startTiming(session.expirationTime);
    } else {
      setTimeout(() => {
        setShowCaptureSession(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function startTiming(expirationTime) {
    const TimeIntervalId = setInterval(() => {
      let expiringTime = expirationTime;
      if (typeof expiringTime !== "object") {
        expiringTime = new Date(expiringTime);
      }
      const timeLeft = Math.round((expiringTime - new Date()) / 1000); // time left in seconds
      setTimeLeft(timeLeft);
      if (timeLeft < 1) {
        setSession({ guid: null, expirationTime: null, isVerified: false });
        clearInterval(TimeIntervalId);
      }
    }, 1000);
  }

  return (
    <div
      style={{
        display: showCaptureSession ? "block" : "none",
        backgroundColor: timeLeft < 11 && "#F72759",
      }}
      className={
        scrolled
          ? styles["capture-banner-fixed"]
          : styles["capture-session-banner"]
      }
    >
      {timeLeft ? (
        timeLeft > 10 ? (
          <p>{`Capture Session: ${timeLeft} seconds Remaining`}</p>
        ) : timeLeft > 0 ? (
          <p>{`${timeLeft}s`}</p>
        ) : (
          <p>{`Capture Session Expired`}</p>
        )
      ) : (
        <p>{`Capture Session Expired`}</p>
      )}
    </div>
  );
};

export default CaptureSession;
