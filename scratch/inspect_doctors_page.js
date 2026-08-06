const http = require("http");

http.get("http://localhost:3000/doctors", (res) => {
    console.log("Status:", res.statusCode);
    let body = "";
    res.on("data", chunk => body += chunk);
    res.on("end", () => {
        console.log("Body length:", body.length);
        console.log("Body snippet:", body.slice(0, 500));
    });
});
