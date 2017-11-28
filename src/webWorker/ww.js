var j = 0
timer1 = new Date();
// 发送消息给主线程
postMessage('等待两秒后执行' + timer1.toLocaleTimeString())

var i = 0;
for (i = 0; i < 100000; i++) {
    j++
}
/* worker 接受发送消息 */
// 2s之后执行循环，并发送
postMessage('执行结果' + j + '执行结束时间' + new Date().toLocaleTimeString())

onmessage = function (e) {
    console.log(e)
    postMessage(e.data)
}
