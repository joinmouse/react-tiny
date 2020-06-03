import React from './react';
import ReactDOM from 'react-dom';

// babel转义
// React.createElement(type, props, ...children)
// 虚拟DOM就是一个JS对象, 以对象的方式描述界面上的DOM
// var element = React.createElement("div", {
//         id: "A1"
//     }, React.createElement("p", {
//         id: "B1"
//     }, React.createElement("span", {
//         id: "C1"
//     }, "111"), React.createElement("span", {
//         id: "C2"
//     }, "222")), React.createElement("p", {
//         id: "B2"
// }))

let element = (
    <div id='A1'>
        <p id='B1'>
            <span id='C1'>111</span>
            <span id='C2'>222</span>
        </p>
        <p id='B2'></p>
    </div>
)
console.log(element)

// ReactDOM.render(
//     element,
//     document.getElementById('root')
// )