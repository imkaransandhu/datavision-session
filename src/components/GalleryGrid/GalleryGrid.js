/* eslint-disable @next/next/no-img-element */
import styles from "./GalleryGrid.module.css";
import { useEffect, useState } from "react";

export default function GalleryGrid({ data, isListView, loadImageView, defaultSortingOption }) {
  // const [dataHasBeenSorted, setDataHasBeenSorted] = useState([])
  const [dataHasBeenSorted, setDataHasBeenSorted] = useState(data)//works initially but not when list view
  // const [dataHasBeenSorted, setDataHasBeenSorted] = useState('')
 
  // function sortByLastModified(arr) {
  //   arr.sort(function (a, b) {
  //       return (
  //         new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
  //       );
  //   });
  //   return arr;
  // }
  // const sortedData = sortByLastModified(data);

  function sortByLastModified(arr, defaultSortingOption) {
    arr.sort(function (a, b) {
      if(defaultSortingOption === "Latest"){
        
        console.log('inside the sort function=latest')
        
        return (
          new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
        );
      }else if(defaultSortingOption === "Oldest"){
        console.log('inside the sort function=oldest')
        return (
          new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        );
      }
    });
    return arr;
  }

  useEffect(() => {
    const sortedData = sortByLastModified(data, defaultSortingOption);
    setDataHasBeenSorted(sortedData);
  }, [defaultSortingOption]);




  return (
    <div
      className={
        isListView
          ? styles["list-outer-container"]
          : styles["grid-outer-container"]
      }
    >
      {dataHasBeenSorted.map((item, index) => {
        return (
          <button
            onClick={loadImageView}
            className={styles["grid-item"]}
            key={index}
          >
            <img src={item.url} alt="Captured interactive image"></img>
          </button>
        );
      })}
    </div>
  );
}
