import React, { Component } from 'react';

class ScrollBox extends Component {
  scrollToBotton = () => {
    const { scrollHeight, clientHeight } = this.box;
    /*
        const scrollHeight = this.box.scrollHeight;
        const clientHeight = this.box.clientHeight;
        scrollHeight, clientHeight, scrollTop가 그럼 property인가?
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  };

  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    };

    return (
      <div
        style={style}
        ref={ref => {
          this.box = ref;
        }}
      >
        <div style={innerStyle} />
      </div>
    );
  }
}

export default ScrollBox;

/*
    JSX 안의 ref를 console해보았을 때 해당 div박스가 나온다. 이는 컴포넌트도 같은 메커니즘으로 작동되는 것 같다. 마치 this가 자기 자신을 가리키듯이 말이다.
*/
