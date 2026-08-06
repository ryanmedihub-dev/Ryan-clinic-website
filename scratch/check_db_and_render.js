const fs = require("fs");

async function checkHeadings() {
    const res = await fetch("http://localhost:3000/surgeon/hair-transplant-surgeon-in-delhi");
    const html = await res.text();

    // Strip HTML tags for clean text matching
    const textOnly = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

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

    console.log("=== FRESH RENDERED HTML AUDIT ===");
    let passed = 0;
    mandatoryHeadings.forEach((heading, i) => {
        const found = textOnly.includes(heading);
        if (found) {
            console.log(`[PASS] Heading ${i + 1}: "${heading}"`);
            passed++;
        } else {
            console.log(`[FAIL] Heading ${i + 1}: "${heading}"`);
        }
    });

    console.log(`\nFINAL AUDIT RESULT: ${passed} / ${mandatoryHeadings.length} Headings Matched Perfectly!`);
}

checkHeadings().catch(console.error);
