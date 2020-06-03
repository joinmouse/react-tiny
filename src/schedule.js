import { TAG_ROOT, TAG_TEXT, TAG_HOST, PLACEMENT, ELEMENT_TEXT } from './constants';
import { setProps } from './utils';

/*
* 从根节点开始渲染和调度
* 两个阶段
* 1、render阶段: 也是diff阶段, 对比新旧的虚拟DOM, 进行增量更新或者创建，
*    这个阶段比较花费时间，可以对任务进行拆分，此阶段可暂停
*    1.1、生成Fiber树
*    1.2、收集effectList
* 2、commit阶段: 进行DOM更新或创建阶段，此阶段不能暂停，要一气呵成
*/
let nextUnitOfWork = null  //下一个工作单元
let workInProgressRoot = null  //RootFiber应用的根
function scheduleRoot(rootFiber) {
    /*
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
    */
    workInProgressRoot = rootFiber
    nextUnitOfWork = rootFiber
}

// 循环执行工作: nextUnitOfWork
function workLoop(deadline) {
    // 是否要让出时间片, 或者说控制权  默认false
    let shouldYield = false
    while(nextUnitOfWork && !shouldYield) {
        // 执行完一个任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1 //小于1ms, 让出控制权
    }
    // 时间片到期后还有任务没有完成，就请求浏览器再次调度
    if(nextUnitOfWork) {
        requestIdleCallback(workLoop, {timeout: 500})
    }else {
        console.log('render over!')
    }
}
// 执行任务
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber)
    if(currentFiber.child) {
        return currentFiber.child
    }
    // 没有子元素则完成任务
    while(currentFiber) {
        completeUnitOfWork(currentFiber)
        if(currentFiber.sibling) {
            return currentFiber.sibling
        }
        currentFiber = currentFiber.return
    }
}
// 创建真实DOM元素, 子Fiber
function beginWork(currentFiber) {
    if(currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber)
    }else if(currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber)
    }else if(currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber)
    }
}
function updateHostRoot(currentFiber) {
    // 先处理自己，若是原生节点，创建真实DOM
    let newChildren = currentFiber.props.children
    reconcileChildren(currentFiber, newChildren)
}
function updateHostText(currentFiber) {
    // 若此fiber没有创建DOM节点
    if(!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }
}
function updateHost() {
    if(!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }
    const newChildren = currentFiber.props.children
    reconcileChildren(currentFiber, newChildren)
}

function createDOM(currentFiber) {
    if(currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text)
    }else if(currentFiber.tag === TAG_HOST) {
        let stateNode = document.createElement(currentFiber.type)
        updateDOM(stateNode, {}, currentFiber.props)
        return stateNode
    }
}
function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps)
}

// 协调子节点
// beginWork创建Fiber, completeUnitOfWork的时候收集effect
function reconcileChildren(currentFiber, newChildren) {
    let newChildrenIndex = 0  //新子节点的索引
    let prevSibling  // 上一个新的子fiber
    // 遍历我们子虚拟DOM元素数组，为每个虚拟DOM元素创建子Fiber
    while(newChildrenIndex < newChildren.length) {
        let newChild = newChildren[newChildrenIndex]
        let tag
        if(newChild.type == ELEMENT_TEXT) {
            tag = TAG_TEXT
        }else if(typeof newChild === 'string') {
            // 若type是字符串，那么这是一个原生DOM节点
            tag = TAG_HOST
        }
        let newFiber = {
            tag,
            type: newChild.type,
            props: newChild.props,
            stateNode: null,
            return: currentFiber, // 父Fiber
            effectTag: PLACEMENT, // 副作用标识, render我们收集副作用
            nextEffect: null // effect list 也是一个单链表
        }
        if(newFiber) {
            // 当前索引为0, 则是第一个儿子
            if(newChildrenIndex == 0) {
                currentFiber.child = newFiber
            }else {
                // 儿子的下一个弟弟
                prevSibling.sibling = newFiber
            }
            prevSibling = newFiber
        }
        newChildrenIndex++
    }
}

// 完成任务的时候收集副作用的fiber, 组成effect list
function completeUnitOfWork() {
    
}

// 告诉浏览器, 我现在有任务请在你空闲的时候, 执行workLoop
// 有一个优先级概念 expirationTime
requestIdleCallback(workLoop, {timeout: 500})

export default scheduleRoot