// API를 요청하고 뉴스 데이터가 들어 있는 배열을 컴포넌트 배열로 변환하여 렌더링하는 역할
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

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

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    const key = 'f37687b691e74a32a8ddaa8736edf8f2';
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${key}`,
    );
  }, [category]);

  // 대기 중일때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }

  // 아직 response 값이 설정되지 않았을 떄
  if (!response) {
    return null;
  }

  // error가 ture(에러가 발생했을 때)
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  // articles 값이 유효할 때
  const { articles } = response.data;
  console.log(response.data);
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;

/*
  usePromise 커스텀 hook을 쓰지 않는 경우
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const key = 'f37687b691e74a32a8ddaa8736edf8f2';

  useEffect(() => {
    const fetchData = async () => {
      // async를 사용하는 함수 따로 선언
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${key}`,
        );
        console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
*/
