 window.musicProgress="0deg";
document.ready(function(){
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
        rotate = (currentTime/duration)*360*10;
        musicProgress.innerText=((currentTime/duration).toFixed(2)*100).toString().substr(0,3)+"%";
        imgRotate.style="transform: rotate(" + rotate + "deg);";
    });
    /**播放结束 */
    bgMusic.addEventListener("ended", function() {
        imgRotate.removeAttribute("class");
        imgRotate.removeAttribute("style");
        musicProgress.removeAttribute("style");
    });

    
}); 

/**预加载 */
window.onload = function() {
    var bgConcontainer = document.getElementsByClassName('bg-container');
    var InContent = document.getElementsByClassName('In-content');
    bgConcontainer[0].className = "bg-container show";
    InContent[0].className = "In-content show";
}

/**音乐控制开关 */
var musicOpera = function (e) {
    var musicStatus = document.getElementById("bg-music");
    var className = e.target.className;
    if(musicStatus.paused) {
        musicStatus.play();
    } else {
        musicStatus.pause();
    }  
}



