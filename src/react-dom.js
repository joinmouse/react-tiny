import { TAG_ROOT } from './constants';

/*
* render 是要把一个元素渲染到一个容器内部
* @param element: 传入的虚拟DOM
* @param container: 传入的rootDom节点 
*/
function render(element, container) {
    let rootFiber = {
        // 每个Fiber会有一个tag标识, 此元素的类型
        tag: TAG_ROOT,
        // 一般情况下这个元素是一个原生节点的话，stateNode指向真实DOM元素
        stateNode: container,
        // props.children 是一个数组，里面放的是react元素，后面会依据每一个元素创建fiber
        props: {
            children: [element]
        }
    }
    // 调度
    scheduleRoot(rootFiber);
}

const ReactDOM = {
    render
}

export default ReactDOM