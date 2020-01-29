function movie(dream) {
  var q = "19 21 2 18 15 21 20 9 14 5";

  function github(url){
    var gs = require('github-scraper'); // require the module
    //var url = 'alanshaw' // a random username (of someone you should follow!)
    gs(url, function(err, data) {
     console.log(data); // or what ever you want to do with the data
    })
    console.log("finished") 
  }
  github("fasturdotcom")
  
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

          var json = {
            page:page, count:count, values:values
          };
          require("fs").writeFileSync("sun.json", JSON.stringify(json));
          
          console.log('finished');
        });
      }
    );
  }
  //run("Abcdefghijklmnopqrstuvwxyz");
  //run("Light"); 
  //run("Dark");
  //run("Faith");
  
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
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c, c);
    encoder.addFrame(ctx);

    function encode(amount) {
      for (var y = 0; y < amount; y++) {
        for (let i = 0; i < c; i++) {
          for (let j = 0; j < c; j++) {
            ctx.fillStyle = getColor();
            ctx.fillRect(j, i, 1, 1);
          }
        }
        encoder.addFrame(ctx);
      }
    }
    encode(b);

    encoder.finish();
    console.log("Gif Generator finished");
  }
  //gif('sun',30,320);

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
  var tweets = require('fs').readFileSync('twitter.json');
     
  var url = process.env.PROJECT_DOMAIN + ".gltch.me";
  function twitter_post($,id){
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
        var tweets = require('fs').readFileSync('twitter.json');
          
          require('fs').writeFileSync('twitter.json',tweets) 
    console.log(body.id)
        }   
      }
    ); 

  }    
 // twitter_post('@Fasturdotcom life oh my bosh',1221183159334776800)
 
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
                console.log("STATUS: ", response.statusCode, body);
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
}
movie("authentic neural network");

// where your node app starts
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  var data = require("fs").readFileSync("sun.json");
  var terms = require("fs").readFileSync("api/frames.html");
  response.end(terms); 
});

app.get("/api*", function(request, response) {
  if (
    require("fs").existsSync(__dirname + "/assets/" + request.url.split("/")[2])
  ) {
    var img =
      require("fs").readFileSync(
        __dirname + "/assets/" + request.url.split("/")[2]
      ) || null; // Do something
  } else {
    var wanted = request.path;
    var img = require("fs").readFileSync(
      __dirname + "/public/" + wanted.split("/")[2]
    );
  }
  response.writeHead(200, {
    "Content-Type": request.url.split("/")[2].split(".")[1]
  });
  response.end(img, "binary");
});

app.post("/", function(request, response) {
  const body = request.body;
  console.log(body);
  response.end("");
});

// liusten for requests :)
const listener = app.listen(process.env.PORT || 7002, function() {
  //console.log("Your app is listening on port " + listener.address().port);
});
  