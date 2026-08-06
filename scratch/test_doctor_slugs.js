const http = require("http");

const doctorSlugs = [
    "hair-transplant-doctor-in-delhi",
    "dr-pranendra-singh",
    "dr-himanshu-jawla",
    "dr-aman-singh-gosain"
];

async function checkDoctorPage(slug) {
    const url = `http://localhost:3000/doctors/${slug}`;
    return new Promise((resolve) => {
        http.get(url, (res) => {
            let body = "";
            res.on("data", chunk => body += chunk);
            res.on("end", () => {
                console.log(`URL: /doctors/${slug} -> Status: ${res.statusCode}, Body len: ${body.length}`);
                if (res.statusCode !== 200) {
                    console.log("Error body preview:", body.slice(0, 300));
                }
                resolve();
            });
        }).on("error", (e) => {
            console.log(`URL: /doctors/${slug} -> Error: ${e.message}`);
            resolve();
        });
    });
}

async function run() {
    console.log("=== Testing all /doctors/[slug] pages ===");
    for (const slug of doctorSlugs) {
        await checkDoctorPage(slug);
    }
}

run();
