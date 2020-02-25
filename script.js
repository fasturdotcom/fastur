/*study form 4 law
shopify to fastur plugin*/

var url = "https://aisafetyceo.glitch.me/app2";

fetch(url)
  .then(function(res) {
    return res.text();
  })
  .then(function(html) {
    var doc = document.createElement("html");
    doc.innerHTML = html;
    doc.style.background = "red";

    document.getElementById("page").appendChild(doc);

    var video = document.getElementById("video");
    var cv = document.getElementById("cv");
    var ctx = cv.getContext("2d");
    var cvWidth = cv.width;
    var cvHeight = cv.height;
    var x = 1;
    var y = 1;
    var h = 1;
    var w = 1;
    var shape = 1;
    var motion = [];
    var old = [];

    // brightness threshold for movement
    var threshold = 50;
    // animation : always running loop.
    function animate() {
      // clear canvas
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
        draw(x,y,shape,shape,8)
        x = x + 10;
        y = y + 10;
        draw(x,y,shape,shape,16);
      
      requestAnimationFrame(animate);
    }

    animate();

    // click handler
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
