function render(action, elements) {
  if (typeof window !== "undefined") { 
        fetch("/index", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
             
    var editor = CodeMirror.fromTextArea(
      document.getElementById("myTextArea"),
      {
        value:j,
        lineNumbers: true,
        mode: "javascript",
        lineWrapping: true,
                      highlightSelectionMatches: true,
                      matchBrackets: true,
        extraKeys: {
          "Ctrl-Q": function(cm) {
            cm.foldCode(cm.getCursor());
          }
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      }
    );
    editor.getDoc().setValue(j);
          
            window.commitpath = "server";
          
            window.CM = editor;
          
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });
            editor.on("change", function(cm, change) {
              window.changes = 1;
            });
          
          
          
          
          
          
          
          })
          .catch(error => {
            console.log(error);
          });
        
    var els = document.querySelectorAll("[data-action='0']");
    for (var x = 0; x < els.length; x++) els[x].style.display = "none";

    document.getElementById("input").onkeypress = function(e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == "13") {
        var now = Date.now();
        var qoords = {
          keys: e.target.value,
          screenshot: "/api/" + now + ".png",
          time: now
        };

        fetch("/", {
          method: "post",
          mode: "no-cors",
          body: JSON.stringify({
            type: "screen",
            query: qoords,
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

        // Enter pressed
        return false;
      }
    };
    
    function getImages() {
      fetch("https://fastur.glitch.me/api/clicks.json", {
        mode: "no-cors"
      })
        .then(function(r) {
          return r.json();
        })
        .then(function(h) {
          lib.images = h;
        });
    }
    getImages();

    {
      var cv = document.getElementById("cv");
      var ctx = cv.getContext("2d");
      var cvWidth = cv.width;
      var cvHeight = cv.height;
      var x = 1;
      var y = 1;
      var h = 1;
      var w = 1;
      var shape = 1;
      var threshold = 50;
      var motion = [];
      var old = [];
    }

    var counter = 0;
    setInterval(function() {
      getImages();

      var images = lib.images;
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, cvWidth, cvHeight);
      };
      img.src = "https://fastur.glitch.me/" + images[counter].screenshot;
      counter++;
      if (counter == images.length) {
        counter = 0;
      }
    }, 2000);

    cv.addEventListener("click", function(e) {
      var bound = cv.getBoundingClientRect();
      var x = e.clientX - bound.left;
      var y = e.clientY - bound.top;

      var now = Date.now();
      var qoords = {
        coords: { x: x, y: y },
        screenshot: "/api/" + now + ".png",
        time: now
      };

      fetch("/", {
        method: "post",
        mode: "no-cors",
        body: JSON.stringify({
          type: "screen",
          query: qoords,
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

      lib.current = qoords;
      console.log(lib.current);
    });
    window.lib = {
      actives: ["home"],
      current: [],
      id: 0,
      code: 0,
      cookie: function(e) {
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          if (e == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
          }
        }
        return null;
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
            var val = input.value;

            fetch("/", {
              method: "post",
              input: val,
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
          description: "Security",
          currency: "cad",
          amount: amount
        });
      },
      path: function Path(e) {
        var path = [];
        while (e) {
          path.push(e.className);
          if (e.tagName === "HTML") {
            return path;
          }
          e = e.parentElement;
        }
      },
      wait: function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
          end = new Date().getTime();
        }
      },
      location: function location(e) {
        navigator.geolocation.getCurrentPosition(function(position) {
          fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              position.coords.latitude +
              "," +
              position.coords.longitude +
              "2&key=AIzaSyAdH8CrbylVjj7LU-CmLCYABoWyEuHssho"
          )
            .then(function(response) {
              return response.json();
            })
            .then(function(myJson) {
              alert(JSON.stringify(myJson));
            });
        });
      },
      dashboard: function() {
        window.location.href = "/#dashboard";
      },
      start: function(e) {
        console.log("started");

        var video = document.getElementById("video");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function(stream) {
              //video.src = window.URL.createObjectURL(stream);
              video.srcObject = stream;
              video.play();
            });
        }

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var video = document.getElementById("video");

        var d1 = document.getElementById("myBtn");
        d1.insertAdjacentHTML(
          "afterend",
          '<div><button id="startRecord">start</button><button id="stopRecord" disabled>stop</button><audio id="recordedAudio"></audio> <div id="audioDownload"></div></div>'
        );

        var audioChunks;
        startRecord.onclick = e => {
          startRecord.disabled = true;
          stopRecord.disabled = false;
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {
              audioChunks = [];
              rec = new MediaRecorder(stream);
              rec.ondataavailable = e => {
                audioChunks.push(e.data);
                if (rec.state == "inactive") {
                  let blob = new Blob(audioChunks, { type: "audio/x-mpeg-3" });
                  recordedAudio.src = URL.createObjectURL(blob);
                  recordedAudio.controls = true;
                  recordedAudio.autoplay = true;
                  audioDownload.href = recordedAudio.src;
                  audioDownload.download = "mp3";
                }
              };
              rec.start();
            })
            .catch(e => console.log(e));
        };
        stopRecord.onclick = e => {
          startRecord.disabled = false;
          stopRecord.disabled = true;
          rec.stop();
        };

        lib.animate();
      },
      animate: function(e) {
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

              //var Image = ctx.getImageData(x, y, cvWidth, cvHeight).data;
              //localStorage.setItem('Image', Image);

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
        var image = cv
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        //window.location.href=image;
        document.getElementById("theimage").src = image;
        if (y > cvHeight) {
          y = y - cvHeight;
        }
        if (x > cvWidth) {
          x = x - cvWidth;
        }
        draw(x, y, shape, shape, 8);
        x = x + 10;
        y = y + 10;
        //shape = shape + 1;
        draw(x, y, shape, shape, 16);

        requestAnimationFrame(lib.animate);
      },
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
      }
    };
    lib.control = function(e) {
      if (window.location.href == "https://code.fastur.com/code") {
        fetch("/api", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            var CM = CodeMirror(document.body, {
              value: j,
              mode: "javascript",
              lineNumbers: true,
              matchBrackets: true,
              theme: "darcula",
              lineWrapping: true,
              extraKeys: {
                "Ctrl-Q": function(cm) {
                  cm.foldCode(cm.getCursor());
                }
              },
              foldGutter: true,
              gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              highlightSelectionMatches: true
            });
            window.commitpath = "server";
            window.CM = CM;
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });
            editor.on("change", function(cm, change) {
              window.changes = 1;
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (document.getElementById("pagebody")) {
          if (pagebody.dataset.editor == "edit") {
            window.commitpath = "editor";
            window.CM = {
              getValue: function(e) {
                return lib.value;
              },
              setValue: function(e) {
                lib.value = e;
              }
            };

            document.addEventListener(
              "click",
              function(event) {
                event.preventDefault();
                if (document.getElementById(lib.current[0])) {
                  var activated = document.getElementById(lib.current[0]);
                  activated.classList.remove("focused");
                  lib.current = [];
                  lib.current[0] = event.target.id;
                  if (document.getElementById(event.target.id)) {
                    var activated = document.getElementById(event.target.id);
                    activated.classList.add("focused");
                  }
                } else {
                  if (document.getElementById(event.target.id)) {
                    lib.current[0] = event.target.id;
                    var activated = document.getElementById(event.target.id);
                    activated.classList.add("focused");
                  }
                }

                var data = [
                  { text: "stripeKey+stripeSecret " + event.target.nodeName }
                ];

                for (var i = 0; i < data.length; i++) {
                  input.placeholder = data[i].text;
                }
              },
              true
            );
            fetch("/api/" + window.location.href.split("edit?")[1] + ".json", {
              method: "get"
            })
              .then(r => r.text())
              .then(j => {
                lib.value = JSON.parse(j);
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            function starthere() {
              fetch("/api/data.json", {
                method: "get",
                mode: "no-cors"
              })
                .then(r => r.text())
                .then(data => {
                  localStorage.setItem("agents", data);
                  //var results = JSON.parse(data).filter(function(entry) { return entry.publisher === email; });
                })
                .catch(error => {
                  console.log(error);
                });

              var agents = localStorage.getItem("agents");
              var agents = JSON.parse(agents);
              for (var agent in agents) {
                var agency = agents[agent].name;
                if (agency) {
                  document.getElementById("blog").innerHTML +=
                    JSON.stringify(agency) + "<br><br>";
                }
              }
            }
            starthere();

            function draw(x, y, w, h) {
              const canvas = document.getElementById("canvas");
              const ctx = canvas.getContext("2d");
              ctx.fillRect(x, y, w, h);

              //var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
              //window.location.href=image;
              // document.getElementById("theimage").src = image;
            }

            var i = 0;
            setInterval(function() {
              i = i + 1;

              var x = 0 + i;
              var y = 0 + i;
              var w = 0 + i;
              var h = 0 + i;
              draw(x, y, w, h);
            }, 1000);

            var stripe = Stripe("pk_live_ObaqTuXmpyisKC1YG5PmSwtH");

            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUIOtY8S8shSda"
            );
            checkoutButton.addEventListener("click", function() {
              if (input.value) {
                stripe
                  .redirectToCheckout({
                    items: [{ plan: "plan_GUIOtY8S8shSda", quantity: 1 }],
                    successUrl: "https://code.fastur.com/success",
                    cancelUrl: "https://code.fastur.com/canceled"
                  })
                  .then(function(result) {
                    if (result.error) {
                      var displayError = document.getElementById(
                        "error-message"
                      );
                      displayError.textContent = result.error.message;
                    }
                  });
              } else {
                myBtn.innerHTML = "please enter an email";
                input.style.outline = "2px solid red";
              }
            });
            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUInGYzA7Qz43o"
            );
            checkoutButton.addEventListener("click", function() {
              if (input.value) {
                stripe
                  .redirectToCheckout({
                    items: [{ plan: "plan_GUInGYzA7Qz43o", quantity: 1 }],
                    successUrl: "https://code.fastur.com/success",
                    cancelUrl: "https://code.fastur.com/canceled"
                  })
                  .then(function(result) {
                    if (result.error) {
                      var displayError = document.getElementById(
                        "error-message"
                      );
                      displayError.textContent = result.error.message;
                    }
                  });
              } else {
                myBtn.innerHTML = "please enter an email";
                input.style.outline = "2px solid red";
              }
            });
            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUIkoAioxfTHcx"
            );
            checkoutButton.addEventListener("click", function() {
              if (input.value) {
                stripe
                  .redirectToCheckout({
                    items: [{ plan: "plan_GUIkoAioxfTHcx", quantity: 1 }],
                    successUrl: "https://code.fastur.com/success",
                    cancelUrl: "https://code.fastur.com/canceled"
                  })
                  .then(function(result) {
                    if (result.error) {
                      var displayError = document.getElementById(
                        "error-message"
                      );
                      displayError.textContent = result.error.message;
                    }
                  });
              } else {
                myBtn.innerHTML = "please enter an email";
                input.style.outline = "2px solid red";
              }
            });

            var array = [];
            array.forEach.call(document.querySelectorAll("a"), function(el) {
              el.addEventListener("click", function() {
                //display none on current (home), display block on clicked element

                if (event.target.innerText != lib.actives[0]) {
                  for (var active of lib.actives) {
                    if (active) {
                      var els = document.querySelectorAll(
                        `[data-display=${CSS.escape(active)}]`
                      );
                      for (var x = 0; x < els.length; x++) {
                        els[x].style.display = "none";
                        lib.actives.push(els[x].dataset.display);
                      }
                      lib.actives = [];
                    }
                  }
                }

                var named = event.target.innerText;
                var els = document.querySelectorAll(
                  `[data-display=${CSS.escape(named)}]`
                );
                for (var x = 0; x < els.length; x++) {
                  els[x].style.display = "block";
                  lib.actives.push(els[x].dataset.display);
                }

                var loginpage = document.getElementById("login");
                if (loginpage) {
                  document
                    .getElementById("login")
                    .addEventListener("submit", login, false);
                }
                var registerpage = document.getElementById("register");
                if (registerpage) {
                  document
                    .getElementById("register")
                    .addEventListener("submit", register, false);
                }

                function login(e) {
                  e.preventDefault();
                  {
                    var type = document.getElementById("login-type").value;
                    var email = document.getElementById("login-email").value;
                    var password = document.getElementById("login-password")
                      .value;
                    var label = {
                      type: type,
                      email: email,
                      password: password,
                      uuid: lib.cookie("fastur"),
                      time: Date.now()
                    };
                    fetch("/", {
                      method: "post",
                      mode: "no-cors",
                      body: JSON.stringify(label)
                    }).then(function(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });
                        localStorage.fasturaccount = JSON.stringify(result);
                        result = JSON.parse(result);
                        if (result.type == "success") {
                          var loginButton = document.getElementById(
                            "login-button"
                          );
                          loginButton.innerText = "logout";
                          loginButton.href = "/";
                          loginButton.addEventListener(
                            "click",
                            function() {
                              localStorage.clear();
                            },
                            false
                          );
                          var data = JSON.parse(result.data);
                          for (var i = 0; i < data.length; i++) {
                            var dashboard = document.getElementById(
                              "dashboard"
                            );
                            var item =
                              "<a href='/edit?" +
                              data[i].uid +
                              "' class='element'>" +
                              data[i].subname +
                              "</a>";
                            dashboard.insertAdjacentHTML("beforeend", item);
                          }

                          var login = document.getElementById("login");
                          if (login.classList.contains("active")) {
                            login.classList.replace("active", "inactive");
                            setTimeout(function() {
                              login.style.display = "none";
                            }, 350);
                          }
                          var targeted = document.getElementById("dashboard");
                          if (targeted.classList.contains("inactive")) {
                            targeted.style.display = "";
                            setTimeout(function() {
                              targeted.classList.replace("inactive", "active");
                            }, 750);
                          }
                        }
                        if (result.type == "failure") {
                          console.log(result);
                          var modal = document.getElementById("modal-content");
                          modal.innerHTML = result.reason;
                          modal.style.display = "block";
                        }
                      });
                    });
                  }
                }
                function logout(e) {
                  document.cookie =
                    "fastur=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
                function register(e) {
                  e.preventDefault();
                  {
                    var type = document.getElementById("register-type").value;
                    var name = document.getElementById("register-name").value;
                    var email = document.getElementById("register-email").value;
                    var password = document.getElementById("register-password")
                      .value;
                    var label = {
                      type: type,
                      name: name,
                      email: email,
                      password: password,
                      time: Date.now()
                    };
                    fetch("/", {
                      method: "post",
                      mode: "no-cors",
                      body: JSON.stringify(label)
                    }).then(function(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });
                        console.log(result);
                        //var Result = JSON.parse(result)
                      });
                    });
                  }
                }
              });
            });

            var count = 0;
            input.placeholder = "refer";
            input.addEventListener(
              "keydown",
              function(event) {
                if (event.defaultPrevented) {
                  return;
                }
                switch (event.key) {
                  case "ArrowDown":
                    count--;
                    console.log(array);
                    break;
                  case "ArrowUp":
                    count++;
                    console.log(array[count]);
                    break;
                  case "ArrowLeft":
                    count--;
                    console.log(array[count]);
                    break;
                  case "ArrowRight":
                    count++;
                    console.log(array[count]);
                    break;
                  default:
                    return;
                }
                event.preventDefault();
              },
              true
            );
          }
        }
      }

      setInterval(function() {
        if (window.changes == 1) {
          var code = window.CM.getValue();
          var payload = JSON.stringify({
            type: "commit",
            query: code,
            input: input.value,
            site: code,
            modifier: window.commitpath,
            cookie: lib.cookie("fastur")
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
              myBtn.innerHTML = result;
              console.log(result);
            });
          });
          window.changes = 0;
        }
      }, 2000);
      window.changes = 0;

      if (window.location.hash) {
        hashUpdate();
      }
      var hash = window.location.hash.split("#")[1];
      window.onhashchange = hashUpdate(hash);
      function hashUpdate(hash) {
        var target = document.getElementById(hash);
        if (target) {
          if (hash == lib.actives[0]) {
          } else {
            for (var active of lib.actives) {
              if (active) {
                var activated = document.getElementById(active);

                activated.classList.replace("active", "inactive");
                setTimeout(function() {
                  activated.style.display = "none";
                }, 350);
                lib.actives = [];
              }
            }

            var target = document.getElementById(hash);
            target.style.display = "";
            setTimeout(function() {
              target.classList.replace("inactive", "active");
            }, 750);
            lib.actives.push(target.id);
          }
        }
      }

      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          var val = e.target.value;

          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
              type: "commit",
              query: val,
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

          var e = input.value;
          var url = "https://code.fastur.com/api/" + input.value + ".png";

          if (e == "data") {
            fetch("/data", {
              method: "get"
            })
              .then(r => r.text())
              .then(j => {
                window.CM.setValue(j);
                var editor = document.querySelector(".CodeMirror").CodeMirror;
                editor.operation(function() {
                  for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                    editor.foldCode({ line: l, ch: 0 }, null, "fold");
                });

                window.commitpath = "data";
              });
          }
          if (e == "server") {
            fetch("/api", {
              method: "get"
            })
              .then(r => r.text())
              .then(j => {
                window.CM.setValue(j);
                var editor = document.querySelector(".CodeMirror").CodeMirror;
                editor.operation(function() {
                  for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                    editor.foldCode({ line: l, ch: 0 }, null, "fold");
                });

                window.commitpath = "server";
              });
          }

          function Math() {
            var A = [
              "Math.E",
              "Math.LN2",
              "Math.LN10",
              "Math.LOG2E",
              "Math.LOG10E",
              "Math.PI",
              "Math.SQRT1_2",
              "Math.SQRT2",
              "Math.abs",
              "Math.acos",
              "Math.acosh",
              "Math.asin",
              "Math.asinh",
              "Math.atan",
              "Math.atanh",
              "Math.atan2",
              "Math(x).cbrt",
              "Math(x).ceil",
              "Math(x).clz32",
              "Math(x).cos",
              "Math(x).cosh",
              "Math(x).exp",
              "Math(x).expm1",
              "Math(x).floor",
              "Math(x).fround",
              "Math(x).hypot",
              "Math(x).imul",
              "Math(x).log",
              "Math(x).log1p",
              "Math(x).log10",
              "Math(x).log2(y,x)",
              "Math(x).max",
              "Math(x).min",
              "Math(x).pow",
              "Math(x).random",
              "Math(x).round",
              "Math(x).sign",
              "Math(x).sin",
              "Math(x).sinh",
              "Math(x).sqrt",
              "Math(x).tan",
              "Math(x).tanh",
              "Math(x).toSource",
              "Math(x).trunc",
              "path is toronto.ca"
            ];

            var operation = A[0];

            let audioCtx = new AudioContext();

            let osc1 = audioCtx.createOscillator();
            let osc2 = audioCtx.createOscillator();
            let gain1 = audioCtx.createGain();

            let osc3 = audioCtx.createOscillator();
            let osc4 = audioCtx.createOscillator();
            let gain2 = audioCtx.createGain();

            let osc5 = audioCtx.createOscillator();
            let osc6 = audioCtx.createOscillator();
            let gain3 = audioCtx.createGain();

            let masterGain = audioCtx.createGain();

            osc1.frequency.value = 1 * operation;
            osc2.frequency.value = 1.2 * operation;
            gain1.gain.value = 0.5 * operation;

            osc3.frequency.value = 440;
            osc4.frequency.value = 440.33;
            gain2.gain.value = 0.5;

            osc5.frequency.value = 587;
            osc6.frequency.value = 587.25;
            gain3.gain.value = 0.5;

            masterGain.gain.value = 0.5;

            osc1.connect(gain1);
            osc2.connect(gain1);
            gain1.connect(masterGain);

            osc3.connect(gain2);
            osc4.connect(gain2);
            gain2.connect(masterGain);

            osc5.connect(gain3);
            osc6.connect(gain3);
            gain3.connect(masterGain);

            masterGain.connect(audioCtx.destination);

            osc1.start();
            osc2.start();
            osc3.start();
            osc4.start();
            osc5.start();
            osc6.start();
          }

          function talk(q, background) {
            function Speech_Recognition() {
              var recognition = new webkitSpeechRecognition();
              recognition.onstart = function(event) {};
              recognition.onresult = function(event) {
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                  var transcript = event.results[i][0].transcript;
                  document.getElementById("input").value = transcript;
                  lib.menu(transcript);
                }
              };
              recognition.onend = function() {
                recognition.start();
              };
              recognition.start();
            }
            function Translate(q, background, callback) {
              var translate_request = new Request(
                "https://www.googleapis.com/language/translate/v2?q=" +
                  q +
                  "&target=" +
                  background +
                  "&key=AIzaSyAg-bBM8onXc5vWvaZ1VG82YslRYFmvgyA",
                { method: "get" }
              );
              fetch(translate_request).then(function(response) {
                var decoder = new TextDecoder();
                var reader = response.body.getReader();
                reader.read().then(function processResult(result) {
                  if (result.done) return;
                  var result = decoder.decode(result.value, {
                    stream: true
                  });
                  var Result = JSON.parse(result);
                  var translated_Text =
                    Result.data.translations[0].translatedText;
                  myBtn.innerHTML = translated_Text;
                  var detected_Source_Language =
                    Result.data.translations[0].detectedSourceLanguage;
                  callback(
                    translated_Text,
                    detected_Source_Language,
                    background
                  );
                  return reader.read().then(processResult);
                });
              });
            }
            function get_response(q, detected_Source_Language, callback) {
              var intent_request = new Request(
                "https://api.api.ai/v1/query?v=20150910",
                {
                  method: "POST",
                  mode: "cors",
                  redirect: "follow",
                  headers: {
                    Authorization: "Bearer 21f6a5778d484870ad46be4d34ac2eeb",
                    "content-Type": "application/json; charset=utf-8"
                  },
                  body: JSON.stringify({
                    q: q,
                    lang: "en",
                    sessionId: "44628d21-d7a4-47d5-b1c6-a7f851be65fv"
                  })
                }
              );
              fetch(intent_request).then(function(response) {
                Respond(response);
              });

              function Respond(response) {
                var decoder = new TextDecoder();
                var reader = response.body.getReader();
                reader.read().then(function processResult(result) {
                  if (result.done) return;
                  var result = decoder.decode(result.value, {
                    stream: true
                  });
                  var Result = JSON.parse(result);
                  var string = JSON.stringify(Result);

                  var speech = Result.result.fulfillment.speech;
                  myBtn.innerHTML += speech;
                  Translate(speech, detected_Source_Language, print_to_user);
                  return reader.read().then(processResult);
                });
              }
            }
            function print_to_user(
              translated_Text,
              detected_Source_Language,
              background
            ) {
              console.log(translated_Text);
              var msg = new SpeechSynthesisUtterance(translated_Text);
              msg.lang = background;
              window.speechSynthesis.speak(msg);
              msg.onend = function(event) {
                //Speech_Recognition();
              };
            }
            Translate(q, "en", get_response);
          }
          talk(e);

          lib.wait(6000);
          function annotate(image_uri) {
            image_uri = image_uri;

            function Respond(response) {
              var decoder = new TextDecoder();
              var reader = response.body.getReader();
              reader.read().then(function processResult(result) {
                if (result.done) return;
                var result = decoder.decode(result.value, {
                  stream: true
                });

                console.log(result);

                return reader.read().then(processResult);
              });
            }
            fetch(
              "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAg-bBM8onXc5vWvaZ1VG82YslRYFmvgyA",
              {
                method: "POST",
                body: JSON.stringify({
                  requests: [
                    {
                      image: {
                        source: {
                          imageUri: image_uri
                        }
                      },
                      features: [
                        {
                          type: "FACE_DETECTION",
                          type: "LABEL_DETECTION",
                          type: "LANDMARK_DETECTION",
                          type: "LOGO_DETECTION",
                          type: "LABEL_DETECTION",
                          type: "TEXT_DETECTION",
                          type: "DOCUMENT_TEXT_DETECTION",
                          type: "SAFE_SEARCH_DETECTION",
                          type: "IMAGE_PROPERTIES",
                          type: "CROP_HINTS",
                          type: "WEB_DETECTION"
                        }
                      ]
                    }
                  ]
                })
              }
            ).then(function(response) {
              Respond(response);
            });
          }
          annotate(url);

          function video() {
            var video = document.querySelector("video"),
              canvas;

            var img =
              document.querySelector("img") || document.createElement("img");
            var context;
            var width = video.offsetWidth;
            var height = video.offsetHeight;

            canvas = canvas || document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, width, height);

            canvas.toBlob(function(blob) {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function() {
                var base64data = reader.result.split(",")[1];
                annotate(base64data);
              };

              var img = document.createElement("img"),
                url = URL.createObjectURL(blob);

              img.onload = function() {
                URL.revokeObjectURL(url);
              };
              img.src = url;

              var posts = document.getElementById("image").appendChild(img);
              var uploadTask = storageRef
                .child("images/" + blob.name)
                .put(blob)
                .then(function(snapshot) {
                  var url = snapshot.metadata.downloadURLs[0];
                })
                .catch(function(error) {
                  console.error("Upload failed:", error);
                });
            });

            var video = document.getElementById("video01");
            var sources = video.getElementsByTagName("video");
            sources[0].src = string;

            document.getElementById("video").addEventListener("click", target);
            function target() {
              //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
              //https://cdn.glitch.com/412c4803-c1a3-49a4-aeae-c706ddbaba4b%2Fm6-site-planning-guide.pdf?1513539752093
              function load(agent) {
                var price = Math.floor(Math.random() * 10000 + 1);
                var name = agent.name.toLowerCase();
                var first_name = name.split(" ")[0];
                var last_name = name.split(" ")[1];
                var first_initial = first_name.split("")[0];
                agent.email =
                  first_initial + last_name + "@bosleyrealestate.com";
                agent.site = first_initial + last_name + ".fastur.com";

                document.getElementById("stdout").innerHTML =
                  agent.title +
                  "<br>" +
                  agent.office +
                  "<br>" +
                  agent.email +
                  "<br>" +
                  agent.site +
                  "<br>" +
                  agent.phone +
                  "<br>" +
                  "<a onclick='return subscribe(" +
                  price +
                  "00);' >Subscribe for just <mark id='mark'>$" +
                  price +
                  " / year</mark></a></p> ";
                var time_limit = new Date("Dec 28, 2017 24:00:00").getTime();
                var x = setInterval(function() {
                  var now = new Date().getTime();
                  var distance = time_limit - now;
                  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                  var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                  document.getElementById("major").innerHTML =
                    days +
                    "d " +
                    hours +
                    "h " +
                    minutes +
                    "m " +
                    seconds +
                    "s ";
                  if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("major").innerHTML = "EXPIRED";
                  }
                }, 1000);
              }
              var agents = JSON.parse();
              var real = Math.floor(Math.random() * 10 + 1);
              load(agents[real]);
            }
            function subscribe(amount) {
              StripeCheckout.configure({
                key: "pk_live_mdufsEUxVMK742qsZEJz4keg",
                image:
                  "https://s3.amazonaws.com/stripe-uploads/acct_15mFAPBHEFYVkz22merchant-icon-1463599844790-pilot.png",
                locale: "auto",
                token: function(token) {
                  var data = new FormData();
                  data.append("json", JSON.stringify(token));

                  fetch("/", {
                    method: "post",
                    mode: "no-cors",
                    body: data
                  }).then(function(response) {});
                }
              }).open({
                name: "Untitled",
                description: "Security",
                currency: "usd",
                amount: amount
              });
            }
          }
          //video();
        }
      });

      document.getElementsByTagName("HTML")[0].setAttribute("id", "page");
      function handTouch() {
        document.addEventListener(
          "touchmove",
          function(event) {
            //event.preventDefault();
          },
          true
        );
        document.addEventListener(
          "touchstart",
          function(event) {
            //event.preventDefault();
          },
          true
        );
        document.addEventListener(
          "touchmove",
          function(event) {
            //event.preventDefault();
          },
          true
        );
        document.addEventListener(
          "touchend",
          function(event) {
            //event.preventDefault();
          },
          true
        );
        document.addEventListener(
          "touchcancel",
          function(event) {
            //event.preventDefault();
          },
          true
        );
      }

      var contents = document.querySelectorAll("[contenteditable=true]");
      [].forEach.call(contents, function(content) {
        content.addEventListener("focus", function() {
          content.setAttribute("data-in", content.innerHTML);
        });
        content.addEventListener("blur", function() {
          if (content.getAttribute("data-in") !== content.innerHTML) {
            var elements = window.CM.getValue();

            var a = lib.typed || [];
            a.push({
              id: content.id,
              time: Date.now(),
              value: content.innerHTML
            });
            lib.typed = a;

            var latest = [];

            for (var i in lib.typed) {
              var id = lib.typed[i].id;
              var time = lib.typed[i].time;

              if (latest[id]) {
                if (latest[id].time < time) {
                  latest[id] = lib.typed[i];
                }
              } else {
                latest[id] = lib.typed[i];
              }
            }
            for (var i in latest) {
              var val = latest[i].value;
              var id = latest[i].id;

              //add logic for top level ID's
              for (var el in elements) {
                var items = elements[el].items;

                for (var item in items) {
                  if (items[item].id == id) {
                    items[item].name = val;
                  }
                }
              }
            }

            window.CM.setValue(elements);
            if (input.value) {
              window.changes = 1;
            } else {
              myBtn.innerHTML = "Name at least 3 letters";
              input.style.outline = "2px solid red";
            }
          }
        });
        content.addEventListener("dragstart", function(e) {
          e.preventDefault();
        });
        content.addEventListener("dragover", function(e) {
          e.preventDefault();
        });
        content.addEventListener("drop", function(e) {
          e.preventDefault();
        });
        content.addEventListener("mousemove", function(e) {
          var position = e.pageX + " " + e.pageY + " " + new Date().getTime();
        });
        content.addEventListener("click", function(e) {
          e.preventDefault();
        });
      });

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
              video.srcObject = localStream;
              video.onloadedmetadata = function(e) {
                video.play();
              };

              // Optional frames per second argument.
              var stream = video.captureStream(25);
              var recordedChunks = [];

              console.log(stream);
              var options = { mimeType: "video/webm; codecs=vp9" };
              mediaRecorder = new MediaRecorder(stream);

              mediaRecorder.ondataavailable = handleDataAvailable;
              mediaRecorder.start();

              function handleDataAvailable(event) {
                console.log("data-available");
                if (event.data.size > 0) {
                  recordedChunks.push(event.data);
                  console.log(recordedChunks);
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
    };
    lib.control();
    lib.start();
  }
  var body = "";
  var css = "";
  for (var element in elements) {
    var b = elements[element];

    {
      css += ` .${b.class || "card"} { 
text-align: ${b.align || "center"};
background: ${b.background || "#FFFFFF"};  
border-radius: ${b.rounding || "10px"};
outline: ${b.outline || "dashed"}; 
draggable: ${b.isdrag || "true"};  
font-family: ${b.font || "Arial, Helvetica, sans-serif;"};
transition: ${b.transition || "all 0.5s ease-out;"};
opacity: ${b.opacity || "0.85;"};
margin: ${b.margin || "10 auto;"}; 
position: ${b.position || "relative;"}; 
left: ${b.left || ""}; 
right: ${b.right || ""}; 
width: ${b.width || ""}; 
height: ${b.height || ""}; 
top: ${b.top || ""}; 
padding: ${b.padding || ""}; 
z-index: ${b.z || ""}; 
display: ${b.display || "inline-block"}; 
font-size: ${b.size || " 1rem; "};  
}

.${b.class || "card"}:hover {
background: ${b.hover || "cyan"};
}

@media only screen and (max-width: 600px) {
  .${b.class || "card"} {
    background-color: cyan;
    left: ${b.mobileleft || ""}; 
  }
}

`;
    }

    var element =
      "<" +
      (b.tag || "div") +
      " href='" +
      b.href +
      "' style='" +
      (b.style || "padding:10px;") +
      "' id='" +
      (b.id || "card") +
      "' onclick='" +
      (b.onclick || "card") +
      "' src='" +
      (b.src || "") +
      "' type='" +
      (b.formtype || "") +
      "' value='" +
      (b.value || "") +
      "' data-display='" +
      (b.datadisplay || "") +
      "' placeholder='" +
      (b.placeholder || "") +
      "' class='" +
      (b.class || b.animation || "card") +
      "' data-action='" +
      (b.dataid || "") +
      "' > " +
      (b.name || "") +
      "<" +
      (b.close || "/") +
      (b.tag || "div") +
      ">";

    body += element;
  }
  if (elements) {
    var html =
      "<html lang='en'><head><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'><link rel='stylesheet' href='api/codemirror.css'> <script src='api/codemirror.js'></script>" +
      "<title>" +
      (elements[0].title || "Untitled") +
      "</title>" +
      "<meta name='description' content='" +
      (elements[0].description || "Untitled") +
      "'>" +
      "<style>" +
      css +
      "</style><link type='image/png' rel='shortcut icon' href='api/ico.png'></head><body id='pagebody' style='background-color:" +
      elements[0].background +
      "' data-editor='" +
      action +
      "'>" +
      "<script src='https://checkout.stripe.com/checkout.js'></script>" +
      body +
      "</body><script src='https://www.gstatic.com/firebasejs/4.3.0/firebase.js'></script><script src='https://checkout.stripe.com/checkout.js'></script><script src='https://js.stripe.com/v3'></script><script src='/server'></script><script>render()</script><script> </script></html>";
  }
  return html;
}
async function puppet(url, input, q, press, coords) {
  const fs = require("fs");
  const puppeteer = require("puppeteer");
  const path = require("path");
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.setViewport({
      width: 1280,
      height: 1280
    });
    await page.type(input, q);
    page.keyboard.press(press);
    await page.waitFor(1000);

    for (var i in json) {
      var coords = json[i].coords;
      coords.x = coords.x;
      coords.y = coords.y;

      await page.mouse.click(coords.x, coords.y, {
        delay: 500
      });
      await page.waitFor(1000);
    }
    var data = require("fs").readFileSync("./api/data.json", "utf8");
    var json = JSON.parse(data);

    var result = JSON.parse(data).find(obj => {
      return obj.query === q;
    });
    json.push(coords);

    require("fs").writeFileSync("./api/data.json", JSON.stringify(json));

    var pathd = path.join(__dirname, "api/" + coords.time + ".png");
    await page.screenshot({ path: pathd });

    var json = require("fs").readFileSync("./api/clicks.json", "utf8");
    try {
      var json = JSON.parse(json);
    } catch (e) {
      var json = [];
    }
    json.push(coords);
    require("fs").writeFileSync("./api/clicks.json", JSON.stringify(json));
    console.log("puppet finished");
    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

/*
var now = Date.now();
var qoords = {
    coords: { x: 0, y: 0 },
    screenshot: "/api/" + now + ".png",
    time: now
  };
var counter = 0;
setInterval(function() {
  var data = require("fs").readFileSync("./api/data.json", "utf8");
  var data = JSON.parse(data);
  var arr = [];
  for (var i in data) {
    if (data[i].text) {
      arr.push(data[i]);
    }
  }
  var todo = arr[counter].name;
  
  var data = require("fs").readFileSync("./api/finished.json", "utf8");
  if (data.indexOf(todo) == -1) {
    puppet("https://google.com", "input.gLFyf.gsfi", todo, "Enter", qoords);
  } else {
    console.log("already performed this");
  }

data = JSON.parse(data);
data.push(todo);
require("fs").writeFileSync("./api/finished.json", JSON.stringify(data));
  counter++
 if (counter == arr.length) {
    counter = 0;
  }
}, 10000);*/
function gif(a, b, c) {
  const GIFEncoder = require("gifencoder");
  const Canvas = require("canvas-prebuilt");
  const fs = require("fs");

  const encoder = new GIFEncoder(c, c);
  // stream the results as they are available into myanimated.gif
  encoder.createReadStream().pipe(fs.createWriteStream("./api/" + a + ".gif"));

  encoder.start();
  encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
  encoder.setDelay(50); // frame delay in ms
  encoder.setQuality(3); // image quality. 10 is default.

  var canvas = new Canvas(c, c);
  const ctx = canvas.getContext("2d");

  function getColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 8; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  var images = fs.readFileSync("api/clicks.json", "utf-8");

  images = JSON.parse(images);
  for (var i in images) {
    var data = fs.readFileSync(__dirname + "/api/" + images[i].time + ".png");
    var img = new Canvas.Image();
    img.src = data;
    ctx.drawImage(img, 0, 0, 640, 240);
    encoder.addFrame(ctx);
  }

  encoder.finish();
  console.log("Gif Generator finished");
}
//gif('sun', 15, 640);
/*
var count = 0;
setInterval(function() {
  var data = require("fs").readFileSync("./api/data.json", "utf8");
  var json = JSON.parse(data);
     
  var arr = [];
  for (var i in json){
    if (json[i].text){
      arr.push(json[i]);
    }
  } 
  var todo = arr[count].id;
 
  var data = require("fs").readFileSync("./api/finished.json", "utf8");
  if (data.indexOf(todo) == -1) {
  console.log("Not ready");
  } else {
  console.log("render GIF");
  var name = arr[count].name;
  gif(name, 15, 640);
  }
  data = JSON.parse(data);
  data.push(todo);
  require("fs").writeFileSync("./api/finished.json", JSON.stringify(data));
    count++
 if (count == arr.length) {
    count = 0;
  }
   }, 10000);*/
function run(a) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  var https = require("https");
  https.get(
    {
      host: "en.wikipedia.org",
      port: 443,
      path: "/wiki/" + a
    },
    function(response) {
      var body = "";
      response.on("data", function(data) {
        body += data;
      });
      response.on("end", function() {
        function filterLinks(links) {
          const filtered = [];
          const ignoredWords = [
            "/",
            "disambiguation",
            "doi",
            "Article",
            "Wikipedia indefinitely semi-protected pages",
            "Wikidata",
            "Wikipedia",
            "Certification Table Entry"
          ];
          const ignoredLinks = [
            "Special:Search",
            "Help:",
            "Wikipedia:Verifiability"
          ];
          for (let i = 0; i < links.length; ++i) {
            const text = links[i].title;
            const link = links[i].href;
            // removes lots of strange articles
            if (text.length < 2) {
              continue;
            }
            // get rid of all numbers (for now)
            if (text.match(/\d+/g) !== null) {
              continue;
            }
            // avoid things like User:This_Person
            if (text.match(/\w:\w/g) !== null) {
              continue;
            }
            if (link.match(/\w:\w/g) !== null) {
              continue;
            }
            let skip = false;
            // skip all ignored text and links
            for (let j = 0; j < ignoredWords.length; j++) {
              if (text.includes(ignoredWords[j])) {
                skip = true;
              }
            }
            for (let j = 0; j < ignoredLinks.length; j++) {
              if (link.includes(ignoredLinks[j])) {
                skip = true;
              }
            }
            if (skip) {
              continue;
            }
            // make sure they aren't weird editor notes
            if (links[i].outerHTML.includes("<i")) {
              continue;
            }
            // make sure href leads to wikipedia page
            if (!link.includes("/wiki/")) {
              continue;
            }
            // lastly, make sure item doesn't exist already
            for (let j = 0; j < filtered.length; j++) {
              if (text === filtered[j].text) {
                skip = true;
                break;
              }
            }
            if (skip) {
              continue;
            }

            let item = { text: text, href: link };
            filtered.push(item);
          }
          console.log("number of articles: ", filtered.length);
          return filtered;
        }
        let filtered = [];
        const dom = new JSDOM(body);
        let all = dom.window.document.querySelectorAll("p");
        var page = "";
        for (var entry in all) {
          page += all[entry].textContent;
        }

        function count(sentence) {
          function numerate(a) {
            var result = "";
            for (var i in a) {
              var b = a[i].toLowerCase().charCodeAt(0) - 96;
              result += b;
              result += " ";
            }
            return result;
          }

          var list = sentence.split(" ");
          var words = {};
          for (var i = 0; i < list.length; i++) {
            var word = list[i];

            if (words.hasOwnProperty(word)) {
              var one = words[word].count + 1;
              words[word] = {
                count: one,
                word: word,
                index: numerate(word)
              };
            } else {
              words[word] = {
                count: 1,
                word: word,
                index: numerate(word)
              };
            }
          }
          return words;
        }

        var count = count(page);

        var percentage = count / page.length;

        var values = Object.values(count);

        var sort_by = function(field, reverse, primer) {
          var key = primer
            ? function(x) {
                return primer(x[field]);
              }
            : function(x) {
                return x[field];
              };
          reverse = !reverse ? 1 : -1;
          return function(a, b) {
            return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
          };
        };
        values.sort(sort_by("count", true, parseInt));

        var r = require("fs").readFileSync("./api/sun.json", "utf8");
        var json = [{
          page: page,
          count: count,
          values: values
        }];
        console.log(r);
        r= JSON.parse(r)
        r[a] = json;
        require("fs").writeFileSync("./api/sun.json", JSON.stringify(r));

        console.log("finished");
      });
    }
  );
}

