import { ELEMENT_TEXT } from './constants';

/*
* 创建元素(虚拟DOM)方法
* @param {} type
* @param {*} config
* @param {...any} children
*/
function createElement(type, config, ...children) {
    delete config.__self
    delete config.__source

    return {
        type,
        props: {
            ...config,
            // 兼容处理: 如果是react元素返回自己，如果是文本类型就返回一个包含文本字符串的对象
            children: children.map(child => {
                return typeof child === 'object' ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children: []
                    }
                }
            })
        }
    }
}

const React = {
    createElement
}
export default React