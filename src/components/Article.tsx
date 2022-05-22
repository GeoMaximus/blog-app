import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { ArticleModel } from "../pages/Home";
import "../index.css";


type Props = {
  id: number;
  title: string;
  tag: string;
  author: string;
  date: string;
  imgUrl: string;
  content: string;
  saying: string;
  editArticle: (article: ArticleModel) => void;
  deleteArticle: (id: number) => void;
}

export default function Article({
  id, title, tag, author, date, imgUrl, content, saying, editArticle, deleteArticle
}: Props) {
  return (
    <article className="article-container">
      <h1>{title}</h1>
      <ul className="info">
        <li className="info_item">{tag}</li>
        <li className="info_item">Added by </li>
        <li className="info_item">
          <span className="info_mark">{author}</span>
        </li>
        <li className="info_item">{date}</li>
      </ul>
      <div className="action_buttons">
        <button onClick={() => editArticle({ id, title, tag, author, date, imgUrl, content, saying})} type="button" className="action_btn">EDIT</button>
        <button onClick={() => deleteArticle(id)} type="button" className="action_btn">DELETE</button>
      </div>
      <img src={imgUrl} alt={title} />
      <div className="content">
        <p className="article-container">{content} <Link to={`/details/${id}`}>See more...</Link></p>
        <p className="saying">{saying}</p>
      </div>
    </article>
  )
}