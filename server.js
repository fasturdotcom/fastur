// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

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
        require('fs').writeFileSync('api/frames.html',JSON.stringify(arr));
        console.log(arr);
      }
    );
  }
twitter_search('lex fridman')

var server = require("http")
  .createServer(function(request, response) { 
    if (request.method == "GET") {
      console.log(request.url)
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
        response.writeHead(200, {
          "Content-Type": "js"
        }); 
        var data = require("fs").readFileSync("./api/script.js");
        response.end(data);
      }
       
      
      
       
      if (request.url == "/app2") {
        response.writeHead(200, {
          "Content-Type": "js"
        });
        var data = require("fs").readFileSync("./api/912120bfa38218625d3e8505996f7860.json");
        var data = JSON.parse(data);
        var data = render('false',data)
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
          "./api/frames.html",
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
            "./api/" + id + ".json"
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
            console.log(object) 
          }
              }})}
  }).listen(process.env.PORT || 7002);