const video=document.getElementById('video');
let contentWidth;
let contentHeght;

const media=navigator.mediaDevices.getUserMedia({audio:false,video:{width:640,height:480}})
  .then((stream)=>{
    video.srcObject=stream;
    video.onloadeddata=()=>{
      video.onplay();
      contentWidth=video.clientWidth;
      contentHeight=video.clientHeight;
      canvasUpdate();
      checkImage();
    }
  }).catch((e)=>{
    console.log(e);
});
