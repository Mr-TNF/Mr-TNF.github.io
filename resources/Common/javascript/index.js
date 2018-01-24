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

document.addEventListener('click', function(e) {
    var outleft = e.clientX - 39;
    var outtop =  e.clientY - 39;
    var rippleOut = document.getElementById("cm-ripple-out");
    var rippleIn = document.getElementById("cm-ripple-in");
    var transitions = {
       'transition':'transitionend',
       'OTransition':'oTransitionEnd',
       'MozTransition':'transitionend',
       'WebkitTransition':'webkitTransitionEnd'
    };
    for(var t in transitions) {
        if(rippleOut.style[t] !== undefined) {
            var transitonEvent = transitions[t];
        }
    }
    rippleOut.style = "left:"+outleft+"px;top:"+outtop+"px;";
    rippleOut.className = "check";
    rippleOut.addEventListener(transitonEvent, function() {
        // rippleOut.style = "";
        rippleOut.className = "";
    });
});