function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;

    if (callback) {
      callback(result);
    }
  }, 1000);
}

/*
    const callback = function(result) {
        console.log(result);
    }
*/

console.log("작업시작");
increase(0, result => {
  console.log(result); // 10
  increase(result, result => {
    console.log(result); // 20
    increase(result, result => {
      console.log(result); // 30
      increase(result, result => {
        console.log(result); // 40
        increase(result, result => {
          console.log(result); // 50
          console.log("작업 완료");
        });
      });
    });
  });
});
