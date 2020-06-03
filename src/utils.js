export function setProps(dom, oldProps, newProps) {
    for(let key in newProps) {
        if(key !== newProps) {
            setProp(dom, key, newProps[key])
        }
    }
}


function setProp(dom, key, value) {
    // 事件
    if(/^on/.test(key)) {
        dom[key.toLowerCase] = value
    }else if(key === 'value') {
    // style
        if(value) {
            for(let styleName in value) {
                dom.style[styleName] = value[styleName]
            }
        }
    }else {
        dom.setAttribute(key, value)
    }
}