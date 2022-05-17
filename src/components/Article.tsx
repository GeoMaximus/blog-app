import React from "react";
import { Link } from "react-router-dom";
import { ArticleModel } from "../pages/Home";

type Props = {
  id: number;
  title: string;
  tag: string;
  author: string;
  imgUrl: string;
  content: string;
  editArticle: (article: ArticleModel) => void;
  deleteArticle: (id: number) => void;
}

export default function Article({
  title, tag, author, imgUrl, content, id, editArticle, deleteArticle
}: Props) {
  return (
    <li>
      {title}
      <img src={imgUrl} alt={title} />
      <button onClick={() => editArticle({ tag, author, content, title, imgUrl, id })} type="button">
        Edit
      </button>
      <button onClick={() => deleteArticle(id)} type="button">
        Delete
      </button>
      <Link to={`/details/${id}`}>See more...</Link>
    </li>
  )
}