import mongoose from 'mongoose';
import Services from '../src/models/services.js';
import Blog from '../src/models/blog.js';
import CostPage from '../src/models/CostPage.js';
import Doctors from '../src/models/Doctors.js';
import SurgeonPage from '../src/models/SurgeonPage.js';
import SurgeryPage from '../src/models/surgeryPage.js';
import HairFallPage from '../src/models/hairFallPage.js';
import Gallery from '../src/models/gallery.js';

const ALT_MAPPING = [
  { match: "IMG_9364_amxokn", alt: "Hair transplant surgical techniques comparison including Sapphire FUE and DHI extraction" },
  { match: "1_n7wylt", alt: "Post-transplant hair care and specialized post-operative shampoo application" },
  { match: "1752746168716-PRP 1", alt: "Platelet-Rich Plasma (PRP) therapy session for hair restoration" },
  { match: "IMG_9252_ii7r2j", alt: "Post-operative healing and recovery during the first 10 days after a hair transplant" },
  { match: "1752731223556-FUE 1", alt: "Sapphire FUE microscopic follicular unit extraction procedure" },
  { match: "1752734410181-Hair transplant 5", alt: "Natural hairline redesign and dense follicle implantation result" },
  { match: "1752743220084-Beard Transplant 5", alt: "Full beard and mustache reconstruction result using facial hair transplantation" },
  { match: "1752746961127-Chemical Skin Peel 1", alt: "Clinical dermatological skin peel and rejuvenation treatment" },
  { match: "femal-hairloss_tgqpps", alt: "Medical diagnosis and evaluation of female pattern hair thinning" },
  { match: "1752744317454-Female Hair transplant 5", alt: "Female hair transplant procedure preserving natural hairline aesthetics" },
  { match: "1752667815707-fue-banner_ro9ae6", alt: "Sapphire blade hair restoration consultation and surgical planning" },
  { match: "1752747796072-Alopecia Treatment 1", alt: "Targeted clinical therapy for patchy and diffuse alopecia hair loss" },
  { match: "1752745367066-Eyebrow Transplant 1", alt: "Micro-graft eyebrow restoration for enhanced arch density and symmetry" },
  { match: "1752734248947-Hair Transplant 1", alt: "Doctor-led hair transplant surgery with precise graft angulation" },
  { match: "hair_Transplant_n0cvxr", alt: "Comparison between non-surgical hair regrowth therapies and permanent transplantation" },
  { match: "hair_transplant_btwimn", alt: "Hair follicle biology and autologous graft compatibility explanation" },
  { match: "1776589610708-Untitled design", alt: "Ryan Clinic international standard hair transplant operating theater" },
  { match: "turkey-doctor.jpg", alt: "Certified Turkish-trained hair transplant specialist at Ryan Clinic" },
  { match: "service-one_jrbcub", alt: "Individual follicle extraction using micro-motor Sapphire FUE punch" },
  { match: "mustach_hair_transplant_oojoje", alt: "Mustache density enhancement and precision graft implantation" },
  { match: "after_hair_Transplant_what_to_eat_bxi9gc", alt: "Essential nutritional guide and diet for optimal hair graft healing" },
  { match: "Untitled_design_3_iicspy", alt: "Comparative analysis of Turkey versus India hair transplant protocols" },
  { match: "PRP_ijnjection_sk6oci", alt: "Post-transplant PRP scalp injection to stimulate early follicle vascularization" },
  { match: "IMG_0425.JPG_wbqqqi", alt: "Ryan Clinic Delhi advanced trichology consultation suite" },
  { match: "Untitled_design_5_bn0apr", alt: "Topical minoxidil application guide for androgenetic alopecia management" },
  { match: "Untitled_design_1_uohq9l", alt: "Centrifuge preparation of concentrated platelet-rich plasma for scalp treatment" },
  { match: "hairline_Transplant_jsqnnm", alt: "Analysis of graft survival factors and clinical measures to prevent transplant failure" },
  { match: "IMG_9170_ugnkt7", alt: "DHT blocker medication protocol for stabilizing hereditary hair thinning" },
  { match: "beard_transplant_kjqkpr", alt: "Beard line mapping and donor graft distribution for facial hair restoration" },
  { match: "hair_transplant_serum_fme6kr", alt: "Nourishing post-transplant hair growth serum application" },
  { match: "IMG_3706_demwbu", alt: "Shock loss shedding phase and subsequent permanent regrowth timeline" },
  { match: "eyebrow_transplant_aj6pf6", alt: "Single hair follicle extraction and implantation for natural eyebrow contouring" },
  { match: "img1_lnlc80", alt: "Choi Implanter Pen direct hair implantation (DHI) technique" },
  { match: "IMG_0404.JPG_wj1jvq", alt: "Clinical progression of hair density when discontinuing hair loss treatments" },
  { match: "Screenshot_2025-08-14_114109_mihzmc", alt: "Customized beard transplant design for defined jawline coverage" },
  { match: "Screenshot_2025-08-15_160203_aoxns5", alt: "Female hairline lowering and crown volumization results" },
  { match: "pop_kyz3t2", alt: "Post-procedure scalp care and managing temporary redness after transplantation" },
  { match: "hair_transplant_grapgt_wt3yas", alt: "High-magnification microscopic examination of healthy follicular graft units" },
  { match: "Untitled_design_4_bnncse", alt: "Hamilton-Norwood hair loss scale assessment for determining transplant candidacy" },
  { match: "Untitled_design_5_neos58", alt: "Essential pre-operative and post-operative hair transplant safety precautions" },
  { match: "Untitled_design_2_whmrmo", alt: "Biotin, zinc, and micronutrient supplementation for follicle strength" },
  { match: "mizo_njo0ms", alt: "Scalp mesotherapy micro-injections delivering essential growth peptides" },
  { match: "IMG_0619.JPG_cqazxf", alt: "Post-transplant topical scalp care and healing enhancement regimen" },
  { match: "Affordable_Hair_Transplant_Tips_Save_Your_Time_Money_n0e5vr", alt: "Transparent graft estimation and affordable hair transplant planning at Ryan Clinic" },
  { match: "IMG_8991_hx6728", alt: "Ryan Clinic patient undergoing comprehensive hair density evaluation" },
  { match: "IMG_9170_ohkei2", alt: "Vitamin formulations supporting faster and thicker hair graft development" }
];

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB for SEO & Alt-Text Migration\n");

  // 1. Fix smoking blog URL to clean kebab-case
  const smokingBlog = await Blog.findOne({ pageUrl: { $regex: /smoking.*hair-transplant/i } });
  if (smokingBlog) {
    console.log(`Found smoking blog with slug: "${smokingBlog.pageUrl}". Updating to "smoking-and-hair-transplant"...`);
    smokingBlog.pageUrl = "smoking-and-hair-transplant";
    smokingBlog.pageImageAlt = "Smoking impact and precautions before and after hair transplant surgery";
    await smokingBlog.save();
    console.log("✓ Smoking blog slug updated successfully.\n");
  }

  // 2. Update Blog images
  const blogs = await Blog.find({});
  let blogUpdated = 0;
  for (const b of blogs) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (b.pageImageUrl && b.pageImageUrl.includes(map.match)) {
        b.pageImageAlt = map.alt;
        changed = true;
      }
    }
    if (!b.pageImageAlt || b.pageImageAlt.length < 5 || b.pageImageAlt.includes(".jpg") || b.pageImageAlt.includes(".png") || b.pageImageAlt.includes(".webp")) {
      b.pageImageAlt = `${b.pageTitle || b.blogTitle} — Ryan Clinic Hair Restoration`;
      changed = true;
    }
    if (changed) {
      await b.save();
      blogUpdated++;
    }
  }
  console.log(`✓ Updated ${blogUpdated} Blog documents with verified alt text.`);

  // 3. Update Services banner alts
  const services = await Services.find({});
  let servicesUpdated = 0;
  for (const s of services) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (s.bannerData?.imageurl && s.bannerData.imageurl.includes(map.match)) {
        s.bannerData.imagealt = map.alt;
        changed = true;
      }
    }
    if (!s.bannerData?.imagealt || s.bannerData.imagealt.includes(".jpg") || s.bannerData.imagealt.includes(".webp")) {
      s.bannerData = s.bannerData || {};
      s.bannerData.imagealt = `${s.metadata?.pageName || s.bannerData?.title || 'Hair Transplant'} at Ryan Clinic`;
      changed = true;
    }
    if (changed) {
      await s.save();
      servicesUpdated++;
    }
  }
  console.log(`✓ Updated ${servicesUpdated} Services documents with verified alt text.`);

  // 4. Update CostPage alts
  const costPages = await CostPage.find({});
  let costUpdated = 0;
  for (const c of costPages) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (c.hero?.backgroundImage && c.hero.backgroundImage.includes(map.match)) {
        c.hero.backgroundAlt = map.alt;
        changed = true;
      }
      if (c.hero?.doctorImage && c.hero.doctorImage.includes(map.match)) {
        c.hero.doctorAlt = map.alt;
        changed = true;
      }
    }
    if (changed) {
      await c.save();
      costUpdated++;
    }
  }
  console.log(`✓ Updated ${costUpdated} CostPage documents with verified alt text.`);

  // 5. Update Doctors & Surgeon alts
  const doctors = await Doctors.find({});
  let docUpdated = 0;
  for (const d of doctors) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (d.hero?.backgroundImage && d.hero.backgroundImage.includes(map.match)) {
        d.hero.backgroundAlt = map.alt;
        changed = true;
      }
      if (d.hero?.doctorImage && d.hero.doctorImage.includes(map.match)) {
        d.hero.doctorAlt = map.alt;
        changed = true;
      }
    }
    if (changed) {
      await d.save();
      docUpdated++;
    }
  }
  console.log(`✓ Updated ${docUpdated} Doctors documents with verified alt text.`);

  // 6. Update SurgeonPage alts
  const surgeons = await SurgeonPage.find({});
  let surgDocUpdated = 0;
  for (const sp of surgeons) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (sp.hero?.doctorImage && sp.hero.doctorImage.includes(map.match)) {
        sp.hero.doctorAlt = map.alt;
        changed = true;
      }
    }
    if (changed) {
      await sp.save();
      surgDocUpdated++;
    }
  }
  console.log(`✓ Updated ${surgDocUpdated} SurgeonPage documents with verified alt text.`);

  // 7. Update SurgeryPage alts
  const surgeries = await SurgeryPage.find({});
  let surgeryUpdated = 0;
  for (const sg of surgeries) {
    let changed = false;
    for (const map of ALT_MAPPING) {
      if (sg.hero?.backgroundImage && sg.hero.backgroundImage.includes(map.match)) {
        sg.hero.backgroundAlt = map.alt;
        changed = true;
      }
      if (sg.hero?.doctorImage && sg.hero.doctorImage.includes(map.match)) {
        sg.hero.doctorAlt = map.alt;
        changed = true;
      }
    }
    if (changed) {
      await sg.save();
      surgeryUpdated++;
    }
  }
  console.log(`✓ Updated ${surgeryUpdated} SurgeryPage documents with verified alt text.`);

  await mongoose.disconnect();
  console.log("\nMigration completed successfully!");
}

main().catch(err => console.error("Migration error:", err));
