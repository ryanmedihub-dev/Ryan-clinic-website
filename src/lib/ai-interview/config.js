/**
 * Clinic Ryan — AI Pre-Screening MCQ Interview Configuration
 *
 * NOTE: BASE_SCORE is 65% (5 or more correct out of 7 MCQs).
 * Assessment duration is 4 minutes (240 seconds).
 */

export const BASE_SCORE = 65;
export const TOTAL_QUESTIONS = 7;
export const ASSESSMENT_DURATION_SECONDS = 240; // 4 minutes total countdown
export const SESSION_TRANSIT_BUFFER_MS = 15 * 1000; // 15s network latency buffer for submission
export const SESSION_EXPIRY_MS = ASSESSMENT_DURATION_SECONDS * 1000 + SESSION_TRANSIT_BUFFER_MS; // 255s total validity
export const OPENAI_TIMEOUT_MS = 25000; // 25s timeout for AI requests

/**
 * Exact positions supported by the Clinic Ryan interview form
 */
export const ROLE_COMPETENCIES = {
  Telecaller: {
    title: "Telecaller / Sales Representative",
    focusAreas: [
      "Verbal communication clarity and professional phone etiquette",
      "Customer objection handling and persuasion techniques",
      "Lead qualification and appointment booking fundamentals",
      "Handling difficult or hesitant inbound/outbound callers",
      "Consistency and resilience in high-volume calling scenarios",
    ],
    sampleScenario: "Handling a price objection from a prospective clinic patient.",
  },
  "Team Leader": {
    title: "Team Leader / Supervisor",
    focusAreas: [
      "Team motivation, target monitoring, and KPI management",
      "Conflict resolution and handling performance dips among team members",
      "Escalated customer grievance handling and resolution",
      "Daily floor briefing, delegation, and reporting accuracy",
      "Quality auditing and coaching junior agents",
    ],
    sampleScenario: "Managing an underperforming team member while meeting monthly targets.",
  },
  Receptionist: {
    title: "Front Desk Receptionist",
    focusAreas: [
      "Warm client greeting, hospitality, and patient intake coordination",
      "Multitasking between incoming calls, patient check-ins, and doctor schedules",
      "Professional demeanor under high footfall clinic pressure",
      "Confidentiality and basic clinic record keeping",
      "Handling upset visitors in the waiting area with calm professionalism",
    ],
    sampleScenario: "Managing an impatient walk-in patient while answering an urgent doctor call.",
  },
  Counsellor: {
    title: "Patient Counsellor",
    focusAreas: [
      "Empathy, active listening, and building patient trust",
      "Explaining medical/aesthetic treatments and recovery expectations clearly",
      "Addressing patient anxieties and financial/package concerns",
      "Ethical guidance without making unrealistic promises",
      "Post-consultation follow-ups and patient relationship management",
    ],
    sampleScenario: "Guiding an anxious patient who is nervous about procedure results.",
  },
  Trainer: {
    title: "Process & Soft Skills Trainer",
    focusAreas: [
      "Conducting structured onboarding and product knowledge sessions",
      "Evaluating trainee comprehension and coaching slow learners",
      "Developing roleplays and practical assessment modules",
      "Call calibration and quality metric alignment",
      "Continuous feedback and training effectiveness measurement",
    ],
    sampleScenario: "Designing a corrective training module for recurring call quality issues.",
  },
  "Stock Manager": {
    title: "Inventory & Stock Manager",
    focusAreas: [
      "Inventory tracking, stock auditing, and discrepancy investigation",
      "Expiry date management and FIFO (First-In, First-Out) adherence",
      "Vendor delivery verification and purchase order reconciliation",
      "Preventing stockouts of critical clinic supplies and medicines",
      "Digital stock register maintenance and reporting accuracy",
    ],
    sampleScenario: "Handling an unexpected stock shortage of essential clinic supplies.",
  },
  "MIS Executive": {
    title: "MIS / Data Operations Executive",
    focusAreas: [
      "Data accuracy, Excel/spreadsheet reporting, and daily operational dashboards",
      "Identifying reporting anomalies and verifying source data",
      "Timely report generation for branch leadership and management",
      "Data confidentiality, file hygiene, and backup practices",
      "Handling ad-hoc data extraction requests under tight deadlines",
    ],
    sampleScenario: "Reconciling conflicting patient data numbers across two daily branch reports.",
  },
  "Technical / Developer": {
    title: "Full Stack / Web Application Developer",
    focusAreas: [
      "Modern JavaScript/TypeScript, React, Next.js architecture, and REST API design",
      "Database design, indexing, and query optimization (MongoDB/SQL)",
      "Web application security, input validation, and secure authentication",
      "Debugging runtime errors, network failures, and performance bottlenecks",
      "Responsive layout engineering, Core Web Vitals, and clean code principles",
    ],
    sampleScenario: "Diagnosing a production API error and optimizing rendering latency.",
  },
  "Medicine Sales Executive": {
    title: "Medicine / Pharma Sales Executive",
    focusAreas: [
      "Pharmaceutical product knowledge, detailing, and doctor relationship management",
      "Target-driven territory planning and call frequency management",
      "Handling prescriber objections and competitor product comparisons",
      "Regulatory compliance and ethical pharmaceutical promotion",
      "Order management, chemist coverage, and stockist coordination",
    ],
    sampleScenario: "Convincing a skeptical doctor to prescribe a new clinic-recommended product over a competitor brand.",
  },
  "Nursing Staff": {
    title: "Clinic Nurse / Nursing Staff",
    focusAreas: [
      "Patient care protocols, vital monitoring, and pre/post-operative nursing support",
      "Infection control, sterilization standards, and aseptic technique",
      "Medication administration accuracy and adverse reaction monitoring",
      "Patient communication, comfort, and anxiety management",
      "Emergency response, documentation accuracy, and handover protocols",
    ],
    sampleScenario: "Managing a post-operative patient who develops unexpected pain while the doctor is in surgery.",
  },
  Doctor: {
    title: "Clinic Doctor / Medical Officer",
    focusAreas: [
      "Patient diagnosis, clinical assessment, and evidence-based treatment planning",
      "Ethical decision-making, patient consent, and informed choice communication",
      "Surgical or procedural competency and complication management",
      "Medical documentation accuracy, prescription protocols, and record compliance",
      "Interdepartmental coordination, patient follow-up, and clinical outcome monitoring",
    ],
    sampleScenario: "Managing a post-procedure complication and communicating transparently with the patient and clinic team.",
  },
  "Transplant Technician": {
    title: "Hair Transplant OT Technician",
    focusAreas: [
      "Graft extraction, dissection, and implantation technique accuracy (FUE/DHI)",
      "OT sterility, instrument handling, and surgical hygiene protocols",
      "Graft survival optimization: storage, hydration, and handling time management",
      "Assisting the surgeon during live procedures under pressure",
      "Patient positioning, donor area preparation, and post-procedure wound care",
    ],
    sampleScenario: "Maintaining graft viability during a lengthy FUE session when the surgeon needs to pause mid-procedure.",
  },
  "Software Developer": {
    title: "Software / Web Application Developer",
    focusAreas: [
      "Modern JavaScript/TypeScript, React, Next.js architecture, and REST API design",
      "Database design, indexing, and query optimization (MongoDB/SQL)",
      "Web application security, input validation, and authentication best practices",
      "Debugging runtime errors, network failures, and performance bottlenecks",
      "Responsive layout engineering, Core Web Vitals, and clean code principles",
    ],
    sampleScenario: "Diagnosing a production API error and optimizing page rendering latency for a clinic web application.",
  },
  Other: {
    title: "General Clinic Staff / Operational Role",
    focusAreas: [
      "Workplace reliability, punctuality, and task execution",
      "Interpersonal communication and team collaboration",
      "Adaptability to clinic procedures and operational instructions",
      "Basic problem-solving and proactive attitude",
      "Customer-centric mindset in a healthcare/wellness environment",
    ],
    sampleScenario: "Prioritizing multiple urgent tasks assigned by different supervisors.",
  },
};

