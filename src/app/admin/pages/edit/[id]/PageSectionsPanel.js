"use client";

import React, { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  AlertTriangle,
  Info,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Standard registry of all known sections across all page types.
 */
export const SECTION_REGISTRY = [
  {
    key: "overview",
    label: "Service Overview",
    description: "Main introductory narrative and at-a-glance procedural summary table",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "ourResults",
    label: "Before & After Results",
    description: "Verified patient transformation gallery and comparative outcome photos",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "typesSection",
    label: "Technique & Types",
    description: "Detailed surgical techniques, instrument details and supporting procedural photos",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "whyChooseUs",
    label: "Why Choose Ryan Clinic",
    description: "Core clinical standards, sterile operating theatres and surgical safeguards",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "costSection",
    label: "Cost & Pricing Details",
    description: "Per-graft and per-session pricing breakdowns, packages and EMI plans",
    availableFor: ["branch"],
  },
  {
    key: "ourDoctor",
    label: "Meet Your Surgeon",
    description: "Assigned lead surgeon profile, clinical credentials and surgical experience",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "differencesSection",
    label: "Technique Comparison",
    description: "Side-by-side clinical comparison matrix of restorative procedures",
    availableFor: ["branch"],
  },
  {
    key: "pleoFeatures",
    label: "Benefits & Procedure Steps",
    description: "Step-by-step walkthrough of surgery day from consultation to aftercare",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "whyDoctorMatters",
    label: "Why Doctor Leadership Matters",
    description: "Risks of technician-only clinics versus certified surgeon oversight",
    availableFor: ["branch"],
  },
  {
    key: "recoveryTimeline",
    label: "Recovery Timeline",
    description: "Post-operative follicular recovery phases from week 1 through month 18",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "extraFields",
    label: "Additional Information",
    description: "Custom editorial content blocks and supplemental clinical instructions",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "areasWeServe",
    label: "Areas & Locations Served",
    description: "Geographic coverage, nearby neighborhoods and local clinic directions",
    availableFor: ["branch"],
  },
  {
    key: "testimonials",
    label: "Patient Testimonials",
    description: "Patient experiences, feedback reviews and clinical testimonials",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
  {
    key: "faq",
    label: "Frequently Asked Questions",
    description: "Interactive accordion FAQ paired with Google FAQPage structured schema",
    availableFor: ["transplant", "branch", "surgery", "treatment"],
  },
];

/**
 * Standard default section configurations matching frontend defaults.
 */
export function getDefaultSections(pageType) {
  const isBranch = pageType === "branch";
  return [
    { key: "overview", enabled: true, order: 0, data: {} },
    { key: "ourResults", enabled: true, order: 1, data: {} },
    { key: "typesSection", enabled: true, order: 2, data: {} },
    { key: "whyChooseUs", enabled: true, order: 3, data: {} },
    { key: "costSection", enabled: isBranch, order: 4, data: {} },
    { key: "ourDoctor", enabled: isBranch, order: 5, data: {} },
    { key: "differencesSection", enabled: isBranch, order: 6, data: {} },
    { key: "pleoFeatures", enabled: true, order: 7, data: {} },
    { key: "whyDoctorMatters", enabled: isBranch, order: 8, data: {} },
    { key: "recoveryTimeline", enabled: false, order: 9, data: {} },
    { key: "extraFields", enabled: true, order: 10, data: {} },
    { key: "areasWeServe", enabled: isBranch, order: 11, data: {} },
    { key: "testimonials", enabled: true, order: 12, data: {} },
    { key: "faq", enabled: true, order: 13, data: {} },
  ];
}

export default function PageSectionsPanel({
  pageSections,
  pageType = "transplant",
  pageSlug = "",
  assignedDoctor = null,
  assignedDoctors = [],
  onChange,
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showOtherSections, setShowOtherSections] = useState(false);

  // Normalize effective page type
  const effectivePageType = (pageType || "transplant").toLowerCase();

  // Determine whether this document has saved section configuration
  const hasSavedSections = Boolean(
    Array.isArray(pageSections) && pageSections.length > 0
  );

  // Determine working section array: use existing if saved, or lazy defaults as preview
  const currentSections = useMemo(() => {
    if (hasSavedSections) {
      return pageSections;
    }
    return getDefaultSections(effectivePageType);
  }, [hasSavedSections, pageSections, effectivePageType]);

  // Check if ourDoctor is overridden by assigned doctor(s)
  const isDoctorAssigned = Boolean(
    (Array.isArray(assignedDoctors) && assignedDoctors.length > 0) ||
      (assignedDoctor &&
        assignedDoctor !== "none" &&
        assignedDoctor !== "" &&
        assignedDoctor !== "null" &&
        assignedDoctor !== "undefined")
  );

  // Check if FUE compliance override applies
  const isFUE = pageSlug === "fue-hair-transplant";

  // Duplicate key detection
  const duplicateReport = useMemo(() => {
    const keyMap = new Map();
    currentSections.forEach((section, index) => {
      if (!section || typeof section.key !== "string") return;
      if (!keyMap.has(section.key)) {
        keyMap.set(section.key, []);
      }
      keyMap.get(section.key).push({ section, index });
    });

    const duplicates = [];
    keyMap.forEach((instances, key) => {
      if (instances.length > 1) {
        duplicates.push({ key, instances });
      }
    });
    return duplicates;
  }, [currentSections]);

  const duplicateKeysSet = useMemo(() => {
    return new Set(duplicateReport.map((d) => d.key));
  }, [duplicateReport]);

  // Available section keys for the current page type
  const availableKeysForType = useMemo(() => {
    return new Set(
      SECTION_REGISTRY.filter((reg) =>
        reg.availableFor.includes(effectivePageType)
      ).map((reg) => reg.key)
    );
  }, [effectivePageType]);

  // Split current sections into applicable and preserved other-type sections
  const { applicableSections, otherSections } = useMemo(() => {
    const applicable = [];
    const other = [];

    currentSections.forEach((s) => {
      if (availableKeysForType.has(s.key)) {
        applicable.push(s);
      } else {
        other.push(s);
      }
    });

    return { applicableSections: applicable, otherSections: other };
  }, [currentSections, availableKeysForType]);

  /**
   * Helper to commit changes while preserving full objects (including _id, data, custom fields).
   */
  const commitUpdatedSections = (updatedList) => {
    // Re-index sequential order values while strictly spreading all existing properties
    const sequenced = updatedList.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    if (typeof onChange === "function") {
      onChange(sequenced, true);
    }
  };

  /**
   * Toggle a section's enabled state using object spreading.
   */
  const handleToggle = (key) => {
    // Prevent toggling if duplicate exists for this key until resolved
    if (duplicateKeysSet.has(key)) return;

    // Prevent toggling ourDoctor if an active doctor is assigned
    if (key === "ourDoctor" && isDoctorAssigned) return;

    // Use currentSections (or cloned defaults if not yet saved)
    const baseList = hasSavedSections
      ? [...pageSections]
      : getDefaultSections(effectivePageType).map((s) => ({ ...s }));

    const updated = baseList.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          enabled: !item.enabled,
        };
      }
      return item;
    });

    commitUpdatedSections(updated);
  };

  /**
   * Move an applicable section up or down.
   */
  const handleMove = (applicableIndex, direction) => {
    const targetApplicableIndex = applicableIndex + direction;
    if (
      targetApplicableIndex < 0 ||
      targetApplicableIndex >= applicableSections.length
    ) {
      return;
    }

    const itemA = applicableSections[applicableIndex];
    const itemB = applicableSections[targetApplicableIndex];

    const baseList = hasSavedSections
      ? [...pageSections]
      : getDefaultSections(effectivePageType).map((s) => ({ ...s }));

    const indexInBaseA = baseList.findIndex((s) => s === itemA || (s.key === itemA.key && s.order === itemA.order));
    const indexInBaseB = baseList.findIndex((s) => s === itemB || (s.key === itemB.key && s.order === itemB.order));

    if (indexInBaseA === -1 || indexInBaseB === -1) return;

    const nextList = [...baseList];
    const temp = nextList[indexInBaseA];
    nextList[indexInBaseA] = nextList[indexInBaseB];
    nextList[indexInBaseB] = temp;

    commitUpdatedSections(nextList);
  };

  /**
   * Resolve duplicate key by keeping a specific instance and removing others.
   */
  const handleResolveDuplicate = (key, keepInstanceIndex) => {
    const baseList = hasSavedSections
      ? [...pageSections]
      : getDefaultSections(effectivePageType).map((s) => ({ ...s }));

    // Keep the exact instance at keepInstanceIndex and remove other instances of key
    const filtered = baseList.filter((item, idx) => {
      if (item.key !== key) return true;
      return idx === keepInstanceIndex;
    });

    commitUpdatedSections(filtered);
  };

  /**
   * Reset sections to page type defaults while preserving any custom data objects.
   */
  const handleResetToDefaults = () => {
    const defaults = getDefaultSections(effectivePageType);

    // Merge: preserve data and _id from existing matching sections
    const merged = defaults.map((def, i) => {
      const existing = currentSections.find((c) => c.key === def.key);
      return {
        ...def,
        order: i,
        data: existing?.data ? { ...existing.data } : def.data,
        ...(existing?._id ? { _id: existing._id } : {}),
      };
    });

    // Also preserve any custom non-registry keys at the end
    const registryKeySet = new Set(SECTION_REGISTRY.map((r) => r.key));
    const customEntries = currentSections.filter(
      (s) => !registryKeySet.has(s.key)
    );

    const finalList = [...merged, ...customEntries];
    setShowResetConfirm(false);
    commitUpdatedSections(finalList);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-xs">
      {/* Header */}
      <div className="mb-6 border-b border-gray-100 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Page Sections & Layout Order
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Control section visibility and arrange display hierarchy for this{" "}
                <span className="font-semibold text-gray-700 capitalize">
                  {effectivePageType}
                </span>{" "}
                page.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
                title="Reset layout order to standard defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-red-700 font-medium">Reset order?</span>
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-2 py-0.5 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Unsaved / Default preview status banner */}
        {!hasSavedSections && (
          <div className="mt-4 p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-800">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Standard Default Preview:</span>{" "}
              This page does not have a custom saved section layout. Standard defaults are displayed below.
              Your configuration will only be saved when you modify sections and click &quot;Update Service&quot;.
            </div>
          </div>
        )}
      </div>

      {/* Duplicate Key Conflict Banner */}
      {duplicateReport.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Duplicate Section Entries Detected
          </div>
          <p className="text-xs text-amber-800">
            One or more section keys appear multiple times in the document. Review the instances below and choose which one to retain.
            Section controls for conflicting keys remain locked until resolved.
          </p>
          <div className="space-y-3 pt-2">
            {duplicateReport.map(({ key, instances }) => (
              <div
                key={key}
                className="bg-white/80 p-3 rounded-lg border border-amber-200 space-y-2 text-xs"
              >
                <div className="font-semibold text-gray-900">
                  Section Key: <span className="font-mono text-amber-900">{key}</span> ({instances.length} occurrences)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {instances.map(({ section, index }) => {
                    const dataKeys = Object.keys(section?.data || {});
                    return (
                      <div
                        key={index}
                        className="p-2.5 rounded border border-gray-200 bg-gray-50 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-medium text-gray-800">
                            Position #{index + 1} — Order: {section?.order ?? index}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            Status:{" "}
                            <span
                              className={`font-semibold ${
                                section?.enabled ? "text-green-700" : "text-gray-500"
                              }`}
                            >
                              {section?.enabled ? "Enabled" : "Disabled"}
                            </span>
                            {" • "}
                            Data:{" "}
                            {dataKeys.length > 0
                              ? `Custom (${dataKeys.join(", ")})`
                              : "Empty"}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleResolveDuplicate(key, index)}
                          className="px-2.5 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors shrink-0"
                        >
                          Keep This
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Applicable Sections List */}
      <div className="space-y-3">
        {applicableSections.map((section, appIdx) => {
          const reg = SECTION_REGISTRY.find((r) => r.key === section.key);
          const label = reg?.label || section.key;
          const description = reg?.description || "Custom page section";
          const isDup = duplicateKeysSet.has(section.key);
          const isEnabled = section.enabled !== false;

          // Special controlled states
          const isDoctorRow = section.key === "ourDoctor";
          const isTestimonialRow = section.key === "testimonials";

          // Lock toggle if doctor is assigned
          const isToggleDisabled = isDup || (isDoctorRow && isDoctorAssigned);

          return (
            <div
              key={`${section.key}-${section.order ?? appIdx}`}
              className={`border rounded-xl p-4 transition-all ${
                isDup
                  ? "border-amber-300 bg-amber-50/50"
                  : isEnabled
                  ? "border-gray-200 bg-white hover:border-gray-300 shadow-2xs"
                  : "border-gray-200/70 bg-gray-50/80 opacity-75"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left: Reorder buttons & Label */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-0.5 shrink-0 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      disabled={appIdx === 0 || isDup}
                      onClick={() => handleMove(appIdx, -1)}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors cursor-pointer"
                      title="Move section up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={appIdx === applicableSections.length - 1 || isDup}
                      onClick={() => handleMove(appIdx, 1)}
                      className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors cursor-pointer"
                      title="Move section down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-gray-400 w-5 shrink-0">
                    #{appIdx + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">
                        {label}
                      </span>
                      <span className="font-mono text-[11px] text-gray-400">
                        ({section.key})
                      </span>
                      {isDup && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                          Duplicate
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Right: Toggle & Status Badge */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isEnabled
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}
                  >
                    {isEnabled ? "Visible" : "Hidden"}
                  </span>

                  <label
                    className={`inline-flex items-center gap-2 select-none ${
                      isToggleDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDoctorRow && isDoctorAssigned ? true : isEnabled}
                      disabled={isToggleDisabled}
                      onChange={() => handleToggle(section.key)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-medium text-gray-700">
                      Enable
                    </span>
                  </label>
                </div>
              </div>

              {/* Special Contextual Notes */}
              {isDoctorRow && isDoctorAssigned && (
                <div className="mt-3 p-2.5 rounded-lg bg-blue-50/80 border border-blue-200/60 flex items-start gap-2 text-xs text-blue-900">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Runtime Doctor Override Active:</strong> This section is automatically displayed on the public page because a doctor is assigned in the &quot;Meet Your Surgeon&quot; panel above. To remove this section, unassign the doctor.
                  </span>
                </div>
              )}

              {isTestimonialRow && isFUE && (
                <div className="mt-3 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Compliance Override Active:</strong> Testimonials are currently suppressed on the public FUE Hair Transplant page by a frontend code override regardless of this toggle.
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Preserved Sections from Other Page Types */}
      {otherSections.length > 0 && (
        <div className="mt-6 pt-5 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowOtherSections(!showOtherSections)}
            className="flex items-center justify-between w-full text-left text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              Preserved Sections from Other Page Types ({otherSections.length})
            </span>
            {showOtherSections ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showOtherSections && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gray-500 mb-2">
                These sections are safely preserved in the database document but are inactive for &quot;{effectivePageType}&quot; pages. If the page type is changed (e.g. to Branch), they will become active automatically without data loss.
              </p>
              {otherSections.map((otherSec) => {
                const reg = SECTION_REGISTRY.find((r) => r.key === otherSec.key);
                return (
                  <div
                    key={otherSec.key}
                    className="p-2.5 rounded-lg border border-dashed border-gray-200 bg-gray-50/60 flex items-center justify-between text-xs text-gray-500"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {reg?.label || otherSec.key}
                      </span>
                      <span className="font-mono text-[11px] text-gray-400">
                        ({otherSec.key})
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded">
                      Preserved (Inactive)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

