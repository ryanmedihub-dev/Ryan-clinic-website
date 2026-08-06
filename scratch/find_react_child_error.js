const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(path.join(__dirname, "../src/app/(root)/doctors/[slug]/DoctorsPageClient.js"), "utf8");

// Search for JSX expressions like {item} or {step} or {b} or {feature} without property access
const lines = content.split("\n");
lines.forEach((line, idx) => {
    // Look for JSX expression containing an identifier alone: {item} or {benefit} or {card} or {b}
    const matches = line.match(/\{([a-zA-Z0-9_$]+)\}/g);
    if (matches) {
        matches.forEach(m => {
            const varName = m.replace(/[{}]/g, "");
            if (!["i", "idx", "index", "title", "text", "desc", "description", "label", "value", "name", "cityName", "doctorName", "heroTitle", "heroDesc", "heroBadgeText", "leadSurgeonName", "leadSurgeonDesc", "open", "openQuestion", "openFaq", "activeStep", "WA", "TEL", "waDoctorLink", "telDoctorLink", "isOpen", "isCompleted", "isActive", "children", "className"].includes(varName)) {
                console.log(`Line ${idx + 1}: possible direct object render -> ${line.trim()}`);
            }
        });
    }
});
