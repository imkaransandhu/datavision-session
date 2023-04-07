import { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";

export default function DropDown({ defaultSortingOption, setDefaultSortingOption}) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [otherSortingOption, setOtherSortingOption] = useState("Oldest");

  const handleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleDropDownText = () => {
    if (defaultSortingOption === "Latest") {
      setDefaultSortingOption("Oldest");
      setOtherSortingOption("Latest");
    } else {
      setDefaultSortingOption("Latest");
      setOtherSortingOption("Oldest");
    }
  };

  useEffect(() => {
    console.log(`Dropdown component. defaultSorting option is: "${ defaultSortingOption }"`);
  }, [defaultSortingOption]);

  return (
    <div className={styles["dropdown-container"]} onClick={handleDropDown}>
      <span className={styles["dropdown-default-value"]}>
        <p>{defaultSortingOption}</p>
        <Image
          src={
            dropDownOpen ? "/images/chevron-up.svg" : "/images/chevron-down.svg"
          }
          alt="dropdown arrow"
          width={15}
          height={9}
          style={{ marginTop: "0.25rem" }}
        ></Image>
      </span>
      {dropDownOpen && (
        <p
          className={styles["dropdown-other-value"]}
          onClick={handleDropDownText}
        >
          {otherSortingOption}
        </p>
      )}
    </div>
  );
}
