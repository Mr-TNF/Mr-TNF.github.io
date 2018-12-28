document.ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
        //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
                if (document.readyState == "complete") {
                        document.detachEvent("onreadystatechange", arguments.callee);
                        callback();
                }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}

function toData(obj){
    if (obj == null){
        return obj;
    }
    var arr = [];
    for (var i in obj){
        var str = i+"="+obj[i];
        arr.push(str);
    }
    return arr.join("&");
}

// ajax 提交
function $ajax(obj) {
    //指定提交方式的默认值
    obj.type = obj.type || "get";
    //设置是否异步，默认为true(异步)
    obj.async = obj.async || true;
    //设置数据的默认值
    obj.data = obj.data || null;
    // 区分ie
    var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    //区分get和post
    if (obj.type === "post"){
        ajax.open(obj.type,obj.url,obj.async);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var data = toData(obj.data);
        ajax.send(data);
    }else{
        //get  test.php?xx=xx&aa=xx
        var url = obj.url+"?"+toData(obj.data);
        ajax.open(obj.type,url,obj.async);
        ajax.send();
    }

    ajax.onreadystatechange = function (){
        if (ajax.readyState == 4){
            if (ajax.status>=200&&ajax.status<300 || ajax.status==304){
                if (obj.success){
                    obj.success(JSON.parse(ajax.responseText));
                }
            }else{
                if (obj.error){
                    obj.error({
                        msg: '内部错误',
                        status: ajax.status
                    });
                }
            }
        }
    } 
}