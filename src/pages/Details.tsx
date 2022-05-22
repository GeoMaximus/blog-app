import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleModel } from "./Home";
import "../index.css";

export default function Details() {
  let { articleId } = useParams();

  const [article, setArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`http://localhost:3000/articles/${articleId}`);
      const json = await response.json();
      setArticle(json);
    }

    fetchArticles();
  }, [articleId]);


  console.log(articleId);
  return (
    <div>
      <div className='add'>
          <button className="btn" >Add article</button>
        </div>
      {
        article !== null && (
          <article className="article-container">
            <h1>{article.title}</h1>
            <ul className="info">
              <li className="info_item">{article.tag}</li>
              <li className="info_item">Added by </li>
              <li className="info_item">
                <span className="info_mark">{article.author}</span>
              </li>
              <li className="info_item">{article.date}</li>
            </ul>
            <div className="action_buttons">
        <button type="button" className="action_btn">EDIT</button>
        <button type="button" className="action_btn">DELETE</button>
      </div>
            <img className="img" src={article.imgUrl} alt={article.title} />
            <div className="content">
              <p className="article-container">{article.content}</p>
            </div>
          </article>
        )
      }
      <footer className="footer">
          {/* <button onClick={this.goToPrev} disabled={startIndex <= 0} className="footer_link">previous</button> */}
          {/* <button onClick={this.goToNext} disabled={endIndex >= articles.length - 1} className="footer_link">next</button> */}
        </footer>
    </div>
  )
}