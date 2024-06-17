import React from "react";

export default function Practice() {
  let firstArray = [17, 13, 15, 20];
  let secondArray = [];
  for (var i = 0; i < firstArray.length; i++) {
    let p = i + 1;
    let indexToMove = firstArray[firstArray.length - p]; // 20
    secondArray.push(indexToMove);
  }
  console.log(secondArray);
  return <div></div>;
}
