## 实现一个mini版本的react Fiber架构 & hooks

### 一、功能介绍

#### 1、实现虚拟DOM

src/react.js

#### 2、渲染阶段(Fiber render)

渲染执行: src/react-dom.js

任务调度: src/schedule.js

![avatar](./image/fibereffectlistwithchild3.jpg)

#### 3、提交阶段(Fiber commit)

src/schedule.js中的commitRoot()部分


### 二、使用
```
yarn start
```