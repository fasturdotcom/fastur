/*

shopify to fastur plugin
If you're feeling fancy you can add interactivity 
    to your site with Javascript */

var url =
  "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1";
var url = "https://aisafetyceo.glitch.me/app2";

fetch(url)
  .then(function(res) {
    return res.text();
  })
  .then(function(html) {
    var doc = document.createElement("html");
    doc.innerHTML = html;
    doc.style.background = "red";

    var page = document.getElementById("page");
    page.appendChild(doc);

    var video = document.getElementById("video");
    var cv = document.getElementById("cv");
    var ctx = cv.getContext("2d");
    var cvWidth = cv.width;
    var cvHeight = cv.height;
    var x = 0;
    var y = 0;
    var h = 1;
    var w = 1;
    var shape = 1;
     
  var old = [];
  var scalefactor = 4;
  function setup(){
   video.width = w/scalefactor;
   video.height = h/scalefactor;
  }
  
    // make an array to hold our old pixel values
    var previous_frame = [];
    // choose a brightness threshold, if the old pixel values differs enough then we know there's movement
    var threshold = 50;
    // sample the colour every 50 pixels
    var sample_size = 50;
    // animation : always running loop.
    function animate() {
      // call again next time we can draw
      requestAnimationFrame(animate);
      // clear canvas
      ctx.clearRect(0, 0, cvWidth, cvHeight);
      ctx.drawImage(video, 0, 0, cvWidth, cvHeight);

      //x = x + 1;
      y = y + 1;
      // draw everything
      function getColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 8; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function screen(x, y, h, w, c) {
        for (let i = 0; i < c; i++) {
          for (let j = 0; j < c; j++) {
            ctx.fillStyle = getColor();
            ctx.fillRect(x + j, y + i, shape, shape);
          }
        }
      }

      var pix = ctx.getImageData(x, y, 1, 1);
      pix = pix.data;

      screen(x, y, shape, shape, 8);
      screen(cvWidth - 24, y, shape, shape, 8);

      var n;
      for (var i = 0; (n = pix.length), i < n; i += 4) {
        var red = pix[i];
        var green = pix[i + 1];
        var blue = pix[i + 2];
        var alpha = pix[i + 3];
        var color = rgb2hex(red, green, blue);
      }
      function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return "#" + (0x1000000 + rgb).toString(16).slice(1);
      }

      ctx.fillStyle = "#000";
      var ts = new Date();
      var t = ts.toGMTString();
      ctx.fillText(color + " click to buy  " + t + "   " + Date.now(), 10, 10);

      if (y == cvHeight) {
        y = 0;
        x = x + shape;
        //alert(shape)
      }
    }

    animate();

    function rgb(red,green,blue){
      var rgb = blue | (green << 8) | (red << 16);
        return "#" + (0x1000000 + rgb).toString(16).slice(1);
   
    }
    function motionDetection() {
      var motion = []; // draw the video and get its pixels
      ctx.drawImage(video, 0, 0, video.width, video.height);
      var data = ctx.getImageData(0, 0, video.width, video.height).data; // we can now loop over all the pixels of the video
      for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
          var pos = (x + y * video.width) * 4;
          var r = data[pos];
          var g = data[pos + 1];
          var b = data[pos + 2];
          if (old[pos] && Math.abs(old[pos].red - r) > threshold) {
            ctx.fillStyle = rgb(r, g, b);
            ctx.fillRect(
              x * scalefactor,
              y * scalefactor,
              scalefactor,
              scalefactor
            );
            // push the x, y and rgb values into the motion array
            // but multiply the x and y values bck up by scalefactor
            // to get their actual screen position
            motion.push({
              x: x * scalefactor,
              y: y * scalefactor,
              r: r,
              g: g,
              b: b
            });
          }
          old[pos] = { red: r, green: g, blue: b };
        }
      }

      return motion;
    }

    function draw() {
      ctx.background(250);
      var motion = motionDetection();
      for (var i = 0; i < motion.length; i++) {
        var m = motion[i];
        ctx.fillStyle = rgb(m.r, m.g, m.b);
        ctx.fillEllipse(m.x, m.y, sample_size, sample_size);
      }
    }

    // click handler to add random rects
    window.addEventListener("click", function() {
      lib.subscribe();
    });
  });

// Grab elements, create settings, etc.
var video = document.getElementById("video");

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    //video.src = window.URL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
  });
}

// Elements for taking the snapshot
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
  context.drawImage(video, 0, 0, 320, 320);
});

//checkout

window.lib = {
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
//lib.subscribe(1000)
