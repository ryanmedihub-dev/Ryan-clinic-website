const http = require("http");

const pages = ["/", "/about", "/doctors", "/surgery", "/surgeon", "/surgery/hair-transplant-surgery-in-delhi", "/surgeon/hair-transplant-surgeon-in-delhi"];

async function check(p) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000${p}`, (res) => {
            console.log(`PAGE ${p} -> Status: ${res.statusCode}`);
            resolve();
        }).on("error", (e) => {
            console.log(`PAGE ${p} -> Error: ${e.message}`);
            resolve();
        });
    });
}

async function run() {
    for (const p of pages) {
        await check(p);
    }
}
run();
