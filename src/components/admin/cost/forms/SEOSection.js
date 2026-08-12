"use client";

import { Search } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import SectionCard from "../shared/SectionCard";
import { Field, inputCls, textareaCls } from "../shared/CostFormUI";

export default function SEOSection({ formData, updateField, errors = {} }) {
  const seo = formData.seo || {};

  return (
    <SectionCard
      icon={Search}
      title="3. SEO & Meta Tags"
      subtitle="Meta title, description, keywords, canonical link and Open Graph share image"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Meta Title" required error={errors["seo.metaTitle"]}>
          <input
            type="text"
            value={seo.metaTitle || ""}
            onChange={(e) => updateField("seo.metaTitle", e.target.value)}
            className={inputCls}
            placeholder="Enter Meta Title (50-60 characters recommended)"
            required
          />
        </Field>

        <Field label="Meta Description" required error={errors["seo.metaDescription"]}>
          <textarea
            rows={3}
            value={seo.metaDescription || ""}
            onChange={(e) => updateField("seo.metaDescription", e.target.value)}
            className={textareaCls}
            placeholder="Enter Meta Description (150-160 characters recommended)"
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field label="Keywords" subtitle="comma-separated">
          <input
            type="text"
            value={Array.isArray(seo.keywords) ? seo.keywords.join(", ") : seo.keywords || ""}
            onChange={(e) =>
              updateField(
                "seo.keywords",
                e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
              )
            }
            className={inputCls}
            placeholder="hair transplant cost, FUE price, Delhi"
          />
        </Field>

        <Field label="Canonical URL">
          <input
            type="text"
            value={seo.canonical || ""}
            onChange={(e) => updateField("seo.canonical", e.target.value)}
            className={inputCls}
            placeholder="https://www.clinicryan.com/cost/..."
          />
        </Field>

        <Field label="Robots Indexing">
          <input
            type="text"
            value={seo.robots || "index,follow"}
            onChange={(e) => updateField("seo.robots", e.target.value)}
            className={inputCls}
            placeholder="index,follow"
          />
        </Field>
      </div>

      <Field label="OG Share Image" subtitle="social preview image">
        <ImageUploader
          initialImage={seo.ogImage || ""}
          onUpload={(url) => updateField("seo.ogImage", url)}
        />
      </Field>

      {/* GeoTags Subsection */}
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            GeoTags & Geotargeting (SEO Meta Tags)
          </h4>
          <p className="text-xs text-gray-500 mt-0.5 font-sans">
            Specify location coordinates & region tags so search engines geotarget this cost page to the target city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="Geo Region (ISO Code)" subtitle="e.g. IN-MH, IN-DL">
            <input
              type="text"
              value={seo.geoRegion || ""}
              onChange={(e) => updateField("seo.geoRegion", e.target.value)}
              className={inputCls}
              placeholder="e.g. IN-MH"
            />
          </Field>

          <Field label="Geo Placename (City)" subtitle="e.g. Mumbai, Delhi">
            <input
              type="text"
              value={seo.geoPlacename || ""}
              onChange={(e) => updateField("seo.geoPlacename", e.target.value)}
              className={inputCls}
              placeholder="e.g. Mumbai"
            />
          </Field>

          <Field label="Geo Position (Lat;Long)" subtitle="e.g. 19.0760;72.8777">
            <input
              type="text"
              value={seo.geoPosition || ""}
              onChange={(e) => updateField("seo.geoPosition", e.target.value)}
              className={inputCls}
              placeholder="e.g. 19.0760;72.8777"
            />
          </Field>

          <Field label="ICBM (Lat, Long)" subtitle="e.g. 19.0760, 72.8777">
            <input
              type="text"
              value={seo.icbm || ""}
              onChange={(e) => updateField("seo.icbm", e.target.value)}
              className={inputCls}
              placeholder="e.g. 19.0760, 72.8777"
            />
          </Field>
        </div>
      </div>
    </SectionCard>
  );
}

