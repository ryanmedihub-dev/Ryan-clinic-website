export const generateSurgeryPageDetails = (city) => {
    const formattedCity = city.trim();

    const pageName = `Hair Transplant Surgery in ${formattedCity}`;

    const slug = `hair-transplant-surgery-in-${formattedCity
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")}`;

    return {
        pageName,
        slug,
    };
};