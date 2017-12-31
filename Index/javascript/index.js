document.ready(function(){
    
}); 

var musicOpera = function (e) {
    var musicStatus = document.getElementById("bg-music");
    var className = e.target.className;
    var target = className.indexOf('fa') >= 0 ? e.target.parentNode: e.target;
    console.log(e);
    if(musicStatus.paused) {
        musicStatus.play();
        target.className= "icon red";
        target.children[0].className= "fa fa-pause";
    } else {
        musicStatus.pause();
        target.className= "icon";
        target.children[0].className= "fa fa-play";
    }  
} 

