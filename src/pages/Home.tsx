import React, { ChangeEvent, Component } from 'react'
import Article from '../components/Article';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import "../index.css";

type Props = {}

type State = {
  articles: ArticleModel[];
  isModalOpen: boolean;
  selectedArticle: ArticleModel;
  startIndex: number;
  endIndex: number;
  articlesDisplayed: number;
};

export type ArticleModel = {
  id: number;
  title: string;
  tag: string;
  author: string;
  date: string;
  imgUrl: string;
  content: string;
  saying: string;
};

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const noArticlesDisplayed = 3;
    this.state = {
      articles: [],
      isModalOpen: false,
      selectedArticle: {
        id: 0,
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        content: "",
        saying: "",
      },
      articlesDisplayed: noArticlesDisplayed,
      startIndex: 0,
      endIndex: noArticlesDisplayed - 1,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    this.handleTagInputChange = this.handleTagInputChange.bind(this);
    this.handleAuthorInputChange = this.handleAuthorInputChange.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleImgUrlInputChange = this.handleImgUrlInputChange.bind(this);
    this.handleContentInputChange = this.handleContentInputChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    const res = await fetch(`http://localhost:3000/articles`);
    const json = await res.json();
    this.setState({ articles: json }, () => {
      this.updateDisplayIndex();
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        id: 0,
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        content: "",
        saying: "",
      },
    });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  updateDisplayIndex() {
    const { articles, startIndex, endIndex, articlesDisplayed } = this.state;
  }

  handleTitleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, title: value } });
  }

  handleTagInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, tag: value } });
  }

  handleAuthorInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, author: value } });
  }

  handleDateInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, date: value } });
  }

  handleImgUrlInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, imgUrl: value } });
  }

  handleContentInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, content: value } });
  }

  async addArticle() {
    const { title, tag, author, date, imgUrl, content } = this.state.selectedArticle;
    const body = { title, tag, author, date, imgUrl, content };
    const response = await fetch(`http://localhost:3000/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
    // reset form
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        id: 0,
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        content: "",
        saying: "",
      },
    });

    this.fetchArticles();
  }

  async updateArticle() {
    const { title, tag, author, date, imgUrl, content, id } = this.state.selectedArticle;
    const body = { title, tag, author, date, imgUrl, content, id };
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();

    // reset form and close modal
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        id: 0,
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        content: "",
        saying: "",
      },
    });

    this.fetchArticles();
  }

  async deleteArticle(id: number) {
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();

    this.fetchArticles();
  }

  editArticle(article: ArticleModel) {
    this.setState({ selectedArticle: article, isModalOpen: true });
  }

  goToPrev() {
    const { startIndex, endIndex, articlesDisplayed } = this.state;

    this.setState({
      startIndex: startIndex - articlesDisplayed,
      endIndex: endIndex - articlesDisplayed,
    });
  }

  goToNext() {
    const { startIndex, endIndex, articlesDisplayed } = this.state;
    this.setState({
      startIndex: startIndex + articlesDisplayed,
      endIndex: endIndex + articlesDisplayed,
    });
  }

  render() {
    const { isModalOpen, articles, selectedArticle, startIndex, endIndex } = this.state;

    const articleList = articles
      .filter((article, index) => index >= startIndex && index <= endIndex)
      .map((article: ArticleModel) => (
        <Article
          key={article.id}
          title={article.title}
          author={article.author}
          date={article.date}
          tag={article.tag}
          imgUrl={article.imgUrl}
          content={article.content}
          saying={article.saying}
          id={article.id}
          editArticle={this.editArticle}
          deleteArticle={this.deleteArticle} />
      ));

    return (
      <div>
        <div className='add'>
          <button className="btn" onClick={this.openModal}>Add article</button>
        </div>
        <div className='article-container'>
          {articleList}
        </div>
        <footer className="footer">
          <button onClick={this.goToPrev} disabled={startIndex <= 0} className="footer_link">previous</button>
          <button onClick={this.goToNext} disabled={endIndex >= articles.length - 1} className="footer_link">next</button>
        </footer>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          article={selectedArticle}
          handleTitleInputChange={this.handleTitleInputChange}
          handleTagInputChange={this.handleTagInputChange}
          handleAuthorInputChange={this.handleAuthorInputChange}
          handleDateInputChange={this.handleDateInputChange}
          handleImgUrlInputChange={this.handleImgUrlInputChange}
          handleContentInputChange={this.handleContentInputChange}
          addArticle={this.addArticle}
          updateArticle={this.updateArticle}
        />
      </div>

    );
  }
}

export default Home;