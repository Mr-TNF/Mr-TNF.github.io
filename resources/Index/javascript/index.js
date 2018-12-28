 window.musicProgress="0deg";
document.ready(function(){
    $ajax({
        url: '/resources/json/index.json',
        type: 'get',
        async: false,
        data: {},
        success: function(obj) {
            var $_bgContainer = document.getElementsByClassName('bg-container')[0];
                $_bgContainer.innerHTML = 
                        `<div class="bg-music">
                            <audio src="${obj.musicUrl}" autoplay="autoplay" id="bg-music"> 
                            </audio>
                        </div>
                        <div class="In-Container">
                            <div class="In-content">
                                <a class="In-content-header">
                                    <img src="resources/Index/img/favicon.jpg" alt="点击播放/暂停（音乐）" onclick="musicOpera(event)">
                                </a>
                                <h1 class="In-Content-Name"></h1>
                                <div class="In-Content-desc">
                                    ${obj.type.map(type => `
                                        <span>${type}</span>
                                    `).join('')}
                                </div>
                                <div class="In-Content-others">
                                    ${obj.list.map(item => `
                                        <a class="${item.class}" title="${item.title}" href="${item.href}" target="_blank">
                                            <i class="${item.iclass}"></i>
                                        </a>
                                    `).join('')}
                                    <a class="icon progress" title="others">
                                        <span id="music-progress">0%</span>
                                    </a>
                                </div>
                            </div>
                        </div>`;
            musicFunc();
            onload();
        }
    })  
}); 

// 音乐事件
function musicFunc() {
    var bgMusic=document.getElementById("bg-music");
    var currentTime, duration, rotate;
    var imgRotate = document.getElementsByClassName("In-content-header")[0].firstElementChild;
    var musicProgress = document.getElementById("music-progress");
    /**监听播放开始 */
    bgMusic.addEventListener("play", function() {
        imgRotate.className="rotate";
    });
    /**监听播放过成中 */
    bgMusic.addEventListener("timeupdate", function() {
        currentTime = bgMusic.currentTime;
        duration = bgMusic.duration;
        rotate = (currentTime/duration)*360*15;
        rotate = Math.round(rotate);
        musicProgress.innerText=((currentTime/duration).toFixed(2)*100).toString().substr(0,3)+"%";
        imgRotate.style="transform: rotate(" + rotate + "deg);";
    });
    /**播放结束 */
    bgMusic.addEventListener("ended", function() {
        imgRotate.removeAttribute("class");
        imgRotate.removeAttribute("style");
        musicProgress.removeAttribute("style");
    });
}

/**预加载 */
function onload() {
    var bgConcontainer = document.getElementsByClassName('bg-container');
    var InContent = document.getElementsByClassName('In-content');
    bgConcontainer[0].className = "bg-container show";
    InContent[0].className = "In-content show";
    InContent[0].addEventListener('click', function(evt){
        evt.stopPropagation();
    });
    // 水波纹效果
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
}

/**音乐控制开关 */
var musicOpera = function (e) {
    var musicStatus = document.getElementById("bg-music");
    // var className = e.target.className;
    if(musicStatus.paused) {
        musicStatus.play();
    } else {
        musicStatus.pause();
    }  
}



