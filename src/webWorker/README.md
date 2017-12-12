#web worker
## 背景
众所周知javascript是单线程的，同一时间内只能做一件事情。  
这是十分必要的，设想，如果js是多线程的。有个dom元素两个线程同时做了改变，一个display:none,另一个display：block，这样让浏览器就无所适从了。出于此种考虑，单线程的js就这样一直延续下来，但是凡事必有两面性，虽然单线程保证了一些ui操作的可行性，但一些比较耗时任务， 单线程的js执行起来就会有一些不太好的体验。好一点是一直loading的提示条，更甚的可能连提示都没有，即所谓的假死状态。web worker就应运而生了。    

## 什么是web worker  

Web Workers 使得一个Web应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。把那些耗时的操作放在该线程中执行，这样就避免了主线程即UI线程被阻塞。 

简而言之，就是在主线程即负责ui交互的js之外，新开一个后台脚本负责费时操作的执行。本来可能阻塞UI的操作，就直接不与dom打交道避免长时间阻塞，执行完成之后通知主线程即可。
 
## web worker上下文 
正如前面提到的，web worker诞生的目的在于解决耗时操作对ui交互的影响，所以worker不能访问和操作dom的，如果有这个能力那么上面提到同时操作的问题就又会出现了。

worker中的上下文和主线程js的上下文对象是不同的，window不是它的顶层对象，所以window相关的一些方法如alert等时不能使用的，还有dom也是不能访问的。不过基本的方法。例如console.log、setTimeout等可以访问。
### worker常见可用API和属性

* setInterval/clearInterval
* setTimeout/setInterval
* Cache
* Console API
* CustomEvent
* Fetch
* FileReader/FileReaderSync
* FormData
* Promise
* WebSocket
* XMLHttpRequest 

等，[更多请查看Functions and classes available to Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)  



## 如何创建 web worker    
 
创建一个web worker 十分简单，只需要new worker(path),path为worker文件的路径。如下面代码所示：

```  
        // 检测是否支持window.Worker
        if (window.Worker) {
            // 指定worker文件路径，据此创建Worker
            var worker = new Worker('./ww.js')
            // 监控message，当收到worker信息时执行
            worker.onmessage = function (e) {
                var div = document.querySelector('#root')
                div.innerHTML = e.data
            }
        }
```  

### 通信机制   
主线程js与worker 线程之间通信机制比较简单。两者通过postMessage和onmessage来传递信息。  
* postMessage：发送信息，主线程js和worker都可以通过该方法发送消息，不过主线程中该方法是worker的方法，worker中可以直接调用。 
* onmessage: 接受信息的事件，后面跟相应回调。 
具体代码如下：

```
            /* 主线程js发送接受消息 */
            // 指定worker文件路径，据此创建Worker
            var worker = new Worker('./ww.js')
            var isFirst = true
            // 监听message事件，当收到worker信息时执行
            worker.onmessage = function(e){
                var div = document.querySelector('#root')
                div.innerHTML = e.data
                // 首次执行，发送信息给worker
                isFirst && worker.postMessage('来自主线程的消息')
                isFirst =false
            }    
```
worker ：

```
/* worker 接受发送消息 */
// 2s之后执行循环，并发送
postMessage('执行结果' + j + '执行结束时间' + new Date().toLocaleTimeString())

onmessage = function (e) {
    console.log(e)
    postMessage(e.data)
}
```  

## 更多worker  
除了上面提到的worker之外还要一下几种worker。  
* Shared Workers 共享worker。可被对多个脚本运行在不同的窗体，例如IFrames等， 只要这些workers处于同一域名。共享worker 比专用 worker 稍微复杂一点 — 脚本必须通过活动端口进行通讯。详情请见SharedWorker。  
* Service Workers 一般作为web应用程序、浏览器和网络（如果可用）之前的代理服务器。目前比较热的PWA就是基于该技术实现的。当然也不仅仅用于缓存资源二用，作为代理可以用其实现更多的功能，例如访问推送通知和后台同步等。
* Chrome Workers 是一种仅适用于firefox的worker。详情请见[ChromeWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/ChromeWorker)
* [音频 Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Audio_Workers)可以在网络worker上下文中直接完成脚本化音频处理.  
### 参考文档  
[Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
## 结束语  
至此关于web worker 的简单介绍就结束了，前段时间看了下websocket和PWA所以就一起看一下web worker和service worker。抛砖引玉，希望大家共同进步,更多请查看[我的实例demo](https://github.com/xiaoxiangdaiyu/PWA/tree/master/src/webWorker)




  



