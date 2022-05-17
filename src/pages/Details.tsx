import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleModel } from "./Home";

export default function Details() {
  let { articleId } = useParams();

  const [article, setArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`http://localhost:3000/articles/${articleId}`);
      const json = await response.json();
      console.log(json);
      setArticle(json);
    }

    fetchArticles();
  }, [articleId]);

  console.log(articleId);
  return (
    <div>Details: 
      {
        article !== null && (
          <div>
            <span>{article.title}</span> <img src={article.imgUrl} alt={article.title} />
          </div>
        )
      }
      <Link to={("/")}>Back</Link>
    </div>
  )
}