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

// var el = document.querySelector("#cm-ripple-out").querySelector(".g-wave4");
// el.addEventListener("animationend", function(){
//     alert(123);
// }, false);

document.addEventListener('click', function(e) {
    var outleft = e.clientX;
    var outtop =  e.clientY;
    var $_body = document.body;
    var screenSizeWidth = $_body.clientWidth;
    var screenSizeHeight = $_body.clientHeight;
    var halfvmin = (screenSizeWidth > screenSizeHeight ? screenSizeHeight / 2 : screenSizeWidth / 2) * 1.0;
    var timestamp = new Date().getTime();
    var parentObj = document.createElement('div');
        parentObj.id = 'cm-ripple-out';
        parentObj.style = "left:"+(outleft-halfvmin)+"px;top:"+(outtop-halfvmin)+"px;";
        parentObj.className = 'cm-ripple-out-'+timestamp;
    $_body.appendChild(parentObj);
    var $_cmRippleout = document.getElementsByClassName('cm-ripple-out-'+timestamp)[0];
    $_cmRippleout.innerHTML = 
                '<div id="cm-ripple-in">' +
                     '<div class="wave g-wave1"></div>' +
                     '<div class="wave g-wave2"></div>' +
                     '<div class="wave g-wave3"></div>' +
                     '<div class="wave g-wave4"></div>' +
                 '</div>';
    var el = $_cmRippleout.querySelector(".g-wave4");
    el.addEventListener("animationend", function(){
        $_body.removeChild($_cmRippleout);
    }, false);
    
});