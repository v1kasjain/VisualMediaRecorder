let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;

let recorder;
let chunks = [];

let constraints = {
  audio: true,
  video: true,
};

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", (e)=>{
    chunks = [];
  });
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  })
  recorder.addEventListener("stop", (e)=>{
    let blob = new Blob(chunks, {type: "video/mp4"});
    let videoUrl = URL.createObjectURL(blob);
    let a  = document.createElement("a");
    a.href = videoUrl;
    a.download = "stream.mp4" 
    a.click();
  })
});

recordBtnCont.addEventListener("click", (e) => {
  if (!recorder) return;

  recordFlag = !recordFlag;
  if (recordFlag) {
    recorder.start();
    recordBtn.classList.add("scale-record");
  } else {
    recorder.stop();
    recordBtn.classList.remove("scale-record");
  }
});

// captureBtnCont.addEventListener("click", (e) =>{

// });
