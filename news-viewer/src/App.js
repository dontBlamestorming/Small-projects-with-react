import React, { useState } from 'react';
import NewsList from './components/NewsList';

const App = () => {
  return <NewsList />;
};
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

export default App;