var count = 0;
setInterval(function() {
  var data = require("fs").readFileSync("./api/data.json", "utf8");
  var json = JSON.parse(data);
     
  var arr = [];
  for (var i in json){
    if (json[i].text){
      arr.push(json[i]);
    }
  } 
  var todo = arr[count].id;
 
  var data = require("fs").readFileSync("./api/finished.json", "utf8");
  if (data.indexOf(todo) == -1) {
    var text = arr[count].text
    var words = text.split(' ');
    for (var i in words){
    run(words[i]);  
    }
    
  } else {  
    var text = arr[count].text
  }
  data = JSON.parse(data);
  data.push(todo);
  require("fs").writeFileSync("./api/finished.json", JSON.stringify(data));
    count++
 if (count == arr.length) {
    count = 0;
  }
}, 5000);

async function twitter($) {
  const puppeteer = require("puppeteer");
  const path = require("path");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1280 });

  let twitterAccount = {
    userField: "input[name='session[username_or_email]']",
    passField: "input[name='session[password]']",
    loginSubmit: ".css-901oao"
  };
  await page.goto("https://twitter.com");
  await page.waitForSelector(twitterAccount.userField);
  await page.click(twitterAccount.userField);
  await page.keyboard.type("aicashceo");
  await page.waitForSelector(twitterAccount.passField);
  await page.click(twitterAccount.passField);
  await page.keyboard.type("PASSWORD");
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  var url = page.url();
  if (url.indexOf("RetypePhoneNumber") != -1) {
    await page.keyboard.type("4162946843");
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
  }
  await page.goto("https://twitter.com/" + $ + "/with_replies");
  await page.waitFor(6000);

  var pathd = path.join(__dirname, "api/" + $ + ".png");
  await page.screenshot({ path: pathd });

  console.log("Tweet posted successfully.");
  browser.close();
}
/*
Update twitter with your credentials
var count = 0;
setInterval(function() {
  var data = require("fs").readFileSync("./api/data.json", "utf8");
  var json = JSON.parse(data);
     
  var arr = [];
  for (var i in json){
    if (json[i].text){
      arr.push(json[i]);
    }
  } 
  var todo = arr[count].id;
 
  var data = require("fs").readFileSync("./api/finished.json", "utf8");
  if (data.indexOf(todo) == -1) {
    var name = arr[count].name; 
    console.log(name);  
    twitter(name)   

    //run(words[0]);
  } else {
    console.log("already performed this");
  }
  data = JSON.parse(data);
  data.push(todo);
  require("fs").writeFileSync("./api/finished.json", JSON.stringify(data));
    count++
 if (count == arr.length) {
    count = 0;
  }
   }, 10000);*/
