if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js', {}).then(
        function (registration) {
            console.log('注册成功')
        }
    ).catch(function (err) {
        console.log('注册失败')
    })
}
function getImg(src) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', src)
        request.responseType = 'blob'
        request.onload = function () {
            if (request.status == 200) {
                var imgRes = request.response;
                resolve(imgRes)
            } else {
                reject(Error('Image didn\'t load successfully; error code:' + request.statusText));

            }
        }
    })
}
window.onload = function () {
    var myImage = document.querySelector('#root img'),
        src = '/asset/sw.jpg';
     myImage.src = src;
    // getImg(src).then(res=>{
    //     var src =  window.url.createObjectURL(res);
    //         myImage.src = src    
    // })
}
