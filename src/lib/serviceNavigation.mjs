export const NAVIGATION_FIELDS =
  "-_id metadata.pageName metadata.pageType metadata.description metadata.pageurl bannerData.title bannerData.description";

export function createNavigationResponse(records) {
  const data = Array.isArray(records)
    ? records.map((record) => ({
        metadata: {
          pageName: record.metadata?.pageName,
          pageType: record.metadata?.pageType,
          description: record.metadata?.description,
          pageurl: record.metadata?.pageurl,
        },
        bannerData: {
          title: record.bannerData?.title,
          description: record.bannerData?.description,
        },
      }))
    : [];

  return { success: true, data };
}

export function createNavigationErrorResponse() {
  return { success: false, message: "Failed to fetch navigation", data: [] };
}

export function groupHeaderNavigation(services) {
  const toNav = (service) => ({
    name: service.metadata?.pageName || service.bannerData?.title || "",
    href: `/${service.metadata?.pageurl || ""}`,
    description:
      service.metadata?.description || service.bannerData?.description || "",
  });

  const groupByType = (pageType) =>
    services
      .filter((service) => service.metadata?.pageType === pageType)
      .map(toNav);

  return {
    transplantPages: groupByType("transplant"),
    treatmentPages: groupByType("treatment"),
    branchPages: groupByType("branch"),
  };
}
