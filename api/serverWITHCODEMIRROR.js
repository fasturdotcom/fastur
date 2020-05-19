if (typeof window == "undefined") {
  /*
  const https = require('https');

const options = {
    hostname: 'api.linode.com',
    path: '/v4/domains',
    headers: {
        Authorization: 'Bearer 8ae7e0c72c4b872f4e98698a3539419f2e24f9245e7db0a318d328dfdac8695e'
    }
}

https.get(options, (response) => {
    var result = ''
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        console.log(result);
    });

});
*/
  function prepareImage(e) {
    var json = require("fs").readFileSync("./api/"+e+".json", "utf8");
    try {
      var json = JSON.parse(json);
    } catch (e) {
      var json = [];
    }

    json.sort(function(a, b) {
      return a.part - b.part;
    });

    var imagestr = "";
    for (var i in json) {
      var input = json[i].input;
      imagestr += json[i].input;
    }
    require("fs").writeFileSync("./api/image.png", imagestr);
    var base64Data = imagestr.split(",")[1];
    require("fs").writeFile("api/image.png", base64Data, "base64", function(err) {
      console.log(err);
    });
    console.log("image prepared");
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
      /*await page.type(input, q);
                    page.keyboard.press(press);
                    await page.waitFor(1000);
                    
                    var keepCalling = true;
                    setTimeout(function() {
                      keepCalling = false;
                    }, 60000);
                    while (keepCalling) {
                      var json = require("fs").readFileSync("./api/clicks.json","utf8");
                      try {
                        var json = JSON.parse(json);
                      } catch (e) {
                        var json = [];
                      }
                      json.push(coords);
                      require("fs").writeFileSync("./api/clicks.json",JSON.stringify(json));

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

                      var pathd = path.join(__dirname,"api/" + coords.time + ".png");
                      console.log(pathd);
                      await page.screenshot({ path: pathd });
                    }*/

      var pathd = path.join(__dirname, "api/" + coords.time + ".png");
      console.log(pathd);
      await page.screenshot({ path: pathd });

      console.log("puppet finished");
      await browser.close();
    } catch (error) {
      console.log(error);
    }
  }

  setInterval(function() {
    var json = require("fs").readFileSync("./api/data.json", "utf8");
    var json = JSON.parse(json);

    for (var i in json) {
      var type = json[i].type;
      if (type == "image") {
        prepareImage(json[i].name);
      }
      if (type == "build") {
        puppet(json[i].domain, "input.gLFyf.gsfi", " ", "Enter", {
          x: 1,
          y: 1,
          time: 1,
          keys: "hello"
        });
      }
      if (type == "pixels") {
        var getPixels = require("get-pixels");

        getPixels("lena.png", function(err, pixels) {
          if (err) {
            console.log("Bad image path");
            return;
          }
          console.log("got pixels", pixels.shape.slice());
        });
      }
      if (type == "pattern") {
        //iterate over pixels, if neighbourhood threshold push into new wireframe file
      }
      if (type == "render") {
        //generator outputs wireframe.json
      }
      if (type == "verification") {
        //takes image of rendered site, pixels them and compares difference with original
      }
      if (type == "thumbnail") {
      }
    }
  }, 5000);
}