function twitter_search($) {
  var Twitter = require("twitter");
  var client = new Twitter({
    consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
    consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
    access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
    access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
  });
  client.get(
    "search/tweets",
    {
      q: $
    },
    function(err, t, r) {
      var date = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      var arr = [];
      for (var y = 0; y < t.statuses.length; y++) {
        //console.log(t.statuses[y])
        arr.push({
          id: t.statuses[y].id_str,
          name: t.statuses[y].user.screen_name,
          date: t.statuses[y].created_at,
          text: t.statuses[y].text,
          url: t.statuses[y].user.url
        });
      }
      require("fs").writeFileSync("./api/data.json", JSON.stringify(arr));
      console.log(arr);
    }
  );
}
//twitter_search("aicashceo");
function twitter_post($) {
  var data = require("fs").readFileSync("api/data.json", "utf-8");
  var data = JSON.parse(data);
  for (var i in data) {
    var handle = "@" + data[i].name;
    var text = data[i].text;
    var id = data[i].id;

    var status = handle + " " + text;

    var Twitter = require("twitter");
    var client = new Twitter({
      consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
      consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
      access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
      access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
    });
    client.post(
      "statuses/update",
      {
        in_reply_to_status_id: id,
        status: status
      },
      function(err, t, r) {
        if (!err) {
          var body = JSON.parse(r.body);
          //var tweets = require("fs").readFileSync("twitter.json");

          //require("fs").writeFileSync("twitter.json", tweets);
          console.log(body.id);
          console.log(err + t + r);
        }
      }
    );
  }
}
//twitter_post("@aisafetyceo wow");
function twitter_gif($, state) {
  const Twitter = require("twitter");
  const fs = require("fs");

  const client = new Twitter({
    consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
    consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
    access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
    access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
  });

  const imageData = fs.readFileSync($);

  client.post("media/upload", { media: imageData }, function(
    error,
    media,
    response
  ) {
    if (error) {
      console.log(error);
    } else {
      const status = {
        status: state,
        media_ids: media.media_id_string
      };

      client.post("statuses/update", status, function(error, tweet, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Successfully tweeted an image!");
        }
      });
    }
  });
}
//twitter_gif("./api/sun.gif","Movie and we burn!")
function retrieve_email($) {
  var AWS = require("aws-sdk");
  AWS.config.update({
    accessKeyId: "AKIASS565J2QNZZVPBHX",
    secretAccessKey: "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",
    region: "us-west-2",
    apiVersions: {
      s3: "2006-03-01",
      ses: "2010-12-01",
      route53domains: "2014-05-15",
      cloudfront: "2017-03-25",
      route53: "2013-04-01"
    }
  });
  var s3 = new AWS.S3();
  var params = {
    Bucket: "fastur.mail",
    MaxKeys: "10"
  };
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      ws.send(JSON.stringify(err));
    } else {
      var Contentsdata = data.Contents;
      for (var i in Contentsdata) {
        s3.getObject(
          {
            Bucket: data.Name,
            Key: Contentsdata[i].Key
          },
          function(err, data) {
            if (err) {
              console.log(err, err.stack);
              console.log(data);
            } else {
              const simpleParser = require("mailparser").simpleParser;

              var Body = data.Body.toString("utf-8");
              var modified = data.LastModified;
              simpleParser(Body, (err, parsed) => {
                console.log(parsed.html);
                console.log(modified);
                //ws.send(JSON.stringify({type: "error",data: parsed.html,date: modified}));
              });
            }
          }
        );
      }
    }
  });
}
//retrieve_email();
function send_email(email) {
  var AWS = require("aws-sdk");
  AWS.config.update({
    accessKeyId: "AKIASS565J2QNZZVPBHX",
    secretAccessKey: "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",
    region: "us-east-1",
    apiVersions: {
      s3: "2006-03-01",
      ses: "2010-12-01",
      route53domains: "2014-05-15",
      cloudfront: "2017-03-25",
      route53: "2013-04-01"
    }
  });
  var ses = new AWS.SES();
  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "https://fastur.com"
        },
        Text: {
          Charset: "UTF-8",
          Data: "https://fastur.com"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hey, you hurt my feelings."
      }
    },
    ReturnPath: "mj@fastur.com",
    Source: "mj@fastur.com"
  };
  ses.sendEmail(params, (err, data) => {
    if (err) console.log(err);
    else console.log("message sent to " + email);
    //append("outbox", " " + email);
  });
}
//send_email('joseph@fastur.com')

