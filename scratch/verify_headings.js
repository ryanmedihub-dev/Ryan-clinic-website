const fs = require("fs");

const mandatoryHeadings = [
    "Best Hair Transplant Surgeon in Delhi",
    "Why Surgical Skill Matters for Your Hair Transplant",
    "What Makes a Qualified Hair Transplant Surgeon?",
    "Why Choose Dr. Pranendra Singh as Your Hair Transplant Surgeon in Delhi?",
    "The Role of the Surgeon in Every Step of Your Hair Transplant",
    "Hair Transplant Surgeon vs Technician: Why Doctor-Led Surgery Matters",
    "Experience and Specialization: What to Look for in a Hair Transplant Doctor",
    "How to Evaluate a Surgeon's Hair Transplant Skill and Results",
    "Hairline Artistry and Natural Density Design",
    "Revision and Repair Hair Transplants by an Experienced Surgeon",
    "Hair Transplant Surgeon Consultation and Cost in Delhi",
    "Questions to Ask Your Hair Transplant Surgeon Before Booking",
    "Red Flags When Choosing a Hair Transplant Surgeon in Delhi",
    "Procedures Offered by Our Lead Hair Transplant Surgeon",
    "Visit Our Hair Transplant Surgeon in Delhi",
    "Frequently Asked Questions About Hair Transplant Surgeons in Delhi"
];

const html = fs.readFileSync("scratch/err.html", "utf8");

console.log("--- MANDATORY SEO HEADINGS AUDIT ---");
let passCount = 0;

mandatoryHeadings.forEach((heading, idx) => {
    const exists = html.includes(heading);
    if (exists) {
        console.log(`[PASS] Heading ${idx + 1}: "${heading}"`);
        passCount++;
    } else {
        console.log(`[FAIL] Heading ${idx + 1}: "${heading}"`);
    }
});

console.log(`\nResult: ${passCount} / ${mandatoryHeadings.length} Headings Verified.`);
