const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(root)/surgeon/[slug]/SurgeonPageClient.js');
let text = fs.readFileSync(filePath, 'utf8');

// Replace H1 inside Spotlight/Top Hero with div so only PageBanner has H1
text = text.replace(
  '<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5 text-gray-900">',
  '<div className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5 text-gray-900">'
);
text = text.replace(
  '</h1>\n\n                            <p className="text-sm md:text-[15px] leading-relaxed mb-8 text-gray-600 font-normal">',
  '</div>\n\n                            <p className="text-sm md:text-[15px] leading-relaxed mb-8 text-gray-600 font-normal">'
);

// Replace whyClinic H2 with H3 so it does not interfere with main H2 outline
text = text.replace(
  '<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">\n                                {pageData?.whyClinic?.heading || `Why Choose ${leadSurgeonName} as Your Hair Transplant Surgeon in ${cityName}?`}\n                            </h2>',
  '<h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">\n                                {pageData?.whyClinic?.heading || `Why Choose ${leadSurgeonName} as Your Hair Transplant Surgeon in ${cityName}?`}\n                            </h3>'
);

// Format visitSurgeon title inside footer card so it renders as standard section H2 when standalone
text = text.replace(
  '<h2 className="text-base font-bold text-gray-900 mb-1">\n                                {pageData?.visitSurgeon?.heading',
  '<h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-2">\n                                {pageData?.visitSurgeon?.heading'
);

fs.writeFileSync(filePath, text, 'utf8');
console.log('✅ Reorder and heading tags updated in SurgeonPageClient.js');