var server = require("http")
  .createServer(function(request, response) {
    if (request.method === 'OPTIONS') {
    response.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  });
    response.end();
    return;
  }
    if (request.method == "GET") {
      try {
        var json = require("fs").readFileSync("./api/analytics.json", "utf8");
      } catch (e) {
        console.log(e);
      }
      try {
        var json = JSON.parse(json);
      } catch (e) {
        //rebuild from backup notify
        var json = [];
      }
      json.push({
        url: request.url,
        domain: request.headers.host,
        time: Date.now(),
        ip: request.headers["x-real-ip"]
      });
      require("fs").writeFileSync("./api/analytics.json", JSON.stringify(json));

      function parseCookies(request) {
        var list = {},
          rc = request.headers.cookie;
        rc &&
          rc.split(";").forEach(function(cookie) {
            var parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURI(parts.join("="));
          });
        return list;
      }
      var cookies = parseCookies(request);
      if (request.url == "/favicon.ico") {
        response.end("");
      }
      if (request.url == "/code") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./code.html", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/api/codemirror.css") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/codemirror.css", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }  
      if (request.url == "/api/codemirror.js") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/codemirror.js", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/server") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./server.js", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/index") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/index.js", "utf8");
        response.end(data);
      }
      
      if (request.url == "/api/clicks.json") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/clicks.json", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/api/data.json") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/data.json", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }

      if (request.url == "/") {
        if (cookies.fastur) {
        } else {
          response.writeHead(200, {
            "Set-Cookie":
              "fastur=" +
              require("crypto")
                .randomBytes(16)
                .toString("hex") +
              "; " +
              "expires=" +
              new Date(new Date().getTime() + 86409000).toUTCString()
          });
        }

        var data = require("fs").readFileSync("./api/old.json");

        var data = JSON.parse(data);
        var data = render("false", data);
        response.end(data);
      }
      if (request.url.split("?")[1] && request.url.split("?")[1].length == 32) {
        var id = request.url.split("?")[1];

        if (typeof id !== "undefined") {
          var elements = require("fs").readFileSync("./api/" + id + ".json");
          var elements = JSON.parse(elements);
        }
        if (typeof elements !== "object") {
          var elements = JSON.parse(elements);
        }

        var html = render("edit", elements);
        response.end(html);
      } else {
        if (
          require("fs").existsSync(
            __dirname + "/api/" + request.url.split("/")[2]
          )
        ) {
          var img =
            require("fs").readFileSync(
              __dirname + "/api/" + request.url.split("/")[2]
            ) || null;
        }
        response.end(img);
      }
    }
    if (request.method == "POST") {
      var buffer = [];
      var dt = "";
      var fin = 0;
      request
        .on("error", function(err) {})
        .on("data", function(chunk) {
          buffer.push(chunk);
        })
        .on("end", function() {
          fin = 1;
        });
      var refreshId = setInterval(function() {
        if (fin == 1) {
          var string = Buffer.concat(buffer).toString();
          function is_json(str) {
            try {
              JSON.parse(str);
            } catch (e) {
              return false;
            }
            return true;
          }
          if (is_json(string)) {
            var object = JSON.parse(string);
            switch (object.type) {
              case "commit": {
                var q = object.query;

                if (object.modifier == "editor") {
                  var q = object.input;
                  var uid = require("crypto")
                    .randomBytes(16)
                    .toString("hex");

                  if (process.env.PROJECT_DOMAIN == "fastur") {
                    var html = render("false", object.query);
                    require("fs").writeFileSync(
                      "./api/" + object.input + ".html",
                      html
                    );
                  } else {
                    if (object.input.length == 32) {
                      var i = json.findIndex(function(item, i) {
                        return item.uid == object.query;
                      });
                      var subname = json[i].subname;
                    }
                    subname = object.input + ".fastur.com";

                    var string = require("fs").readFileSync(
                      "./api/data.json",
                      "utf8"
                    );
                    var json = JSON.parse(string);
                    var i = json.find(function(item) {
                      return item.active === object.cookie;
                    });
                    var result = json.find(obj => {
                      return obj.subname === subname;
                    });
                    var results = json.filter(function(entry) {
                      return entry.port;
                    });
                    var port = 0; //results[results.length - 1].port + 1;
                    json.push({
                      port: port,
                      subname: subname,
                      uid: uid,
                      publisher: i.email
                    });
                    require("fs").writeFileSync(
                      "./api/data.json",
                      JSON.stringify(json)
                    );

                    var nginx_conf = require("fs").readFileSync(
                      "./nginx",
                      "utf8"
                    );
                    nginx_conf = nginx_conf
                      .replace(/ab.fastur.com/g, subname)
                      .replace(/7002/g, port);
                    require("fs").writeFileSync(
                      "/etc/nginx/sites-enabled/" + subname.replace(/\./g, ""),
                      nginx_conf
                    );

                    var index = require("fs").readFileSync(
                      "./index2.js",
                      "utf8"
                    );
                    index = index
                      .replace(/7002/g, port)
                      .replace(/frames.html/g, uid + ".html");
                    require("fs").writeFileSync(
                      "./api/index" + port + ".js",
                      index
                    );

                    var html = render("false", object.query);
                    require("fs").writeFileSync("./api/" + uid + ".html", html);
                    require("fs").writeFileSync(
                      "./api/" + uid + ".json",
                      object.query
                    );

                    require("child_process").exec(
                      "./restart.sh " + port + " " + subname + " new",
                      (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                      }
                    );
                    response.end("success");
                  }
                }
                if (object.modifier == "data") {
                  if (typeof object.query !== "object") {
                    var data = JSON.parse(object.query);
                  }

                  require("fs").writeFileSync(
                    "./api/912120bfa38218625d3e8505996f7860.json",
                    JSON.stringify(data, null, 4)
                  );

                  var html = render("hard", data);
                  require("fs").writeFileSync(
                    "./api/912120bfa38218625d3e8505996f7860.html",
                    html
                  );
                  require("fs").writeFileSync("./api/frames.html", html);

                  response.end(JSON.stringify({ data: "save complete" }));
                }
                if (object.modifier == "server") {
                  var string = "index2.js";
                  var time = Date.now();
                  var datam = require("fs").readFileSync(
                    "./api/history/analytics.json",
                    "utf8"
                  );
                  var json = JSON.parse(datam);
                  json.push({
                    time: time
                  });
                  require("fs").writeFileSync(
                    "./api/history/analytics.json",
                    JSON.stringify(json)
                  );

                  var data = require("fs").readFileSync("./" + string, "utf8");
                  data = data.split("var server")[0];

                  var r1 =
                    " var elements =   require('fs').readFileSync('./api/912120bfa38218625d3e8505996f7860.json');  		if (typeof elements !== 'object') { var elements = JSON.parse(elements) }         require('fs').writeFileSync('./api/912120bfa38218625d3e8505996f7860.html', render('false',elements));";

                  require("fs").writeFileSync("./api/render1.js", data + r1);

                  require("child_process").exec(
                    "node ./api/render1.js",
                    (err, stdout, stderr) => {
                      console.log(err, stdout, stderr);
                    }
                  );

                  try {
                    var re = eval(object.query.replace(".listen(7002)", ""));

                    require("fs").writeFileSync(
                      "./api/history/index2.js" + time,
                      object.query
                    );
                    require("fs").writeFileSync("./" + string, object.query);

                    var string1 =
                      "require('http').createServer(function (req, res) { res.write(''); res.end(); }).listen(7000); ";

                    require("child_process").exec(
                      "./restart.sh restart " + string,
                      (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                      }
                    );
                  } catch (e) {
                    if (e instanceof SyntaxError) {
                      response.end(
                        JSON.stringify({ type: "error", data: e.message })
                      );
                    }
                  }
                }

                var json = require("fs").readFileSync(
                  "./api/analytics.json",
                  "utf8"
                );
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }
                json.push({
                  q: q,
                  url: request.url,
                  domain: request.headers.host,
                  time: Date.now(),
                  ip: request.headers["x-real-ip"]
                });
                require("fs").writeFileSync(
                  "./api/analytics.json",
                  JSON.stringify(json)
                );

                var data = require("fs").readFileSync(
                  "./api/data.json",
                  "utf8"
                );

                if (q == "subscription") {
                  function subscription($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.create(
                      {
                        customer: $.customer,
                        plan: $.plan
                      },
                      function(err, subscription) {}
                    );
                  }
                }
                if (q == "charge") {
                  function charge($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).charges.create(
                      {
                        amount: 100,
                        currency: "usd",
                        description: "connection",
                        source: token
                      },
                      function(err, charge) {
                        one(err, charge);
                      }
                    );
                  }
                  charge($);
                }
                if (q == "plan") {
                  function plan($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).plans.create(
                      {
                        amount: 5000,
                        interval: "month",
                        name: "Silver corporate",
                        currency: "cad",
                        id: "silver-corporate"
                      },
                      function(err, plan) {
                        // asynchronously called
                      }
                    );
                  }
                }
                if (q == "plan_delete") {
                  function _delete($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.del($.subscription, function(
                      err,
                      confirmation
                    ) {});
                  }
                }
                if (q == "update") {
                  function update($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.update(
                      $._old,
                      {
                        plan: $._new
                      },
                      function(err, subscription) {}
                    );
                  }
                }

                if (q == "email") {
                  function retrieve_email($) {
                    var AWS = require("aws-sdk");
                    AWS.config.update({
                      accessKeyId: " AKIASS565J2QPMK5C4F6",
                      secretAccessKey:
                        "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",
                      region: "us-west-2",
                      apiVersions: {
                        s3: "2006-03-01",
                        ses: "2010-12-01",
                        route53domains: "2014-05-15",
                        cloudfront: "2017-03-25",
                        route53: "2013-04-01"
                      }
                    });
                    var s3 = new AWS.S3();
                    var params = {
                      Bucket: "fastur.mail",
                      MaxKeys: "10"
                    };
                    s3.listObjects(params, function(err, data) {
                      if (err) {
                        console.log(err, err.stack);
                        ws.send(JSON.stringify(err));
                      } else {
                        var Contentsdata = data.Contents;
                        for (var i in Contentsdata) {
                          s3.getObject(
                            {
                              Bucket: data.Name,
                              Key: Contentsdata[i].Key
                            },
                            function(err, data) {
                              if (err) {
                                console.log(err, err.stack);
                                ws.send(JSON.stringify(err));
                              } else {
                                const simpleParser = require("mailparser")
                                  .simpleParser;

                                var Body = data.Body.toString("utf-8");
                                var modified = data.LastModified;
                                simpleParser(Body, (err, parsed) => {
                                  console.log(parsed.html);
                                  console.log(modified);
                                  ws.send(
                                    JSON.stringify({
                                      type: "error",
                                      data: parsed.html,
                                      date: modified
                                    })
                                  );
                                });
                              }
                            }
                          );
                        }
                      }
                    });
                  }
                  retrieve_email($);

                  function send_email($) {
                    var AWS = require("aws-sdk");
                    AWS.config.update({
                      accessKeyId: process.env.accessKeyId,
                      secretAccessKey: process.env.secretAccessKey,
                      region: "us-west-2",
                      apiVersions: {
                        s3: "2006-03-01",
                        ses: "2010-12-01",
                        route53domains: "2014-05-15",
                        cloudfront: "2017-03-25",
                        route53: "2013-04-01"
                      }
                    });
                    var ses = new AWS.SES();
                    const params = {
                      Destination: {
                        ToAddresses: [email]
                      },
                      Message: {
                        Body: {
                          Html: {
                            Charset: "UTF-8",
                            Data: "https://fastur.com"
                          },
                          Text: {
                            Charset: "UTF-8",
                            Data: "https://fastur.com"
                          }
                        },
                        Subject: {
                          Charset: "UTF-8",
                          Data: "Hey, you hurt my feelings."
                        }
                      },
                      ReturnPath: "assist@fastur.com",
                      Source: "assist@fastur.com"
                    };
                    ses.sendEmail(params, (err, data) => {
                      if (err) console.log(err);
                      else console.log("message sent to " + email);
                      append("outbox", " " + email);
                    });
                  }
                }
                if (q == "analytics") {
                  var json = require("fs").readFileSync(
                    "./api/analytics.json",
                    "utf8"
                  );
                  try {
                    var json = JSON.parse(json);
                  } catch (e) {
                    //rebuild from backup notify
                    var json = [];
                  }
                  var total = json.length;
                  console.log(json[0]);
                  response.end(total + " page views/requests");
                }
                response.end(JSON.stringify(data));
                break;
              }
              case "login": {
                function login(email, password, uuid) {
                  var salt = {};
                  var data = require("fs").readFileSync(
                    "./api/data.json",
                    "utf8"
                  );

                  var result = JSON.parse(data).find(obj => {
                    return obj.email === email;
                  });
                  if (result) {
                    var hash = require("crypto")
                      .createHmac("sha512", result.salt)
                      .update(password)
                      .digest("hex");
                    if (hash == result.hash) {
                      var json = JSON.parse(data);

                      var i = json.findIndex(function(item, i) {
                        return item.email === email;
                      });
                      json[i].active = uuid;
                      require("fs").writeFileSync(
                        "./api/data.json",
                        JSON.stringify(json)
                      );

                      var results = json.filter(function(entry) {
                        return entry.publisher === email;
                      });

                      var results = JSON.stringify(results);
                      response.end(
                        JSON.stringify({
                          type: "success",
                          name: result.name,
                          data: results
                        })
                      );
                      return;
                    } else {
                      response.end(
                        JSON.stringify({
                          type: "failure",
                          reason: "Email/Password did not match."
                        })
                      );
                    }
                  } else {
                    response.end(
                      JSON.stringify({
                        type: "failure",
                        reason: "Email Not Found"
                      })
                    );
                  }
                }
                login(object.email, object.password, object.uuid);
                break;
              }
              case "register": {
                function register(name, email, password) {
                  var salt = require("crypto")
                    .randomBytes(Math.ceil(16 / 2))
                    .toString("hex")
                    .slice(0, 16);
                  var hash = require("crypto")
                    .createHmac("sha512", salt)
                    .update(password)
                    .digest("hex");
                  var data = require("fs").readFileSync(
                    "./api/data.json",
                    "utf8"
                  );

                  var json = JSON.parse(data);
                  var result = JSON.parse(data).find(obj => {
                    return obj.email === email;
                  });
                  if (result) {
                    response.end(
                      JSON.stringify({
                        type: "success",
                        name: result.name,
                        data: "already registered"
                      })
                    );
                  } else {
                    json.push({
                      name: name,
                      email: email,
                      password: "hash",
                      hash: hash,
                      salt: salt
                    });
                    require("fs").writeFileSync(
                      "./api/data.json",
                      JSON.stringify(json)
                    );
                    response.end("success, log in!");
                  }
                }
                register(object.name, object.email, object.password);
                break;
              }
              case "screen": {
                async function puppet(url, input, q, press, coords) {
                  const fs = require("fs");
                  const puppeteer = require("puppeteer");
                  const path = require("path");
                  try {
                    const browser = await puppeteer.launch({
                      args: ["--no-sandbox"]
                    });
                    const page = await browser.newPage();
                    await page.goto(url);
                    await page.setViewport({
                      width: 1280,
                      height: 1280
                    });
                    await page.type(input, q);
                    page.keyboard.press(press);
                    await page.waitFor(1000);

                    var keepCalling = true;
                    setTimeout(function() {
                      keepCalling = false;
                    }, 60000);

                    while (keepCalling) {
                      var json = require("fs").readFileSync(
                        "./api/clicks.json",
                        "utf8"
                      );
                      try {
                        var json = JSON.parse(json);
                      } catch (e) {
                        var json = [];
                      }
                      json.push(coords);
                      require("fs").writeFileSync(
                        "./api/clicks.json",
                        JSON.stringify(json)
                      );

                      for (var i in json) {
                        if (json[i].coords) {
                          var coordinates = json[i].coords;
                          console.log(coordinates);
                          coordinates.x = coordinates.x;
                          coordinates.y = coordinates.y;

                          await page.mouse.click(coordinates.x, coordinates.y, {
                            delay: 500
                          });
                        } else {
                          var toBeTyped = json[i].keys;
                          await page.keyboard.type(toBeTyped);
                          await page.keyboard.press("Enter");
                        }
                        await page.waitFor(2000);
                      }

                      var pathd = path.join(
                        __dirname,
                        "api/" + coords.time + ".png"
                      );
                      console.log(pathd);
                      await page.screenshot({ path: pathd });
                    }

                    console.log("puppet finished");
                    await browser.close();
                  } catch (error) {
                    console.log(error);
                  }
                }
                puppet("https://google.com","input.gLFyf.gsfi"," ","Enter",object.query);
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                response.setHeader('Access-Control-Allow-Credentials', true);
 
                response.end('successful');

                break;
              }
              case "key":{
                console.log(object);
                function numerate(a) {
                  var result = "";
                  for (var i in a) {
                    var b = a[i].toLowerCase().charCodeAt(0) - 96;
                    result += b;
                    result += " ";
                  }
                  return result;
                }
                var q = object.query;
                var data = require("fs").readFileSync("./api/data.json", "utf8");
                var json = JSON.parse(data);

                object.id = require("crypto")
                .randomBytes(16)
                .toString("hex") ;
                json.push(object);

                require("fs").writeFileSync("./api/data.json",JSON.stringify(json));
                
                var n = numerate(q); 
                
                var r = require("fs").readFileSync("./api/sun.json", "utf8");
                var r = JSON.parse(r);
                var r = JSON.stringify(r.page)
                console.log(r.length)
                response.setHeader('Access-Control-Allow-Origin', '*');
                response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                response.setHeader('Access-Control-Allow-Credentials', true);
                //response.setHeader("Content-Length", r.length)

                response.end(r) 
                break;
              }
              default:
            }
          }
        }
        clearInterval(refreshId);
      }, 50);
    }
  })
  .listen(process.env.PORT || 7002);




