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
  recorder.addEventListener("start", (e) => {
    chunks = [];
  });
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });
  recorder.addEventListener("stop", (e) => {
    let blob = new Blob(chunks, { type: "video/mp4" });
    let videoUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = videoUrl;
    a.download = "stream.mp4";
    a.click();
  });
});

recordBtnCont.addEventListener("click", (e) => {
  if (!recorder) return;

  recordFlag = !recordFlag;
  if (recordFlag) {
    recorder.start();
    recordBtn.classList.add("scale-record");
    startTimer();
  } else {
    recorder.stop();
    recordBtn.classList.remove("scale-record");
    stopTimer();
  }
});

captureBtnCont.addEventListener("click", (e) =>{
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0,0, canvas.width, canvas.height);

    let imageUrl = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image.jpg";
    a.click();

    //Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or OffscreenCanvas or SVGImageElement or VideoFrame)'.
});

// recording timer logic
let timerId;
let counter = 0; // in seconds
let timer = document.querySelector(".timer");

function startTimer() {
  timer.style.display = "block";
  counter = 0;
  function displayTimer() {
    let totalSeconds = counter;
    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;

    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    let seconds = totalSeconds;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.innerText = `${hours}:${minutes}:${seconds}`;
    counter++;
  }
  timerId = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timer.innerText = "00:00:00";
  timer.style.display = "none";
}
