const http = require("http");

function fetchUrl(path) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let body = "";
            res.on("data", chunk => body += chunk);
            res.on("end", () => {
                console.log(`Path: ${path} -> Status: ${res.statusCode}, Body len: ${body.length}`);
                if (res.statusCode !== 200) {
                    console.log("Body preview:", body.slice(0, 300));
                }
                resolve();
            });
        }).on("error", (e) => {
            console.log(`Path: ${path} -> Error: ${e.message}`);
            resolve();
        });
    });
}

async function run() {
    await fetchUrl("/doctors");
    await fetchUrl("/surgery/hair-transplant-surgery-in-delhi");
    await fetchUrl("/surgeon/hair-transplant-surgeon-in-delhi");
}

run();