[
    {
        "type": "site",
        "title": "X",
        "description": "a production ready template for building the web",
        "tag": "div",
        "element": "element",
        "name": "main",
        "display": "none;",
        "container": "container",
        "id": "main",
        "class": "main",
        "color": "white",
        "gaid": "UA-110802733-3",
        "align": "center",
        "colWidth": "30",
        "colNum": "1",
        "colSpace": "0",
        "background": " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
        "urlbg": "url('${background}');",
        "items": [
            {
                "name": "FASTUR",
                "href": "",
                "class": "maintext",
                "id": "html",
                "background": "yellow",
                "tag": "p",
                "type": "html"
            },
            {
                "name": "New Site",
                "href": "/edit?blank",
                "class": "image",
                "background": "lightblue",
                "src": "https://source.unsplash.com/400x250/?work",
                "id": "pagebody",
                "width": "100%",
                "type": "body",
                "tag": "img"
            }
        ]
    },
    {
        "tag": "div",
        "display": "block;",
        "element": "element",
        "name": "buttons",
        "caps": "true",
        "align": "center",
        "animation": " active",
        "id": "buttons",
        "items": [
            {
                "href": "#home",
                "id": "home-button",
                "name": "home",
                "type": "button",
                "tag": "a",
                "background": "",
                "hover": "pink",
                "textcolor": "white",
                "ishidden": "home",
                "value": "home",
                "class": "element",
                "css": ""
            },
            {
                "href": "#login",
                "id": "login-button",
                "name": "login",
                "type": "button",
                "tag": "a",
                "background": "",
                "hover": "pink",
                "textcolor": "white",
                "ishidden": "home",
                "value": "home",
                "class": "element",
                "css": ""
            },
            {
                "href": "#register",
                "id": "register-button",
                "name": "register",
                "tag": "a",
                "hover": "pink",
                "ishidden": "",
                "type": "button",
                "textcolor": "white",
                "class": "element",
                "placeholder": "register"
            },
            {
                "href": "#dashboard",
                "id": "dashboard-button",
                "name": "dashboard",
                "tag": "a",
                "hover": "pink",
                "ishidden": "",
                "type": "button",
                "textcolor": "white",
                "class": "element",
                "placeholder": "dashboard"
            },
            {
                "href": "#blog",
                "id": "blog-button",
                "name": "blog",
                "tag": "a",
                "hover": "pink",
                "ishidden": "",
                "textcolor": "white",
                "type": "button",
                "class": "element",
                "placeholder": "blog"
            }
        ]
    },
    {
        "tag": "div",
        "secondarytag": "div",
        "element": "element",
        "name": "home",
        "display": "block;",
        "animation": "inner active",
        "container": "container",
        "caps": "true",
        "href": "#home",
        "color": "white",
        "padding": "1em",
        "align": "center",
        "type": "page",
        "id": "home",
        "items": [
            {
                "name": "devices",
                "href": "",
                "class": "image",
                "background": "pink",
                "src": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQRRDFGl0SF_aid6ORUR5eEWj_96H6r2yFp1UuWPWTkJ8Imw90OLA&usqp=CAc",
                "id": "New-Site",
                "type": "imaged",
                "tag": "img"
            }
        ]
    },
    {
        "tag": "div",
        "secondarytag": "div",
        "element": "element",
        "name": "blog",
        "display": "none",
        "animation": "inner active",
        "container": "container",
        "caps": "true",
        "href": "#blog",
        "color": "white",
        "padding": "1em",
        "align": "center",
        "type": "page",
        "id": "blog",
        "items": [
            {
                "name": "<b>TLDR; add script tag with source: <a href='https://code.fastur.com/api'>code.fastur.com/api</a> call render()  </b><br><br><b>Chapter 1: what is AI?</b> <br>Pixel level control of images <br>capable of self learning and self governing <br><br> <b>Chapter 2: AI Environment </b><br>All software is written in English and binary Code <br>Majority of industry is working on Deep learning <br>Most software developers search for solutions on sites like stackoverflow.com <br> <br><b>Chapter 3: Interpreting AI  development </b><br>Google reorganized as alphabet and buys abc.xyz domain - august 2015 <br>Google Vision - feb 2016 <br>Aj releases Carrd - april 2016 <br>Glitch starts 'ask a question' / abstracts over stackoverflow - march 2017 <br>Google releases puppeteer - january 2018 <br>Microsoft buys Github - oct 2018 <br>Bill Gates says he doesn't want his brain to die / would teach computers to read - jun 2019 <br>Facebook ai research announces 2d-3d cycle loss method - oct 2019 <br>Google announces cache project - nov 2019 <br>Larry Page leaves Alphabet - Dec 2019 <br>Connected Home over IP / Homekit - Dec 2019 <br>Amazon announces Braket & Komposer - Dec 2019 <br>Aj announces Data integrations for Carrd - Jan 2020<br><br>Artificial General Intelligence is creating the first group of multi-trillionaires <br> <br><a href='https://www.youtube.com/watch?v=oBklltKXtDE'>Elon Musk & Andrej Karpathy</a> <br><iframe width='280' height='157' src='https://www.youtube.com/embed/oBklltKXtDE?t=700' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> <br><a href='https://www.youtube.com/watch?v=Wqb7P3u5ujw'>Elon Musk & Max Hodak </a> <br><iframe width='280' height='157' src='https://www.youtube.com/embed/Wqb7P3u5ujw' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> <br><a href='https://youtu.be/s7O3oCWZgjE?t=225'>Bill Gates</a> <br><iframe width='280' height='157' src='https://www.youtube.com/embed/s7O3oCWZgjE?t=225' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> <br><a href='https://www.youtube.com/watch?v=-swj_rj3luE'>Mark Zuckerberg & Abhinav Gupta</a><br><iframe width='280' height='157' src='https://www.youtube.com/embed/-swj_rj3luE' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> <br><a href='https://www.youtube.com/watch?v=SaVsc65iu6E'>Jason Kelly </a><br><iframe width='280' height='157' src='https://www.youtube.com/embed/SaVsc65iu6E' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe> <br><a href='https://youtu.be/_4t12rS6_jo?t=700'>John & Patrick Collison </a> <br><iframe width='280' height='157' src='https://www.youtube.com/embed/_4t12rS6_jo?t=700' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br>    ",
                "href": "",
                "class": "subtext",
                "id": "",
                "tag": "p",
                "type": "text"
            }
        ]
    },
    {
        "tag": "div",
        "secondarytag": "form",
        "secondaryp": " action='/' method='post'",
        "element": "element",
        "name": "login",
        "animation": "inner inactive",
        "display": "none",
        "container": "container",
        "caps": "true",
        "href": "#login",
        "color": "white",
        "background": "",
        "align": "center",
        "padding": "1em",
        "id": "login",
        "type": "form",
        "link": "register",
        "title": "Login",
        "items": [
            {
                "name": "login",
                "type": "form",
                "tag": "input",
                "formtype": "hidden",
                "br": true,
                "ishidden": "login",
                "value": "login",
                "class": "blank",
                "id": "login-type"
            },
            {
                "name": "email",
                "type": "form",
                "br": true,
                "tag": "input",
                "formtype": "text",
                "class": "blank",
                "placeholder": "email",
                "id": "login-email"
            },
            {
                "name": "name",
                "type": "form",
                "br": true,
                "tag": "input",
                "formtype": "password",
                "class": "blank",
                "placeholder": "password",
                "id": "login-password"
            },
            {
                "name": "login",
                "br": true,
                "tag": "input",
                "value": "login",
                "class": "element",
                "type": "form",
                "ishidden": "login",
                "formtype": "submit",
                "id": "login-submit"
            }
        ]
    },
    {
        "tag": "div",
        "secondarytag": "form",
        "element": "element",
        "name": "register",
        "container": "container",
        "animation": "inner inactive",
        "display": "none",
        "caps": "true",
        "href": "#register",
        "align": "center",
        "color": "white",
        "background": "",
        "padding": "1em",
        "id": "register",
        "title": "Register",
        "items": [
            {
                "name": "register",
                "type": "form",
                "tag": "input",
                "formtype": "hidden",
                "br": true,
                "ishidden": "register",
                "value": "register",
                "class": "blank",
                "id": "register-type"
            },
            {
                "name": "name",
                "ishidden": "",
                "class": "blank",
                "br": true,
                "type": "form",
                "tag": "input",
                "formtype": "text",
                "placeholder": "name",
                "id": "register-name"
            },
            {
                "name": "email",
                "ishidden": "",
                "class": "blank",
                "tag": "input",
                "br": true,
                "type": "form",
                "formtype": "email",
                "placeholder": "email",
                "id": "register-email"
            },
            {
                "name": "password",
                "ishidden": "",
                "br": true,
                "type": "form",
                "tag": "input",
                "formtype": "password",
                "placeholder": "password",
                "id": "register-password"
            },
            {
                "name": "register",
                "type": "form",
                "class": "element",
                "tag": "input",
                "br": true,
                "value": "register",
                "formtype": "submit",
                "ishidden": "register",
                "id": "register-submit"
            }
        ]
    },
    {
        "tag": "div",
        "element": "element",
        "name": "dashboard",
        "container": "container",
        "animation": "inner inactive",
        "display": "none",
        "caps": "true",
        "href": "#dashboard",
        "title": "dashboard",
        "description": "manage your sites and account",
        "color": "white",
        "align": "center",
        "background": "",
        "padding": "1em",
        "id": "dashboard",
        "items": [
            {
                "name": "Upgrade to Pro 10",
                "type": "button",
                "tag": "a",
                "href": "#",
                "id": "checkout-button-plan_GUIOtY8S8shSda",
                "background": "#0069ed",
                "hover": "cyan",
                "textcolor": "white",
                "ishidden": "home",
                "value": "home",
                "class": "element",
                "css": ""
            },
            {
                "name": "Upgrade to Pro 30",
                "type": "button",
                "tag": "a",
                "href": "#",
                "id": "checkout-button-plan_GUIkoAioxfTHcx",
                "background": "#0069ed",
                "hover": "cyan",
                "textcolor": "white",
                "ishidden": "home",
                "value": "home",
                "class": "element",
                "css": ""
            },
            {
                "name": "Upgrade to Pro 100",
                "type": "button",
                "tag": "a",
                "href": "#",
                "background": "#0069ed",
                "hover": "cyan",
                "id": "checkout-button-plan_GUInGYzA7Qz43o",
                "textcolor": "white",
                "ishidden": "home",
                "value": "home",
                "class": "element",
                "css": ""
            },
            {
                "name": "Theme 1",
                "href": "https://code.fastur.com/edit?912120bfa38218625d3e8505996f7860",
                "class": "item right",
                "width": "50%",
                "src": "assets/code.fastur.com.png",
                "id": "New-Site",
                "type": "button",
                "tag": "a"
            }
        ]
    },
    {
        "tag": "div",
        "element": "element",
        "name": "terms",
        "display": "none",
        "animation": "inner inactive",
        "container": "container",
        "caps": "true",
        "href": "#terms",
        "color": "white",
        "padding": "1em",
        "type": "page",
        "id": "terms",
        "align": "left",
        "items": [
            {
                "name": "TERMS AND CONDITIONS<br><br>Welcome to Fastur. Fastur Inc. makes Fastur available to the public. This Agreement ('Agreement') is entered between Fastur, Inc. (Company) and you (Customer). <br><br>1.\tSAAS SERVICES AND SUPPORT<br><br>1.1\tSubject to the terms of this Agreement, Company will use commercially reasonable efforts to provide Customer the Services As part of the registration process, Customer will identify an administrative user name and password for Customer's Company account.  Company reserves the right to refuse registration of, or cancel passwords it deems inappropriate.<br><br>1.2\tSubject to the terms hereof, Company will provide Customer with reasonable technical support services in accordance with the Company's standard practices.<br><br>2.\tRESTRICTIONS AND RESPONSIBILITIES<br><br>2.1\tCustomer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services or any software, documentation or data related to the Services ('Software'); modify, translate, or create derivative works based on the Services or any Software (except to the extent expressly permitted by Company or authorized within the Services); use the Services or any Software for timesharing or service bureau purposes or otherwise for the benefit of a third; or remove any proprietary notices or labels. <br><br> 2.2\tCustomer represents, covenants, and warrants that Customer will use the Services only in compliance with Company's standard published policies then in effect (the 'Policy') and all applicable laws and regulations.  [Customer hereby agrees to indemnify and hold harmless Company against any damages, losses, liabilities, settlements and expenses (including without limitation costs and attorneys' fees) in connection with any claim or action that arises from an alleged violation of the foregoing or otherwise from Customer's use of Services. <br><br>2.3\tCustomer shall be responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access or otherwise use the Services, including, without limitation, modems, hardware, servers, software, operating systems, networking, web servers and the like (collectively, 'Equipment').  Customer shall also be responsible for maintaining the security of the Equipment, Customer account, passwords (including but not limited to administrative and user passwords) and files, and for all uses of Customer account or the Equipment with or without Customer's knowledge or consent.<br><br>3.\tCONFIDENTIALITY; PROPRIETARY RIGHTS<br><br>3.1\tEach party (the 'Receiving Party') understands that the other party (the 'Disclosing Party') has disclosed or may disclose business, technical or financial information relating to the Disclosing Party's business (hereinafter referred to as 'Proprietary Information' of the Disclosing Party).  Proprietary Information of Company includes non-public information regarding features, functionality and performance of the Service.  Proprietary Information of Customer includes non-public data provided by Customer to Company to enable the provision of the Services ('Customer Data'). The Receiving Party agrees: (i) to take reasonable precautions to protect such Proprietary Information, and (ii) not to use (except in performance of the Services or as otherwise permitted herein) or divulge to any third person any such Proprietary Information.  The Disclosing Party agrees that the foregoing shall not apply with respect to any information after five (5) years following the disclosure thereof or any information that the Receiving Party can document (a) is or becomes generally available to the public, or (b) was in its possession or known by it prior to receipt from the Disclosing Party, or (c) was rightfully disclosed to it without restriction by a third party, or (d) was independently developed without use of any Proprietary Information of the Disclosing Party or (e) is required to be disclosed by law.  <br><br>3.2\tCompany shall own and retain all right, title and interest in and to (a) the Services and Software, all improvements, enhancements or modifications thereto, (b) any software, applications, inventions or other technology developed in connection with Implementation Services or support, and (c) all intellectual property rights related to any of the foregoing.  <br><br>   3.3\tNotwithstanding anything to the contrary, Company shall have the right to collect and analyze data and other information relating to the provision, use and performance of various aspects of the Services and related systems and technologies (including, without limitation, information concerning Customer Data and data derived therefrom), and  Company will be free (during and after the term hereof) to (i) use such information and data to improve and enhance the Services and for other development, diagnostic and corrective purposes in connection with the Services and other Company offerings, and (ii) disclose such data solely in aggregate or other de-identified form in connection with its business. No rights or licenses are granted except as expressly set forth herein. <br><br> 4.\tPAYMENT OF FEES. <br><br>4.1\tCustomer will pay Company the then applicable fees for the Services and Implementation Services in accordance with the terms therein (the 'Fees').  If Customer's use of the Services exceeds the Service Capacity set forth on the Order Form or otherwise requires the payment of additional fees (per the terms of this Agreement), Customer shall be billed for such usage and Customer agrees to pay the additional fees in the manner provided herein.  Company reserves the right to change the Fees or applicable charges and to institute new charges and Fees at the end of the Initial Service Term or then current renewal term, upon thirty (30) days prior notice to Customer (which may be sent by email). If Customer believes that Company has billed Customer incorrectly, Customer must contact Company no later than 60 days after the closing date on the first billing statement in which the error or problem appeared, in order to receive an adjustment or credit.<br><br>4.2\tCompany may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by Company thirty (30) days after the mailing date of the invoice.  Unpaid amounts are subject to a finance charge of 1.5% per month on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all expenses of collection and may result in immediate termination of Service. Customer shall be responsible for all taxes associated with Services other than U.S. taxes based on Company's net income.<br><br>  5.\tTERM AND TERMINATION<br><br>5.1\tSubject to earlier termination as provided below, this Agreement is for the Initial Service Term and shall be automatically renewed for additional periods of the same duration as the Initial Service Term (collectively, the 'Term'), unless either party requests termination at least thirty (30) days prior to the end of the then-current term.<br><br>5.2\tIn addition to any other remedies it may have, either party may also terminate this Agreement upon thirty (30) days' notice (or without notice in the case of nonpayment), if the other party materially breaches any of the terms or conditions of this Agreement.  Customer will pay in full for the Services up to and including the last day on which the Services are provided.  All sections of this Agreement which by their nature should survive termination will survive termination, including, without limitation, accrued rights to payment, confidentiality obligations, warranty disclaimers, and limitations of liability.<br><br> 6.\tWARRANTY AND DISCLAIMER<br><br>Company shall use reasonable efforts consistent with prevailing industry standards to maintain the Services in a manner which minimizes errors and interruptions in the Services and shall perform the Implementation Services in a professional and workmanlike manner.  Services may be temporarily unavailable for scheduled maintenance or for unscheduled emergency maintenance, either by Company or by third-party providers, or because of other causes beyond Company's reasonable control, but Company shall use reasonable efforts to provide advance notice by e-mail of any scheduled service disruption.  HOWEVER, COMPANY DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR FREE; NOR DOES IT MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES.  EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION, THE SERVICES AND IMPLEMENTATION SERVICES ARE PROVIDED 'AS IS' AND COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.<br><br>7.\tINDEMNITY <br><br>Company shall hold Customer harmless from liability to third parties resulting from infringement by the Service of any United States patent or any copyright or misappropriation of any trade secret, provided Company is promptly notified of any and all threats, claims and proceedings related thereto and given reasonable assistance and the opportunity to assume sole control over defense and settlement; Company will not be responsible for any settlement it does not approve in writing.  The foregoing obligations do not apply with respect to portions or components of the Service (i) not supplied by Company, (ii) made in whole or in part in accordance with Customer specifications, (iii) that are modified after delivery by Company, (iv) combined with other products, processes or materials where the alleged infringement relates to such combination, (v) where Customer continues allegedly infringing activity after being notified thereof or after being informed of modifications that would have avoided the alleged infringement, or (vi) where Customer's use of the Service is not strictly in accordance with this Agreement.  If, due to a claim of infringement, the Services are held by a court of competent jurisdiction to be or are believed by Company to be infringing, Company may, at its option and expense (a) replace or modify the Service to be non-infringing provided that such modification or replacement contains substantially similar features and functionality, (b) obtain for Customer a license to continue using the Service, or (c) if neither of the foregoing is commercially practicable, terminate this Agreement and Customer's rights hereunder and provide Customer a refund of any prepaid, unused fees for the Service.  <br><br>8.\tLIMITATION OF LIABILITY<br><br> NOTWITHSTANDING ANYTHING TO THE CONTRARY, EXCEPT FOR BODILY INJURY OF A PERSON, COMPANY AND ITS SUPPLIERS (INCLUDING BUT NOT LIMITED TO ALL EQUIPMENT AND TECHNOLOGY SUPPLIERS), OFFICERS, AFFILIATES, REPRESENTATIVES, CONTRACTORS AND EMPLOYEES SHALL NOT BE RESPONSIBLE OR LIABLE WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT OR TERMS AND CONDITIONS RELATED THERETO UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHER THEORY: (A) FOR ERROR OR INTERRUPTION OF USE OR FOR LOSS OR INACCURACY OR CORRUPTION OF DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY OR LOSS OF BUSINESS; (B) FOR ANY INDIRECT, EXEMPLARY, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES; (C) FOR ANY MATTER BEYOND COMPANY'S REASONABLE CONTROL; OR (D) FOR ANY AMOUNTS THAT, TOGETHER WITH AMOUNTS ASSOCIATED WITH ALL OTHER CLAIMS, EXCEED THE FEES PAID BY CUSTOMER TO COMPANY FOR THE SERVICES UNDER THIS AGREEMENT IN THE 12 MONTHS PRIOR TO THE ACT THAT GAVE RISE TO THE LIABILITY, IN EACH CASE, WHETHER OR NOT COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. <br><br>9.\tMISCELLANEOUS<br><br>IF IN USE OF THIS SOFTWARE YOU FIND ALIEN YOU AGREE TO ALLOW COMPANY TO OWN ALIEN. If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect and enforceable.  This Agreement is not assignable, transferable or sublicensable by Customer except with Company's prior written consent.  Company may transfer and assign any of its rights and obligations under this Agreement without consent.  This Agreement is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of this Agreement, and that all waivers and modifications must be in a writing signed by both parties, except as otherwise provided herein.  No agency, partnership, joint venture, or employment is created as a result of this Agreement and Customer does not have any authority of any kind to bind Company in any respect whatsoever.  In any action or proceeding to enforce rights under this Agreement, the prevailing party will be entitled to recover costs and attorneys' fees.  All notices under this Agreement will be in writing and will be deemed to have been duly given when received, if personally delivered; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; the day after it is sent, if sent for next day delivery by recognized overnight delivery service; and upon receipt, if sent by certified or registered mail, return receipt requested.  This Agreement shall be governed by the laws of the State of [California] without regard to its conflict of laws provisions.",
                "href": "",
                "class": "subtext",
                "id": "",
                "tag": "p",
                "type": "text"
            }
        ]
    },
    {
        "tag": "div",
        "element": "element",
        "name": "uform",
        "align": "center",
        "display": "block",
        "container": "container",
        "id": "uform",
        "class": "uform",
        "items": [
            {
                "id": "uin",
                "tag": "textarea",
                "class": "input",
                "action": "INPUT",
                "type": "button"
            },
            {
                "href": "#",
                "id": "myBtn",
                "name": "Go",
                "onclick": " lib.subscribe(100)",
                "tag": "a",
                "class": "element",
                "ishidden": "display:block;",
                "type": "button"
            },
            {
                "id": "uform-ul",
                "name": "",
                "edit": "false",
                "tag": "ul",
                "class": "input",
                "top": "calc( 100vh - 200px )",
                "type": "special"
            }
        ]
    }
]

