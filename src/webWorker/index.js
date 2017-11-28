(function(){
    
    document.body.onload = function(){
        // 检测是否支持window.Worker
        if(window.Worker){
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
        }
        var button = document.querySelector('#test');
        button.addEventListener('click',function(){
            button.innerText = '结束该worker';
            worker.terminate();
        })
    }
}())