import React, { ChangeEvent } from "react";
import { ArticleModel } from "../pages/Home";
import "../index.css";

type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  addArticle: () => void;
  updateArticle: () => void;
  handleTitleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTagInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAuthorInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDateInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImgUrlInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleContentInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  article: ArticleModel;
};

export default function Modal({
  isModalOpen,
  closeModal,
  article,
  handleTitleInputChange,
  handleTagInputChange,
  handleAuthorInputChange,
  handleDateInputChange,
  handleImgUrlInputChange,
  handleContentInputChange,
  addArticle,
  updateArticle,
}: Props) {
  return (
    <div id="myModal" className={isModalOpen ? "modal is-modal-open" : "modal"}>
        <div className="modal-content">
          <span id="close" className="close" onClick={closeModal}>
            &times;
          </span>
          <h1 className="title">Add/Edit article</h1>
          <div className="inputs__container">
            <input type="text" name="title" className="input" placeholder="Please enter title" value={article.title} onChange={handleTitleInputChange} />
            <input type="text" name="tag" className="input" placeholder="Please enter tag" value={article.tag} onChange={handleTagInputChange} />
            <input type="text" name="author" className="input" placeholder="Please enter author" value={article.author} onChange={handleAuthorInputChange} />
            <input type="text" name="date" className="input" placeholder="Please enter date" value={article.date} onChange={handleDateInputChange} />
            <input type="text" name="imgUrl" className="input input-imgUrl" placeholder="Please enter image url" value={article.imgUrl} onChange={handleImgUrlInputChange} />
          </div>
          {/* <textarea className="textarea" name="content"
            placeholder="Please enter content" value={article.content} onChange={handleContentInputChange}>
            </textarea> */}
          <div className="modal__buttons">
            <button onClick={closeModal} id='cancel' type="button" className="btn">Cancel</button>
            {article.id === 0 && (
              <button onClick={addArticle} id="button_add" className="btn button--pink" type="button">Save</button>)}
            {article.id !== 0 && (
              <button onClick={updateArticle} id='save' type="button" className="btn button--pink">Update</button>)}
          </div>
        </div>
      </div>
  );
}
