import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponentClass extends Component {
  // 클래스 내부에서 defaultProps와 propTypes 설정
  static defaultProps = {
    name: '기본 이름'
  };

  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired
  };
  redner() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다.
        <br />
        children 값은 {children}입니다. 제가 좋아하는 숫자는 {favoriteNumber}
        입니다.
      </div>
    );
  }
}

// MyComponentClass.defaultProps = {
//   name: '기본 이름'
// };

// MyComponentClass.propTypes = {
//   name: PropTypes.string,
//   favoriteNumber: PropTypes.number.isRequired
// };

export default MyComponentClass;
