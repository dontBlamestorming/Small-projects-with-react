import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;

/*
  url 파라미터로 카테고리 값을 전달하기 전의 로직
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);
  return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </>
  );
  */
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);
//   const key = 'f37687b691e74a32a8ddaa8736edf8f2';

//   /*
//     const onClick = () => {
//       axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
//         setData(response);
//       });
//     };
//   */
//   const onClick = async () => {
//     try {
//       const response = await axios.get(
//         `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${key}`,
//       );
//       setData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>

//       {data && (
//         <textarea
//           rows={7}
//           value={JSON.stringify(data, null, 2)}
//           readOnly={true}
//         />
//       )}
//     </div>
//   );
// };
