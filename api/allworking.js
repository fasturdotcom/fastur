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
    var json = require("fs").readFileSync("./api/" + e + ".json", "utf8");
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
    require("fs").writeFile("api/image.png", base64Data, "base64", function(
      err
    ) {
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
      if (type == "scrape") {
      // scrape(json[i].href);
      }
      if (type == "build") {
        puppet(json[i].domain, "input.gLFyf.gsfi", " ", "Enter", {
          x: 1,
          y: 1,
          time: 1,
          keys: "hello"
        });
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
      image: [],
      imagepart: [],
      id: 0,
      menu: function menu(event) {
        console.log(event);
        if (event.target) {
          //event.preventDefault();
          function Path(e) {
            var path = [];
            while (e) {
              path.push(e.className);
              if (e.tagName === "HTML") {
                return path;
              }
              e = e.parentElement;
            }
          }

          if (Path(event.target)) {
            if (
              Path(event.target)
                .join(" ")
                .indexOf("uform") == -1
            ) {
              if (
                document.getElementById("pagebody").dataset.editor == "edit"
              ) {
                for (var active of lib.actives) {
                  if (active) {
                    document.getElementById(active).classList.remove("focused");
                    lib.actives = [];
                  }
                }
                document
                  .getElementById(event.target.id)
                  .classList.add("focused");
                lib.actives.push(event.target.id);
                var e = event.target.nodeName;
              }
            } else {
              var e = event.target.dataset.action;
              console.log(7 + e);
            }
          }
        }
        
         
        if (e == "text") {
         if (localStorage.getItem('status') == 0){
           document.getElementById("alignfix").click(); // Click on the checkbox
  localStorage.setItem('status', '1');
        }
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }

          var element = [
            {
              outline: "none",
              name: "FASTUR",
              dataid: "1",
              datadisplay: "home",
              onclick: "console.log(this)",
              display: "block",
              href: "https://code.fastur.com",
              class: "h1",
              contenteditable: "true",
              background: " ",
              src: "",
              hover: " ",
              size: "3rem",
              id: "title",
              type: "imaged",
              tag: "h1"
            }
          ];

          var id = lib.actives[0] || "home";
          document
            .getElementById(id)
            .insertAdjacentHTML("beforeend", render("client", element));
          console.log("ok")
        }
        if (e == "link") {
          
         if (localStorage.getItem('status') == 0){
           document.getElementById("alignfix").click(); // Click on the checkbox
  localStorage.setItem('status', '1');
        }
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }

          var element = [
            {
              outline: "none",
              name: "FASTUR",
              dataid: "1",
              datadisplay: "home",
              onclick: "console.log(this)",
              display: "block",
              href: "https://fastur.com",
              class: "h1",
              contenteditable: "true",
              background: " ",
              src: "",
              hover: " ",
              size: "3rem",
              id: "title",
              type: "imaged",
              tag: "a"
            }
          ];

          var id = lib.actives[0] || "home";
          document
            .getElementById(id)
            .insertAdjacentHTML("afterbegin", render("client", element));
        }
        if (e == "image") {
          
         if (localStorage.getItem('status') == 0){
           document.getElementById("alignfix").click(); // Click on the checkbox
  localStorage.setItem('status', '1');
        }
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }

          var element = [
            {
              outline: "none",
              name: "",
              dataid: "1",
              datadisplay: "home",
              onclick: "console.log(this)",
              display: "block",
              href: "https://code.fastur.com",
              class: "icon",
              style: "width:100px;height:150px;",
              contenteditable: "true",
              background: " ",
              size: " ",
              src: "https://image.flaticon.com/icons/svg/1001/1001371.svg",
              hover: " ",
              id: "icon",
              type: "imaged",
              tag: "img"
            }
          ];

          var id = lib.actives[0] || "home";
          document
            .getElementById(id)
            .insertAdjacentHTML("afterbegin", render("client", element));
        }
        if (e == "form") {
          
         if (localStorage.getItem('status') == 0){
           document.getElementById("alignfix").click(); // Click on the checkbox
  localStorage.setItem('status', '1');
        }
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }

          var element = [
            {
              outline: "none",
              href: "#login",
              id: "login-button1",
              name: "",
              display: "block",
              dataid: "1",
              datadisplay: "home",
              datalink: "dashboard",
              type: "buttoned",
              margin: "auto",
              width: "100px",
              left: "",
              mobileleft: "",
              tag: "input",
              background: "",
              hover: "pink",
              textcolor: "white",
              ishidden: "home",
              placeholder: "email",
              value: "",
              class: "loginbutton",
              css: ""
            },
            {
              outline: "none",
              href: "#login",
              id: "login-button",
              name: "subscribe",
              display: "block",
              dataid: "1",
              datadisplay: "home",
              datalink: "login",
              type: "buttoned",
              margin: "auto",
              width: "100px",
              left: "",
              mobileleft: "",
              tag: "a",
              background: "",
              hover: "pink",
              textcolor: "white",
              ishidden: "home",
              value: "home",
              class: "loginbuttonhome",
              css: ""
            }
          ];

          var id = lib.actives[0] || "home";
          document
            .getElementById(id)
            .insertAdjacentHTML("afterbegin", render("client", element));
        }
        
        
        
        if(e == "publish"){
                  document.getElementById("mySidenav").style.width = "0px";
           modalContent.innerHTML =
              "<div id='register' class='active' style=''><h3>Your account</h3><p>Enter a username and password for your Fastur account</p><input style='padding:10px;' id='register-name'   type='text' data-display='register'  placeholder='name' class='blank' data-action='0'> <input style='padding:10px;' id='register-email'   type='email' data-display='register'  placeholder='email' class='blank' data-action='0'> <input style='padding:10px;' id='register-password'   type='password' data-display='register'  placeholder='password' class='blank' data-action='0'><br><h3>Your Site</h3><p>Settings for your site</p><input style='padding:10px;' id='title-name'   type='text' data-display='register'  placeholder='title' class='blank' data-action='0'> <input style='padding:10px;' id='description-name'   type='text' data-display='register'  placeholder='description' class='blank' data-action='0'> <br><br><label class='container'>Fastur URL <input type='radio' id='fastur' checked='checked' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Custom Domain <input type='radio' id='custom' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Draft <input type='radio' id='draft' name='radio'> <span class='checkmark'></span> </label><input style='padding:10px;' id='url-name'   type='text' data-display='register'  placeholder='URL' class='blank' data-action='0'>  <br><br><input style='padding:10px;' id='registerm' onclick='lib.login('publish')''  type='submit' value='publish' data-display='register'  placeholder='' class='registerelement' data-action='0'> </div>";
            document.getElementById("myModal").style.display = "block";
          document.getElementById("registerm").onclick = function() {lib.login('publish')};

        }

        if (e == "add") {
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }

          if (lib.click) {
            console.log("click!");
            var json = [
              {
                href: "#home",
                id: "home2",
                name: "home",
                type: "button",
                tag: "a",
                ishidden: "home",
                value: "home",
                class: "element",
                id: "home-button",
                css: ""
              },
              {
                name: "Email",
                placeholder: "Email",
                href: "",
                formtype: "text",
                class: " ",
                id: "subscribeEmail2",
                buttonclass: "element",
                buttonid: "checkout-button-plan_FjwWbksv94sxQ8",
                buttonname: "Subscribe + Pay",
                tag: "input",
                type: "StripeSimple"
              },
              {
                name: "FASTUR",
                href: "",
                class: "maintext",
                id: "maintext2",
                tag: "p",
                type: "text"
              },
              {
                name: "New Site",
                href: "/edit?blank",
                class: "image",
                src: "https://source.unsplash.com/600x400/?work",
                id: "New-Site2",
                type: "image",
                tag: "img"
              },
              {
                text: "<p id='text-01'>text<p>",
                link: "<a id='link-01' href='#'>Link</a>",
                image:
                  "<img id='image-01' class='image' src='https://source.unsplash.com/600x400/?love'></img>",
                form:
                  "<form action='/' method='post' draggable='true' id='form-01' class=''><input id='01-type' name='01'' class='blank' type='hidden' value='01' style='01' placeholder='undefined'><br><input id='01-email' name='email'' class='blank' type='text' value='' style='undefined' placeholder='email'><br><input id='01-password' name='name'' class='blank' type='password' value='' style='undefined' placeholder='password'><br><input id='01-submit' name='01'' class='element' type='submit' value='submit' style='01' placeholder='undefined'><br></form>",
                canvas:
                  "<canvas id='canvas-01' width='200' height='100' style='border:1px solid #000000;'></canvas>"
              }
            ];
            var item = json.find(obj => {
              return obj.type === lib.action;
            });
            var element = [
              {
                tag: "div",
                display: "display:block;",
                element: "element",
                name: "buttons",
                caps: "true",
                align: "center",
                animation: " active",
                id: "buttons"
              }
            ];
            element[0].items = [item];
            elements.push(element);
            var id = lib.actives[0] || "home";
            document
              .getElementById(id)
              .insertAdjacentHTML("afterbegin", render("client", element));
          }
          if (lib.color) {
            console.log("color!");
            var incoming = lib.color;
            var id = lib.actives[0];
            for (var i in elements) {
              if (elements[i].id == id) {
                console.log("FOUND " + id);
                elements[i].background = incoming;
              }
              var items = elements[i].items;
              for (var item in items) {
                if (items[item].id == id) {
                  items[item].background = incoming;
                }
              }
            }
          }
          if (lib.typed) {
            console.log("typed!");

            var latest = [];
            for (var elem in lib.typed) {
              var id = lib.typed[elem].id;
              var time = lib.typed[elem].time;
              if (latest[id]) {
                if (latest[id].time < time) {
                  latest[id] = lib.typed[elem];
                }
              } else {
                latest[id] = lib.typed[elem];
              }
            }
            for (var i in latest) {
              var incoming = latest[i].value;
              var id = latest[i].id;
              for (var el in elements) {
                var items = elements[el].items;
                for (var item in items) {
                  if (items[item].id == id) {
                    items[item].name = incoming;
                  }
                }
              }
            }
          }
          if (lib.drop) {
            console.log("drop!");
            var el = document.getElementById(lib.draggedid);
            var el2 = document.getElementById(lib.drop);
            if (el.dataset.type == "add") {
              el.style.opacity = "1";
            }
            if (el == el2) {
              el.style.opacity = "1";
            }
            el.parentNode.removeChild(el);
            el2.insertAdjacentHTML("afterend", lib.draggedhtml);

            //remove
            console.log("removing");
            var id = lib.draggedid;
            var removeIndex = elements
              .map(function(item) {
                return item.id;
              })
              .indexOf(id);
            if (removeIndex) {
              lib.hold = elements[removeIndex];
            }
            console.log(lib.hold);
            ~removeIndex && elements.splice(removeIndex, 1);

            var el = [];
            for (var element in elements) {
              var items = elements[element].items;
              if (elements[element].id !== id) {
                var it = [];
                for (var item in items) {
                  if (items[item].id !== id) {
                    it.push(items[item]);
                  } else {
                    lib.hold = items[item];
                  }
                }
                elements[element].items = it;
                el.push(elements[element]);
              }
            }
            console.log(lib.hold);

            //add
            var id = lib.drop;

            var addIndex = el
              .map(function(item) {
                return item.id;
              })
              .indexOf(id);
            if (addIndex) {
              el[addIndex + 1] = lib.holde;
            }
            console.log(el);
            var el2 = [];
            for (var element in el) {
              var items = el[element].items;
              if (el[element].id !== id) {
                var it = [];
                for (var item in items) {
                  if (items[item].id !== id) {
                    it.push(items[item]);
                  } else {
                    it.push(items[item]);
                    it.push(lib.hold);
                  }
                }
                el[element].items = it;
                el2.push(el[element]);
              }
            }
            console.log(el2);

            lib.drop = null;
          }

          lib.value = JSON.stringify(elements);
          lib.control();
        }
        if (e == "remove") {
          try {
            var elements = JSON.parse(lib.value);
          } catch (e) {
            var elements = lib.value;
          }
          document.getElementById(lib.actives[0]).remove();
          var id = lib.actives[0];

          var removeIndex = elements
            .map(function(item) {
              return item.id;
            })
            .indexOf(id);
          ~removeIndex && elements.splice(removeIndex, 1);

          var el = [];
          for (var element in elements) {
            var items = elements[element].items;
            if (elements[element].id !== id) {
              var it = [];
              for (var item in items) {
                if (items[item].id !== id) {
                  it.push(items[item]);
                }
              }
              elements[element].items = it;
              el.push(elements[element]);
            }
          }
          lib.value = JSON.stringify(el);
          lib.actives = [];
        }

        if (e == "deletesite") {
          document.getElementById("modal-content").innerHTML =
            "Are you sure you want to delete this site? <br> <a class='element' onclick='lib.deletesite();' href='#'>YES</a>";
          document.getElementById("modal").style.display = "block";

          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
              type: "commit",
              query: code,
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

              if (result.indexOf("html") !== -1) {
                parent.iframetwoname.location.reload();
              } else {
                if (typeof result !== "object") {
                  var result = JSON.parse(result);
                }

                if (result.type == "restartapp") {
                  parent.iframetwoname.location.reload();
                }
              }
            });
          });
        }
        if (e == "download") {
          //var hmtl = render(elements)
        }
        if (e == "puppet") {
          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
              type: "menu",
              query: e,
              site: window.location.href.split("edit?")[1],
              site: "null",
              cookie: lib.cookie("fastur")
            })
          }).then(function(response) {
            var decoder = new TextDecoder();
            var reader = response.body.getReader();
            reader.read().then(function processResult(result) {
              if (result.done) return;
              var result = decoder.decode(result.value, {
                stream: true
              });

              try {
                result = JSON.parse(result);
              } catch (e) {}

              var modal = document.getElementById("modal-content");
              modal.innerHTML = result;
              console.log(result[0]);
              document.getElementById("modal").style.display = "block";
            });
          });
        }
        if (e == "analytics") {
          fetch("/", {
            method: "post",
            mode: "no-cors",
            body: JSON.stringify({
              type: "menu",
              query: e,
              site: window.location.href.split("edit?")[1],
              site: "null",
              cookie: lib.cookie("fastur")
            })
          }).then(function(response) {
            var decoder = new TextDecoder();
            var reader = response.body.getReader();
            reader.read().then(function processResult(result) {
              if (result.done) return;
              var result = decoder.decode(result.value, {
                stream: true
              });

              try {
                result = JSON.parse(result);
              } catch (e) {}

              var modal = document.getElementById("modal-content");
              modal.innerHTML = result;
              console.log(result[0]);
              document.getElementById("modal").style.display = "block";
            });
          });
        }
        if (e == "exit") {
          window.parent.iframetwoname.location.reload();
          window.location.href = "/#dashboard";
        }

        if (e == "video_background") {
          function video_backgrounds(media) {
            for (var i = 0; i < media.length; i++) {
              (function(i) {
                setTimeout(function() {
                  var q = media[i];
                  document.getElementById("uin").innerHTML = q;
                  fetch(
                    "https://firebasestorage.googleapis.com/v0/b/project-7052131960941452854.appspot.com/o/" +
                      q +
                      ".mp4"
                  )
                    .then(function(response) {
                      return response.json();
                    })
                    .then(function(data) {
                      var x =
                        "https://firebasestorage.googleapis.com/v0/b/project-7052131960941452854.appspot.com/o/" +
                        data.name +
                        "?alt=media&token=" +
                        data.downloadTokens;
                      change_video(x);
                    });
                }, 6000 * i);
              })(i);
            }
          }
          video_backgrounds();
        }
        if (e == "video") {
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
          video();
        }
        if (e == "camera") {
          var data = [
            { text: "stop", link: "" },
            { text: "camera", link: "video" }
          ];
          function camera() {
            /*  document.getElementById("modal-content").innerHTML = "<video width='640' height='480' controls> <source src='movie.mp4' type='video/mp4'> Your browser does not support the video tag. </video>"; 
        document.getElementById("modal").style.display = "block";*/

            navigator.getUserMedia =
              navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia;
            if (navigator.getUserMedia) {
              navigator.getUserMedia(
                { audio: false, video: true },
                function(stream) {
                  window.localStream = stream;
                  var video = document.querySelector("video");

                  video.srcObject = localStream;

                  video.onloadedmetadata = function(e) {
                    video.play();
                  };

                  //start recording logic

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

                    //post download to server // add to sites.user.json

                    /*var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);*/
                  }

                  // demo: to download after 9sec
                  setTimeout(event => {
                    console.log("stopping");
                    mediaRecorder.stop();
                  }, 9000);
                },
                function(err) {
                  console.log("The following error occurred: " + err.name);
                }
              );
            } else {
              console.log("getUserMedia not supported");
            }
          }
          camera();
          //stream.getTracks().forEach(track => track.stop())
        }
        if (e == "stop") {
          localStream.getTracks().forEach(track => {
            track.stop();
          });
          lib.menu("uin");
        }
        if (e == "voice") {
          function mic() {
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
          mic();
          function talk(query, background) {
            var q = "Login and create your own voice assistant";
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(q));
            var q = query;
            var background = background;
            Translate(q, "en", get_response);
            function Translate(q, background, callback) {
              var translate_request = new Request(
                "https://www.googleapis.com/language/translate/v2?q=" +
                  q +
                  "&target=" +
                  background +
                  "&key=AIzaSyANwnpMb4fXsGDdMeFIHkQRvetxYoMsAGw",
                {
                  method: "get"
                }
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
                  console.log(Result);
                  var translated_Text =
                    Result.data.translations[0].translatedText;
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
              document.getElementById("Response").innerHTML = translated_Text;
              console.log(translated_Text);
              var msg = new SpeechSynthesisUtterance(translated_Text);
              msg.lang = background;
              window.speechSynthesis.speak(msg);
              msg.onend = function(event) {
                Speech_Recognition();
              };
            }
          }
          talk();
        }
        if (e == "upload") {
          function file_select() {
            var file = document.createElement("input");
            file.type = "file";
            file.name = "file";
            file.id = "file";
            file.className = "file";
            file.setAttribute("style", "width:180px");
            file.setAttribute("multiple", "");
            file.click();
          }
          file_select();

          let photo = document.getElementById("file").files[0];
          let formData = new FormData();

          formData.append("photo", photo);
          fetch("/upload/image", {
            method: "POST",
            body: { type: "upload", body: formData }
          });
        }
        if (e == "annotate") {
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
                document.getElementById("minor").innerHTML = result;

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
                        content: image_uri
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
          annotate();
        }
        if (e == "location") {
          function location() {
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
          }
          location();
        }
        if (e == "time") {
          var data = new Date();
          var date = data.toDateString();
          var time = data.toTimeString();
          var result = date + time;
          var data = [{ text: result, link: "" }];
        }

        if (e == "color") {
          var data = [{ text: "Color Selector", link: "color" }];
        }
        if (e == "DIV") {
          var data = [{ text: "", link: "color" }];
        }
        if (e == "P") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "H1") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "H2") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "H3") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "H4") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "H5") {
          var data = [
            { text: "", link: "color" },
            { text: "font", link: "input" },
            { text: "align", link: "align" }
          ];
        }
        if (e == "IMG") {
          var data = [{ text: "", link: "color" }, { link: "dimension" }];
        }
        if (e == "SPAN") {
          var data = [{ text: "", link: "color" }];
        }
        if (e == "INPUT") {
          var data = [{ text: "", link: "color" }];
        }
        if (e == "FORM") {
          var form = document.getElementById(lib.actives[0]);
          var data = [
            { text: "Form Type", link: "" },
            { text: "Product Name", link: "input" },
            { text: "Product ID", link: "input" },
            { text: "Price", link: "input" },
            { text: "Stripe Key", link: "input", value: form.dataset.stripe },
            { text: "Stripe Secret", link: "input" },
            { text: "onSubmit", link: "input" },
            { text: "onSuccess Invoice?", link: "input" }
          ];
        }
        if (e == "HR") {
          var data = [{ text: "HREF", link: "" }];
        }
        if (e == "BODY") {
          var data = [
            { text: "", link: "color" },
            { text: "width", link: "dimension" },
            { text: "Google Analytics ID", link: "input" }
          ];

          function ga() {
            (function(i, s, o, g, r, a, m) {
              i["GoogleAnalyticsObject"] = r;
              (i[r] =
                i[r] ||
                function() {
                  (i[r].q = i[r].q || []).push(arguments);
                }),
                (i[r].l = 1 * new Date());
              (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
              a.async = 1;
              a.src = g;
              m.parentNode.insertBefore(a, m);
            })(
              window,
              document,
              "script",
              "https://www.google-analytics.com/analytics.js",
              "ga"
            );
            ga("create", '"+gaid+"', "auto");
            ga("send", "pageview");
          }
        }
        if (e == "HTML") {
          var data = [
            { text: "color", link: "color" },
            { text: "url", link: "input" },
            { text: "none", link: "" }
          ];
        }

        if (e == "") {
        } else {
          if (data) {
            data.push(
              {
                type: "add",
                text: "text",
                link: "base",
                action1: "text",
                action2: "link",
                action3: "image"
              },
              {
                action1: "analytics",
                action2: "mic",
                action3: "camera",
                link: "media"
              },
              {
                action1: "undo",
                action2: "redo",
                action3: "download",
                link: "history"
              },
              {
                action1: "duplicate",
                action2: "deletesite",
                action3: "publish",
                link: "save"
              }
            );
            var uform = document.getElementById("uform-li");
            uform.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
              var li = document.createElement("li");
              li.id = data[i].id || data[i].text;
              li.className = "uform-li";
              if (data[i].link == "video") {
                var li = document.createElement("div");
                li.id = data[i].text;
                li.className = "uform-li";
                li.innerHTML =
                  "<video data-action='still' width='200' height='140' controls> <source src='movie.mp4' type='video/mp4'>?</video>";
              } else if (data[i].link == "form") {
                li.innerHTML = render("client", data);
              } else if (data[i].link == "input") {
                li.innerHTML =
                  "<input style='padding: 15px; font-size: 17px; border: none; background: white;' id='" +
                  data[i].text +
                  "' placeholder='" +
                  data[i].text +
                  "' value='" +
                  (data[i].value || "") +
                  "' >";
              } else if (data[i].link == "color") {
                li.innerHTML =
                  "<label id='color-label' ></label> <br><br> <div id='color-picker'> <canvas id='color-block' height='150' width='150'></canvas> <canvas id='color-strip' height='150' width='30'></canvas> </div>";
                lib.cc = 1;
              } else if (data[i].link == "align") {
                li.innerHTML =
                  "<div class='containers'><a class='align-left' draggable='true' data-action='" +
                  data[i].action +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M18.274,237.548h438.542c4.949,0,9.229-1.812,12.847-5.429c3.614-3.612,5.421-7.898,5.421-12.845v-36.547 c0-4.952-1.807-9.231-5.421-12.847c-3.617-3.617-7.897-5.424-12.847-5.424H18.274c-4.952,0-9.233,1.807-12.851,5.424 C1.809,173.495,0,177.778,0,182.727v36.547c0,4.947,1.809,9.233,5.424,12.845C9.044,235.736,13.326,237.548,18.274,237.548z'/> <path d='M18.274,127.909h328.897c4.948,0,9.236-1.809,12.854-5.424c3.613-3.617,5.424-7.898,5.424-12.847V73.091 c0-4.948-1.811-9.229-5.424-12.85c-3.617-3.612-7.905-5.424-12.854-5.424H18.274c-4.952,0-9.233,1.812-12.851,5.424 C1.809,63.858,0,68.143,0,73.091v36.547c0,4.948,1.809,9.229,5.424,12.847C9.044,126.1,13.326,127.909,18.274,127.909z'/> <path d='M506.206,389.147c-3.617-3.617-7.905-5.427-12.85-5.427H18.274c-4.952,0-9.233,1.81-12.851,5.427 C1.809,392.762,0,397.046,0,401.994v36.546c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082 c4.944,0,9.232-1.811,12.85-5.421c3.614-3.621,5.425-7.905,5.425-12.854v-36.546C511.63,397.046,509.82,392.762,506.206,389.147z'/> <path d='M18.274,347.179h365.449c4.948,0,9.233-1.811,12.847-5.428c3.617-3.614,5.428-7.898,5.428-12.847v-36.542 c0-4.945-1.811-9.233-5.428-12.847c-3.613-3.617-7.898-5.428-12.847-5.428H18.274c-4.952,0-9.233,1.811-12.851,5.428 C1.809,283.129,0,287.417,0,292.362v36.545c0,4.948,1.809,9.236,5.424,12.847C9.044,345.371,13.326,347.179,18.274,347.179z'/> </g></g> </svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M493.356,274.088H18.274c-4.952,0-9.233,1.811-12.851,5.428C1.809,283.129,0,287.417,0,292.362v36.545 c0,4.948,1.809,9.236,5.424,12.847c3.621,3.617,7.904,5.432,12.851,5.432h475.082c4.944,0,9.232-1.814,12.85-5.432 c3.614-3.61,5.425-7.898,5.425-12.847v-36.545c0-4.945-1.811-9.233-5.425-12.847C502.588,275.895,498.3,274.088,493.356,274.088z'/> <path d='M493.356,383.721H18.274c-4.952,0-9.233,1.81-12.851,5.427C1.809,392.762,0,397.046,0,401.994v36.546 c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082c4.944,0,9.232-1.811,12.85-5.421 c3.614-3.621,5.425-7.905,5.425-12.854v-36.546c0-4.948-1.811-9.232-5.425-12.847C502.588,385.53,498.3,383.721,493.356,383.721z'/> <path d='M506.206,60.241c-3.617-3.612-7.905-5.424-12.85-5.424H18.274c-4.952,0-9.233,1.812-12.851,5.424 C1.809,63.858,0,68.143,0,73.091v36.547c0,4.948,1.809,9.229,5.424,12.847c3.621,3.616,7.904,5.424,12.851,5.424h475.082 c4.944,0,9.232-1.809,12.85-5.424c3.614-3.617,5.425-7.898,5.425-12.847V73.091C511.63,68.143,509.82,63.861,506.206,60.241z'/> <path d='M493.356,164.456H18.274c-4.952,0-9.233,1.807-12.851,5.424C1.809,173.495,0,177.778,0,182.727v36.547 c0,4.947,1.809,9.233,5.424,12.845c3.621,3.617,7.904,5.429,12.851,5.429h475.082c4.944,0,9.232-1.812,12.85-5.429 c3.614-3.612,5.425-7.898,5.425-12.845v-36.547c0-4.952-1.811-9.231-5.425-12.847C502.588,166.263,498.3,164.456,493.356,164.456z '/> </g> </g> </svg>" +
                  "</a><a class='align-right' draggable='true' data-action='" +
                  data[i].action +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 511.63 511.631' style='enable-background:new 0 0 511.63 511.631;' xml:space='preserve'> <g> <g> <path d='M493.356,383.721H18.274c-4.952,0-9.233,1.81-12.851,5.427C1.809,392.762,0,397.046,0,401.994v36.546 c0,4.948,1.809,9.232,5.424,12.854c3.621,3.61,7.904,5.421,12.851,5.421h475.082c4.944,0,9.232-1.811,12.85-5.421 c3.614-3.621,5.425-7.905,5.425-12.854v-36.546c0-4.948-1.811-9.232-5.425-12.847C502.588,385.53,498.3,383.721,493.356,383.721z'/> <path d='M493.356,274.088H127.91c-4.952,0-9.233,1.811-12.85,5.428c-3.618,3.613-5.424,7.901-5.424,12.847v36.545 c0,4.948,1.807,9.236,5.424,12.847c3.62,3.617,7.901,5.432,12.85,5.432h365.446c4.944,0,9.232-1.814,12.85-5.432 c3.614-3.61,5.425-7.898,5.425-12.847v-36.545c0-4.945-1.811-9.233-5.425-12.847C502.588,275.895,498.3,274.088,493.356,274.088z'/> <path d='M493.356,164.456H54.821c-4.952,0-9.235,1.807-12.85,5.424c-3.617,3.615-5.424,7.898-5.424,12.847v36.547 c0,4.947,1.807,9.233,5.424,12.845c3.619,3.617,7.898,5.429,12.85,5.429h438.535c4.944,0,9.232-1.812,12.85-5.429 c3.614-3.612,5.425-7.898,5.425-12.845v-36.547c0-4.952-1.811-9.231-5.425-12.847C502.588,166.263,498.3,164.456,493.356,164.456z '/> <path d='M506.206,60.241c-3.617-3.612-7.905-5.424-12.85-5.424H164.457c-4.952,0-9.235,1.812-12.85,5.424 c-3.617,3.617-5.426,7.902-5.426,12.85v36.547c0,4.948,1.809,9.229,5.426,12.847c3.619,3.616,7.901,5.424,12.85,5.424h328.899 c4.944,0,9.232-1.809,12.85-5.424c3.614-3.617,5.425-7.898,5.425-12.847V73.091C511.63,68.143,509.82,63.861,506.206,60.241z'/> </g> </g> </svg>" +
                  "</a> </div>";
              } else if (data[i].link == "history") {
                li.innerHTML =
                  "<div class='containers'><a class='align-left' draggable='true' data-action='" +
                  data[i].action1 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512.00241' width='15pt'><path d='m256 .00390625c-62.675781 0-123.605469 23.08203175-171.09375 62.26953175l-57.597656-57.597657c-4.585938-4.566406-11.457032-5.933593-17.429688-3.457031-5.972656 2.472656-9.878906 8.296875-9.878906 14.785156v138.664063c0 8.832031 7.167969 16 16 16h138.667969c6.484375 0 12.308593-3.902344 14.785156-9.875 2.472656-5.972657 1.109375-12.84375-3.480469-17.429688l-50.75-50.773437c39.445313-31.425782 89.363282-49.921875 140.777344-49.921875 117.632812 0 213.335938 95.703125 213.335938 213.335937 0 117.628906-95.703126 213.332032-213.335938 213.332032-56.9375 0-110.503906-22.207032-150.804688-62.527344-8.339843-8.34375-21.824218-8.34375-30.164062 0-8.34375 8.339844-8.34375 21.824218 0 30.164062 48.363281 48.382813 112.640625 75.03125 180.96875 75.03125 141.164062 0 256-114.839844 256-256 0-141.164062-114.835938-255.99999975-256-255.99999975zm0 0'/></svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action2 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512' width='15pt'><path d='m502.121094 1.214844c-5.972656-2.453125-12.863282-1.109375-17.429688 3.476562l-57.597656 57.601563c-47.488281-39.210938-108.417969-62.292969-171.09375-62.292969-141.164062 0-256 114.835938-256 256s114.835938 256 256 256c68.332031 0 132.609375-26.644531 180.96875-75.03125 8.34375-8.339844 8.34375-21.820312 0-30.164062-8.339844-8.339844-21.820312-8.339844-30.164062 0-40.296876 40.320312-93.867188 62.527343-150.804688 62.527343-117.632812 0-213.332031-95.699219-213.332031-213.332031s95.699219-213.332031 213.332031-213.332031c51.414062 0 101.332031 18.496093 140.777344 49.917969l-50.75 50.773437c-4.585938 4.585937-5.929688 11.457031-3.476563 17.429687 2.472657 5.972657 8.296875 9.878907 14.78125 9.878907h138.667969c8.832031 0 16-7.167969 16-16v-138.667969c0-6.484375-3.902344-12.308594-9.878906-14.785156zm0 0'/></svg>" +
                  "</a><a class='align-right' draggable='true' data-action='" +
                  data[i].action3 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-56 0 512 512' height='20px' width='20px'><path d='m395.980469 112.582031-108.023438-108.023437c-2.960937-2.960938-6.949219-4.558594-11.019531-4.558594h-156.339844c-8.597656 0-15.578125 6.980469-15.578125 15.578125v89.445313h-89.441406c-8.597656 0-15.578125 6.976562-15.578125 15.578124v375.820313c0 8.597656 6.980469 15.578125 15.578125 15.578125h264.359375c8.601562 0 15.582031-6.980469 15.582031-15.578125v-89.445313h89.441407c8.597656 0 15.578124-6.976562 15.578124-15.578124v-267.796876c0-3.960937-1.523437-7.984374-4.558593-11.019531zm-26.597657 263.238281h-73.863281v-147.195312c0-4.035156-1.570312-8.03125-4.5625-11.023438l-108.019531-108.019531c-2.933594-2.9375-6.914062-4.5625-11.019531-4.5625h-35.738281v-73.863281h125.179687v92.445312c0 8.597657 6.980469 15.578126 15.578125  15.578126h92.445312zm-105.023437 105.023438h-233.203125v-344.664062h125.179688v92.445312c0 8.597656 6.980468 15.578125 15.582031 15.578125h92.441406zm-76.863281-322.636719 54.835937 54.835938h-54.835937zm159.855468-50.183593h-54.835937v-54.835938c6.855469 6.851562 49.367187 49.367188 54.835937 54.835938zm0 0'/></svg>" +
                  "</a> </div>";
              } else if (data[i].link == "base") {
                li.innerHTML =
                  "<div class='containers'><a class='align-left' draggable='true' data-action='" +
                  data[i].action1 +
                  "' data-type='" +
                  data[i].type +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='enable-background:new 0 0 340.111 340.111;' viewBox='0 0 340.111 340.111' width='20px' height='20px' y='0px' x='0px' id='Layer_1' version='1.1'> <g> <polygon style='fill:#333E48;' points='340.111,76.316 340.111,65.175 292.206,65.175 292.206,76.316 310.588,76.316    310.588,263.794 292.206,263.794 292.206,274.935 340.111,274.935 340.111,263.794 321.729,263.794 321.729,76.316  '/> <g> <path style='fill:#1E252B;' d='M2.067,229.59l56.068-126.615c3.909-8.731,11.03-14.018,20.684-14.018h2.068    c9.648,0,16.544,5.286,20.449,14.018l56.07,126.615c1.149,2.528,1.84,4.825,1.84,7.124c0,9.421-7.354,17.004-16.776,17.004    c-8.272,0-13.788-4.825-17.004-12.18l-10.799-25.275H43.891l-11.26,26.426c-2.988,6.893-8.961,11.029-16.315,11.029    C7.121,253.718,0,246.365,0,237.173C0,234.645,0.918,232.118,2.067,229.59z M101.568,185.011l-22.291-53.082l-22.289,53.082    H101.568z'/> <path style='fill:#1E252B;' d='M176.011,216.951v-0.46c0-26.885,20.452-39.294,49.635-39.294c12.41,0,21.373,2.068,30.105,5.056    v-2.068c0-14.478-8.963-22.519-26.427-22.519c-9.651,0-17.464,1.378-24.128,3.447c-2.067,0.689-3.447,0.918-5.058,0.918    c-8.04,0-14.474-6.204-14.474-14.246c0-6.205,3.905-11.49,9.419-13.559c11.03-4.136,22.981-6.434,39.296-6.434    c19.071,0,32.86,5.055,41.593,13.787c9.191,9.191,13.327,22.75,13.327,39.295v56.068c0,9.423-7.583,16.775-17.005,16.775    c-10.111,0-16.774-7.123-16.774-14.477v-0.23c-8.502,9.421-20.224,15.625-37.226,15.625    C195.083,254.637,176.011,241.311,176.011,216.951z M256.208,208.908v-6.204c-5.974-2.757-13.787-4.596-22.289-4.596    c-14.938,0-24.128,5.975-24.128,17.004v0.46c0,9.422,7.813,14.936,19.072,14.936C245.178,230.509,256.208,221.548,256.208,208.908    z'/> </g> </g> </svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action2 +
                  "' data-type='" +
                  data[i].type +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 512.092 512.092'  width='20px' height='20px' style='enable-background:new 0 0 512.092 512.092;' xml:space='preserve'> <g> <g> <path d='M312.453,199.601c-6.066-6.102-12.792-11.511-20.053-16.128c-19.232-12.315-41.59-18.859-64.427-18.859    c-31.697-0.059-62.106,12.535-84.48,34.987L34.949,308.23c-22.336,22.379-34.89,52.7-34.91,84.318    c-0.042,65.98,53.41,119.501,119.39,119.543c31.648,0.11,62.029-12.424,84.395-34.816l89.6-89.6    c1.628-1.614,2.537-3.816,2.524-6.108c-0.027-4.713-3.87-8.511-8.583-8.484h-3.413c-18.72,0.066-37.273-3.529-54.613-10.581    c-3.195-1.315-6.867-0.573-9.301,1.877l-64.427,64.512c-20.006,20.006-52.442,20.006-72.448,0    c-20.006-20.006-20.006-52.442,0-72.448l108.971-108.885c19.99-19.965,52.373-19.965,72.363,0    c13.472,12.679,34.486,12.679,47.957,0c5.796-5.801,9.31-13.495,9.899-21.675C322.976,216.108,319.371,206.535,312.453,199.601z'/> </g> </g> <g> <g> <path d='M477.061,34.993c-46.657-46.657-122.303-46.657-168.96,0l-89.515,89.429c-2.458,2.47-3.167,6.185-1.792,9.387    c1.359,3.211,4.535,5.272,8.021,5.205h3.157c18.698-0.034,37.221,3.589,54.528,10.667c3.195,1.315,6.867,0.573,9.301-1.877    l64.256-64.171c20.006-20.006,52.442-20.006,72.448,0c20.006,20.006,20.006,52.442,0,72.448l-80.043,79.957l-0.683,0.768    l-27.989,27.819c-19.99,19.965-52.373,19.965-72.363,0c-13.472-12.679-34.486-12.679-47.957,0    c-5.833,5.845-9.35,13.606-9.899,21.845c-0.624,9.775,2.981,19.348,9.899,26.283c9.877,9.919,21.433,18.008,34.133,23.893    c1.792,0.853,3.584,1.536,5.376,2.304c1.792,0.768,3.669,1.365,5.461,2.048c1.792,0.683,3.669,1.28,5.461,1.792l5.035,1.365    c3.413,0.853,6.827,1.536,10.325,2.133c4.214,0.626,8.458,1.025,12.715,1.195h5.973h0.512l5.12-0.597    c1.877-0.085,3.84-0.512,6.059-0.512h2.901l5.888-0.853l2.731-0.512l4.949-1.024h0.939c20.961-5.265,40.101-16.118,55.381-31.403    l108.629-108.629C523.718,157.296,523.718,81.65,477.061,34.993z'/> </g> </g> </svg>" +
                  "</a><a class='align-right' draggable='true' data-action='" +
                  data[i].action3 +
                  "' data-id='" +
                  data[i].id +
                  "' data-type='" +
                  data[i].type +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 58 58'  width='20px' height='20px' style='enable-background:new 0 0 58 58;' xml:space='preserve'> <g> <path d='M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z'/> <path d='M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568   S14.032,19,16,19z'/> <path d='M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z'/> </g> </svg>" +
                  "</a> </div>";
              } else if (data[i].link == "save") {
                li.innerHTML =
                  "<div class='containers'><a class='align-left' draggable='true' data-action='" +
                  data[i].action1 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' height='15pt' viewBox='0 0 512 512' width='15pt'><path d='m409.785156 278.5-153.785156 153.785156-153.785156-153.785156 28.285156-28.285156 105.5 105.5v-355.714844h40v355.714844l105.5-105.5zm102.214844 193.5h-512v40h512zm0 0'/></svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action2 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 408.483 408.483' style='enable-background:new 0 0 408.483 408.483;' xml:space='preserve'> <g> <g> <path d='M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z'/> <path d='M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z'/> </g> </g> </svg>" +
                  "</a><a class='align-right' draggable='true' data-action='" +
                  data[i].action3 +
                  "' data-id='" +
                  data[i].id +
                  "' pointer-events='none' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' width='20px' height='20px' x='0px' y='0px' viewBox='0 0 49 49' style='enable-background:new 0 0 49 49;' xml:space='preserve'> <g> <rect x='27.5' y='5' width='6' height='10'/> <path d='M39.914,0H0.5v49h48V8.586L39.914,0z M10.5,2h26v16h-26V2z M39.5,47h-31V26h31V47z'/> <path d='M13.5,32h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,32,13.5,32z'/> <path d='M13.5,36h10c0.553,0,1-0.447,1-1s-0.447-1-1-1h-10c-0.553,0-1,0.447-1,1S12.947,36,13.5,36z'/> <path d='M26.5,36c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71c-0.37-0.37-1.04-0.37-1.41,0 c-0.19,0.189-0.3,0.439-0.3,0.71c0,0.27,0.109,0.52,0.29,0.71C25.979,35.89,26.229,36,26.5,36z'/> </g> </svg>" +
                  "</a> </div>";
              } else if (data[i].link == "form") {
                li.innerHTML =
                  "<div class='dimension'><a class='align-left' draggable='true' data-action='" +
                  data[i].action1 +
                  "' data-type='" +
                  data[i].type +
                  "' data-id='" +
                  data[i].id +
                  "' href='" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='30' height='30' viewBox='0 0 16 16'> <path fill='#444444' d='M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z'/> <path fill='#444444' d='M2 6h1v4h-1v-4z'/> </svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action2 +
                  "' data-type='" +
                  data[i].type +
                  "' data-id='" +
                  data[i].id +
                  "' href='" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 512 512' width='30px' height='30px'><title>Card</title><g id='_Group_' data-name=' Group '><path d='M484,359v16.12a30,30,0,0,1-30,30H58a30,30,0,0,1-30-30V359H484Z' style='fill:#00efd1'/><polygon points='484 300.65 484 359 28.6 359 28 359 28 300.65 28.6 300.65 484 300.65' style='fill:#00acea'/><path d='M484,136.88V300.65H28V136.88a30,30,0,0,1,30-30H454A30,30,0,0,1,484,136.88Z' style='fill:#00efd1'/><path d='M393.04,171.31c15.3,0,27.71,13.19,27.71,29.47s-12.41,29.48-27.71,29.48a27.3,27.3,0,0,1-23.19-13.35,31.041,31.041,0,0,0,0-32.26A27.31,27.31,0,0,1,393.04,171.31Z' style='fill:#fedb41'/><ellipse cx='369.85' cy='200.78' rx='4.52' ry='16.13' style='fill:#fedb41'/><path d='M346.66,171.31a27.31,27.31,0,0,1,23.19,13.34,31.041,31.041,0,0,0,0,32.26,27.3,27.3,0,0,1-23.19,13.35c-15.31,0-27.71-13.2-27.71-29.48S331.35,171.31,346.66,171.31Z' style='fill:#f4b844'/><rect x='82.82' y='181.56' width='106.01' height='38.45' style='fill:#00acea'/></g></svg>" +
                  "</a></div>";
              } else if (data[i].link == "dimension") {
                li.innerHTML =
                  "<div class='dimension'><input id='heightrange' type='range' class='meter' value='50' min='0' max='100' ><input id='widthrange' type='range' class='meter' value='50' min='0' max='100' ></div>";
                lib.dd = 1;
              } else if (data[i].link == "media") {
                li.innerHTML =
                  "<div class='containers'><a class='align-left' draggable='true' data-action='" +
                  data[i].action1 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 47.001 47.001' style='enable-background:new 0 0 47.001 47.001;' xml:space='preserve'> <g> <g> <path d='M41.188,9.372c0-0.837-0.85-1.081-1.512-1.229v2.434C40.414,10.527,41.188,10.181,41.188,9.372z'/> <path d='M38.938,4.185C38.102,4.209,37.56,4.702,37.56,5.23c0,0.615,0.458,0.971,1.379,1.155L38.938,4.185L38.938,4.185z'/> <path d='M39.283,14.867c4.1,0,7.434-3.335,7.434-7.433S43.382,0,39.283,0c-4.101,0-7.436,3.335-7.436,7.434     C31.847,11.532,35.182,14.867,39.283,14.867z M36.014,5.512c0-1.67,1.389-2.533,2.925-2.581V2.277     c0-0.211,0.159-0.419,0.367-0.419c0.21,0,0.37,0.208,0.37,0.419v0.654c0.957,0.025,2.926,0.626,2.926,1.833     c0,0.479-0.358,0.761-0.775,0.761c-0.801,0-0.788-1.315-2.15-1.34v2.336c1.624,0.344,3.06,0.824,3.06,2.717     c0,1.646-1.229,2.483-3.06,2.594v0.76c0,0.21-0.16,0.419-0.37,0.419c-0.208,0-0.367-0.209-0.367-0.419v-0.76     c-2.077-0.051-3.109-1.292-3.109-2.264c0-0.49,0.296-0.774,0.761-0.774c1.377,0,0.307,1.696,2.349,1.783v-2.57     C37.118,7.675,36.014,6.877,36.014,5.512z'/> <path d='M9.355,33.113H2.946c-1.18,0-2.136,0.957-2.136,2.137v9.613C0.811,46.045,1.768,47,2.946,47h6.409     c1.18,0,2.136-0.955,2.136-2.137V35.25C11.492,34.07,10.536,33.113,9.355,33.113z'/> <path d='M25.919,25.637H19.51c-1.18,0-2.136,0.957-2.136,2.137v17.091c0,1.182,0.957,2.137,2.136,2.137h6.409     c1.18,0,2.137-0.955,2.137-2.137V27.771C28.056,26.594,27.1,25.637,25.919,25.637z'/> <path d='M42.486,17.091h-6.408c-1.181,0-2.137,0.957-2.137,2.136v25.636c0,1.182,0.957,2.137,2.137,2.137h6.408     c1.181,0,2.137-0.955,2.137-2.137V19.228C44.624,18.048,43.667,17.091,42.486,17.091z'/> <path d='M29.675,10.972L24.37,9.863c-0.406-0.084-0.824,0.073-1.073,0.404c-0.249,0.332-0.283,0.777-0.088,1.144l1.176,2.211     L0.863,25.755c-0.524,0.271-0.73,0.916-0.459,1.438c0.19,0.367,0.563,0.578,0.95,0.578c0.165,0,0.332-0.037,0.489-0.119     l23.544-12.145l1.079,2.028c0.186,0.35,0.549,0.567,0.943,0.567c0.018,0,0.035-0.001,0.054-0.002     c0.414-0.021,0.779-0.279,0.935-0.663l2.049-5.018c0.12-0.294,0.104-0.625-0.046-0.905C30.25,11.237,29.985,11.038,29.675,10.972     z'/> </g> </g> </svg>" +
                  "</a><a class='align-center' draggable='true' data-action='" +
                  data[i].action2 +
                  "' data-id='" +
                  data[i].id +
                  "' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg' id='Capa_1' enable-background='new 0 0 512 512' height='20px' viewBox='0 0 512 512' width='20px'><path d='m46.443 0v512h419.113v-512zm389.114 482h-359.114v-452h89.89v70.333h179.334v-70.333h89.89zm-119.89-452v40.333h-119.334v-40.333z'/><path d='m194.832 155.667h183.835v30h-183.835z'/><path d='m133.333 155.667h31.499v30h-31.499z'/><path d='m194.832 219.667h183.835v30h-183.835z'/><path d='m133.333 219.667h31.499v30h-31.499z'/><path d='m133.333 283.667h31.499v30h-31.499z'/><path d='m194.832 283.667h183.835v30h-183.835z'/><path d='m133.333 379.667h80v30h-80z'/><path d='m298.667 394.787-21.394-21.393-21.213 21.212 42.607 42.607 63.939-63.94-21.212-21.213z'/></svg>" +
                  "</a><a class='align-right' draggable='true' data-action='" +
                  data[i].action3 +
                  "' data-id='" +
                  data[i].id +
                  "' pointer-events='none' href='#" +
                  (data[i].link || "#") +
                  "'>" +
                  "<svg xmlns='http://www.w3.org/2000/svg'  xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xml:space='preserve' width='20px' height='20px'> <g> <path d='M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368   C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8   V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6   h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z'/> <path d='M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16   s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z'/> <path d='M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10   s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z'/> <path d='M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2   s2,0.897,2,2S53.103,25.5,52,25.5z'/> </g> </svg>" +
                  "</a> </div>";
              } else {
                li.innerHTML =
                  "<a id='id+" +
                  data[i].text +
                  "' draggable='true' data-action='" +
                  data[i].text +
                  "' data-type='" +
                  data[i].type +
                  "' href='" +
                  (data[i].link || "#") +
                  "'>" +
                  data[i].text +
                  "</a>";
              }

              li.onclick = lib.menu;
              uform.appendChild(li);

              if (lib.form == 1) {
                var form = document.getElementById(lib.actives[0]);
                console.log(form);
                console.log(form.dataset.stripe);
              }
              if (lib.cc == 1) {
                var colorBlock = document.getElementById("color-block");
                var ctx1 = colorBlock.getContext("2d");
                var width1 = colorBlock.width;
                var height1 = colorBlock.height;

                var colorStrip = document.getElementById("color-strip");
                var ctx2 = colorStrip.getContext("2d");
                var width2 = colorStrip.width;
                var height2 = colorStrip.height;

                var colorLabel = document.getElementById("color-label");
                colorLabel.style.background = "red";

                var x = 0;
                var y = 0;
                var drag = false;
                var rgbaColor = "rgba(255,0,0,1)";

                ctx1.rect(0, 0, width1, height1);
                fillGradient();

                ctx2.rect(0, 0, width2, height2);
                var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
                grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
                grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
                grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
                grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
                grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
                grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
                grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
                ctx2.fillStyle = grd1;
                ctx2.fill();

                function click(e) {
                  x = e.offsetX;
                  y = e.offsetY;
                  var imageData = ctx2.getImageData(x, y, 1, 1).data;
                  rgbaColor =
                    "rgba(" +
                    imageData[0] +
                    "," +
                    imageData[1] +
                    "," +
                    imageData[2] +
                    ",1)";
                  lib.selected = rgbaColor;
                  fillGradient();
                }

                function fillGradient() {
                  ctx1.fillStyle = rgbaColor;
                  ctx1.fillRect(0, 0, width1, height1);

                  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
                  grdWhite.addColorStop(0, "rgba(255,255,255,1)");
                  grdWhite.addColorStop(1, "rgba(255,255,255,0)");
                  ctx1.fillStyle = grdWhite;
                  ctx1.fillRect(0, 0, width1, height1);

                  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
                  grdBlack.addColorStop(0, "rgba(0,0,0,0)");
                  grdBlack.addColorStop(1, "rgba(0,0,0,1)");
                  ctx1.fillStyle = grdBlack;
                  ctx1.fillRect(0, 0, width1, height1);
                }

                function mousedown(e) {
                  drag = true;
                  changeColor(e);
                }

                function mousemove(e) {
                  if (drag) {
                    changeColor(e);
                  }
                }

                function mouseup(e) {
                  drag = false;
                }

                function changeColor(e) {
                  x = e.offsetX;
                  y = e.offsetY;
                  var imageData = ctx1.getImageData(x, y, 1, 1).data;
                  rgbaColor =
                    "rgba(" +
                    imageData[0] +
                    "," +
                    imageData[1] +
                    "," +
                    imageData[2] +
                    ",1)";
                  function RGBAToHexA(r, g, b, a) {
                    r = r.toString(16);
                    g = g.toString(16);
                    b = b.toString(16);
                    a = Math.round(a * 255).toString(16);

                    if (r.length == 1) r = "0" + r;
                    if (g.length == 1) g = "0" + g;
                    if (b.length == 1) b = "0" + b;
                    if (a.length == 1) a = "0" + a;

                    return "#" + r + g + b + a;
                  }
                  rgbaColor = RGBAToHexA(
                    imageData[0],
                    imageData[1],
                    imageData[2],
                    1
                  );

                  if (lib.actives[0] == "pagebody") {
                    var body = document.getElementsByTagName("body")[0];
                    body.style.backgroundImage = "none";
                  }

                  colorLabel.style.backgroundColor = rgbaColor;
                  lib.color = rgbaColor;
                  document.getElementById("input").value = rgbaColor;

                  var el = document.getElementById(lib.actives[0]);
                  el.style.backgroundColor = rgbaColor;
                }

                colorStrip.addEventListener("click", click, false);

                colorBlock.addEventListener("mousedown", mousedown, false);
                colorBlock.addEventListener("mouseup", mouseup, false);
                colorBlock.addEventListener("mousemove", mousemove, false);

                lib.cc = 0;
              }
              if (lib.dd == 1) {
                var a = document.getElementById("heightrange");
                a.addEventListener("input", run);
                function run() {
                  var el = document.getElementById(lib.actives[0]);
                  el.style.height = a.value + "%";
                }
                var b = document.getElementById("widthrange");
                b.addEventListener("input", run2);
                function run2() {
                  var el = document.getElementById(lib.actives[0]);
                  el.style.width = a.value + "%";
                }
                lib.dd = 0;
              }

              document.getElementById("uform-ul").appendChild(uform);
            }
          }
        }
      },
      closeNav: function() {
        document.getElementById("mySidenav").style.width = "0px";
      },
      mainmenu: function mainmenu(e) {
        modalContent.innerHTML =
          "<div class='inner'><ul><li><a href='#dashboard'><h2 data-link='dashboard'>Dashboard</h2><p data-link='dasboard'>Open your account dashboard</p></a></li><li><a href='#docs'><h2 data-link='docs'>Documentation</h2><p data-link='docs'>Get answers and instructions</p></a></li><li><a href='#pro'><h2 data-link='pro'>Go Pro!</h2><p data-link='pro'>Upgrade your Fastur account</p></a></li><li><a href='#contact'><h2 data-link='contact'>Contact</h2><p data-link='contact'>Send your questions and comments</p></a></li><li><a data-link='login' href='#login'><h2 data-link='login'>Log In</h2><p data-link='login'>Log in to your account</p></a></li><li><a href='#register'><h2 data-link='register'>Register</h2><p data-link='register'>Create a new account</p></a></li></ul></div>";
        document.getElementById("myModal").style.display = "block";
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
      login: function login(e, a, o, u, s, b) {
        if (e == "build") {
          var type = "build";
        } else if (e == "image") {
          var type = "image";
        } else if (e == "publish") {
          var type = "publish";
                     
          var href = window.location.href.split('?')[1]
          var a = href.split('#')[0]
          var register_name = document.getElementById("register-name").value;
          var register_email = document.getElementById("register-email").value;
          var register_password = document.getElementById("register-password").value;          
          var register_title = document.getElementById("title-name").value;
          var register_description = document.getElementById("description-name").value;
          var register_url = document.getElementById("url-name").value;
          var radios = document.getElementsByName('radio');
          for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
              // do whatever you want with the checked radio
              var site = radios[i].id;
              console.log(radios[i])
              // only one radio can be logically checked, don't check the rest
              break;
            }
          }          
            var elements = lib.value;

          console.log(elements)
          
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
          register_name:register_name,
          register_email:register_email,
          register_password:register_password,
          register_description:register_description,
          register_url:register_url,
          site:site,
          type: type,
          input: a,
          size: s,
          bytes: b,
          part: o,
          name: u,
          modifier: "editor",
          query: elements,
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
             
              document.getElementById("uform-li").innerHTML = result.data;
            }
            if (result.type == "image") {
              var image = lib.image;
              var part = result.part;
              var size = result.size;
              var bytes = result.bytes;
              image.push({ part, size, bytes });
              lib.image = image;

              lib.compare();
              lib.load(size, bytes);
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
      load: function load(e, a) {
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
        console.log(width);
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
        if (width >= 100) {
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
        part++;
      },
      compare: function compare(e) {
        var image = lib.image;
        var parts = lib.imageparts;

        //for var i in parts
        //if not in image
        //resend that part
      },
      edit: function(e) {
        modalContent.innerHTML =
          "<b>Useful Instructions!</b><br><br>Click on an element to see its settings panel<br><br>The conversational builder uses the formula:<br><b>change *ID* *property* to *value*</b><br><br> for example, you can type in: 'change title background to blue'<br><br>When you are ready to publish, click <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' width='20px' height='20px' x='0px' y='0px' viewBox='0 0 49 49' style='enable-background:new 0 0 49 49;' xml:space='preserve'> <g> <rect x='27.5' y='5' width='6' height='10'/> <path d='M39.914,0H0.5v49h48V8.586L39.914,0z M10.5,2h26v16h-26V2z M39.5,47h-31V26h31V47z'/> <path d='M13.5,32h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,32,13.5,32z'/> <path d='M13.5,36h10c0.553,0,1-0.447,1-1s-0.447-1-1-1h-10c-0.553,0-1,0.447-1,1S12.947,36,13.5,36z'/> <path d='M26.5,36c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71c-0.37-0.37-1.04-0.37-1.41,0 c-0.19,0.189-0.3,0.439-0.3,0.71c0,0.27,0.109,0.52,0.29,0.71C25.979,35.89,26.229,36,26.5,36z'/> </g> </svg><br><br> Create an account with stripe.com<br>You will need to copy stripe api keys to your fastur site <br><br>Type in help to bring up this help modal ";
        document.getElementById("myModal").style.display = "block";

        function loaddb(){
                    
          var href = window.location.href;
          var href = href.split('?')[1]
          var id = href.split('#')[0]
           fetch("api/" +id +".json").then(function(response) {
             return response.text();
           }).then(function(data) {
             console.log(data)
                       lib.value = data;
           });
        }
        loaddb()
        
        
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
              "<div id='register' class='active' style=''><h3>Your account</h3><p>Enter a username and password for your Fastur account</p><input style='padding:10px;' id='register-name'   type='text' data-display='register'  placeholder='name' class='blank' data-action='0'> <input style='padding:10px;' id='register-email'   type='email' data-display='register'  placeholder='email' class='blank' data-action='0'> <input style='padding:10px;' id='register-password'   type='password' data-display='register'  placeholder='password' class='blank' data-action='0'><br><h3>Your Site</h3><p>Settings for your site</p><input style='padding:10px;' id='title-name'   type='text' data-display='register'  placeholder='title' class='blank' data-action='0'> <input style='padding:10px;' id='description-name'   type='text' data-display='register'  placeholder='description' class='blank' data-action='0'> <br><br><label class='container'>Fastur URL <input type='radio' id='fastur' checked='checked' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Custom Domain <input type='radio' id='custom' name='radio'> <span class='checkmark'></span> </label> <label class='container'>Draft <input type='radio' id='draft' name='radio'> <span class='checkmark'></span> </label><input style='padding:10px;' id='url-name'   type='text' data-display='register'  placeholder='URL' class='blank' data-action='0'>  <br><br><input style='padding:10px;' id='register' onclick='lib.login('publish')''  type='submit' value='publish' data-display='register'  placeholder='' class='registerelement' data-action='0'> </div>";
            document.getElementById("myModal").style.display = "block";
          } else if (action[0] == "email") {
            lib.login("email");
          } else if (action[0] == "help") {
            document.getElementById("mySidenav").style.width = "0px";
            modalContent.innerHTML =
              "<b>Useful Instructions!</b><br><br>Click on an element to see its ID<br><br>Use the form! Type in:<br>'change *ID* *content/color/background/border* to *value*' <br> <br>When you are ready to publish, Type in:<br>'publish to *demo*'<br><br>use the <a href='https://www.w3schools.com/cssref/'> CSS ref</a> to expand your vocabulary and capabilities<br><br> Create an account with stripe.com<br>You will need to copy stripe api keys to your fastur site<br>on fastur.com type in stripe to set your stripe keys <br><br>Type in help to bring up this help modal ";
            document.getElementById("myModal").style.display = "block";
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

        var contents = document.querySelectorAll("[data-action]");
        [].forEach.call(contents, function(content) {
          content.addEventListener(
            "click",
            function(event) {
              //event.preventDefault();
              lib.menu(event);

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
                    document.getElementById(event.target.id).src =
                      reader.result;
                    var blob = reader.result;
                    var size = blob.length;
                    var BYTES_PER_CHUNK = 1024;
                    var start = 0;
                    var end = BYTES_PER_CHUNK;
                    var part = 0;
                    while (start < size) {
                      var chunk = blob.slice(start, end);
                      lib.login(
                        "image",
                        chunk,
                        part,
                        "image",
                        size,
                        BYTES_PER_CHUNK
                      );

                      var image = lib.imagepart;
                      image.push({ part, size, BYTES_PER_CHUNK });
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
        });
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
        if (window.location.hash) {
          var hashed = window.location.hash.split("#")[1];
          hashUpdate(hashed);
        }
        

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
        console.log('okay');
document.addEventListener("click", function(){
console.log(event.target.dataset.link) 
console.log('ok')
            console.log(event.target.dataset.link);
            var target = event.target.dataset.link;

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
          style:
            "padding: 15px; font-size: 17px; border: none; background: white;",
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
          style:"padding: 10px; ",
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
        }
      );
    }
  }
  var body = "";
  var css = ` `;
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
  var uform = "";
  var menuC = 0;
  var gridC = 0;
  var homeC = 0;
  var loginC = 0;
  var registerC = 0;
  var dashboardC = 0;
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

 var element = "<" + (b.tag || "div") + " href='" + b.href + "' style='" + (b.style || "padding:0px;") + "' id='" + (b.id || "card") + "' onclick=" + (b.onclick || "") + " src='" + (b.src || "") + "' contenteditable='" + (b.contenteditable || " ") + "' type='" + (b.formtype || "") + "' value='" + (b.value || "") + "' data-display='" + (b.datadisplay || "") + "' data-link='" + (b.datalink || "") + "' placeholder='" + (b.placeholder || "") + "' class='" + (b.class || b.animation || "card") + "' data-action='" + (b.dataid || "") + "' > " + (b.name || "") + "<" + (b.close || "/") + (b.tag || "div") + ">";
    var flexArray = flexArray || []
    
    if(b.flex){ 
      flexArray.push(b)
    }
    if (b.datadisplay == "menu") { 
      menuC + 1;
      menu += element;
    }
    if (b.datadisplay == "home") {
      homeC = homeC + 1;
      if (homeC < 8) {
        home += "<div class='flexbox'>" + element + "</div>";
      } else if (homeC < 10) {
        homeTwo += "<div class='flexbox'>" + element + "</div>";
      } else if (homeC < 12) {
        homeThree += "<div class='flexbox'>" + element + "</div>";
      } else if (homeC < 14) {
        homeFour += "<div class='flexbox'>" + element + "</div>";
      } else {
        homeFive += "<div class='flexbox'>" + element + "</div>";
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
          "<div class='flexbox'>" + element + "</div>";
      } else {
        dashboardTwo +=
          "<div class='flexbox'>" + element + "</div>";
      }
    } 
    if (b.datadisplay == "uform") {
      uformC + 1;
      uform += element;
    } 
  }  
  {  
    var flexString = "";
    for (var i in flexArray){ 
    if (flexArray[i].flex){
       flexString += "<div id='"+flexArray[i].id+"' class='flex'>"
    } else {
       flexString += "<div id='"+flexArray[i].id+"' class='active' style='display:block'>" 
      }
    }

    body +=   
      "<div id='menu' class='active' style='display:flex; padding:5px;'>" + menu + "</div>" +
      "<div id='home' class='active' style='display:block'>" +  home + "</div>" +
      "<div class='flex'>" + homeTwo + "</div>" +
      "<div class='flex'>" + homeThree + "</div>"+
      "<div class='flex'>" + homeFour + "</div>"+
      "<div class='flex'>" + homeFive + "</div></div>" +
      "<div id='login' class='inactive' style='display:none'>" + login + "</div>" +
      "<div id='register' class='inactive' style='display:none'>" + register + "</div>" +
      "<div id='dashboard' class='inactive' style='display:none'><div class='flex'>" + dashboard + "</div><div class='flex'>" + dashboardTwo + "</div></div>" +
      "<div id='uform' class='active' style='display:block'>" + uform + "</div>"+
      "<div id='myModal' class='modal'><div class='modal-content'> <span class='close'>&times;</span> <p id='modalContent'></p> </div></div><div id='mySidenav' class='sidenav'> <a href='javascript:void(0)' data-link='closenav' class='closebtn' onclick='lib.closeNav()'>&times;</a> <h2>Settings</h2> <div id='uform-ul'></div> <div id='uform-li'></div></div>";
  }
  if (elements) { 
    var html =
      "<html lang='en'><head><script async src='https://www.googletagmanager.com/gtag/js?id=UA-110802733-4'></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-110802733-4'); </script><link rel='stylesheet' type='text/css' href='api/style.css'><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'>" +
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
              case "publish": {
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
                   var datastring = require("fs").readFileSync('api/data.json','utf8')
                  var json = JSON.parse(datastring)
                  if (object.input.length == 32) {
                    var i = json.findIndex(function(item, i) {
                      return item.uid == object.query;
                    });
                    if (json[i]){ 
                    var subname = json[i].subname;
                    }
                  }
                   subname = object.register_url + ".fastur.com";
                  
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
                var jsonResponse = {
                  type: "image",
                  result: "ok",
                  part: object.part,
                  size: object.size,
                  bytes: object.bytes
                };
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
