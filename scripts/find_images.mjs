import fs from 'fs';
import path from 'path';

const IMAGES = [
  "IMG_9364_amxokn",
  "1_n7wylt",
  "1752746168716-PRP 1",
  "IMG_9252_ii7r2j",
  "blog.2h55zk3yeprmf",
  "1752731223556-FUE 1",
  "1752734410181-Hair transplant 5",
  "1752743220084-Beard Transplant 5",
  "about.jpg",
  "1752746961127-Chemical Skin Peel 1",
  "femal-hairloss_tgqpps",
  "1752744317454-Female Hair transplant 5",
  "1752667815707-fue-banner_ro9ae6",
  "1752747796072-Alopecia Treatment 1",
  "1752745367066-Eyebrow Transplant 1",
  "1752734248947-Hair Transplant 1",
  "hair_Transplant_n0cvxr",
  "contact.1is63lfa82ivt",
  "hair_transplant_btwimn",
  "1776589610708-Untitled design",
  "turkey-doctor.jpg",
  "service-one_jrbcub",
  "mustach_hair_transplant_oojoje",
  "after_hair_Transplant_what_to_eat_bxi9gc",
  "Untitled_design_3_iicspy",
  "PRP_ijnjection_sk6oci",
  "IMG_0425.JPG_wbqqqi",
  "Untitled_design_5_bn0apr",
  "Untitled_design_1_uohq9l",
  "hairline_Transplant_jsqnnm",
  "IMG_9170_ugnkt7",
  "beard_transplant_kjqkpr",
  "hair_transplant_serum_fme6kr",
  "IMG_3706_demwbu",
  "eyebrow_transplant_aj6pf6",
  "img1_lnlc80",
  "IMG_0404.JPG_wj1jvq",
  "Screenshot_2025-08-14_114109_mihzmc",
  "Screenshot_2025-08-15_160203_aoxns5",
  "pop_kyz3t2",
  "hair_transplant_grapgt_wt3yas",
  "Untitled_design_4_bnncse",
  "Untitled_design_5_neos58",
  "Untitled_design_2_whmrmo",
  "mizo_njo0ms",
  "IMG_0619.JPG_cqazxf",
  "Affordable_Hair_Transplant_Tips_Save_Your_Time_Money_n0e5vr",
  "IMG_8991_hx6728",
  "IMG_9170_ohkei2"
];

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json') || file.endsWith('.mjs')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walkDir(path.resolve('.'));
console.log(`Scanning ${files.length} codebase files for ${IMAGES.length} reported images...\n`);

const foundMap = {};

for (const img of IMAGES) {
  foundMap[img] = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes(img) || content.includes(encodeURIComponent(img))) {
        foundMap[img].push(path.relative('.', f));
      }
    } catch {}
  }
}

for (const [img, occurrences] of Object.entries(foundMap)) {
  console.log(`[${img}]: ${occurrences.length > 0 ? occurrences.join(', ') : 'NOT FOUND IN SOURCE (Check DB)'}`);
}
