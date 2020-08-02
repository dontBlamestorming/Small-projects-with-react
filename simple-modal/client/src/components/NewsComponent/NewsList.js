import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fatchData = async () => {
      setLoading(true);
      const key = "f37687b691e74a32a8ddaa8736edf8f2";
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${key}`
        );
        setArticles(res.data.articles);
        console.log(res.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fatchData();
  }, []);

  if (loading) {
    return <NewsListBlock>대기중</NewsListBlock>;
  }

  if (!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