function render(action, elements) {
  if (typeof window !== "undefined") {
    window.lib = {
      actives: ["home"],
      current: [],
      id: 0,
      code: 0,
      cookie: function(e) {
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          if (e == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
          }
        }
        return null;
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
          var val = uin.value;

          fetch("/", { 
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
            type: "show",
            query: val, 
            data:data,
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
          description: "Adventure",
          currency: "cad", 
          amount: amount
        });
      },
      path: function Path(e) {
                var path = [];
                while (e) {
                  path.push(e.className);
                  if (e.tagName === "HTML") {
                    return path;
                  }
                  e = e.parentElement;
                }
              },
      wait: function wait(ms) {
                  var start = new Date().getTime();
                  var end = start;
                  while (end < start + ms) {
                    end = new Date().getTime();
                  }
                },
      location: function location(e) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                    fetch(
                      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                        position.coords.latitude +
                        "," +
                        position.coords.longitude +
                        "2&key=AIzaSyAdH8CrbylVjj7LU-CmLCYABoWyEuHssho"
                    )
                      .then(function(response) {
                        return response.json();
                      })
                      .then(function(myJson) {
                        alert(JSON.stringify(myJson));
                      });
                  });
                },
      dashboard: function () { window.location.href = "/#dashboard"; }

    };
    lib.control = function(e) {
      if (window.location.protocol == 'http:') {window.location = window.location.href.replace(/^http:/, 'https:');
} 
      if (window.location.href == "https://code.fastur.com/code") {
        fetch("/api", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            var CM = CodeMirror(document.body, {
              value: j,
              mode: "javascript",
              lineNumbers: true,
              matchBrackets: true,
              theme: "darcula",
              lineWrapping: true,
              extraKeys: {
                "Ctrl-Q": function(cm) {
                  cm.foldCode(cm.getCursor());
                }
              },
              foldGutter: true,
              gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              highlightSelectionMatches: true
            });
            window.commitpath = "server";
            window.CM = CM;
            var editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.operation(function() {
              for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                editor.foldCode({ line: l, ch: 0 }, null, "fold");
            });
            editor.on("change", function(cm, change) {
              window.changes = 1;
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        
        if(document.getElementById("pagebody")){
        if (pagebody.dataset.editor == "edit") {
          window.commitpath = "editor"; 
          window.CM = {        
            getValue: function(e) {
              return lib.value; 
            },
            setValue: function(e) { 
              lib.value = e;
            }
          };

          document.addEventListener("click",function(event) {
            event.preventDefault();  
            if (document.getElementById(lib.current[0])) {
                  var activated = document.getElementById(lib.current[0]);
                  activated.classList.remove("focused");
                  lib.current = [];
                  lib.current[0] = event.target.id;
              	  if (document.getElementById(event.target.id)){
                  var activated = document.getElementById(event.target.id);
                  activated.classList.add("focused");
                  }  
                } else {
                  if (document.getElementById(event.target.id)){
                  lib.current[0] = event.target.id;
                  var activated = document.getElementById(event.target.id);
                  activated.classList.add("focused");
                  }  
                }
            
            var data = [{ text: "stripeKey+stripeSecret " + event.target.nodeName }  ];
            
            for (var i = 0; i < data.length; i++) {
              uin.placeholder = data[i].text;
            } 
          },true);
          fetch("/api/" + window.location.href.split("edit?")[1] + ".json", {
            method: "get"
          }).then(r => r.text()).then(j => {
              lib.value = JSON.parse(j);
            }).catch(error => {
              console.log(error);
            });
        
        } else {
          var price = Math.floor(Math.random() * 1000 + 1); 
          
          function starthere(){
            
            var agents = localStorage.getItem("agents");
            var agents = JSON.parse(agents); 
            for (var agent in agents){    
              var agency = agents[agent].links
              if (agency){
          document.getElementById("blog").innerHTML += JSON.stringify(agency) + "<br><br>"; 
            }
            }
          }
          starthere()
          var button = document.getElementById("myBtn")
          button.innerHTML = "$1.00 / Question"; 
          
          function draw(x, y, w, h) {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            ctx.fillRect(x, y, w, h);
            
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            //window.location.href=image;
            document.getElementById("theimage").src = image;
          }  

          var i = 0;
          setInterval(function() {
            i = i + 1;

            var x = 0 + i;
            var y = 0 + i;
            var w = 0 + i;
            var h = 0 + i;
            draw(x, y, w, h);
          }, 1000);

          var stripe = Stripe("pk_live_ObaqTuXmpyisKC1YG5PmSwtH");

          var checkoutButton = document.getElementById("checkout-button-plan_GUIOtY8S8shSda");
          checkoutButton.addEventListener("click", function() {
            if (uin.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUIOtY8S8shSda", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled"
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              myBtn.innerHTML = "please enter an email";
              uin.style.outline = "2px solid red";
            }  
          });
          var checkoutButton = document.getElementById("checkout-button-plan_GUInGYzA7Qz43o");
          checkoutButton.addEventListener("click", function() {
            if (uin.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUInGYzA7Qz43o", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled"
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              myBtn.innerHTML = "please enter an email";
              uin.style.outline = "2px solid red";
            }
          });
          var checkoutButton = document.getElementById("checkout-button-plan_GUIkoAioxfTHcx");
          checkoutButton.addEventListener("click", function() {
            if (uin.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUIkoAioxfTHcx", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled"
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              myBtn.innerHTML = "please enter an email";
               uin.style.outline = "2px solid red";
            }
          });  
          
          var array = [];
          array.forEach.call(document.querySelectorAll("a"), function(el) {
            el.addEventListener("click", function() {
              var target = document.getElementById(event.target.innerText);
              if (target) {
                if (event.target.innerText == lib.actives[0]) {
                } else {
                  for (var active of lib.actives) {
                    if (active) {
                      var activated = document.getElementById(active);

                      activated.classList.replace("active", "inactive");
                      setTimeout(function() {
                        activated.style.display = "none";
                      }, 350);
                      lib.actives = [];
                    }
                  }

                  var target = document.getElementById(event.target.innerText);
                  target.style.display = "";
                  setTimeout(function() {
                    target.classList.replace("inactive", "active");
                  }, 750);
                  lib.actives.push(target.id);
                }
              } else {
                window.location = event.target.href;
              }              
              
            });
          });
             
          var count = 0;
          uin.placeholder = "refer";
          uin.addEventListener("keydown", function(event) {
          if (event.defaultPrevented) {
            return;
          }
          switch (event.key) {
            case "ArrowDown":
              count--; 
              console.log(array);
              break;
            case "ArrowUp":
              count++;
              console.log(array[count]);
              break;
            case "ArrowLeft":
              count--;
              console.log(array[count]);
              break;
            case "ArrowRight":
              count++;
              console.log(array[count]);
              break;
            default:
              return;
          }
          event.preventDefault();
        },true);
        }
        } else { 
          //
        }
      
      }

      setInterval(function() {
        if (window.changes == 1) {
          var code = window.CM.getValue();

          var payload = JSON.stringify({
            type: "commit",
            query: code,
            uin: uin.value,
            site: code,
            modifier: window.commitpath,   
            cookie: lib.cookie("fastur")
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
              console.log(result)
            });  
          });   
          window.changes = 0;
        }
      }, 2000);
      window.changes = 0;  

      if (window.location.hash) {
        hashUpdate();
      }
      var hash = window.location.hash.split("#")[1];
      window.onhashchange = hashUpdate(hash);
      function hashUpdate(hash){
        var target = document.getElementById(hash);
        if (target) {
          if (hash == lib.actives[0]) {
          } else {
            for (var active of lib.actives) {
              if (active) {
                var activated = document.getElementById(active);

                activated.classList.replace("active", "inactive");
                setTimeout(function() {
                  activated.style.display = "none";
                }, 350);
                lib.actives = [];
              }
            }

            var target = document.getElementById(hash);
            target.style.display = "";
            setTimeout(function() {
              target.classList.replace("inactive", "active");
            }, 750);
            lib.actives.push(target.id);
          }
        }
      }
      
      fetch("https://code.fastur.com/api/data.json", {
        method: "get",
        mode:"no-cors"  
      }).then(r => r.text()).then(data => {
        localStorage.setItem("agents", data);
        //var results = JSON.parse(data).filter(function(entry) { return entry.publisher === email; }); 
      }).catch(error => {
        console.log(error);
      });   
            
      uin.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          var val = e.target.value;
          //val = val.replace(/(\r\n|\n|\r)/gm, "");
                                               
          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
            type: "show",
            query: val, 
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


          var e = uin.value;
          var url = "https://code.fastur.com/api/"+uin.value+".png";
      
          if (e == "data") {
            fetch("/data", {
              method: "get"
            })
              .then(r => r.text())
              .then(j => {
                window.CM.setValue(j);
                var editor = document.querySelector(".CodeMirror").CodeMirror;
                editor.operation(function() {
                  for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                    editor.foldCode({ line: l, ch: 0 }, null, "fold");
                });

                window.commitpath = "data";
              });
          }
          if (e == "server") {
            fetch("/api", {
              method: "get"
            })
              .then(r => r.text())
              .then(j => {
                window.CM.setValue(j);
                var editor = document.querySelector(".CodeMirror").CodeMirror;
                editor.operation(function() {
                  for (var l = editor.firstLine(); l <= editor.lastLine(); ++l)
                    editor.foldCode({ line: l, ch: 0 }, null, "fold");
                });

                window.commitpath = "server";
              });
          } 
          
          function Math(){            
                var A = [
                  "Math.E",
                  "Math.LN2",
                  "Math.LN10",
                  "Math.LOG2E",
                  "Math.LOG10E",
                  "Math.PI",
                  "Math.SQRT1_2",
                  "Math.SQRT2",
                  "Math.abs",
                  "Math.acos",
                  "Math.acosh",
                  "Math.asin",
                  "Math.asinh",
                  "Math.atan",
                  "Math.atanh",
                  "Math.atan2",
                  "Math(x).cbrt",
                  "Math(x).ceil",
                  "Math(x).clz32",
                  "Math(x).cos",
                  "Math(x).cosh",
                  "Math(x).exp",
                  "Math(x).expm1",
                  "Math(x).floor",
                  "Math(x).fround",
                  "Math(x).hypot",
                  "Math(x).imul",
                  "Math(x).log",
                  "Math(x).log1p",
                  "Math(x).log10",
                  "Math(x).log2(y,x)",
                  "Math(x).max",
                  "Math(x).min",
                  "Math(x).pow",
                  "Math(x).random",
                  "Math(x).round",
                  "Math(x).sign",
                  "Math(x).sin",
                  "Math(x).sinh",
                  "Math(x).sqrt",
                  "Math(x).tan",
                  "Math(x).tanh",
                  "Math(x).toSource",
                  "Math(x).trunc",
                  "path is toronto.ca"
                ];

                var operation = A[0];

                let audioCtx = new AudioContext();

                let osc1 = audioCtx.createOscillator();
                let osc2 = audioCtx.createOscillator();
                let gain1 = audioCtx.createGain();

                let osc3 = audioCtx.createOscillator();
                let osc4 = audioCtx.createOscillator();
                let gain2 = audioCtx.createGain();

                let osc5 = audioCtx.createOscillator();
                let osc6 = audioCtx.createOscillator();
                let gain3 = audioCtx.createGain();

                let masterGain = audioCtx.createGain();

                osc1.frequency.value = 1 * operation;
                osc2.frequency.value = 1.2 * operation;
                gain1.gain.value = 0.5 * operation;

                osc3.frequency.value = 440;
                osc4.frequency.value = 440.33;
                gain2.gain.value = 0.5;

                osc5.frequency.value = 587;
                osc6.frequency.value = 587.25;
                gain3.gain.value = 0.5;

                masterGain.gain.value = 0.5;

                osc1.connect(gain1);
                osc2.connect(gain1);
                gain1.connect(masterGain);

                osc3.connect(gain2);
                osc4.connect(gain2);
                gain2.connect(masterGain);

                osc5.connect(gain3);
                osc6.connect(gain3);
                gain3.connect(masterGain);

                masterGain.connect(audioCtx.destination);

                osc1.start();
                osc2.start();
                osc3.start();
                osc4.start();
                osc5.start();
                osc6.start();
   
                }  
                    
          function camera(audio,video,stop) {
            if (stop){
              localStream.getTracks().forEach(track => {
              track.stop();
            });
            startRecord.disabled = false;
            stopRecord.disabled = true;
            rec.stop() 
          }
            if (navigator.getUserMedia) {
                    navigator.getUserMedia(
                      { audio: true, video: true },
                      function(stream) {
                        window.localStream = stream;
                        var video = document.querySelector("video");
                        video.srcObject = localStream;
                        video.onloadedmetadata = function(e) {
                          video.play();
                        };

                        // Optional frames per second argument.
                        var stream = video.captureStream(25);
                        var recordedChunks = [];

                        console.log(stream);
                        var options = { mimeType: "video/webm; codecs=vp9" };
                        mediaRecorder = new MediaRecorder(stream);

                        mediaRecorder.ondataavailable = handleDataAvailable;
                        mediaRecorder.start();

                        function handleDataAvailable(event) {
                          console.log("data-available");
                          if (event.data.size > 0) {
                            recordedChunks.push(event.data);
                            console.log(recordedChunks);
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
                        console.log(
                          "The following error occurred: " + err.name
                        );
                      }
                    );
                  }              
          }
          camera();
          function talk(q, background) {
            function Speech_Recognition() {
                  var recognition = new webkitSpeechRecognition();
                  recognition.onstart = function(event) {};
                  recognition.onresult = function(event) {
                    for (
                      var i = event.resultIndex;
                      i < event.results.length;
                      ++i
                    ) {
                      var transcript = event.results[i][0].transcript;
                      document.getElementById("uin").value = transcript;
                      lib.menu(transcript);
                    }
                  };
                  recognition.onend = function() {
                    recognition.start();
                  };
                  recognition.start();
                }
                  function Translate(q, background, callback) {
                    
                    var translate_request = new Request("https://www.googleapis.com/language/translate/v2?q=" + q + "&target=" + background + "&key=AIzaSyAg-bBM8onXc5vWvaZ1VG82YslRYFmvgyA",
                      { method: "get" }
                    ); 
                    fetch(translate_request).then(function(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });
                        var Result = JSON.parse(result);
                        var translated_Text = Result.data.translations[0].translatedText;
                        myBtn.innerHTML = translated_Text;
                        var detected_Source_Language = Result.data.translations[0].detectedSourceLanguage;
                        callback(translated_Text,detected_Source_Language,background);
                        return reader.read().then(processResult);
                      });  
                    });
                  }
                  function get_response(q, detected_Source_Language, callback) {
                    var intent_request = new Request(
                      "https://api.api.ai/v1/query?v=20150910",
                      {
                        method: "POST",
                        mode: "cors",
                        redirect: "follow",
                        headers: {
                          Authorization:
                            "Bearer 21f6a5778d484870ad46be4d34ac2eeb",
                          "content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify({
                          q: q,
                          lang: "en",
                          sessionId: "44628d21-d7a4-47d5-b1c6-a7f851be65fv"
                        })
                      }
                    );
                    fetch(intent_request).then(function(response) {
                      Respond(response);
                    });

                    function Respond(response) {
                      var decoder = new TextDecoder();
                      var reader = response.body.getReader();
                      reader.read().then(function processResult(result) {
                        if (result.done) return;
                        var result = decoder.decode(result.value, {
                          stream: true
                        });
                        var Result = JSON.parse(result);
                        var string = JSON.stringify(Result);
 
                        var speech = Result.result.fulfillment.speech;
                        myBtn.innerHTML += speech; 
                        Translate(speech,detected_Source_Language,print_to_user);
                        return reader.read().then(processResult);
                      });
                    }
                  }
                  function print_to_user(translated_Text,detected_Source_Language,background) {
                    console.log(translated_Text);
                    var msg = new SpeechSynthesisUtterance(translated_Text)
                    msg.lang = background;
                    window.speechSynthesis.speak(msg);
                    msg.onend = function(event) {
                      //Speech_Recognition();
                    };
                  }
            	  Translate(q, "en", get_response);
                }
          talk(e);  
          
          lib.wait(6000)    
          function annotate(image_uri) {
                  image_uri = image_uri;

                  function Respond(response) {
                    var decoder = new TextDecoder();
                    var reader = response.body.getReader();
                    reader.read().then(function processResult(result) {
                      if (result.done) return;
                      var result = decoder.decode(result.value, {
                        stream: true
                      });
                      
                      console.log(result) 

                      return reader.read().then(processResult);
                    });
                  }
                  fetch(
                    "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAg-bBM8onXc5vWvaZ1VG82YslRYFmvgyA",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        requests: [
                          {
                            image: {
                              source:{
                              imageUri: image_uri
                              }
                            }, 
                            features: [
                              {
                                type: "FACE_DETECTION",
                                type: "LABEL_DETECTION",
                                type: "LANDMARK_DETECTION",
                                type: "LOGO_DETECTION",
                                type: "LABEL_DETECTION",
                                type: "TEXT_DETECTION",
                                type: "DOCUMENT_TEXT_DETECTION",
                                type: "SAFE_SEARCH_DETECTION",
                                type: "IMAGE_PROPERTIES",
                                type: "CROP_HINTS",
                                type: "WEB_DETECTION"
                              }
                            ]
                          }
                        ]
                      })
                    }
                  ).then(function(response) {
                    Respond(response);
                  });
                }    
          annotate(url);
          
          function video() {
            var video = document.querySelector("video"),canvas;

            var img = document.querySelector("img") || document.createElement("img");
            var context;
            var width = video.offsetWidth;
            var height = video.offsetHeight;

            canvas = canvas || document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, width, height);

            canvas.toBlob(function(blob) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              var base64data = reader.result.split(",")[1];
              annotate(base64data);
            };

            var img = document.createElement("img"),url = URL.createObjectURL(blob);

            img.onload = function() {
              URL.revokeObjectURL(url);
            };
            img.src = url;
              
            var posts = document.getElementById("image").appendChild(img);
            var uploadTask = storageRef.child("images/" + blob.name).put(blob).then(function(snapshot) {
            var url = snapshot.metadata.downloadURLs[0];
            }).catch(function(error) {
             console.error("Upload failed:", error);
            });
            });
            
            var video = document.getElementById("video01");
            var sources = video.getElementsByTagName("video");
            sources[0].src = string;

            document.getElementById("video").addEventListener("click", target);
            function target() {
              //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
              //https://cdn.glitch.com/412c4803-c1a3-49a4-aeae-c706ddbaba4b%2Fm6-site-planning-guide.pdf?1513539752093
                    function load(agent) {
                      var price = Math.floor(Math.random() * 10000 + 1);
                      var name = agent.name.toLowerCase();
                      var first_name = name.split(" ")[0];
                      var last_name = name.split(" ")[1];
                      var first_initial = first_name.split("")[0];
                      agent.email =
                        first_initial + last_name + "@bosleyrealestate.com";
                      agent.site = first_initial + last_name + ".fastur.com";

                      document.getElementById("stdout").innerHTML =
                        agent.title +
                        "<br>" +
                        agent.office +
                        "<br>" +
                        agent.email +
                        "<br>" +
                        agent.site +
                        "<br>" +
                        agent.phone +
                        "<br>" +
                        "<a onclick='return subscribe(" +
                        price +
                        "00);' >Subscribe for just <mark id='mark'>$" +
                        price +
                        " / year</mark></a></p> ";
                      var time_limit = new Date(
                        "Dec 28, 2017 24:00:00"
                      ).getTime();
                      var x = setInterval(function() {
                        var now = new Date().getTime();
                        var distance = time_limit - now;
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor(
                          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                        );
                        var minutes = Math.floor(
                          (distance % (1000 * 60 * 60)) / (1000 * 60)
                        );
                        var seconds = Math.floor(
                          (distance % (1000 * 60)) / 1000
                        );
                        document.getElementById("major").innerHTML =
                          days +
                          "d " +
                          hours +
                          "h " +
                          minutes +
                          "m " +
                          seconds +
                          "s ";
                        if (distance < 0) {
                          clearInterval(x);
                          document.getElementById("major").innerHTML =
                            "EXPIRED";
                        }
                      }, 1000);
                    }
                    var agents = JSON.parse();
                    var real = Math.floor(Math.random() * 10 + 1);
                    load(agents[real]);
                  }
            function subscribe(amount) {
                    StripeCheckout.configure({
                      key: "pk_live_mdufsEUxVMK742qsZEJz4keg",
                      image:
                        "https://s3.amazonaws.com/stripe-uploads/acct_15mFAPBHEFYVkz22merchant-icon-1463599844790-pilot.png",
                      locale: "auto",
                      token: function(token) {
                        var data = new FormData();
                        data.append("json", JSON.stringify(token));

                        fetch("/", {
                          method: "post",
                          mode: "no-cors",
                          body: data
                        }).then(function(response) {});
                      }
                    }).open({
                      name: "Untitled",
                      description: "Security",
                      currency: "usd",
                      amount: amount
                    });
                  }
                }
          //video(); 
        }
      });
      
      document.getElementsByTagName("HTML")[0].setAttribute("id", "page");
      function handTouch(){
      document.addEventListener(
        "touchmove",
        function(event) {
          //event.preventDefault();
        },
        true
      );
      document.addEventListener(
        "touchstart",
        function(event) {
          //event.preventDefault();
        },
        true
      );
      document.addEventListener(
        "touchmove",
        function(event) {
          //event.preventDefault();
        },
        true
      );
      document.addEventListener(
        "touchend",
        function(event) {
          //event.preventDefault();
        },
        true
      );
      document.addEventListener(
        "touchcancel",
        function(event) {
          //event.preventDefault();
        },
        true
      );
}
      
      var contents = document.querySelectorAll("[contenteditable=true]");
      [].forEach.call(contents, function(content) {
        content.addEventListener("focus", function() {
          content.setAttribute("data-in", content.innerHTML);
        });
        content.addEventListener("blur", function() {
          if (content.getAttribute("data-in") !== content.innerHTML) {
            var elements = window.CM.getValue(); 
            
            var a = lib.typed || [];
            a.push({
              id: content.id,
              time: Date.now(),
              value: content.innerHTML
            });
            lib.typed = a; 
            
            var latest = [];
               
            for (var i in lib.typed) {
                    var id = lib.typed[i].id;
                    var time = lib.typed[i].time;

                    if (latest[id]) {
                      if (latest[id].time < time) {
                        latest[id] = lib.typed[i];
                      }
                    } else {
                      latest[id] = lib.typed[i];
                    }
                  } 
            for (var i in latest) {
              var val = latest[i].value;
              var id = latest[i].id;

              //add logic for top level ID's
              for (var el in elements) {
                      var items = elements[el].items;

                      for (var item in items) {
                        if (items[item].id == id) {
                          items[item].name = val;
                        }
                      }
                    }
            }
            
            window.CM.setValue(elements);
            if (uin.value){
              window.changes = 1;
            } else {
               
              myBtn.innerHTML = "Name at least 3 letters";
              uin.style.outline = "2px solid red";
            } 
          }
        });
        content.addEventListener("dragstart", function(e) {
          e.preventDefault();
        });
        content.addEventListener("dragover", function(e) {
          e.preventDefault();
        });
        content.addEventListener("drop", function(e) {
          e.preventDefault();
        });
        content.addEventListener("mousemove", function(e) {
          var position = e.pageX + " " + e.pageY + " " + new Date().getTime();
        });
        content.addEventListener("click", function(e) {
          e.preventDefault();
        });
      });
    };
    lib.control();
  }

