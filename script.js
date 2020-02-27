// deep fake detection audio/video

//https://s21.q4cdn.com/114365585/files/doc_financials/2019/q4/Square-2019-10-K.pdf
//https://github.com/bitcoin/bitcoin/blob/v0.12.0rc2/autogen.sh

var images; fetch("https://aisafetyceo.glitch.me/api/data.json").then(function (r){
  return r.json();
}).then(function(h){
  images = h;
});
fetch("https://aisafetyceo.glitch.me/app").then(function(res) {
  return res.text();
}).then(function(html) {
    var doc = document.createElement("html");
    doc.innerHTML = html;
    //doc.style.background = "red";
    document.getElementById("page").appendChild(doc);
});

var cv = document.getElementById("cv");
var ctx = cv.getContext("2d");
  
var cvWidth = cv.width; var cvHeight = cv.height;
var x = 1; var y = 1; var h = 1; var w = 1;
var shape = 1; var threshold = 50;
var motion = []; var old = [];
  
function animate() {
  
  for (var i in images){  
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, cvWidth, cvHeight);
    }
    img.src = 'https://aisafetyceo.glitch.me/app/c.png';
  }

  function getColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 8; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function draw(x, y, h, w, c) {
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < c; j++) {
        function rgb2hex(red, green, blue) {
          var rgb = blue | (green << 8) | (red << 16);
          return "#" + (0x1000000 + rgb).toString(16).slice(1);
        }
        var pix = ctx.getImageData(x, y, 1, 1).data;
        ctx.fillStyle = getColor();
        ctx.fillRect(x + j, y + i, shape, shape);
        var pos = x + y;
        if (old[pos] && old[pos].r - pix[3] > threshold) {
          motion.push({
            x: x,
            y: y,
            r: pix[0],
            g: pix[1],
            b: pix[2],
            a: pix[3]
          });
        }
        old[pos] = {
          x: x,
          y: y,
          r: pix[0],
          g: pix[1],
          b: pix[2],
          a: pix[3]
        };
      }
    }
  }

  if (y > cvHeight) {
    y = y - cvHeight;
  }
  if (x > cvWidth) {
    x = x - cvWidth;
  }
  draw(x, y, shape, shape, 8);
  x = x + 10;
  y = y + 10;
  draw(x, y, shape, shape, 16);

  requestAnimationFrame(animate);
}
animate();

var video = document.getElementById("video");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
  });
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");

window.addEventListener("click", function() { 
});
window.lib = {
  record: function(e) {
      
      function camera(audio, video, stop) {
        if (stop) {
          localStream.getTracks().forEach(track => {
            track.stop();
          });
          startRecord.disabled = false;
          stopRecord.disabled = true;
          rec.stop();
        }
        if (navigator.getUserMedia) {
          navigator.getUserMedia(
            { audio: true, video: true },
            function(stream) {
              window.localStream = stream;
              var video = document.querySelector("video");
              /*video.srcObject = localStream;
              video.onloadedmetadata = function(e) {
                video.play();
              };*/ 

              // Optional frames per second argument.
              var stream = video.captureStream(25);
              var recordedChunks = [];

              alert(JSON.stringify(stream));
              var options = { mimeType: "video/webm; codecs=vp9" };
              var mediaRecorder = new MediaRecorder(stream);

              mediaRecorder.ondataavailable = handleDataAvailable;
              mediaRecorder.start();

              function handleDataAvailable(event) {
                console.log("data-available");
                if (event.data.size > 0) {
                  recordedChunks.push(event.data);
                  alert(JSON.stringify(recordedChunks));
                  download();
                } else {
                  // ...
                }
              }
              function download() {
                var blob = new Blob(recordedChunks, {
                  type: "video/webm"
                });

                var payload = JSON.stringify({
                  type: "commit",
                  modifier: "media",
                  data: JSON.stringify(recordedChunks)
                });
                fetch("/", {
                  method: "post",
                  mode: "no-cors",
                  body: payload
                }).then(function(response) {
                  var decoder = new TextDecoder();
                  var reader = response.body.getReader();
                  reader.read().then(function processResult(result) {
                    if (result.done) return;
                    var result = decoder.decode(result.value, {
                      stream: true
                    });

                    try {
                      var result = JSON.parse(result);
                    } catch (e) {}
                    if (result.type == "success") {
                      console.log(result);
                    }
                  });
                });

                /*var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);*/
              }

              //download after 9sec
              setTimeout(event => {
                console.log("stopping");
                mediaRecorder.stop();
              }, 9000);
            },
            function(err) {
              console.log("The following error occurred: " + err.name);
            }
          );
        }
      }
      camera();
    
  },
  subscribe: function(e) {
    var amount = e;
    StripeCheckout.configure({
      key: "pk_live_ObaqTuXmpyisKC1YG5PmSwtH",
      key2: "sk_live_1a8TlJBfRCKe1y5dceVR4wrK00KUm4VnND",
      image:
        "https://s3.amazonaws.com/stripe-uploads/acct_15mFAPBHEFYVkz22merchant-icon-1463599844790-pilot.png",
      locale: "auto",
      token: function(token) {
        var data = new FormData();
        data.append("json", JSON.stringify(token));
        var val = window.location;

        fetch("/", {
          method: "post",
          uin: val,
          mode: "no-cors",
          body: JSON.stringify({
            type: "commit",
            query: val,
            data: data,
            modifier: window.commitpath
          })
        }).then(function(response) {
          var decoder = new TextDecoder();
          var reader = response.body.getReader();
          reader.read().then(function processResult(result) {
            if (result.done) return;
            var result = decoder.decode(result.value, {
              stream: true
            });
            console.log(result);
          });
        });
      }
    }).open({
      name: "Untitled",
      description: "Commercial License",
      currency: "cad",
      amount: amount
    });
  }
};