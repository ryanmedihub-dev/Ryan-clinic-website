// src/lib/branchLocationData.js
// Single source of truth for branch locations, addresses, contact details, and local coverage areas.

export const BRANCHES = {
  Delhi: {
    name: "Delhi",
    city: "Delhi",
    state: "Delhi",
    address: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Pitampura+Delhi",
    phone: "+91-9911111247",
    hours: "Mon – Sun: 9:00 AM – 7:00 PM",
    metro: "Kohat Enclave / Pitampura Metro Station",
    landmark: "Near Pitampura TV Tower",
    areas: [
      "Pitampura", "Rohini", "Shalimar Bagh", "Model Town", "Karol Bagh",
      "Connaught Place", "Dwarka", "Janakpuri", "Rajouri Garden", "Saket",
      "South Delhi", "West Delhi", "Noida", "Gurgaon", "Ghaziabad",
      "Faridabad", "Greater Noida", "Indirapuram", "Vasundhara", "Vaishali",
    ],
  },
  Gurgaon: {
    name: "Gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    address: "HOUSE NO- 53, MAIN, Market Rd, Residency Green, Jal Vihar Colony, Sector 46, Gurugram, Haryana 122001",
    mapUrl: "https://www.google.com/maps/place/Ryan+Clinic+%E2%80%93+Turkey+Hair+Transplant+Experts+Gurgaon/",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
    metro: "Millennium City Centre (Huda City Centre) / Sector 46",
    landmark: "Near Jal Vihar Colony / Huda City 42",
    areas: [
      "Sector 46", "DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5",
      "Cyber City", "Golf Course Road", "Golf Course Extension", "Sohna Road", "MG Road",
      "Sector 14", "Sector 29", "Sector 56", "Sushant Lok", "South City",
      "Nirvana Country", "Palam Vihar", "Manesar", "New Gurgaon",
    ],
  },
  Mumbai: {
    name: "Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    address: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Andheri+Mumbai",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Andheri Metro Station",
    landmark: "Near Four Bungalows Market, Andheri West",
    areas: [
      "Andheri", "Bandra", "Juhu", "Vile Parle", "Santacruz",
      "Goregaon", "Malad", "Borivali", "Kandivali", "Thane",
      "Navi Mumbai", "Pune", "Nashik", "Vasai", "Virar",
    ],
  },
  Hyderabad: {
    name: "Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    address: "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Banjara+Hills+Hyderabad",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Jubilee Hills / Banjara Hills",
    landmark: "Road No. 14, Above SBI Bank, Banjara Hills",
    areas: [
      "Banjara Hills", "Jubilee Hills", "Kondapur", "Gachibowli", "Hitech City",
      "Madhapur", "Kukatpally", "Begumpet", "Secunderabad", "LB Nagar",
      "Dilsukhnagar", "Warangal",
    ],
  },
  Bangalore: {
    name: "Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    address: "Contour Cosmetic Clinic, 2nd Floor, Lakshmidevi Complex, 80 Ft Road, BTM Layout, Bengaluru – 560076",
    mapUrl: "https://maps.google.com/?q=Contour+Cosmetic+Clinic+BTM+Layout+Bangalore",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "BTM Layout / Silk Board",
    landmark: "Near Lakshmidevi Complex, 80 Ft Road",
    areas: [
      "BTM Layout", "Koramangala", "Jayanagar", "JP Nagar", "Marathahalli",
      "Whitefield", "Electronic City", "HSR Layout", "Indiranagar", "MG Road",
      "Yelahanka", "Bannerghatta Road",
    ],
  },
  Chennai: {
    name: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "No.1, 3rd Floor, SS Avenue 43, Rajiv Gandhi Salai, Padur, Chennai – 603103",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Padur+Chennai",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Padur / Old Mahabalipuram Road",
    landmark: "SS Avenue 43, OMR Padur",
    areas: [
      "Padur", "Sholinganallur", "Perungudi", "Velachery", "Anna Nagar",
      "T Nagar", "Adyar", "Chromepet", "Tambaram", "Porur",
      "Ambattur", "Avadi",
    ],
  },
  Pune: {
    name: "Pune",
    city: "Pune",
    state: "Maharashtra",
    address: "Baner, Pune – 411045",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Baner+Pune",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Baner / Balewadi",
    landmark: "Near Balewadi High Street",
    areas: [
      "Baner", "Balewadi", "Wakad", "Hinjewadi", "Kothrud",
      "Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Hadapsar", "Kharadi",
      "Pimpri", "Chinchwad",
    ],
  },
  Kolkata: {
    name: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    address: "Salt Lake, Kolkata – 700091",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Salt+Lake+Kolkata",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Salt Lake / Karunamoyee Metro Station",
    landmark: "Salt Lake Sector V / Central Park",
    areas: [
      "Salt Lake", "New Town", "Rajarhat", "Park Street", "Ballygunge",
      "Gariahat", "Behala", "Howrah", "Dum Dum", "Barrackpore",
      "Barasat", "Durgapur",
    ],
  },
  Ahmedabad: {
    name: "Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    address: "SG Highway, Ahmedabad – 380054",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+SG+Highway+Ahmedabad",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Ahmedabad BRTS / SG Highway",
    landmark: "SG Highway / Thaltej",
    areas: [
      "SG Highway", "Navrangpura", "Satellite", "Vastrapur", "Bodakdev",
      "Thaltej", "Prahlad Nagar", "Anand Nagar", "Maninagar", "Naroda",
      "Chandkheda", "Gandhinagar",
    ],
  },
  Lucknow: {
    name: "Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    address: "Gomti Nagar, Lucknow – 226010",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Gomti+Nagar+Lucknow",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Gomti Nagar / Hazratganj",
    landmark: "Vibhuti Khand / Gomti Nagar",
    areas: [
      "Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Rajajipuram",
      "Alambagh", "Mahanagar", "Vibhuti Khand", "Chinhat", "Faizabad Road",
      "Kanpur Road", "Sultanpur Road",
    ],
  },
  Jammu: {
    name: "Jammu",
    city: "Jammu",
    state: "Jammu and Kashmir",
    address: "Hall 207 2A, South Block, Bahu Plaza, Jammu – 180012",
    mapUrl: "https://maps.google.com/?q=Emphoria+Skin+Hair+Clinic+Bahu+Plaza+Jammu",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 6:00 PM",
    metro: "Bahu Plaza / Residency Road",
    landmark: "South Block, Bahu Plaza",
    areas: [
      "Bahu Plaza", "Gandhi Nagar", "Residency Road", "Trikuta Nagar", "Bakshi Nagar",
      "Channi Himmat", "Udhampur", "Kathua", "Samba", "Pathankot Road",
      "Akhnoor", "Nagrota",
    ],
  },
  Patna: {
    name: "Patna",
    city: "Patna",
    state: "Bihar",
    address: "Boring Road, Patna – 800001",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Boring+Road+Patna",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Boring Road / Bailey Road",
    landmark: "Near Boring Road Crossing",
    areas: [
      "Boring Road", "Bailey Road", "Patna Sahib", "Kankarbagh", "Rajendra Nagar",
      "Ashok Rajpath", "Frazer Road", "Exhibition Road", "Bankipur", "Danapur",
      "Digha", "Hajipur",
    ],
  },
  Noida: {
    name: "Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    address: "Sector 18, Noida, Uttar Pradesh – 201301",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Noida",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Noida Sector 18 / Botanical Garden",
    landmark: "Near Sector 18 Commercial Hub",
    areas: [
      "Sector 18", "Sector 62", "Sector 15", "Sector 50", "Sector 137",
      "Sector 76", "Sector 128", "Sector 93", "Noida Expressway", "Greater Noida",
      "Pari Chowk", "Gaur City", "Indirapuram", "Vaishali", "Vasundhara",
    ],
  },
  Bhopal: {
    name: "Bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    address: "MP Nagar, Bhopal, Madhya Pradesh – 462011",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Bhopal",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "MP Nagar / Habibganj",
    landmark: "Near MP Nagar Zone II",
    areas: [
      "Arera Colony", "MP Nagar", "Kolar Road", "TT Nagar", "Hoshangabad Road",
      "Shahpura", "BHEL", "Shivaji Nagar", "New Market", "Ayodhya Bypass",
      "Berasia Road", "Lalghati",
    ],
  },
  Indore: {
    name: "Indore",
    city: "Indore",
    state: "Madhya Pradesh",
    address: "Vijay Nagar, Indore, Madhya Pradesh – 452010",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Indore",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Vijay Nagar / Palasia",
    landmark: "Near AB Road, Vijay Nagar",
    areas: [
      "Vijay Nagar", "New Palasia", "Old Palasia", "AB Road", "Saket Nagar",
      "Scheme 54", "MG Road", "Rajwada", "Rau", "Bypass Road",
      "Annapurna", "Bhawarkua",
    ],
  },
  Chandigarh: {
    name: "Chandigarh",
    city: "Chandigarh",
    state: "Chandigarh",
    address: "Sector 17, Chandigarh – 160017",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Chandigarh",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Sector 17 / ISBT 43",
    landmark: "Near Sector 17 Plaza",
    areas: [
      "Sector 17", "Sector 35", "Sector 22", "Sector 8", "Sector 9",
      "Sector 34", "Sector 43", "Mohali Phase 3B2", "Mohali Phase 7", "Mohali Phase 8",
      "Panchkula Sector 5", "Panchkula Sector 20", "Zirakpur", "IT Park", "Manimajra",
    ],
  },
  Ranchi: {
    name: "Ranchi",
    city: "Ranchi",
    state: "Jharkhand",
    address: "Lalpur, Ranchi, Jharkhand – 834001",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Ranchi",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Lalpur / Albert Ekka Chowk",
    landmark: "Circular Road / Lalpur Chowk",
    areas: [
      "Lalpur", "Doranda", "Kanke Road", "Morabadi", "Hinoo",
      "Harmu", "Bariatu", "Ratu Road", "Ashok Nagar", "Namkum",
      "Dhurwa", "Tatisilwai",
    ],
  },
  Dehradun: {
    name: "Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    address: "Rajpur Road, Dehradun, Uttarakhand – 248001",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Dehradun",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Rajpur Road / Clock Tower",
    landmark: "Near Clock Tower / Jakhan",
    areas: [
      "Rajpur Road", "Jakhan", "Dharampur", "Clement Town", "Ballupur",
      "Hathibarkala", "Sahastradhara Road", "Vasant Vihar", "Patel Nagar", "Prem Nagar",
      "Karanpur", "Rispana",
    ],
  },
  Jaipur: {
    name: "Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    address: "C Scheme, Jaipur, Rajasthan – 302001",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Jaipur",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Sindhi Camp / Civil Lines",
    landmark: "Near Statue Circle, C Scheme",
    areas: [
      "Vaishali Nagar", "Malviya Nagar", "C Scheme", "Mansarovar", "Raja Park",
      "Tonk Road", "Jagatpura", "Ajmer Road", "Vidyadhar Nagar", "Bani Park",
      "Sodala", "Civil Lines",
    ],
  },
  Nagpur: {
    name: "Nagpur",
    city: "Nagpur",
    state: "Maharashtra",
    address: "Dharampeth, Nagpur, Maharashtra – 440010",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Nagpur",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Dharampeth / Sitabuldi",
    landmark: "Near West High Court Road, Dharampeth",
    areas: [
      "Dharampeth", "Ramdaspeth", "Sadar", "Sitabuldi", "Wardha Road",
      "Civil Lines", "Pratap Nagar", "Manish Nagar", "Dhantoli", "IT Park",
      "Trimurti Nagar", "Nandanvan",
    ],
  },
};

export function getBranchLocationData(branchName) {
  if (!branchName || typeof branchName !== "string") return null;
  const key = branchName.trim().toLowerCase();

  for (const [name, bData] of Object.entries(BRANCHES)) {
    if (name.toLowerCase() === key) {
      return { ...bData, branch: name, city: name };
    }
  }

  // Common aliases and variations
  if (key === "gurugram" || key.includes("gurgaon")) {
    return { ...BRANCHES.Gurgaon, branch: "Gurgaon", city: "Gurgaon" };
  }
  if (key === "rachi" || key.includes("ranchi")) {
    return { ...BRANCHES.Ranchi, branch: "Ranchi", city: "Ranchi" };
  }
  if (key === "bengaluru" || key.includes("bangalore")) {
    return { ...BRANCHES.Bangalore, branch: "Bangalore", city: "Bangalore" };
  }

  return null;
}