var body = ""; var t = ""; var d = ""; var num = 0; var cssd = "";
  for (var element in elements) {
var b = elements[element]; var data = ""; var form = ""; var _break; var items = b.items; var gaid = b.gaid; var br = ""; num = num + 1;

    if (action == "edit") {
      b.display = "block";
      b.isdrag = "true";
      b._break =
        "<div id='break-" +
        b.id +
        "' draggable='true' class='strike'> <span id='break-" +
        b.id +
        "'>#" +
        b.id +
        "</span> </div>";
    }
    if (action == "edit" && b.animation == "inner inactive") {
      b.animation = "inner active";
    }
    if (b.class == "inner inactive") {
      b.animation = "inner active";
    }

    for (var item in items) {
      var c = items[item];
      var text = "";      var btn = "";      var inp = "";      var image = ""; 

      if (action == "edit") {
        c.top = "0";
        c.edit = 'true'; 
      }
      if (c.type == "body") {
        cssd += ` 
@media only screen and(max-width: 400px) {
      body { 
  overscroll-behavior: none;

          background-color: ${c.mobile};
      }
  }
   
  @media only screen and (min-width: 401px) and (max-width: 960px) {
      body {
  overscroll-behavior: none;

          background-color: ${c.tablet};
      } 
  }    
 
  @media only screen and (min-width: 961px) { 
      body { 
  overscroll-behavior: none;

          background-color: ${c.desktop}; 
      }
  }  


  body {  
	  overflow-y:hidden
   	  touch-action: none;
  	  overscroll-behavior: none;
      min-width: $ {
          (colWidth+colSpace) * colNum
      }
      px;
      font-family: Arial,
      Helvetica,
      sans-serif;
      margin-top: var (--space);
      margin: auto;
      top: 25px;
      right: 0;
      bottom: 0; 
      left: 0;
  width: ${c.width};
      border-radius: 3px; 
      opacity:1;
      animation: fadein 1s;
      background-image: ${c.background};
	  /* height: 25%; width: 75%; parallax effect */ 
	  background-attachment: fixed;
      background-position: center; 
      background-size:  100% 100%;
  }


  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  }  



      .strike {
          display: block;
          text-align: center;
          overflow: hidden;
          white-space: nowrap; 
      }

      .strike > span {
          position: relative;
          display: inline-block;
      }

      .strike > span:before,
      .strike > span:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 9999px;
          height: 1px;
          background: red;
      }

      .strike > span:before {
          right: 100%;
          margin-right: 15px;
      }

      .strike > span:after {
          left: 100%;
          margin-left: 15px;
      }


  span[draggable=true]:hover {
      outline: 1px dashed blue;
  }
  div[draggable=true]:hover {
      outline: 1px dashed blue;
  } 
  .fill { 
    cursor: pointer;
  }
  .droptarget {
    background-color: #f4f4f4;
    border-style: dashed;
   }
  .hold {
    border: 4px green solid;
  }
  .hovered {
    border-bottom: 4px green solid;

  }
  .focused {
    border:2px solid red;

  }
  .invisible {
    display: none;
  }

  [contenteditable]:focus {
      outline: 0px solid transparent;
  } 
  input {
      display: inline-block;
      box-sizing: border-box;
      outline: none;
      border: 1px solid lightgray;
      border-radius: 3px;
      padding: 10px;
      transition: all 0.1s ease-out;
      opacity: .85;
      margin: 5px; 
  }

  textarea {
      width: 100%;
      min-width: 50px; 
      border: none;
      opacity: .5;
      overflow: auto;
      outline: none;
      -webkit-box-sizing: none;
      -moz-box-sizing: none;
      box-sizing: none;
      border-radius: 20px;
      margin-top: 10px;
  } 
  div {
      padding-top: 5px;
      padding-right: 5px;
      padding-bottom: 5px;
      padding-left: 5px;
      transition: all 0.5s linear;
  }  
  p {
      padding: 5px; 
	  margin: 5px; 
      transition: all 0.5s linear;
  }  

  .inner {
       background: #ffffff3d;
      border-radius: 10px;
      margin: 15px;
      text-decoration: none;
  }

  @-webkit-keyframes sk-scaleout {
      0% {
          -webkit-transform: scale(0)
      }
      100% {
          -webkit-transform: scale(1.0);
          opacity: 0;
      }
  }
  @keyframes sk-scaleout {
      0% {
          -webkit-transform: scale(0);
          transform: scale(0);
      }
      100% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
          opacity: 0;
      }
  }
  @keyframes fade {
      0% {
          opacity: 0;
      }
      66% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
  .fade {
      transition: opacity 0.7s linear;
  }
  .inactive {
      opacity: 0;
  }
  .active { 
      opacity: 1;
  }
 
#color-label {
  margin-left: 1px;
  position: absolute;
  height: 30px;
  width: 50px;
}  
#color-picker-no {
  background-color: white; 
  border: solid 1px #ccc;
}
canvas:hover {
  cursor: crosshair;
}
.container { 
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* fraction*/
}
.dimension {
  display: grid;
  grid-template-columns: 1fr 1fr; /* fraction*/ 
}

.dimension input {
width: 80px;    
padding: 5px 5px 5px 5px;

}
a {
  position: relative;
}
a::after {
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} 
a > svg {
  pointer-events: none;
}  
  `;
      }
      if (c.type == "html") {
        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      }
      if (c.type == "image") {
        image +=
          "<" +
          c.tag +
          "  id='" +
          c.id +
          "' class='" +
          c.class +
          "' width='" +
          c.width +
          "' height='" +
          c.height +
          "'   src='" +
          c.src +
          "'></" +
          c.tag +
          ">";
        cssd += ` 

  #${c.id} {  
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor}; 
    border-radius: 5px;
    opacity: 0.8;
  }    

  `;
      }
      if (c.type == "imaged") {  
        image +=
          "<div class='device-collection'>  <div id='device-desktop' class='device desktop'> <br><canvas style='display:none' id='canvas' width='300' height='300'></canvas><img id='theimage' /></div></div>";
        cssd += ` 
  
  #${c.id} {   
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor}; 
  } 
  
.device {
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  box-shadow: inset 0 4px 7px 1px #fff,
    inset 0 -5px 20px rgba(173, 186, 204, .25),
    0 2px 6px rgba(0, 21, 64, .14),
    0 10px 20px rgba(0, 21, 64, .05);
} 
.device img {
  width: 100%;
  border-radius: 4px;
  
}

.device::before,
.device::after {
  content: "";
  display: block;
  position: absolute;
  background: #fff;
  box-shadow: inset 0 4px 7px 1px #fff,
    inset 0 -5px 20px rgba(173, 186, 204, .25),
    0 2px 6px rgba(0, 21, 64, .14),
    0 10px 20px rgba(0, 21, 64, .05);
}
 

// Desktop arm
.desktop::before {
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -18%;
  width: 20%;
  height: 20%;
  background: #fafafa;
  z-index: -1;
}

// Bottom of desktop stand
.desktop::after {
  border-radius: 4px 4px 24px 24px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -19.5%;
  width: 34%;
  height: 2%;
}

// Phone, tablet, and desktop together
.device-collection {
  width: 100%;
  position: relative;
}

.device-collection::after {
  content: "";
  display: block;
  padding-top: 62.75%;
}
  
.device-collection .desktop {
  left: 0;
  right: 0;
  margin: 0 5% 10.25%;
  height: 75%; 
  top:33%;  
}  
  `;
      } 
      if (c.type == "input") {
        inp +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' data-action='" +
          c.action +
          "' class='" +
          c.class +
          "' contenteditable='" +
          c.edit +
          "'  type='" +
          c.formtype +
          "' style='" +
          c.ishidden +
          "' placeholder='" +
          c.placeholder +
          "' " +
          (c.disabled || "") +
          "></" +
          c.tag +
          ">";
        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      }
      if (c.type == "button") {
        btn +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' data-action='" +
          c.action +
          "' onclick='" +
          c.onclick +
          "' class='" +
          c.class +
          "' contenteditable='" +
          c.edit +
          "' autocomplete='" +
          (c.ac || "off") +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
      border-radius: 2.5px;
      display: inline-block;
      border: none;
      margin: 10px;
      text-decoration: none;
      font-family: sans-serif;
      font-size: 1rem;
      cursor: pointer;
      transition: background 250ms ease-in-out, transform 150ms ease;
      appearance: none;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      outline: 1px solid #0069ed;
  } 

  #${c.id}:hover {
  background-color:  ${c.hover};  
  }
  
  #${c.id}:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }

  #${c.id}:active {
      transform: scale(0.99);
  }

  `;
      } 
      if (c.type == "special") {
        btn +=
          "<" +
          c.tag +
          " data-action='" +
          "INPUT" +
          "'id='" +
          c.id +
          "' class='" +
          c.class +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 

  #${c.id} {     
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

#uform-ul {   
    list-style-type: none;
    opacity: .85;
    cursor: pointer;
    padding: 0; 
    margin: 0;
  }

  #uform-ul li a { 
    background-color: #fdfdfd;  
    padding: 5px; 
    text-decoration: none;  
    color: black;  
    display: block; 
  }
  #uform-ul li a:hover {
    background-color: #3d3d3d;  
    padding: 5px; 
    text-decoration: none;  
    color: white;  
    display: block; 
  }

  .uform { 
      position: fixed;
      right: 0;
      top: ${c.top};    
      padding: 25px;
   z-index: 10; 
  }  

  `;
      }
      if (c.type == "text") {
        text +=
          "<" +
          c.tag +
          " id='" +
          c.id +
          "' class='" +
          c.class +
          "' draggable='" +
          c.drag +
          "' contenteditable='" +
          c.edit +
          "' style='" +
          c.ishidden +
          "' href='" +
          c.href +
          "' " +
          (c.disabled || "") +
          ">" +
          (c.name || "") +
          "</" +
          c.tag +
          ">";

        cssd += ` 
  #${c.id} { 
    text-align: ${c.align}; 
	background-color:${c.background}; 
	color:${c.textcolor};
	height:${c.height};  
    font-size: ${c.size}; 
    display: ${c.display};
    font-family: ${c.family}; 
    font-weight: ${c.weight};
  }

  `;
      }
      if (c.type == "form") {
        form +=
          "<" +
          (c.tag || "div") +
          " id='" +
          c.id +
          "' name=" +
          c.name +
          "'  class='" +
          c.class +
          "' type='" +
          c.formtype +
          "' value='" +
          (c.value || "") +
          "'  style='" +
          c.ishidden +
          "' placeholder='" +
          c.placeholder +
          "'>" +
          br;

        cssd += ` 

  #${c.id} { 
    text-align: ${c.align};
	background-color:${c.background}; 
	color:${c.textcolor};
  } 

  `;
      } else {
        data += image || btn || inp || text;
      }
    }

      cssd += ` #${b.id} { text-align: ${b.align}; background-color:${b.background}; outline: ${b.outline}; draggable: ${b.isdrag};
  } 

  `;

    if (num == 1) {
      t = "<title>" + b.title + "</title>";
      d = "<meta name='description' content='" + b.description + "'>";
    }

    var isform = "";
    if (b.secondarytag == "form") {
      if (action == "edit") {
        b.drag = "true";
      }

      isform +=
        "<" +
        (b.secondarytag || "div") +
        " " +
        (b.secondaryp || "") +
        " draggable='" +
        b.drag +
        "'  id='form-" +
        b.id +
        "' >" +
        (form || "") +
        "</" +
        (b.secondarytag || "div") +
        ">";
    } 

    body += (b._break || "") + "<" + b.tag + " id='" + b.id + "' style=' display:" + b.display + "' class='" + (b.class || b.animation) + "' data-action='1'>" + (isform || "") + (data || "") + "</" + (b.tag || "") + ">";
    
  }
  if (action == "client") {
    var standard = body;
  } else {
    var standard =
      "<!DOCTYPE html id='page'><head><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'>" + t + d + "<style>" + cssd + "</style><link type='image/png' rel='shortcut icon' href='api/ico.png'></head><body id='pagebody' data-editor='" + action + "'>" + body + "</body><script src='https://checkout.stripe.com/checkout.js'></script><script src='https://js.stripe.com/v3'></script><script src='https://code.fastur.com/api2'></script><script>render()</script></html>"; 
  }
  return standard;   
}

