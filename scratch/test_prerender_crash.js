const fs = require("fs");
const path = require("path");

const clientPath = path.join(__dirname, "../src/app/(root)/doctors/[slug]/DoctorsPageClient.js");
const code = fs.readFileSync(clientPath, "utf8");

// Regex to find JSX tags containing children within {...}
// We look for tags like <p>{foo}</p>, <span>{foo}</span>, <li>{foo}</li>, <div>{foo}</div>
const lines = code.split("\n");
lines.forEach((line, i) => {
    // Look for JSX children expressions: >{expr}<
    const matches = line.match(/>\s*\{([^}]+)\}\s*</g);
    if (matches) {
        matches.forEach(m => {
            const inner = m.replace(/^>\s*\{|\}\s*<$/g, "").trim();
            // Check if inner is just a simple variable name without property access, ternary, ||, &&, or map
            if (/^[a-zA-Z0-9_$]+$/.test(inner)) {
                console.log(`Line ${i + 1}: >{${inner}}< in: ${line.trim()}`);
            }
        });
    }
});
