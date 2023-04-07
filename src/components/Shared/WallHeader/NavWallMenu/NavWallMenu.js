import { useContext } from "react";
import styles from "./NavWallMenu.module.css";

import Link from "next/link";
import SessionContext from "@/Context/SessionContext";

const NavWallMenu = ({ handleMenuState }) => {
  const [session, setSession] = useContext(SessionContext);

  return (
    <ul className={styles["nav-wall-menu"]}>
      <li>
        <Link
          disabled={session.isVerified ? false : true}
          onClick={handleMenuState}
          href={"/capture"}
        >
          Capture
        </Link>
      </li>
      <li>
        <Link onClick={handleMenuState} href={"/"}>
          Gallery
        </Link>
      </li>
    </ul>
  );
};

export default NavWallMenu;