var server = require("http")
  .createServer(function(request, response) { 
    if (request.method == "GET") {
      var json = require("fs").readFileSync("./api/analytics.json", "utf8");
      try {
        var json = JSON.parse(json);
      } catch (e) {
        //rebuild from backup notify
        var json = [];
      }
      json.push({
        url: request.url,
        domain: request.headers.host,
        time: Date.now(),
        ip: request.headers["x-real-ip"]
      });
      require("fs").writeFileSync("./api/analytics.json", JSON.stringify(json));

      function parseCookies(request) {
        var list = {},
          rc = request.headers.cookie;
        rc &&
          rc.split(";").forEach(function(cookie) {
            var parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURI(parts.join("="));
          });
        return list;
      }
      var cookies = parseCookies(request);
      if (request.url == "/favicon.ico") {
        response.end("");
      }
      if (request.url == "/api/codemirror.css") {
        response.writeHead(200, {
          "Content-Type": "css"
        }); 
        var data = require("fs").readFileSync("./api/codemirror.css");
        response.end(data);
      }
      if (request.url == "/api/codemirror.js") {
        var data = require("fs").readFileSync("./api/codemirror.js");
        response.end(data);
      }

      if (request.url == "/code") {
        if (cookies.fastur) {
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
            "Set-Cookie":
              "fastur=" +
              require("crypto")
                .randomBytes(16)
                .toString("hex")
          });
        }
        var data = require("fs").readFileSync("./api/index.html");
        response.end(data);
      }
      if (request.url == "/data") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync(
          "./api/912120bfa38218625d3e8505996f7860.json"
        );
        response.end(data);
      }
      if (request.url == "/api") { 
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./index2.js");
        response.end(data);
      }
      if (request.url == "/api2") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./index2.js", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/frames.html") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/912120bfa38218625d3e8505996f7860.html");
        response.end(data);
      }
      if (request.url == "/logout") {
        response.writeHead(200, {
          "Set-Cookie":
            "fastur=" +
            require("crypto")
              .randomBytes(16)
              .toString("hex") +
            "; " +
            "expires=" +
            new Date(new Date().getTime() + 86409000).toUTCString()
        });
        var html = require("fs").readFileSync(
          "/home/ubuntu/api/frames.html",
          "utf8"
        );
        response.end(html);
      }

      if (request.url == "/") {
        if (cookies.fastur) {
        } else {
          response.writeHead(200, {
            "Set-Cookie":
              "fastur=" +
              require("crypto")
                .randomBytes(16)
                .toString("hex") +
              "; " +
              "expires=" +
              new Date(new Date().getTime() + 86409000).toUTCString()
          });
        }
        var html = require("fs").readFileSync(
          "./api/frames.html",
          "utf8"
        );
        response.end(html);
      }
      if (request.url.split("?")[1] && request.url.split("?")[1].length == 32) {
        var id = request.url.split("?")[1];

        if (typeof id !== "undefined") {
          var elements = require("fs").readFileSync(
            "/home/ubuntu/api/" + id + ".json"
          );
          var elements = JSON.parse(elements);
        }
        if (typeof elements !== "object") {
          var elements = JSON.parse(elements);
        }

        var html = render("edit", elements);
        response.end(html);
      } else {
        if (require("fs").existsSync(__dirname + "/api/" + request.url.split("/")[2])) { 
          var img = require("fs").readFileSync(__dirname + "/api/" + request.url.split("/")[2]) || null; 
        }  
        response.end(img);
      }
    }
    if (request.method == "POST") {
      var buffer = [];
      var dt = "";
      var fin = 0;
      request.on("error", function(err) {}).on("data", function(chunk) {
          buffer.push(chunk);
        }).on("end", function() {
          fin = 1;
        });
      var refreshId = setInterval(function() {
        if (fin == 1) { 
          var string = Buffer.concat(buffer).toString();
          function is_json(str) {
            try {
              JSON.parse(str);
            } catch (e) {
              return false;
            }
            return true;
          }
          if (is_json(string)) {
            var object = JSON.parse(string);
            switch (object.type) {

              case "show": { 
                var q = object.query;
                console.log(object.data)

                var json = require("fs").readFileSync("./api/analytics.json","utf8");
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }
                json.push({
                  q: q,
                  url: request.url,
                  domain: request.headers.host,
                  time: Date.now(),
                  ip: request.headers["x-real-ip"]
                });
                require("fs").writeFileSync("./api/analytics.json",JSON.stringify(json));

                async function puppet(url, input, q, waitFor, links) {
                  const fs = require("fs");
                  const puppeteer = require("puppeteer");
                  const path = require("path");
                  try {
                    const browser = await puppeteer.launch({
                      args: ["--no-sandbox"]
                    });
                    const page = await browser.newPage();
                    await page.goto(url);
                    await page.type(input, q);

                    page.keyboard.press("Enter");
                    await page.waitForSelector(waitFor);

                    function getText(linkText) {
                      linkText = linkText.replace(/\r\n|\r/g, "\n");
                      linkText = linkText.replace(/\ +/g, " ");

                      // Replace &nbsp; with a space
                      var nbspPattern = new RegExp(
                        String.fromCharCode(160),
                        "g"
                      );
                      return linkText.replace(nbspPattern, " ");
                    }

                    var Links = [];
                    if (links) {
                      const links = await page.$$("div.r");
                      for (var i = 0; i < links.length; i++) {
                        let valueHandle = await links[i].getProperty(
                          "innerText"
                        );
                        let linkText = await valueHandle.jsonValue();
                        const text = getText(linkText);
                        console.log(linkText);
                        Links.push(linkText);
                        if (q == text) {
                          console.log("Found " + text);
                          await links[i].click();
                        }
                      }
                    }
                    var data = require("fs").readFileSync("/home/ubuntu/api/data.json", "utf8");
                    var json = JSON.parse(data);   

                    var result = JSON.parse(data).find(obj => {
                      return obj.query === q;
                    });

                    if (result) {
                      console.log(result);
                    } else {
                      json.push({
                        query: q,  
                        screenshot: 'https://code.fastur.com/'+q.replace(/\W+/g, '-').toLowerCase()+'.png',
                        links: Links,
                        time: Date.now()
                      }); 
                      require("fs").writeFileSync("/home/ubuntu/api/data.json",JSON.stringify(json));
                    }

                    await page.setViewport({
                      width: 800,
                      height: 1000
                    });
                    await page.screenshot({ 
                      path: path.join(__dirname, "/api/" + q.replace(/\W+/g, '-').toLowerCase() + ".png")
                    });
                    await browser.close();
                  } catch (error) {
                    console.log(error);
                  }
                }
                puppet("https://google.com","input.gLFyf.gsfi",q,"div#resultStats","links");
 
                var data = require("fs").readFileSync("/home/ubuntu/api/data.json","utf8");  
                
                var q = JSON.parse(data).pop()
                
                if (q == "subscription") {
                  function subscription($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.create(
                      {
                        customer: $.customer,
                        plan: $.plan
                      },
                      function(err, subscription) {}
                    );
                  }
                }
                if (q == "charge") {
                  function charge($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).charges.create(
                      {
                        amount: 100,
                        currency: "usd",
                        description: "connection",
                        source: token
                      },
                      function(err, charge) {
                        one(err, charge);
                      }
                    );
                  }
                  charge($)
                }
                if (q == "plan") {
                  function plan($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).plans.create(
                      {
                        amount: 5000,
                        interval: "month",
                        name: "Silver corporate",
                        currency: "cad",
                        id: "silver-corporate"
                      },
                      function(err, plan) {
                        // asynchronously called
                      }
                    );
                  }
                }
                if (q == "plan_delete") {
                  function _delete($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.del($.subscription, function(
                      err,
                      confirmation
                    ) {});
                  }
                }
                if (q == "update") {
                  function update($) {
                    require("stripe")(
                      "sk_live_8Lr82XvF2M4JAg6i5Qd7mKU1"
                    ).subscriptions.update(
                      $._old,
                      {
                        plan: $._new
                      },
                      function(err, subscription) {}
                    );
                  }
                }

                if (q == "email") {
                  function retrieve_email($) {
                    var AWS = require("aws-sdk");
                    AWS.config.update({
                      accessKeyId: " AKIASS565J2QPMK5C4F6",
                      secretAccessKey:
                        "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",
                      region: "us-west-2",
                      apiVersions: {
                        s3: "2006-03-01",
                        ses: "2010-12-01",
                        route53domains: "2014-05-15",
                        cloudfront: "2017-03-25",
                        route53: "2013-04-01"
                      }
                    });
                    var s3 = new AWS.S3();
                    var params = {
                      Bucket: "fastur.mail",
                      MaxKeys: "10"
                    };
                    s3.listObjects(params, function(err, data) {
                      if (err) {
                        console.log(err, err.stack);
                        ws.send(JSON.stringify(err));
                      } else {
                        var Contentsdata = data.Contents;
                        for (var i in Contentsdata) {
                          s3.getObject(
                            {
                              Bucket: data.Name,
                              Key: Contentsdata[i].Key
                            },
                            function(err, data) {
                              if (err) {
                                console.log(err, err.stack);
                                ws.send(JSON.stringify(err));
                              } else {
                                const simpleParser = require("mailparser")
                                  .simpleParser;

                                var Body = data.Body.toString("utf-8");
                                var modified = data.LastModified;
                                simpleParser(Body, (err, parsed) => {
                                  console.log(parsed.html);
                                  console.log(modified);
                                  ws.send(
                                    JSON.stringify({
                                      type: "error",
                                      data: parsed.html,
                                      date: modified
                                    })
                                  );
                                });
                              }
                            }
                          );
                        }
                      }
                    });
                  }
                  retrieve_email($);

                  function send_email($) {
                    var AWS = require("aws-sdk");
                    AWS.config.update({
                      accessKeyId: process.env.accessKeyId,
                      secretAccessKey: process.env.secretAccessKey,
                      region: "us-west-2",
                      apiVersions: {
                        s3: "2006-03-01",
                        ses: "2010-12-01",
                        route53domains: "2014-05-15",
                        cloudfront: "2017-03-25",
                        route53: "2013-04-01"
                      }
                    });
                    var ses = new AWS.SES();
                    const params = {
                      Destination: {
                        ToAddresses: [email]
                      },
                      Message: {
                        Body: {
                          Html: {
                            Charset: "UTF-8",
                            Data: "https://aisafetyceo.com"
                          },
                          Text: {
                            Charset: "UTF-8",
                            Data: "https://aisafetyceo.com"
                          }
                        },
                        Subject: {
                          Charset: "UTF-8",
                          Data: "Hey, you hurt my feelings."
                        }
                      },
                      ReturnPath: "assist@fastur.com",
                      Source: "assist@fastur.com"
                    };
                    ses.sendEmail(params, (err, data) => {
                      if (err) console.log(err);
                      else console.log("message sent to " + email);
                      append("outbox", " " + email);
                    });
                  }
                } 
                if (q == "analytics") {
                  var json = require("fs").readFileSync(
                    "./api/analytics.json",
                    "utf8"
                  );
                  try {
                    var json = JSON.parse(json);
                  } catch (e) {
                    //rebuild from backup notify
                    var json = [];
                  }
                  var total = json.length;
                  console.log(json[0]);
                  response.end(total + " page views/requests");
                }              
                
                function twitter_post($) {
                  var Twitter = require("twitter");
                  var client = new Twitter({
                    consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
                    consumer_secret:
                      "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
                    access_token_key:
                      "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
                    access_token_secret:
                      "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
                  });
                  client.post(
                    "statuses/update",
                    {
                      status: $
                    },
                    function(err, t, r) {
                      if (!err) {
                        console.log(t + r);
                      }
                    }
                  );
                  console.log("Menu sent");
                } 
                //twitter_post(q)
                function twitter_search($) {
                  var Twitter = require("twitter");
                  var client = new Twitter({
                    consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
                    consumer_secret:
                      "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
                    access_token_key:
                      "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
                    access_token_secret:
                      "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG"
                  });
                  client.get(
                    "search/tweets",
                    {
                      q: $
                    },
                    function(err, t, r) {
                      var date = new Date()
                        .toISOString()
                        .replace(/T/, " ")
                        .replace(/\..+/, "");

                      var arr = [];
                      for (var y = 0; y < t.statuses.length; y++) {
                        arr.push({
                          name: t.statuses[y].user.screen_name,
                          date: t.statuses[y].created_at,
                          text: t.statuses[y].text,
                          url: t.statuses[y].user.url
                        });
                      }
                      console.log(arr);
                    }
                  );
                }
                //twitter_search('jobs')
                function twitter_gif_post() {
                  var bufferLength,
                    filePath,
                    finished,
                    fs,
                    oauthCredentials,
                    offset,
                    request,
                    segment_index,
                    theBuffer;

                  request = require("request");
                  fs = require("fs");
                  filePath = "/thevideo.mp4";
                  bufferLength = 1000000;
                  theBuffer = new Buffer(bufferLength);
                  offset = 0;
                  segment_index = 0;
                  finished = 0;
                  oauthCredentials = {
                    consumer_key: "",
                    consumer_secret: "",
                    token: "",
                    token_secret: ""
                  };

                  fs.stat(filePath, function(err, stats) {
                    var formData, normalAppendCallback, options;

                    formData = {
                      command: "INIT",
                      media_type: "video/mp4",
                      total_bytes: stats.size
                    };
                    options = {
                      url: "https://upload.twitter.com/1.1/media/upload.json",
                      oauth: oauthCredentials,
                      formData: formData
                    };

                    normalAppendCallback = function(media_id) {
                      return function(err, response, body) {
                        finished++;
                        if (finished === segment_index) {
                          options.formData = {
                            command: "FINALIZE",
                            media_id: media_id
                          };
                          request.post(options, function(err, response, body) {
                            console.log("FINALIZED", response.statusCode, body);

                            delete options.formData;

                            //Note: This is not working as expected yet.
                            options.qs = {
                              command: "STATUS",
                              media_id: media_id
                            };
                            request.get(options, function(err, response, body) {
                              console.log(
                                "STATUS: ",
                                response.statusCode,
                                body
                              );
                            });
                          });
                        }
                      };
                    };

                    request.post(options, function(err, response, body) {
                      var media_id;
                      media_id = JSON.parse(body).media_id_string;

                      fs.open(filePath, "r", function(err, fd) {
                        var bytesRead, data;

                        while (offset < stats.size) {
                          bytesRead = fs.readSync(
                            fd,
                            theBuffer,
                            0,
                            bufferLength,
                            null
                          );
                          data =
                            bytesRead < bufferLength
                              ? theBuffer.slice(0, bytesRead)
                              : theBuffer;
                          options.formData = {
                            command: "APPEND",
                            media_id: media_id,
                            segment_index: segment_index,
                            media_data: data.toString("base64")
                          };
                          request.post(options, normalAppendCallback(media_id));
                          offset += bufferLength;
                          segment_index++;
                        }
                      });
                    });
                  });
                }
                //twitter_gif_post("sun.mp4") 
                
                response.end(JSON.stringify(data));

                break;
              }
              case "commit": {
                if (object.modifier == "editor") { 
                  
                    if (object.uin.length == 32) {
                    var i = json.findIndex(function(item, i) {
                      return item.uid == object.query;
                    });
                    var subname = json[i].subname;
                  	}
                    subname = object.uin + ".fastur.com"; 
                  
                    var string = require("fs").readFileSync("/home/ubuntu/api/data.json","utf8");
                    var json = JSON.parse(string);
                    var i = json.find(function(item) {
                    return item.active === object.cookie;
                  	});
                    var result = json.find(obj => { return obj.subname === subname; });
                    var uid = require("crypto").randomBytes(16).toString("hex");
                    var results = json.filter(function(entry) { return entry.port; }); 
         
                  var port = results[results.length - 1].port + 1;
                    json.push({
                      port: port,
                      subname: subname,
                      uid: uid, 
                      publisher: i.email
                    });
                    require("fs").writeFileSync("/home/ubuntu/api/data.json",JSON.stringify(json));
                  
                    var nginx_conf = require("fs").readFileSync("/home/ubuntu/api/nginx","utf8");
                    nginx_conf = nginx_conf.replace(/ab.fastur.com/g, subname).replace(/7002/g, port);
                    require("fs").writeFileSync("/etc/nginx/sites-enabled/" + subname.replace(/\./g, ""),nginx_conf);
                  
                    var index = require("fs").readFileSync("/home/ubuntu/index2.js","utf8");
                    index = index.replace(/7002/g, port).replace(/frames.html/g, uid + ".html");
                    require("fs").writeFileSync("./api/index" + port + ".js",index);
                  
                    var html = render("false", object.query);   
                    require("fs").writeFileSync("./api/" + uid + ".html",html);
                    require("fs").writeFileSync("./api/" + uid + ".json",object.query);

                    require("child_process").exec("./restart.sh " + port + " " + subname + " new",(err, stdout, stderr) => { console.log(err, stdout, stderr); });
                    response.end("success");
                  
                }  
                if (object.modifier == "data") {
                  if (typeof object.query !== "object") {
                    var data = JSON.parse(object.query);
                  }

                  require("fs").writeFileSync("./api/912120bfa38218625d3e8505996f7860.json",JSON.stringify(data, null, 4));

                  var html = render("hard", data);
                  require("fs").writeFileSync("./api/912120bfa38218625d3e8505996f7860.html",html);
                  require("fs").writeFileSync("./api/frames.html", html );  
                  
                  response.end(JSON.stringify({data: "save complete"})
                  );
                }
                if (object.modifier == "server") {
                  var string = "index2.js"; 
                  var time = Date.now(); 
                  var datam = require("fs").readFileSync("/home/ubuntu/api/history/analytics.json","utf8");
                  var json = JSON.parse(datam);
                  json.push({
                    time: time
                  });
                  require("fs").writeFileSync("/home/ubuntu/api/history/analytics.json",JSON.stringify(json));

                  var data = require("fs").readFileSync("./" + string, "utf8");
                  data = data.split("var server")[0];

                  var r1 = " var elements =   require('fs').readFileSync('/home/ubuntu/api/912120bfa38218625d3e8505996f7860.json');  		if (typeof elements !== 'object') { var elements = JSON.parse(elements) }         require('fs').writeFileSync('./api/912120bfa38218625d3e8505996f7860.html', render('false',elements));";

                  require("fs").writeFileSync("./api/render1.js", data + r1);

                  require("child_process").exec("node ./api/render1.js", (err, stdout, stderr) => {
                      console.log(err, stdout, stderr);
                    });

                  try {
                    var re = eval(object.query.replace(".listen(7002)", ""));

                    require("fs").writeFileSync(
                      "./api/history/index2.js" + time,
                      object.query
                    );
                    require("fs").writeFileSync("./" + string, object.query);

                    var string1 =
                      "require('http').createServer(function (req, res) { res.write(''); res.end(); }).listen(7000); ";

                    require("child_process").exec(
                      "./restart.sh restart " + string,
                      (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                      }
                    );
                  } catch (e) {
                    if (e instanceof SyntaxError) {
                      response.end(
                        JSON.stringify({ type: "error", data: e.message })
                      );
                    }
                  }
                }
                break;
              }
              case "login": {
                function login(email, password, uuid) {
                  var salt = {};
                  var data = require("fs").readFileSync(
                    "/home/ubuntu/api/data.json",
                    "utf8"
                  );

                  var result = JSON.parse(data).find(obj => {
                    return obj.email === email;
                  });
                  if (result) {
                    var hash = require("crypto")
                      .createHmac("sha512", result.salt)
                      .update(password)
                      .digest("hex");
                    if (hash == result.hash) {
                      var json = JSON.parse(data);

                      var i = json.findIndex(function(item, i) {
                        return item.email === email;
                      });
                      json[i].active = uuid;
                      require("fs").writeFileSync(
                        "/home/ubuntu/api/data.json",
                        JSON.stringify(json)
                      );

                      var results = json.filter(function(entry) {
                        return entry.publisher === email;
                      });

                      var results = JSON.stringify(results);
                      response.end(
                        JSON.stringify({
                          type: "success",
                          name: result.name,
                          data: results
                        })
                      );
                      return;
                    } else {
                      response.end(
                        JSON.stringify({
                          type: "failure",
                          reason: "Email/Password did not match."
                        })
                      );
                    }
                  } else {
                    response.end(
                      JSON.stringify({
                        type: "failure",
                        reason: "Email Not Found"
                      })
                    );
                  }
                }
                login(object.email, object.password, object.uuid);
                break;
              }
              case "register": {
                function register(name, email, password) {
                  var salt = require("crypto")
                    .randomBytes(Math.ceil(16 / 2))
                    .toString("hex")
                    .slice(0, 16);
                  var hash = require("crypto")
                    .createHmac("sha512", salt)
                    .update(password)
                    .digest("hex");
                  var data = require("fs").readFileSync(
                    "/home/ubuntu/api/data.json",
                    "utf8"
                  );

                  var json = JSON.parse(data);
                  var result = JSON.parse(data).find(obj => {
                    return obj.email === email;
                  });
                  if (result) {
                    response.end(
                      JSON.stringify({
                        type: "success",
                        name: result.name,
                        data: "already registered"
                      })
                    );
                  } else {
                    json.push({
                      name: name,
                      email: email,
                      password: "hash",
                      hash: hash,
                      salt: salt
                    });
                    require("fs").writeFileSync(
                      "/home/ubuntu/api/data.json",
                      JSON.stringify(json)
                    );
                    response.end("success, log in!");
                  }
                }
                register(object.name, object.email, object.password);
                break;
              }
              default:
                
            }
          }
        }
        clearInterval(refreshId);
      }, 50);
    }
  }) 
  .listen(7002);  
