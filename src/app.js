const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("public/weather.html", "utf-8");

function replaceVal(tempVal, orgVal) {
let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp);
temperature = temperature.replace("{%tempMin%}", orgVal.main.temp_min);
temperature = temperature.replace("{%tempMax%}", orgVal.main.temp_max);
temperature = temperature.replace("{%location%}", orgVal.name);
temperature = temperature.replace("{%country%}", orgVal.sys.country);
temperature = temperature.replace("{%tempStatus%}", orgVal.weather[0].main);
return temperature;
}
const server = http.createServer((req, res) => {
if (req.url == "/") {
    requests(`http://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=c46e59d43508743d88e675ff3534601d`
    ).on("data", function (chunk) {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        const realTimeData = arrData.map((val) => {
            return replaceVal(homeFile, val);
        }).join("");

        res.write(realTimeData);
        console.log(realTimeData);
    }).on("end", function (err) {
        if (err) {
        return console.log("connection closed due to an error");
        }

        res.end();
    });
}
});

server.listen(8000, "127.0.0.1");
