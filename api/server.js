/*

shopify to fastur plugin
If you're feeling fancy you can add interactivity 
    to your site with Javascript */

var url =
  "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1";
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

    // animation : always running loop.
    var owl = 0;
    var ao = 8;
    function animate() {
      // call again next time we can draw
      requestAnimationFrame(animate);
      owl = owl + 1;
      // clear canvas
      ctx.clearRect(0, 0, cvWidth, cvHeight);
      ctx.drawImage(video, 0, 0, cvWidth, cvHeight);

      // draw everything
      function getColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 8; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      var c = 8;
      for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
          ctx.fillStyle = getColor();
          ctx.fillRect(owl + j, owl + i, ao, ao);
        }
      }

      var pix = ctx.getImageData(1, 1, 1, 1);
      pix = pix.data;

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
    }

    animate();

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
