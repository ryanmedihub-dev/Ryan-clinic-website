export const generateHairFallPageDetails = (city) => {
    const formattedCity = city.trim();

    const pageName = `Hair Fall & Hair Loss Treatment in ${formattedCity}`;

    const slug = `hair-fall-loss-treatment-in-${formattedCity
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")}`;

    return {
        pageName,
        slug,
    };
};
