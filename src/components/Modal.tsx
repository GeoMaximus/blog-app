import React, { ChangeEvent } from "react";
import { ArticleModel } from "../pages/Home";

import "./Modal.css";
type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  addArticle: () => void;
  updateArticle: () => void;
  handleNameInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImgInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  article: ArticleModel;
};

export default function Modal({
  isModalOpen,
  closeModal,
  article,
  handleNameInputChange,
  handleImgInputChange,
  addArticle,
  updateArticle,
}: Props) {
  return (
    <div id="myModal" className={isModalOpen ? "modal is-modal-open" : "modal"}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <label>
          Title:
          <input
            type="text"
            value={article.title}
            onChange={handleNameInputChange}
            name="title"
          />
        </label>
        <label>
          ImgUrl:
          <input
            type="text"
            value={article.imgUrl}
            onChange={handleImgInputChange}
            name="imgUrl"
          />
        </label>
        <div>
          {article.id === 0 && (
            <button onClick={addArticle} type="button">
              Add
            </button>
          )}
          {article.id !== 0 && (
            <button onClick={updateArticle} type="button">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
