import mongoose from "mongoose";
import SurgeonPage from "../src/models/SurgeonPage.js";

const doc = new SurgeonPage({}, null, { strict: false });
doc.set("general.city", "Jammu", { strict: false });
doc.set("general.pageName", "Hair Transplant Surgeon in Jammu", { strict: false });
doc.set("general.status", "draft", { strict: false });

console.log("doc.general:", doc.general);
console.log("doc.toObject().general:", doc.toObject().general);