function render(action, elements) {
  if (typeof window !== "undefined") {
    window.lib = {
      actives: ["home"],
      current: [],
      image:[],
      imagepart:[],
      id: 0,
      code: 0,
      changes: 0,
      closeNav: function() {
        document.getElementById("mySidenav").style.width = "0px";
      },
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
      disc: function(e) {
        var dictionary = {
          help: "a computer",
          stripe: "Enter your stripe keys"
        };
        return dictionary[e];
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
      login: function login(e, a, o, u,s,b) {
        if (e == "build") {
          var type = "build";
        } else if (e == "image") {
          var type = "image";
        } else if (e == "register") {
          var type = "register";
          var name = document.getElementById("register-name").value;
          var email = document.getElementById("login-email").value;
          var password = document.getElementById("login-password").value;
        } else if (e == "domain") {
          var type = "domain";
        } else if (e == "dict") {
          var type = "dict";
        } else if (e == "email") {
          var type = "email";
        } else if (e == "search") {
          var search = document.getElementById("login-email").value;
        } else if (e == "commit") {
          var type = "commit";
          var code = window.CM.getValue();
        } else {
          var type = "login";
          var name = document.getElementById("register-name").value;
          var email = document.getElementById("login-email").value;
          var password = document.getElementById("login-password").value;
        }
        var label = {
          type: type,
          input: a,
          size:s,
          bytes:b,
          part: o,
          name: u,
          modifier: "editor",
          query: code,
          email: email,
          password: password,
          uuid: lib.cookie("fastur"),
          time: Date.now()
        };
        console.log(label);
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

            localStorage.fasturaccount = JSON.stringify(result);
            result = JSON.parse(result);

            if (result.type == "dict") {
              myBtn.innerHTML = result.data;
            }
            if (result.type == "image") {
              var image = lib.image;
              var part = result.part;
              var size = result.size;
              var bytes = result.bytes;
              image.push({part,size,bytes});
              lib.image = image;

              lib.load(size,bytes);
            }
            if (result.type == "success") {
              modalContent.innerHTML = result.message;
              document.getElementById("myModal").style.display = "block";
              var loginButton = document.getElementById("login-button");
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
                var dashboard = document.getElementById("dashboard");
                var item =
                  "<a href='/edit?" +
                  data[i].uid +
                  "' class='elementten'>" +
                  data[i].subname +
                  "</a>";
                dashboard.insertAdjacentHTML("beforeend", item);
              }

              var els = document.querySelectorAll("[data-display='login']");
              for (var x = 0; x < els.length; x++) {
                els[x].style.display = "none";
              }
              var els = document.querySelectorAll("[data-display='dashboard']");
              for (var x = 0; x < els.length; x++) {
                els[x].style.display = "block";
              }
            }
            if (result.type == "failure") {
              console.log(result);
              modalContent.innerHTML = result.reason;
              document.getElementById("myModal").style.display = "block";
            }
          });
        });
      },
      logout: function logout(e) {
        document.cookie = "fastur=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      },
      load: function load(e,a) {
        modalContent.innerHTML =
          "<div id='myProgress'> <div id='myBar'>10%</div> </div>";
        document.getElementById("myModal").style.display = "block";
        var image = lib.image;
        var parts = lib.imagepart;
        var len = image.length;
        var size = e;
        var BYTES_PER_CHUNK = a;
        var start = 0;
        var part = 0;
        var int = len * BYTES_PER_CHUNK;
        var width = (int / size) * 100;
        var width = Math.round(width);
        var elem = document.getElementById("myBar");
console.log(width)
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
        if (width >= 100) {
           } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
          }
          part++
       },
      edit: function(e) {
        modalContent.innerHTML =
          "<b>Useful Instructions!</b><br><br>Click on an element to see its ID<br><br>Use the form! Type in:<br>'change *ID* *content/color/background/border* to *value*' <br> <br>When you are ready to publish, Type in:<br>'publish to *demo*'<br><br>use the <a href='https://www.w3schools.com/cssref/'> CSS ref</a> to expand your vocabulary and capabilities<br><br> Create an account with stripe.com<br>You will need to copy stripe api keys to your fastur site<br>on fastur.com type in stripe to set your stripe keys  ";
        document.getElementById("myModal").style.display = "block";

        function parse(query) {
          query = query.toLowerCase();
          var action = query.split(" ");

          function validURL(str) {
            var pattern = new RegExp(
              "^(https?:\\/\\/)?" + // protocol
              "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
              "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
              "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
              "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                "(\\#[-a-z\\d_]*)?$",
              "i"
            ); // fragment locator
            return !!pattern.test(str);
          }
          if (validURL(action[0])) {
            console.log("domain!");
            lib.login("domain", action[0]);
          }
          if (action[0] == "publish") {
            modalContent.innerHTML =
              "<div id='register' class='active' style=''><h3>Your account</h3><p>Enter a username and password for your Fastur account</p><input style='padding:10px;' id='register-name'   type='text' data-display='register'  placeholder='name' class='blank' data-action='0'> <input style='padding:10px;' id='register-email'   type='email' data-display='register'  placeholder='email' class='blank' data-action='0'> <input style='padding:10px;' id='register-password'   type='password' data-display='register'  placeholder='password' class='blank' data-action='0'><br><h3>Your Site</h3><p>Settings for your site</p><input style='padding:10px;' id='title-name'   type='text' data-display='register'  placeholder='title' class='blank' data-action='0'> <input style='padding:10px;' id='description-name'   type='text' data-display='register'  placeholder='description' class='blank' data-action='0'> <br><br><label class='container'>Fastur URL <input type='radio' checked='checked' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Custom Domain <input type='radio' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Draft <input type='radio' name='radio'> <span class='checkmark'></span> </label><input style='padding:10px;' id='url-name'   type='text' data-display='register'  placeholder='URL' class='blank' data-action='0'>  <br><br><input style='padding:10px;' id='register' onclick='lib.login('publish')''  type='submit' value='publish' data-display='register'  placeholder='' class='registerelement' data-action='0'> </div>";
            document.getElementById("myModal").style.display = "block";
          } else if (action[0] == "email") {
            lib.login("email");
          } else if (action[0] == "change") {
            if (action[2] == "font") {
              action[2] = "fontFamily";
            }
            if (action[2] == "size") {
              action[2] = "fontSize";
            }
            if (action[2] == "image") {
              document.getElementById("myImage").style.display = "block";
              //document.getElementById("myImageInput").click()
              document.getElementById("myImageInput").onchange = function() {
                var file = this.files[0];
                var url = window.URL.createObjectURL(file);
                console.log(url);
                document.getElementById(action[1]).src = url;
              };
              //upload selected image
            }
            if (action[2] == "content") {
              var actioned = action.splice(4);
              console.log(actioned);

              var sentence = "";
              for (var word in actioned) {
                sentence += actioned[word] + " ";
              }

              document.getElementById(action[1]).innerText = sentence;
            }

            document.getElementById(action[1]).style[action[2]] = action[4];

            var elements = window.CM.getValue();
            var elements = JSON.parse(elements);
            for (var el in elements) {
              if (elements[el].id == action[1]) {
                elements[el][action[2]] = action[4];
              }
            }

            var elements = JSON.stringify(elements);
            window.CM.setValue(elements);
          } else if (action[0] == "publish") {
            lib.login("commit", action[2]);
          } else if (action[0] == "hide") {
            editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.getWrapperElement().style.display = "none";
          } else if (action[0] == "code") {
            editor = document.querySelector(".CodeMirror").CodeMirror;
            editor.getWrapperElement().style.display = "block";

            if (action[1]) {
              fetch("/" + action[1], {
                method: "get"
              })
                .then(r => r.text())
                .then(j => {
                  window.CM.setValue(j);
                  var editor = document.querySelector(".CodeMirror").CodeMirror;
                  editor.operation(function() {
                    for (
                      var l = editor.firstLine();
                      l <= editor.lastLine();
                      ++l
                    )
                      editor.foldCode({ line: l, ch: 0 }, null, "fold");
                  });
                });
            }
          } else {
            lib.login("dict", query);
            var a = lib.disc(query);
            myBtn.innerHTML = a;
          }
        }

        input.addEventListener("keydown", function(e) {
          if (e.key === "Enter") {
            parse(e.target.value);
          }
        });
        myBtn.addEventListener("click", function(event) {
          parse(input.value);
        });

        document.addEventListener(
          "click",
          function(event) {
            //event.preventDefault();
            if (document.getElementById(lib.current[0])) {
              var activated = document.getElementById(lib.current[0]);
              activated.classList.remove("focused");
              lib.current = [];
              lib.current[0] = event.target.id;
              if (document.getElementById(event.target.id)) {
                var activated = document.getElementById(event.target.id);
                activated.classList.add("focused");
                input.placeholder = event.target.id;
              }
            } else {
              if (document.getElementById(event.target.id)) {
                lib.current[0] = event.target.id;
                var activated = document.getElementById(event.target.id);
                activated.classList.add("focused");
                input.placeholder = event.target.id;
              }
            }

            document.getElementById("mySidenav").style.width = "290px";

            if (event.target.nodeName == "IMG") {
              //document.getElementById("myImageInput").click()
              document.getElementById("myImage").style.display = "block";
              document.getElementById("myImageInput").onchange = function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function() {
                  document.getElementById(event.target.id).src = reader.result;
                  var blob = reader.result;
                  var size = blob.length;
                  var BYTES_PER_CHUNK = 1024;
                  var start = 0;
                  var end = BYTES_PER_CHUNK;
                  var part = 0;
                  while (start < size) { 
                    var chunk = blob.slice(start, end);
                    lib.login("image", chunk, part, "image",size,BYTES_PER_CHUNK);

                    var image = lib.imagepart;
                    image.push({part,size,BYTES_PER_CHUNK});
                    lib.imagepart = image;

                    start = end;
                    end = start + BYTES_PER_CHUNK;
                    part++;
                  }
                  lib.login("build", null, null, "image");
                };
                reader.readAsDataURL(file);

                //var url = window.URL.createObjectURL(file);
                //document.getElementById(event.target.id).src = url;
              };
            } else {
              document.getElementById("myImage").style.display = "none";
            }
          },
          true
        );
        document.getElementsByTagName("HTML")[0].setAttribute("id", "page");
        var contents = document.querySelectorAll("[contenteditable=true]");
        [].forEach.call(contents, function(content) {
          content.addEventListener("focus", function() {
            content.setAttribute("data-in", content.innerHTML);
          });
          content.addEventListener("blur", function() {
            if (content.getAttribute("data-in") !== content.innerHTML) {
              var elements = window.CM.getValue();
              var elements = JSON.parse(elements);
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

                for (var el in elements) {
                  if (elements[el].id == id) {
                    elements[el].name = val;
                  }
                }
              }
              var elements = JSON.stringify(elements);
              window.CM.setValue(elements);
              /*
              if (input.value) {
                window.changes = 1;
              } else {
                myBtn.innerHTML = "Name at least 3 letters";
                input.style.outline = "2px solid red";
              }*/
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
            console.log(position);
          });
          content.addEventListener("click", function(e) {
            e.preventDefault();
          });
        });
        var contents = document.querySelectorAll("[data-action]");
        [].forEach.call(contents, function(content) {
          content.addEventListener("mouseenter", function(e) {
            e.preventDefault();
            var element = document.getElementById(e.target.id);
            element.classList.add("hover");
            console.log(e);
          });
          content.addEventListener("mouseover", function(e) {
            e.preventDefault();
          });
          content.addEventListener("mouseout", function(e) {
            e.preventDefault();
            var element = document.getElementById(e.target.id);
            element.classList.add("hover");
            console.log(e);

            var element = document.getElementById(e.target.id);
            element.classList.remove("hover");
          });
        });
      }
    };
    lib.control = function(e) {
      if (e == "edit") {
        lib.edit();
      }
      setInterval(function() {
        if (window.changes == 1) {
          var code = window.CM.getValue();
          console.log(1)
          lib.login()

          window.changes = 0;
        }
      }, 2000);
      {
        var stripe = Stripe("pk_live_ObaqTuXmpyisKC1YG5PmSwtH");
        var checkoutButton = document.getElementById(
          "checkout-button-plan_GUIOtY8S8shSda"
        );
        if (checkoutButton) {
          checkoutButton.addEventListener("click", function() {
            document.getElementById("login-button").click();
            if (input.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUIOtY8S8shSda", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled",
                  customerEmail: input.value
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              input.placeholder = "email";
              myBtn.innerHTML = "please enter an email";
              input.style.outline = "2px solid red";
            }
          });
        }
        var checkoutButton = document.getElementById(
          "checkout-button-plan_GUInGYzA7Qz43o"
        );
        if (checkoutButton) {
          checkoutButton.addEventListener("click", function() {
            document.getElementById("login-button").click();
            if (input.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUInGYzA7Qz43o", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled",
                  customerEmail: input.value
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              input.placeholder = "email";
              myBtn.innerHTML = "please enter an email";
              input.style.outline = "2px solid red";
            }
          });
        }
        var checkoutButton = document.getElementById(
          "checkout-button-plan_GUIkoAioxfTHcx"
        );
        if (checkoutButton) {
          checkoutButton.addEventListener("click", function() {
            document.getElementById("login-button").click();
            if (input.value) {
              stripe
                .redirectToCheckout({
                  items: [{ plan: "plan_GUIkoAioxfTHcx", quantity: 1 }],
                  successUrl: "https://code.fastur.com/success",
                  cancelUrl: "https://code.fastur.com/canceled",
                  customerEmail: input.value
                })
                .then(function(result) {
                  if (result.error) {
                    var displayError = document.getElementById("error-message");
                    displayError.textContent = result.error.message;
                  }
                });
            } else {
              input.placeholder = "email";
              myBtn.innerHTML = "please enter an email";
              input.style.outline = "2px solid red";
            }
          });
        }
      }
      {
        fetch("/data", {
          method: "get"
        })
          .then(r => r.text())
          .then(j => {
            var editor = CodeMirror.fromTextArea(
              document.getElementById("myTextArea"),
              {
                value: j,
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
            editor.getWrapperElement().style.display = "none";
          })
          .catch(error => {
            console.log(error);
          });
      }
      {
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
      }
      {
        [].forEach.call(document.querySelectorAll("a"), function(el) {
          el.addEventListener("click", function() {
            console.log(event.target.dataset.link);
            var target = event.target.dataset.link;

            if (target == "code") {
              editor = document.querySelector(".CodeMirror").CodeMirror;
              editor.getWrapperElement().style.display = "block";
              this.innerText = "hide";
            } else if (target == "hide") {
              editor = document.querySelector(".CodeMirror").CodeMirror;
              editor.getWrapperElement().style.display = "none";
              this.innerText = "code";
            }

            if (target != lib.actives[0]) {
              for (var active of lib.actives) {
                if (active) {
                  var targeted = document.getElementById(target);
                  if (targeted) {
                    var activated = document.getElementById(active);

                    activated.classList.replace("active", "inactive");
                    setTimeout(function() {
                      activated.style.display = "none";
                    }, 350);
                    lib.actives = [];
                  }
                }
              }
            }

            var target = document.getElementById(event.target.dataset.link);
            if (target) {
              target.style.display = "";
              setTimeout(function() {
                target.classList.replace("inactive", "active");
              }, 750);
              lib.actives.push(target.id);
            }
          });
        });
        var modal = document.getElementById("myModal");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          myModal.style.display = "none";
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            myModal.style.display = "none";
          }
        };
      }
    };
    lib.control(action);
  } else {
    if (action == "edit") {
      elements.push(
        {
          outline: "none",
          id: "image_upload",
          tag: "input",
          onclick: "console.log(this)",
          display: "block",
          href: "#",
          datadisplay: "uform",
          position: "fixed",
          right: "10px",
          top: "calc( 100vh - 200px )",
          z: "11",
          placeholder: " e ",
          formtype: "upload",
          class: "uform",
          action: "INPUT",
          type: "button"
        },
        {
          href: "#",
          id: "myImage",
          name:
            "<div><input id='myImageInput' type='file' accept='image/*'></div>",
          onclick: "",
          display: "none",
          tag: "div",
          datadisplay: "uform",
          outline: "none",
          position: "fixed",
          right: "10px",
          top: "calc( 100vh - 180px )",
          z: "10",
          class: "uformImage",
          ishidden: "display:block;",
          type: "button"
        },
        {
          outline: "none",
          id: "input",
          tag: "input",
          onclick: "console.log(this)",
          display: "block",
          href: "#",
          datadisplay: "uform",
          position: "fixed",
          right: "10px",
          top: "calc( 100vh - 80px )",
          z: "10",
          placeholder: "change title color to blue ",
          formtype: "text",
          class: "uform",
          action: "INPUT",
          type: "button"
        },
        {
          href: "#",
          id: "myBtn",
          name: "Fastur Search",
          onclick: "lib.login('search',input.value)",
          display: "block",
          tag: "a",
          overflow: "auto",
          bottom: "65px",
          datadisplay: "uform",
          outline: "none",
          position: "fixed",
          right: "10px",
          top: "calc( 100vh - 130px )",
          z: "10",
          class: "uformbutton",
          ishidden: "display:block;",
          type: "button"
        },
        {
          outline: "none",
          dataid: "0",
          name: "home",
          type: "button",
          style: "display: none;",
          tag: "textarea",
          href: "#",
          display: "block",
          background: " ",
          hover: "cyan",
          datadisplay: "uform",
          id: "myTextArea",
          textcolor: "white",
          ishidden: "home",
          value: "home",
          class: " ",
          css: ""
        }
      );
    }
  }
  var body = "";
  var css = ` 
#myBar {
  width: 10%;
  height: 30px;
  background-color: #4CAF50;
  text-align: center; /* To center it horizontally (if you want) */
  line-height: 30px; /* To center it vertically */
  color: white;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 7px;
	left: 7px;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: white;
}
/* Style the list */
.price {
  list-style-type: none;
  border: 1px solid #eee;
  margin: 0;
  padding: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

/* Add shadows on hover */
.price:hover {
  box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
}

/* Pricing header */
.price .header {
  background-color: #111;
  color: white;
  font-size: 25px;
}

/* List items */
.price li {
  border-bottom: 1px solid #eee;
  padding: 20px;
  text-align: center;
}

/* Grey list item */
.price .grey {
  background-color: #eee;
  font-size: 20px;
}

/* The "Sign Up" button */
.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
}

/* Change the width of the three columns to 100%
(to stack horizontally on small screens) */
@media only screen and (max-width: 600px) {
  .columns {
    width: 100%;
  }
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
  .inactive { transition:all 0.5s linear; opacity: 0; }
  .active { transition:all 0.5s linear; opacity: 1; }
  [class*="focused"] { border:2px solid red; }
  [class*="hover"] { border: 1px dashed blue; } `;
  var sectionid = [];
  var menu = "";
  var grid = "";
  var home = "";
  var homeTwo = "";
  var homeThree = "";
  var homeFour = "";
  var homeFive = "";
  var login = "";
  var register = "";
  var dashboard = "";
  var dashboardTwo = "";
  var blog = "";
  var uform = "";
  var menuC = 0;
  var gridC = 0;
  var homeC = 0;
  var loginC = 0;
  var registerC = 0;
  var dashboardC = 0;
  var blogC = 0;
  var uformC = 0;

  for (var element in elements) {
    var b = elements[element];

    if (action == "false") {
      b.contenteditable = "";
    }
    if (action == "edit") {
      if (b.tag == "a") {
        b.tag = "span";
      }
      b.contenteditable = "";
    }
    var classList = b.class;
    var classArray = classList.split(" ");
    var classReady = "";
    for (var i in classArray) {
      var entry = "." + classArray[i];
      classReady += entry;
    }
    {
      css += ` ${classReady || "card"} { 
text-align: ${b.align || "center"}; 
background: ${b.background || "#FFFFFF"}; 
border-radius: ${b.rounding || "10px"}; 
outline: ${b.outline || "dashed"}; 
draggable: ${b.isdrag || "true"};  
font-family: ${b.font || "Arial, Helvetica, sans-serif;"};
text-decoration: ${b.decoration || "none"};
transition: ${b.transition || "all 0.5s ease-out;"};
opacity: ${b.opacity || "1;"};
color: ${b.color || ""};
margin: ${b.margin || "10 auto;"}; 
position: ${b.position || "relative;"}; 
left: ${b.left || ""}; 
right: ${b.right || ""}; 
width: ${b.width || ""}; 
height: ${b.height || ""}; 
bottom: ${b.bottom || ""}; 
top: ${b.top || ""}; 
padding: ${b.padding || ""}; 
overflow: ${b.overflow || ""}; 
z-index: ${b.z || ""}; 
display: ${b.display || "inline-block"}; 
font-size: ${b.size || " 1rem; "};
flex: ${b.flex || ""};
}


.${b.class || "card"}:hover {
background: ${b.hover || " "};
}

@media only screen and (max-width: 600px) {
  .${b.class || "card"} {
    background-color: ${b.bcolor || " "};
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
      "' onclick=" +
      (b.onclick || "") +
      " src='" +
      (b.src || "") +
      "' contenteditable='" +
      (b.contenteditable || " ") +
      "' type='" +
      (b.formtype || "") +
      "' value='" +
      (b.value || "") +
      "' data-display='" +
      (b.datadisplay || "") +
      "' data-link='" +
      (b.datalink || "") +
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
    if (b.datadisplay == "menu") {
      menuC + 1;
      menu += element;
    }
    if (b.datadisplay == "home") {
      homeC = homeC + 1;
      if (homeC < 8) {
        home +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1; margin:10px;'>" +
          element +
          "</div>";
      } else if (homeC < 10) {
        homeTwo +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      } else if (homeC < 12) {
        homeThree +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      } else if (homeC < 14) {
        homeFour +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      } else {
        homeFive +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      }
    }
    if (b.datadisplay == "login") {
      loginC + 1;
      login += element;
    }
    if (b.datadisplay == "register") {
      registerC + 1;
      register += element;
    }
    if (b.datadisplay == "dashboard") {
      dashboardC = dashboardC + 1;
      if (dashboardC < 4) {
        dashboard +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      } else {
        dashboardTwo +=
          "<div style='display:flex;flex-direction: column; flex-basis: 100%; flex: 1;'>" +
          element +
          "</div>";
      }
    }
    if (b.datadisplay == "blog") {
      blogC + 1;
      blog += element;
    }
    if (b.datadisplay == "uform") {
      uformC + 1;
      uform += element;
    }
    if (!sectionid.includes(b.datadisplay)) {
      sectionid.push(b.datadisplay);
    }
  }
  {
    body +=
      "<div id='menu' class='active' style='display:flex; padding:5px;'>" +
      menu +
      "</div>" +
      "<div id='home' class='active' style='display:block'>" +
      home +
      "<div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      homeTwo +
      "</div><div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      homeThree +
      "</div><div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      homeFour +
      "</div><div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      homeFive +
      "</div></div>" +
      "<div id='login' class='inactive' style='display:none'>" +
      login +
      "</div>" +
      "<div id='register' class='inactive' style='display:none'>" +
      register +
      "</div>" +
      "<div id='dashboard' class='inactive' style='display:none'><div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      dashboard +
      "</div><div style='display:flex;flex-direction: row; flex-wrap: wrap; width: 100%;'>" +
      dashboardTwo +
      "</div></div>" +
      "<div id='blog' class='inactive' style='display:none'>" +
      blog +
      "</div>" +
      "<div id='uform' class='active' style='display:block'>" +
      uform +
      "</div><div id='myModal' class='modal'><div class='modal-content'> <span class='close'>&times;</span> <p id='modalContent'></p> </div></div><div id='mySidenav' class='sidenav'> <a href='javascript:void(0)' class='closebtn' onclick='lib.closeNav()'>&times;</a> <a href='#'>About</a> </div>";
  }
  if (elements) {
    var html =
      "<html lang='en'><head><script async src='https://www.googletagmanager.com/gtag/js?id=UA-110802733-4'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-110802733-4'); </script><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'><link rel='stylesheet' href='api/codemirror.css'> <script src='api/codemirror.js'></script>" +
      "<title>" +
      (elements[0].title || "Untitled") +
      "</title>" +
      "<meta name='description' content='" +
      (elements[0].description || "Untitled") +
      "'>" +
      "<style>" +
      css +
      "</style><link type='image/png' rel='shortcut icon' href='api/ico.png'></head><body id='pagebody' style='background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover;background-color:" +
      elements[0].background +
      "; background-image:url(" +
      elements[0].src +
      ");' data-editor='" +
      action +
      "'>" +
      "<script src='https://checkout.stripe.com/checkout.js'></script>" +
      body +
      "</body><script src='https://www.gstatic.com/firebasejs/4.3.0/firebase.js'></script><script src='https://checkout.stripe.com/checkout.js'></script><script src='https://js.stripe.com/v3'></script><script src='/server.js'></script><script>render('" +
      action +
      "')</script><script> </script></html>";
  }
  return html;
}

var server = require("http")
  .createServer(function(request, response) {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000 // 30 days
        /** add other headers as per requirement */
      });
      response.end();
      return;
    }
    if (request.method == "GET") {
      var json = require("fs").readFileSync("./api/analytics.json", "utf8");
      try {
        var json = JSON.parse(json);
      } catch (e) {
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
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/codemirror.css", "utf8");
        response.end(data);
      }
      if (request.url == "/api/codemirror.js") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/codemirror.js", "utf8");
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
      if (request.url == "/server.js") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./server.js", "utf8");
        data = data.split("var server")[0];
        response.end(data);
      }
      if (request.url == "/data") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/old.json", "utf8");
        response.end(data);
      }
      if (request.url == "/server") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./server.js", "utf8");
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
        var html = render("false", data);
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
            console.log(object);
            switch (object.type) {
              case "commit": {
                var q = object.query;
                if (object.modifier == "editor") {
                  var q = object.input;
                  var uid = require("crypto")
                    .randomBytes(16)
                    .toString("hex");
                  var query = JSON.parse(object.query);
                  if (process.env.PROJECT_DOMAIN == "fastur") {
                    var html = render("false", query);
                    require("fs").writeFileSync(
                      "./api/" + object.input + ".html",
                      html
                    );
                  }
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
                  var result = json.find(obj => {
                    return obj.subname === subname;
                  });
                  console.log(result);
                  var port = json[json.length - 1].port + 1 || 2;

                  if (result) {
                    for (var i in json) {
                      var e = json[i].subname;
                      if (e == subname) {
                        json[i].uid = uid;
                        var port = json[i].port;
                      }
                    }
                    require("fs").writeFileSync(
                      "./api/data.json",
                      JSON.stringify(json)
                    );

                    var index =
                      "require('http').createServer(function (req, res) { var data = require('fs').readFileSync('./api/frames.html', 'utf8'); res.end(data); }).listen(7002)";
                    index = index
                      .replace(/7002/g, port)
                      .replace(/frames.html/g, uid + ".html");
                    require("fs").writeFileSync(
                      "./api/index" + port + ".js",
                      index
                    );

                    var html = render("false", query);
                    require("fs").writeFileSync("./api/" + uid + ".html", html);
                    require("fs").writeFileSync(
                      "./api/" + uid + ".json",
                      object.query
                    );

                    require("child_process").exec(
                      "./restart.sh " + port + " renew",
                      (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                      }
                    );
                  } else {
                    json.push({
                      port: port,
                      subname: subname,
                      uid: uid,
                      publisher: object.email
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

                    var index =
                      "require('http').createServer(function (req, res) { var data = require('fs').readFileSync('./api/frames.html', 'utf8'); res.end(data); }).listen(7002)";
                    index = index
                      .replace(/7002/g, port)
                      .replace(/frames.html/g, uid + ".html");
                    require("fs").writeFileSync(
                      "./api/index" + port + ".js",
                      index
                    );

                    var html = render("false", query);
                    require("fs").writeFileSync("./api/" + uid + ".html", html);
                    require("fs").writeFileSync(
                      "./api/" + uid + ".json",
                      object.query
                    );

                    const https = require("https");
                    const data = JSON.stringify({
                      name: subname,
                      type: "A",
                      target: "172.105.97.36"
                    });
                    const options = {
                      hostname: "api.linode.com",
                      port: 443,
                      path: "/v4/domains/1348504/records",
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Bearer 8ae7e0c72c4b872f4e98698a3539419f2e24f9245e7db0a318d328dfdac8695e",
                        "Content-Length": data.length
                      }
                    };
                    const req = https.request(options, res => {
                      var a = "";
                      res.on("data", d => {
                        a += d;
                      });
                      res.on("end", function() {
                        console.log(a);
                        // your code here if you want to use the results !
                      });
                    });
                    req.on("error", error => {
                      console.error(error);
                    });
                    req.write(data);
                    req.end();

                    require("child_process").exec(
                      "./restart.sh " + port + " " + subname + " new",
                      (err, stdout, stderr) => {
                        console.log(err, stdout, stderr);
                      }
                    );
                  }
                  var responseFinal = "successfully published to " + subname;
                  console.log(responseFinal);
                  response.end(responseFinal);
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
                  var string = "server.js";
                  var time = Date.now();
                  var datam = require("fs").readFileSync(
                    "./api/analytics.json",
                    "utf8"
                  );
                  var json = JSON.parse(datam);
                  json.push({
                    time: time
                  });
                  require("fs").writeFileSync(
                    "./api/analytics.json",
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
                      "./api/history/server.js" + time,
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
                response.end("commit success");
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

                      var stripe = require("stripe")(
                        "sk_live_1a8TlJBfRCKe1y5dceVR4wrK00KUm4VnND"
                      );

                      var customersTemp;
                      stripe.customers.list({ limit: 3 }, function(
                        err,
                        customers
                      ) {
                        response.end(
                          JSON.stringify({
                            type: "success",
                            name: result.name,
                            message: "Login Successful",
                            data: results,
                            customers: customers
                          })
                        );
                      });

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
                        message: "already registered"
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
                    response.end(
                      JSON.stringify({
                        type: "success",
                        message: "success! Please log in"
                      })
                    );
                  }
                }
                register(object.name, object.email, object.password);
                break;
              }
              case "screen": {
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.setHeader(
                  "Access-Control-Allow-Methods",
                  "GET, POST, OPTIONS, PUT, PATCH, DELETE"
                );
                response.setHeader(
                  "Access-Control-Allow-Headers",
                  "X-Requested-With,content-type"
                );
                response.setHeader("Access-Control-Allow-Credentials", true);

                response.end("Natural Language Interface");
                break;
              }
              case "email": {
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
                              const simpleParser = require("mailparser")
                                .simpleParser;

                              var Body = data.Body.toString("utf-8");
                              var modified = data.LastModified;
                              simpleParser(Body, (err, parsed) => {
                                var returns = {
                                  type: "data",
                                  email: parsed,
                                  date: modified
                                };
                                response.end(JSON.stringify(returns));
                              });
                            }
                          }
                        );
                      }
                    }
                  });
                }
                retrieve_email();
                if (q == "send_email") {
                  function send_email(email) {
                    var AWS = require("aws-sdk");
                    AWS.config.update({
                      accessKeyId: "AKIASS565J2QNZZVPBHX",
                      secretAccessKey:
                        "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",
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
                  send_email("joseph@fastur.com");
                }
                break;
              }
              case "image": {
                require("fs").writeFile(
                  "./api/" + object.name + ".json",
                  "[]",
                  { flag: "wx" },
                  function(err) {
                    if (err) console.log(err);
                    console.log("It's saved!");
                  }
                );

                var json = require("fs").readFileSync(
                  "./api/" + object.name + ".json",
                  "utf8"
                );
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }

                json.push(object);
                require("fs").writeFileSync(
                  "./api/" + object.name + ".json",
                  JSON.stringify(json)
                );
                var jsonResponse = { type:"image", result: "ok", part:object.part,size:object.size,bytes:object.bytes};
                response.end(JSON.stringify(jsonResponse));

                break;
              }
              case "build": {
                console.log("build");

                var json = require("fs").readFileSync(
                  "./api/data.json",
                  "utf8"
                );
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }
                json.push({
                  name: object.name,
                  time: Date.now(),
                  type: "image"
                });
                require("fs").writeFileSync(
                  "./api/data.json",
                  JSON.stringify(json)
                );

                break;
              }
              case "domain": {
                console.log(object.input);

                var json = require("fs").readFileSync(
                  "./api/data.json",
                  "utf8"
                );
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }
                json.push({
                  domain: object.input,
                  time: Date.now(),
                  type: "build"
                });
                require("fs").writeFileSync(
                  "./api/data.json",
                  JSON.stringify(json)
                );

                break;
              }
              case "dict": {
                console.log(object.input);

                var json = require("fs").readFileSync(
                  "./api/dict.json",
                  "utf8"
                );
                try {
                  var json = JSON.parse(json);
                } catch (e) {
                  var json = [];
                }
                response.end(
                  JSON.stringify({ type: "dict", data: json[object.input] })
                );

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
  .listen(process.env.PORT || 1);
