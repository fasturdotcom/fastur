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
                  uin.placeholder = data[i].text;
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
            var price = Math.floor(Math.random() * 1000 + 1);

            function starthere() {
              var agents = localStorage.getItem("agents");
              var agents = JSON.parse(agents);
              for (var agent in agents) {
                var agency = agents[agent].links;
                if (agency) {
                  document.getElementById("blog").innerHTML +=
                    JSON.stringify(agency) + "<br><br>";
                }
              }
            }
            starthere();
            var button = document.getElementById("myBtn");
            button.innerHTML = "$1 Question";

            function draw(x, y, w, h) {
              const canvas = document.getElementById("canvas");
              const ctx = canvas.getContext("2d");
              ctx.fillRect(x, y, w, h);

              var image = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
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

            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUIOtY8S8shSda"
            );
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
                      var displayError = document.getElementById(
                        "error-message"
                      );
                      displayError.textContent = result.error.message;
                    }
                  });
              } else {
                myBtn.innerHTML = "please enter an email";
                uin.style.outline = "2px solid red";
              }
            });
            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUInGYzA7Qz43o"
            );
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
                      var displayError = document.getElementById(
                        "error-message"
                      );
                      displayError.textContent = result.error.message;
                    }
                  });
              } else {
                myBtn.innerHTML = "please enter an email";
                uin.style.outline = "2px solid red";
              }
            });
            var checkoutButton = document.getElementById(
              "checkout-button-plan_GUIkoAioxfTHcx"
            );
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
                      var displayError = document.getElementById(
                        "error-message"
                      );
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

                    var target = document.getElementById(
                      event.target.innerText
                    );
                    target.style.display = "";
                    setTimeout(function() {
                      target.classList.replace("inactive", "active");
                    }, 750);
                    lib.actives.push(target.id);
                  }
                } else {
                  window.location = event.target.href;
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
            uin.placeholder = "refer";
            uin.addEventListener(
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
        } else {
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

      uin.addEventListener("keydown", function(e) {
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

          var e = uin.value;
          var url = "https://code.fastur.com/api/" + uin.value + ".png";

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
            if (uin.value) {
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
  }

  var body = "";
  var t = "";
  var d = "";
  var num = 0;
  var cssd = "";
  for (var element in elements) {
    var b = elements[element];
    var data = "";
    var form = "";
    var _break;
    var items = b.items;
    var gaid = b.gaid;
    var br = "";
    num = num + 1;

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
    
    cssd += ` .${(b.id || "card")} { 
text-align: ${(b.align || "center")};
background: ${(b.background || "#000000")};  
border-radius: ${(b.rounding || "10px")};
outline: ${(b.outline || "dashed")}; 
draggable: ${(b.isdrag||"true")};  
font-family: ${(b.font || "Arial, Helvetica, sans-serif;")};
transition: ${(b.transition || "all 0.5s ease-out;")};
opacity: ${(b.opacity || "0.85;" )};
margin: ${(b.margin || "5px;"  )};
position: ${(b.position || "relative;")}; 
font-size: ${(b.size || " 1rem; ")};  

}`;

    if (num == 1) {
      t = "<title>" + (b.title ||  "Fastur") + "</title>";
      d = "<meta name='description' content='" + (b.description || "Property of Fastur Incorporated")+ "'>";
    }

    body +=
      "<" + (b.tag || "a") + " href='/" + b.name +
      "' style=' display:" + (b.display || "block") +
      "' class='" + (b.class || b.animation || "card") + "' data-action='1'>" + b.name+ 
      "</" + (b.tag || "a") + "><br>";
  }
  
  
  
  if (action == "client") {
    var standard = body;
  } else {
    var standard =
      "<!DOCTYPE html id='page'><head><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'>" +
      t +
      d +
      "<style>" +
      cssd +
      "</style><link type='image/png' rel='shortcut icon' href='api/ico.png'></head><body id='pagebody' data-editor='" +
      action +
      "'>" +
      body +
      "</body><script src='https://www.gstatic.com/firebasejs/4.3.0/firebase.js'></script><script src='https://checkout.stripe.com/checkout.js'></script><script src='https://js.stripe.com/v3'></script><script src='/api2'></script><script>render()</script></html>";
  }
  return standard;
}

function movie(dream) {
  async function puppet(url, input, q, press, links) {
    const fs = require("fs");
    const puppeteer = require("puppeteer");
    const path = require("path");
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto(url);
      //await page.mouse.click(100, 500, { delay: 500 });
      await page.type(input, q);
      page.keyboard.press(press);
      var data = require("fs").readFileSync("./api/data.json", "utf8");
      var json = JSON.parse(data);

      var result = JSON.parse(data).find(obj => {
        return obj.query === q;
      });

      if (result) {
        console.log(result);
      } else {
        json.push({
          query: q,
          screenshot:
            "https://code.fastur.com/app/c.png",
          time: Date.now()
        });
        require("fs").writeFileSync("./api/data.json", JSON.stringify(json));
      }

      await page.setViewport({
        width: 1200,
        height: 1200
      });
      var pathd = path.join(
        __dirname,
        "api/c.png"
      );
      console.log(pathd);

      await page.screenshot({
        path: pathd
      });
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  }
  //puppet("https://google.com","input.gLFyf.gsfi",dream,"Enter","div#resultStats","links");
  function run(a) {
    var r = require("fs").readFileSync("sun.json",'utf8');
    console.log(r)
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

          var json = {
            page: page,
            count: count,
            values: values
          };
          require("fs").writeFileSync("sun.json", JSON.stringify(json));

          console.log("finished");
        });
      }
    );
  }
  //run("Abcdefghijklmnopqrstuvwxyz");
  
  function twitter_post($, id) {
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
        status: $
      },
      function(err, t, r) {
        if (!err) {
          var body = JSON.parse(r.body);
          var tweets = require("fs").readFileSync("twitter.json");

          require("fs").writeFileSync("twitter.json", tweets);
          console.log(body.id);
        }
      }
    );
  }
  //twitter_post("@aisafetyceo wow", 1221183159334776800);
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
          arr.push({
            name: t.statuses[y].user.screen_name,
            date: t.statuses[y].created_at,
            text: t.statuses[y].text,
            url: t.statuses[y].user.url
          });
        }
        require('fs').writeFileSync('a.json',JSON.stringify(arr));
        console.log(arr);
      }
    );
  }
  //twitter_search("jobs");
  function twitter_gif_post($) {
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
    filePath = "./sun.gif";
    bufferLength = 1000000;
    theBuffer = new Buffer(bufferLength);
    offset = 0;
    segment_index = 0;
    finished = 0;
    oauthCredentials = {
      consumer_key: "zEy22K3iWIFuTcCEeMzrtK4Yu",
      consumer_secret: "jYdDkc7SAJaTv22kG6zUcnXVGV93mYU2OJavoRahiyX58If9cP",
      access_token_key: "724716718006874112-NjBNDluPR74VWGE4hIwcs9r52LZuJhE",
      access_token_secret: "VHkrp0WnQPayJY8NasJYB66OP1lqXMsT6vvnM9HFTEEZG",
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
                console.log("STATUS: ", response.statusCode, body);
              });
            });
          }
        };
      };

      request.post(options, function(err, response, body) {
        var media_id;
        media_id = JSON.parse(body).media_id_string;

        fs.open(filePath, "./sun.gif", function(err, fd) {
          var bytesRead, data;

          while (offset < stats.size) {
            bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
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
  
  function gif(a, b, c) {
    const GIFEncoder = require("gifencoder");
    const { createCanvas } = require("canvas");
    const fs = require("fs");

    const encoder = new GIFEncoder(c, c);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream(a + ".gif"));

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(50); // frame delay in ms
    encoder.setQuality(3); // image quality. 10 is default.

    // use node-canvas
    const canvas = createCanvas(c, c);
    const ctx = canvas.getContext("2d");
    function getColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 8; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c, c);
    encoder.addFrame(ctx);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c, c);
    encoder.addFrame(ctx);

    function encode(amount) {
      var gifdata = [];
      for (var y = 0; y < amount; y++) {
        for (let i = 0; i < c; i++) {
          for (let j = 0; j < c; j++) {
            var color = getColor();
            gifdata.push(color);
            ctx.fillStyle = color;
            ctx.fillRect(j, i, 1, 1);
          }
        }
        encoder.addFrame(ctx);
      }
      fs.writeFileSync("./api/gifdata", JSON.stringify(gifdata));
    }
    encode(b);

    encoder.finish();
    console.log("Gif Generator finished");
  }
  //gif("sun", 15, 320);
  function pixel(image, amount) {
    for (var y = 0; y < amount; y++) {
      var image = "public/" + image + y + ".png";

      function imageSize(image) {
        var sizeOf = require("image-size");
        var dimensions = sizeOf(image);
        return { width: dimensions.width, height: dimensions.height };
      }
      var size = imageSize(image);
      var width = size.width;
      var height = size.height;

      require("get-pixels")(image, function(err, pixels) {
        if (err) {
          console.log(err);
          return;
        }
        function get_pixels(x, y, pixels) {
          var out = [];
          var pointer =
            pixels.offset + pixels.stride[0] * x + pixels.stride[1] * y;
          for (var i = 0; i < 4; i++) {
            out.push(pixels.data[pointer + pixels.stride[2] * i]);
          }
          return out;
        }

        var pixelarray = [];
        for (var y = 0; y < width; y++) {
          for (var x = 0; x < height; x++) {
            var pixel = get_pixels(x, y, pixels);
            pixelarray.push(pixel);
          }
        }

        console.log(pixelarray);
      });
    }
  }
  //pixel('sun',30); 
  function saveImage(url) {
    var http = require("http"),
      Stream = require("stream").Transform,
      fs = require("fs");

    http
      .request(url, function(response) {
        var data = new Stream();

        response.on("data", function(chunk) {
          data.push(chunk);
        });

        response.on("end", function() {
          fs.writeFileSync("sun.png", data.read());
          console.log("finished image download");
        });
      })
      .end();
  }
  //saveImage("http://code.fastur.com/api/server.png");
  function github(url) {
    var gs = require("github-scraper");
    gs(url, function(err, data) {
      console.log(data);
    });
    console.log("finished");
  }
  //github("fasturdotcom");
}
movie("subroutine");
  
var server = require("http")
  .createServer(function(request, response) {
    if (request.method == "GET"){
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
      if (request.url == "/script.js") {
        var data = require("fs").readFileSync("./script.js");
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
      if (request.url == "/app") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync(
          "./a.json"
        );
        var data = JSON.parse(data);
        var data = render("false", data);
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
        var html = require("fs").readFileSync("./index.html", "utf8");
        response.end(html);
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
        if (require("fs").existsSync(__dirname + "/api/" + request.url.split("/")[2])) {
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
            console.log(object);
            switch (object.type) {
              case "commit": {
                var q = object.query;

                if (object.modifier == "editor") {
                  var q = object.uin;
                  var uid = require("crypto")
                    .randomBytes(16)
                    .toString("hex");

                  if (process.env.PROJECT_DOMAIN == "fastur") {
                    var html = render("false", object.query);
                    require("fs").writeFileSync(
                      "./api/" + object.uin + ".html",
                      html
                    );
                  } else {
                    if (object.uin.length == 32) {
                      var i = json.findIndex(function(item, i) {
                        return item.uid == object.query;
                      });
                      var subname = json[i].subname;
                    }
                    subname = object.uin + ".fastur.com";

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
                require("fs").writeFileSync("./api/analytics.json",JSON.stringify(json));

                async function puppet(url, input, q, press, waitFor, links) {
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

                    page.keyboard.press(press);
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
                    var data = require("fs").readFileSync(
                      "./api/data.json",
                      "utf8"
                    );
                    var json = JSON.parse(data);

                    var result = JSON.parse(data).find(obj => {
                      return obj.query === q;
                    });

                    if (result) {
                      console.log(result);
                    } else {
                      json.push({
                        query: q,
                        screenshot:
                          "https://code.fastur.com/" +
                          q.replace(/\W+/g, "-").toLowerCase() +
                          ".png",
                        links: Links,
                        time: Date.now()
                      });
                      require("fs").writeFileSync(
                        "./api/data.json",
                        JSON.stringify(json)
                      );
                    }

                    await page.setViewport({
                      width: 800,
                      height: 1000
                    });
                    var pathd = path.join(
                      __dirname,
                      "/api/" + q.replace(/\W+/g, "-").toLowerCase() + ".png"
                    );
                    console.log(pathd);

                    await page.screenshot({
                      path: pathd
                    });
                    await browser.close();
                  } catch (error) {
                    console.log(error);
                  }
                }
                puppet("https://google.com","input.gLFyf.gsfi",q,"Enter","div#resultStats","links");

                var data = require("fs").readFileSync("./api/data.json","utf8");

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
              default:
            }
          }
        }
        clearInterval(refreshId);
      }, 50);
    }
  })
  .listen(process.env.PORT || 7002);