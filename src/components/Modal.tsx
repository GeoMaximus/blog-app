import React, { ChangeEvent } from "react";
import { ArticleModel } from "../pages/Home";

import "../index.css";
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
    <div id="modal_overlay" className={isModalOpen ? "show-modal" : "show-modal modal_overlay"}>
      <div className="modal" id="modal">
        <div className="modal-content">
          <span id="close" className="close" onClick={closeModal}>
            &times;
          </span>
          <h1 className="title">Add/Edit article</h1>
          <div className="inputs__container">
            <input id="inputTitle" type="text" name="title" className="input" placeholder="Please enter title" />
            <input id="inputTag" type="text" name="tag" className="input" placeholder="Please enter tag" />
            <input id="inputAuthor" type="text" name="author" className="input" placeholder="Please enter author" />
            <input id="inputDate" type="text" name="date" className="input" placeholder="Please enter date" />
            <input id="inputImgUrl" type="text" name="imgUrl" className="input input-imgUrl" placeholder="Please enter image url" />
          </div>
          <textarea id="inputContent" className="textarea" name="content"
            placeholder="Please enter content"></textarea>
          <div className="modal__buttons">
            <button onClick={closeModal} id='cancel' type="button" className="btn">Cancel</button>
            {article.id === 0 && (
              <button onClick={addArticle} id="button_add" className="btn button--pink" type="button">Save</button>)}
            {article.id !== 0 && (
              <button onClick={updateArticle} id='save' type="button" className="btn button--pink">Update</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}
