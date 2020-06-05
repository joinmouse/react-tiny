export function setProps(dom, oldProps, newProps) {
    for(let key in newProps) {
        if(key !== newProps) {
            setProp(dom, key, newProps[key])
        }
    }
}


function setProp(dom, key, value) {
    // 事件
    console.log(key)
    if(/^on/.test(key)) {
        dom[key.toLowerCase] = value
    }else if(key === 'style') {
        // style
        if(value) {
            for(let styleName in value) {
                dom.style[styleName] = value[styleName]
            }
        }
    }else if(key !== 'children'){
        dom.setAttribute(key, value)
    }
}