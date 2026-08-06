const fs = require("fs");

async function check() {
    const res = await fetch("http://localhost:3000/surgeon/hair-transplant-surgeon-in-delhi");
    const html = await res.text();
    fs.writeFileSync("scratch/err.html", html);
    console.log("Saved err.html. Searching for error strings...");
    
    // Look for error stack or message in html
    const errIdx = html.indexOf("Error");
    if (errIdx !== -1) {
        console.log("Found 'Error' at index", errIdx, ":");
        console.log(html.substring(errIdx, errIdx + 400));
    } else {
        console.log("No explicit 'Error' string found. Length:", html.length);
    }
}

check();
