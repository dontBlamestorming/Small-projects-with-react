import { createContext } from "react";

const ColorContext = createContext({ color: "black" });
// createContext의 파라미터에는 Context의 기본 상태를 지정한다.

export default ColorContext;
