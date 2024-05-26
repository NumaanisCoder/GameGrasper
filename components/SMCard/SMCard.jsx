import React from "react";
import style from "./SMCard.module.css";
import Link from "next/link";

const Card = ({ data }) => {
  let { name, description, date, url, category,subject } = data;
  date = date.slice(0, 10);
  const presec = name.replace(/-/g,'~')
  const mylink = presec.replace(/ /g,'-')

  return (
    <div className={style.CardMain}>
      <h3 className={style.title}>{name}</h3>
      <div className={style.date}>
        <p>
          <b>Class/Exam: </b> 
          {category}
        </p>
        <p>
          <b>Subject/SEM: </b> 
          {subject}
        </p>
      </div>
      <div className={style.date}>
        <p>
          <b>Date: </b> 
          {date}
        </p>
      </div>
      <Link href={`/StudyMaterial/${category}/${mylink}`} className={style.downloadButton}>
        View
      </Link>
    </div>
  );
};

export default Card;