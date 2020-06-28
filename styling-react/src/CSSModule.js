import React from "react";
import classNames from "classnames/bind";
import styles from "./CSSModule.module.scss";

console.log(styles); // {wrapper : "CSSModule_wrapper_1SbdQ"}

const cx = classNames.bind(styles); // style에서 클래스 객체 bind
const CSSModule = () => {
  return (
    <div className={cx("wrapper", "inverted")}>
      안녕하세요. 저는 <span className="something">CSS Module</span>입니다.
    </div>
  );
};

export default CSSModule;

/* 
    <div className={`${styles.wrapper} ${styles.inverted}`}></div>는
    <div className={[styles.wrapper, styles.inverted].join(' ')}와 같다.

    <Simple usage of classnames>

    import classNames from 'classnames';
    classNames('one', 'two') // = 'one two'
    classNames('one', { two : true }) // = 'one two'
    classNames('one', { two : false }) // = 'one'
    classNames('one', ['two', 'three']) // = 'one two three'

    const myClass = 'hello';
    classNames('one', myClass, { myCondition : true }); // = 'one hello myCondition'

    const MyConponent = ({ highlighted, theme }) => (
        <div className={classNames('MyComponent', {highlighted}, theme)}>Hello</div>
    );
*/
