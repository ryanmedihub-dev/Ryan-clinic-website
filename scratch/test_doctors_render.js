const fs = require("fs");
const path = require("path");

// Read DoctorsPageClient.js
const code = fs.readFileSync(path.join(__dirname, "../src/app/(root)/doctors/[slug]/DoctorsPageClient.js"), "utf8");

// Search for any occurrence of variables that could be objects in JSX
// Look for expressions inside JSX curly braces like {foo} or {foo.bar} or {foo.map(...)}
const jsxCurlyMatches = code.match(/\{[^}]+\}/g);

console.log("Found", jsxCurlyMatches ? jsxCurlyMatches.length : 0, "JSX expressions.");

// Let's filter expressions that render items directly from object arrays:
jsxCurlyMatches.forEach(expr => {
    if (expr.includes("displayOrder") || expr.includes("number") || expr.includes("icon") || expr.includes("card") || expr.includes("trait") || expr.includes("step") || expr.includes("item") || expr.includes("ach")) {
        console.log("JSX Expr:", expr);
    }
});
