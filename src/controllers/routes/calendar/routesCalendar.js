const path = require('path');
const express = require('express');
const calendar = require(path.resolve('src/controllers/services/servicesCalendar'))

const calendarRouter = express.Router();

const articlesPath = '/articles';
const titlePath = '/title';

// temp
let title = 'titleSamp';
const articles = [{title: '1st'}, {title: '2nd'}] 

calendarRouter.get('/', (req, res) => {
  calendar.aggregate(req.user.userID)
    .then((data) => {
      data
        ? res.status(200).json(data)
        : res.sendStatus(404)
      })
    .catch(() => res.sendStatus(500))
});

calendarRouter.get(titlePath, (req, res) => {
  calendar.getTitle(req.user.userID)
    .then((title) => {
      title 
        ? res.status(200).json(title)
        : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

calendarRouter.put(titlePath, (req, res) => {
  const newTitle = req.body.title;
  calendar.updateTitle(newTitle, req.user.userID)
    .then((title) => {
      title 
        ? res.status(200).json(title)
        : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

calendarRouter.get(articlesPath, (req, res) => {
  calendar.getArticles()
    .then((articles) => {
      articles 
       ? res.status(200).json(articles)
       : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

calendarRouter.post(articlesPath, (req, res) => {
  const article = req.body;
  calendar.createArticle(article, req.user.userID)
    .then((articles) => {
      articles 
       ? res.status(200).json(articles)
       : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

calendarRouter.put(articlesPath, (req, res) => {
  const article = req.body;
  const articleID = req.query.id;
  calendar.updateArticle(article, articleID, req.user.userID)
    .then((articles) => {
      articles 
       ? res.status(200).json(articles)
       : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

calendarRouter.delete(articlesPath, (req, res) => {
  const articleID = req.query.id;
  calendar.deleteArticle(articleID, req.user.userID)
    .then((articles) => {
      articles 
       ? res.status(200).json(articles)
       : res.sendStatus(404);
    })
    .catch(() => res.sendStatus(500))
});

module.exports = calendarRouter;
