import React, { Component } from 'react'
import Article from '../components/Article';
import Modal from '../components/Modal';

type Props = {}

type State = {
  articles: ArticleModel[];
  isModalOpen: boolean;
  selectedArticle: ArticleModel;
};

export type ArticleModel = {
  id: number;
  title: string;
  tag: string;
  author: string;
  imgUrl: string;
  content: string;
};

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      articles: [],
      isModalOpen: false,
      selectedArticle: {
        id: 0,
        title: "",
        tag: "",
        author: "",
        imgUrl: "",
        content: "",
      },
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleImgInputChange = this.handleImgInputChange.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    const res = await fetch(`http://localhost:3000/articles`);
    const json = await res.json();
    console.log(json);
    this.setState({ articles: json });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        author: "",
        tag: "",
        content: "",
        title: "",
        imgUrl: "",
        id: 0,
      },
    });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, title: value } });
  }

  handleImgInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ selectedArticle: { ...this.state.selectedArticle, imgUrl: value } });
  }

  async addArticle() {
    const { title, imgUrl } = this.state.selectedArticle;
    const body = { title, imgUrl };
    const response = await fetch(`http://localhost:3000/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log(json);
    // reset form
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        author: "",
        tag: "",
        content: "",
        title: "",
        imgUrl: "",
        id: 0,
      },
    });

    this.fetchArticles();
  }

  async updateArticle() {
    const { title, imgUrl, id } = this.state.selectedArticle;
    const body = { title, imgUrl, id };
    const response = await fetch(`http://localhost:3000/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();

    // reset form and close modal
    this.setState({
      isModalOpen: false,
      selectedArticle: {
        author: "",
        tag: "",
        content: "",
        title: "",
        imgUrl: "",
        id: 0,
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
    const json = await response.json();

    this.fetchArticles();
  }

  editArticle(article: ArticleModel) {
    this.setState({ selectedArticle: article, isModalOpen: true });
  }

  render() {
    const { isModalOpen, articles, selectedArticle } = this.state;

    const articleList = articles.map((article: ArticleModel) => (
      <Article
        key={article.id}
        author={article.author}
        content={article.content}
        tag={article.tag}
        imgUrl={article.imgUrl}
        id={article.id}
        editArticle={this.editArticle}
        deleteArticle={this.deleteArticle} title={''}      />
    ));

    return (
      <main>
        <button onClick={this.openModal}>Add article</button>
        {articleList}
        <Modal
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          article={selectedArticle}
          handleNameInputChange={this.handleNameInputChange}
          handleImgInputChange={this.handleImgInputChange}
          addArticle={this.addArticle}
          updateArticle={this.updateArticle}
        />
      </main>
    );
  }
}

export default Home;