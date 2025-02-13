//カメラ映像の表示
const video=document.getElementById("video");
let contentWidth,contentHeight;

const media=navigator.mediaDevices.getUserMedia({
  audio:false,video:{width:640,height:480}})
  .then((stream)=>{
    video.srcObject=stream;
    video.onloadeddata=()=>{
      video.play();
      contentWidth=video.clientWidth;
      contentHeight=video.clientHeight;
      canvasUpdate();//以降記述
      checkImage();//以降記述
    }

  });

//webカメラの映像をcanvasに描画する処理

const cvs=document.getElementById('camera-canvas');
const ctx=cvs.getContext("2d");

const canvasUpdate=()=>{
  cvs.width=contentWidth;
  cvs.height=contentHeight;
  ctx.drawImage(video,0,0,contentWidth,contentHeight);
  requestAnimationFrame(canvasUpdate);
}

// QRコードの検出
const rectCvs=document.getElementById('rect-canvas');
const rectCtx=rectCvs.getContext("2d");

const checkImage=()=>{
  // imageDataの取得
  const imageData=ctx.getImageData(0,0,contentWidth,contentHeight);
  // jsQRに渡す
  console.log(imageData);
  const code=jsQR(imageData.data,contentWidth,contentHeight);

  // 検出結果に応じて処理を実施
  if(code){
    console.log("QRコードの中身：",code);
    drawRect(code.location);
  }else{
    console.log("QRコードが見つかりません...:",code);
    rectCtx.clearRect(0,0,contentWidth,contentHeight);
  }
  setTimeout(()=>{checkImage()},500);
}
// 図形の描画処理
const drawRect=(location)=>{
  rectCvs.width=contentWidth;
  rectCvs.height=contentHeight;
  drawLine(location.topLeftCorner, location.topRightCorner);
  drawLine(location.topRightCorner, location.bottomRightCorner);
  drawLine(location.bottomLeftCorner, location.bottomRightCorner);
  drawLine(location.bottomLeftCorner, location.topLeftCorner);
}

// 線の描画処理
const drawLine=(begin,end)=>{
  rectCtx.lineWidth=4;
  rectCtx.strokeStyle="red";
  rectCtx.beginPath();
  rectCtx.moveTo(begin.x,begin.y);
  rectCtx.lineTo(end.x,end.y);
  rectCtx.stroke();
}



// Fetch APIを使ってQRコードの内容を特定のURLに送信する処理
