import React from 'react';
import PropTypes from 'prop-types';

const slider = () => {
  setTimeout(() => {
    let current = 1;
    let previous = 0;
    const slides = document.getElementsByClassName('article');
    slides[previous].style.opacity = 0;
    slides[current].style.opacity = 1;

    setInterval(() => {
      previous = current;
      current = (current !== slides.length - 1) ? current + 1 : 0;
      slides[previous].style.opacity = 0;
      slides[current].style.opacity = 1;
    }, 5000);
  }, 100);
};

const Articles = (props) => {
  const { articles } = props;
  const opacityStyle = { opacity: 0 };
  return (
    <div className="article-wrapper">
      {articles && articles.map((article, index) => {
        if (index === articles.length - 1) { slider(); }
        return (
          <div key={Math.random()} style={opacityStyle} className="article">
            <a href={article.url}><h4>{article.title}</h4></a>
            <h6>{article.source.name}</h6>
          </div>
        );
      })}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.array,
};

Articles.defaultProps = {
  articles: {},
};

export default Articles;
