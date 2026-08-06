const http = require("http");

const urls = [
    "http://localhost:3000/doctors",
    "http://localhost:3000/surgery/hair-transplant-surgery-in-delhi",
    "http://localhost:3000/surgeon/hair-transplant-surgeon-in-delhi",
    "http://localhost:3000/doctors/dr-pranendra-singh",
    "http://localhost:3000/doctors/hair-transplant-doctor-in-delhi",
    "http://localhost:3000/hair-transplant-doctor-in-delhi",
    "http://localhost:3000/hair-transplant-surgeon-in-delhi",
    "http://localhost:3000/hair-transplant-surgery-in-delhi",
];

async function checkUrl(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            console.log(`URL: ${url} -> Status: ${res.statusCode}`);
            resolve(res.statusCode);
        }).on("error", (err) => {
            console.log(`URL: ${url} -> Error: ${err.message}`);
            resolve(500);
        });
    });
}

async function run() {
    for (const url of urls) {
        await checkUrl(url);
    }
}

run();
