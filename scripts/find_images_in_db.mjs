import mongoose from 'mongoose';
import Services from '../src/models/services.js';
import Blog from '../src/models/blog.js';
import CostPage from '../src/models/CostPage.js';
import Doctors from '../src/models/Doctors.js';
import SurgeonPage from '../src/models/SurgeonPage.js';
import SurgeryPage from '../src/models/surgeryPage.js';
import HairFallPage from '../src/models/hairFallPage.js';
import Gallery from '../src/models/gallery.js';

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

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to DB for image audit\n');

  const models = [
    { name: 'Blog', model: Blog },
    { name: 'Services', model: Services },
    { name: 'CostPage', model: CostPage },
    { name: 'Doctors', model: Doctors },
    { name: 'SurgeonPage', model: SurgeonPage },
    { name: 'SurgeryPage', model: SurgeryPage },
    { name: 'HairFallPage', model: HairFallPage },
    { name: 'Gallery', model: Gallery },
  ];

  const dbMatches = {};
  for (const img of IMAGES) dbMatches[img] = [];

  for (const { name, model } of models) {
    const docs = await model.find({}).lean();
    for (const doc of docs) {
      const docStr = JSON.stringify(doc);
      for (const img of IMAGES) {
        if (docStr.includes(img) || docStr.includes(encodeURIComponent(img))) {
          let identifier = doc.slug || doc.pageUrl || doc.metadata?.pageurl || doc.title || doc._id;
          dbMatches[img].push(`${name} (${identifier})`);
        }
      }
    }
  }

  for (const [img, locs] of Object.entries(dbMatches)) {
    console.log(`[${img}]: ${locs.length ? locs.join(', ') : 'NOT IN DB'}`);
  }

  await mongoose.disconnect();
}

main().catch(err => console.error(err));
