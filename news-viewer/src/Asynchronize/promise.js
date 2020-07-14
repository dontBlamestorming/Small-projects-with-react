function increase(number) {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 10;
      if (result > 50) {
        // result가 50 초과일 경우 에러를 발생시키기
        const error = new Error("NumberTooBig");
        return reject(error);
      }
      resolve(result);
    }, 1000);
  });
  return promise;
}

increase(0)
  .then(number => {
    // Promise에서 resolve된 값은 .then을 통해 받아올 수 있음
    console.log(number);
    return increase(number); // Promise를 리턴하면
  })
  .then(number => {
    // 또 .then으로 처리 가능
    console.log(number);
    return increase(number);
  })
  .then(number => {
    console.log(number);
    return increase(number);
  })
  .then(number => {
    console.log(number);
    return increase(number);
  })
  .then(number => {
    console.log(number);
    return increase(number);
  })
  .catch(e => {
    // 도중에 error가 발생하면 .catch를 통해 알 수 있음
    console.log(e);
  });
