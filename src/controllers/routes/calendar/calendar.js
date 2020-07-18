const express = require('express');

const calendarRouter = express.Router();

const articlesPath = '/articles';
const titlePath = '/title';

// temp
let title = 'titleSamp';
const articles = [{title: '1st'}, {title: '2nd'}] 

calendarRouter.get('/', (req, res) => {
  console.log('here');
  res.status(200).json({title, articles});
});

calendarRouter.get(titlePath, (req, res) => {
  res.status(200).json({title});
});

calendarRouter.put(titlePath, (req, res) => {
  title = req.body.title;
  res.status(200).json({title});
});

calendarRouter.get(articlesPath, (req, res) => {
  res.status(200).json({articles});
});

calendarRouter.post(articlesPath, (req, res) => {
  articles.push(identifyArticle(req.body));
  res.status(200).json({articles});
});

calendarRouter.put(articlesPath, (req, res) => {
  req.body.id = +req.query.id;
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  if (!(~idx)) {
    res.status(404).json('Not found')
    return;
  }
  articles[idx] = req.body;
  res.status(200).json({articles});
});

calendarRouter.delete(articlesPath, (req, res) => {
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  if (!(~idx)) {
    res.status(404).json('Not found');
    return;
  }
  articles.splice(idx, 1);
  res.status(200).json({articles});
});

module.exports = calendarRouter;