/**
 * Strict safety guidelines for OpenAI question generation:
 * No discriminatory, medical, religious, political, or off-limits personal questions.
 */
export const QUESTION_GENERATION_SAFETY_PROMPT = `
CRITICAL SAFETY & RELEVANCE RULES:
1. All questions must be strictly job-relevant, professional, and competency-focused.
2. DO NOT ask questions about:
   - Religion, caste, ethnicity, nationality, or mother tongue
   - Age, date of birth, marital status, children, or family background
   - Medical history, personal health, disability, or pregnancy
   - Political beliefs, personal wealth, or lifestyle habits
   - Private personal relationships or living arrangements
3. Questions must be direct, clear, and realistic workplace scenarios or competency checks.
4. Each question must have exactly 4 plausible options with exactly ONE unambiguously correct answer.
`.trim();

/**
 * Structured Evaluation Rubrics (0–100 Scale)
 */
export const EVALUATION_CRITERIA_DESCRIPTIONS = {
  roleKnowledge: "Practical understanding, skills, and industry awareness relevant to the applied position.",
  communication: "Clarity, customer etiquette, and professional judgment in workplace interactions.",
  problemSolving: "Logical reasoning, practical judgment, and situational resolution in workplace scenarios.",
  answerQuality: "Correctness and quality of selected MCQ answers.",
  relevance: "Direct accuracy in addressing the role-specific scenario.",
};
