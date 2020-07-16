import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 중 완료, 실패에 대한 상태관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // usePromise의 의존배열 deps를 파라미터로 받고, 이것을 useEffect의 의존배열로 설정하는 과정에서 ESlint 경고가 나타난다.
    // 왜????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  // [deps]라고 코딩하면 loading 값이 true로 바뀌지 않고 계속 usePromise가 호출되는 것 같다. [category]는 할당되면 사용자의 입력없이는 바뀌지 않는데 왜 계속 호출되는 걸까? loading값이 false로 바뀌지 않는게 아니라 usePromise가 계속 호출되면서 true로 업데이트 하는것...

  return [loading, resolved, error];
}
