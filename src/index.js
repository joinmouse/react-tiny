import React from './react';
import ReactDOM from './react-dom';

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

let style = {
    border: '2px solid red',
    margin: '20px'
}

let element = (
    <div id='A1' style={style}>
        A1
        <div id='B1' style={style}>
            B1
            <div id='C1' style={style}>C1</div>
            <div id='C2' style={style}>C2</div>
        </div>
        <div id='B2' style={style}>B2</div>
    </div>
)
// console.log(element)

ReactDOM.render(
    element,
    document.getElementById('root')
)