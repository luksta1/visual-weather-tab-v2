import React from 'react';
import PropTypes from 'prop-types';

const slider = () => {
  let current = 0;
  const slides = document.getElementsByClassName('article');

  setInterval(() => {
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.opacity = 0;
    }
    current = (current !== slides.length - 1) ? current + 1 : 0;
    slides[current].style.opacity = 1;
  }, 10000);
};

const Articles = (props) => {
  const { articles } = props;
  return (
    <div onLoad={slider()} className="article-wrapper">
      {articles.map(article => (
        <div key={article.publushedAt} className="article">
          <a href={article.url}><h4>{article.title}</h4></a>
          <h6>{article.source.name}</h6>
        </div>
      ))}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.object.isRequired,
};

export default Articles;
