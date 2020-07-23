const path = require('path');
const titles = require(path.resolve('src/models/Titles'))
const articles = require(path.resolve('src/models/Articles'))

class Calendar {
  getTitle(userID) {
    return titles.findOne(userID)
      .then((title) => ({ title }))
  }

  updateTitle(title, userID) {
    return titles.update(title, userID)
      .then((title) => ({ title }))
  }

  getArticles(userID) {
    return articles.findAll(userID)
      .then((articles) => ({ articles }))
  }

  createArticle(article, userID) {
    return articles.insert(article, userID)
      .then((articles) => ({ articles }))
  }

  updateArticle(article, articleID, userID) {
    return articles.update(article, articleID, userID)
      .then((articles) => ({ articles }))
  }

  deleteArticle(articleID, userID) {
    return articles.delete(articleID, userID)
      .then((articles) => ({ articles }))
  }

  aggregate(userID) {
    return this.getTitle(userID)
      .then(({ title }) => (
        this.getArticles(userID)
          .then(({ articles }) => ({ title, articles }))
      ))
  }
}

const calendar = new Calendar;

module.exports = calendar;
