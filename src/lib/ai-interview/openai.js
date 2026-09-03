import {
  BASE_SCORE,
  TOTAL_QUESTIONS,
  OPENAI_TIMEOUT_MS,
  ROLE_COMPETENCIES,
  QUESTION_GENERATION_SAFETY_PROMPT,
} from "./config.js";
import { DEFAULT_FALLBACK_QUESTIONS_HINGLISH } from "./fallback-questions-hinglish.js";

/**
 * Expanded pool of curated, role-specific Multiple Choice Questions (MCQs).
 * Each MCQ contains exactly 4 options and exactly one server-verified correct answer.
 */
const DEFAULT_FALLBACK_QUESTIONS = {
  Telecaller: [
    {
      text: "When a prospective patient says the hair transplant cost is too high compared to a budget clinic, what is the best response?",
      options: [
        { id: "opt_1", text: "Highlight our surgeon credentials, sterile surgical safety, natural hairline design, and long-term graft survival." },
        { id: "opt_2", text: "Immediately offer an unapproved 50% discount to prevent them from dropping off." },
        { id: "opt_3", text: "Tell the caller that cheaper clinics always damage donor areas and cause infections." },
        { id: "opt_4", text: "End the call quickly because they are not a qualified high-ticket lead." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "An inbound caller insists on getting an exact final price quote over the phone without visiting the clinic. How should you respond?",
      options: [
        { id: "opt_1", text: "Make an arbitrary guess over the phone to keep them interested." },
        { id: "opt_2", text: "Explain that pricing depends on individual graft requirement and scalp density, which the doctor evaluates during the in-person consultation." },
        { id: "opt_3", text: "Refuse to speak further unless they book an appointment first." },
        { id: "opt_4", text: "Quote the lowest possible starting rate and tell them the doctor visit is optional." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "What is the primary objective of a pre-screening telecalling consultation at Clinic Ryan?",
      options: [
        { id: "opt_1", text: "To give medical diagnoses and prescribe oral hair medications over the phone." },
        { id: "opt_2", text: "To understand patient concerns, qualify their suitability, and schedule a doctor consultation." },
        { id: "opt_3", text: "To collect upfront credit card payments on the first cold call." },
        { id: "opt_4", text: "To maximize call duration regardless of appointment booking outcome." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "A lead answers the phone and says 'I am busy right now, call me later.' What is the most effective approach?",
      options: [
        { id: "opt_1", text: "Politely acknowledge their schedule and agree on an exact preferred time (e.g. today at 5 PM) for a quick callback." },
        { id: "opt_2", text: "Keep pitching quickly before they hang up." },
        { id: "opt_3", text: "Mark the lead as permanently uninterested in the CRM." },
        { id: "opt_4", text: "Call them back 5 consecutive times until they answer." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Which of the following is considered an unethical and prohibited sales practice for clinic telecallers?",
      options: [
        { id: "opt_1", text: "Explaining the clinic's post-procedure follow-up support." },
        { id: "opt_2", text: "Promising a 100% zero-shedding medical guarantee with permanent results to close a sale." },
        { id: "opt_3", text: "Offering flexible EMI and payment plan information." },
        { id: "opt_4", text: "Sharing before-and-after case photos of past clinic patients." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "How should a telecaller organize their daily workflow for maximum conversion efficiency?",
      options: [
        { id: "opt_1", text: "Prioritize fresh inbound inquiries and scheduled callbacks first, followed by cold follow-ups." },
        { id: "opt_2", text: "Call only cold leads from six months ago and ignore new inquiries." },
        { id: "opt_3", text: "Spend the entire day updating spreadsheets without making outbound dials." },
        { id: "opt_4", text: "Wait for prospective patients to call back on their own." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A caller asks: 'Will the hair transplant surgery hurt?' What is the most accurate and reassuring response?",
      options: [
        { id: "opt_1", text: "Tell them surgery is extremely painful and unbearable." },
        { id: "opt_2", text: "Explain that local anesthesia is administered by experienced medical specialists to ensure maximum comfort during the procedure." },
        { id: "opt_3", text: "Tell them anesthesia is unnecessary and painless." },
        { id: "opt_4", text: "Avoid answering the question and change the subject to pricing." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "When logging a patient consultation in CRM, why is accurate disposition and detailed note-taking essential?",
      options: [
        { id: "opt_1", text: "It provides the doctor and clinic counsellor with exact patient background before their visit." },
        { id: "opt_2", text: "It is only an administrative formality that has no operational impact." },
        { id: "opt_3", text: "It allows agents to avoid future communication with the patient." },
        { id: "opt_4", text: "It automatically completes the patient's medical chart without doctor review." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A patient booked an appointment for yesterday but did not show up. What is the best follow-up strategy?",
      options: [
        { id: "opt_1", text: "Send an empathetic message checking if everything is okay, and offer to reschedule at their convenience." },
        { id: "opt_2", text: "Call them and demand a cancellation penalty fee." },
        { id: "opt_3", text: "Delete their record from the database." },
        { id: "opt_4", text: "Ignore the patient permanently." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What key indicator distinguishes a high-intent prospective patient from a casual information seeker?",
      options: [
        { id: "opt_1", text: "They ask detailed questions about doctor experience, procedure timing, and availability for consultation." },
        { id: "opt_2", text: "They ask for discounts in the first 5 seconds of the call." },
        { id: "opt_3", text: "They give a fake phone number and refuse to provide their name." },
        { id: "opt_4", text: "They have no interest in visiting the clinic." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "If a caller expresses extreme anxiety about hair loss surgery, what communication technique should you use?",
      options: [
        { id: "opt_1", text: "Active listening and empathetic validation of their feelings, followed by explaining our safety protocols." },
        { id: "opt_2", text: "Tell them they are overreacting and dismiss their concern." },
        { id: "opt_3", text: "Rush them into booking an immediate surgical date." },
        { id: "opt_4", text: "Transfer the call abruptly without explanation." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you handle consecutive call rejections during a high-volume calling shift?",
      options: [
        { id: "opt_1", text: "Maintain emotional resilience, review your pitch tone, and focus on the next caller with fresh energy." },
        { id: "opt_2", text: "Express frustration to the next caller." },
        { id: "opt_3", text: "Stop working for the remainder of the day." },
        { id: "opt_4", text: "Skip dialling leads and log fake call records." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Team Leader": [
    {
      text: "An experienced telecaller on your team has had a 35% dip in consultation bookings over the last 2 weeks. What is your first step?",
      options: [
        { id: "opt_1", text: "Conduct a 1-on-1 coaching session, audit their call recordings, and identify specific objection-handling bottlenecks." },
        { id: "opt_2", text: "Issue an immediate termination warning on the public floor." },
        { id: "opt_3", text: "Take away all their leads and reassign them to freshers." },
        { id: "opt_4", text: "Ignore the dip and assume it will fix itself next month." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Two senior team members are in a heated argument over lead allocation on the floor. How do you resolve it?",
      options: [
        { id: "opt_1", text: "Intervene privately, review CRM lead distribution rules objectively, and reinforce fair, transparent allocation." },
        { id: "opt_2", text: "Take sides with whichever agent generated higher revenue last month." },
        { id: "opt_3", text: "Let them argue publicly until one backs down." },
        { id: "opt_4", text: "Stop allocating leads to both agents permanently." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A high-net-worth patient escalates a complaint about an insensitive telecaller pitch. How should the Team Leader respond?",
      options: [
        { id: "opt_1", text: "Personally contact the patient, apologize professionally, address their concern, and take internal corrective action with the agent." },
        { id: "opt_2", text: "Blame the patient for being overly sensitive." },
        { id: "opt_3", text: "Instruct the receptionist to block the patient's number." },
        { id: "opt_4", text: "Defend the agent's behavior without listening to the patient." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the primary purpose of conducting a daily morning floor briefing?",
      options: [
        { id: "opt_1", text: "To align daily booking targets, celebrate top performers, address common objections, and energize the team." },
        { id: "opt_2", text: "To scold underperforming agents in front of peers." },
        { id: "opt_3", text: "To read out generic administrative emails for an hour." },
        { id: "opt_4", text: "To delay the start of calling operations." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How can a Team Leader prevent lead hoarding or stale lead stagnation in the CRM?",
      options: [
        { id: "opt_1", text: "Enforce automated lead recycling rules where untouched leads are redistributed after 48 hours." },
        { id: "opt_2", text: "Allow top agents to keep unlimited untouched leads indefinitely." },
        { id: "opt_3", text: "Delete all leads that are older than 3 days." },
        { id: "opt_4", text: "Manually track thousands of leads on sticky notes." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "When coaching a fresher on cold calling, what is the most critical skill to develop first?",
      options: [
        { id: "opt_1", text: "Building rapport in the first 10 seconds and asking open-ended qualifying questions." },
        { id: "opt_2", text: "Reading a 5-page script as fast as possible without pausing." },
        { id: "opt_3", text: "Arguing with callers who say they are busy." },
        { id: "opt_4", text: "Memorizing medical surgical steps in Latin." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the best metric to measure the true efficiency of a clinic calling agent?",
      options: [
        { id: "opt_1", text: "Lead-to-consultation conversion rate and show-up percentage." },
        { id: "opt_2", text: "Total number of unanswered dials made per day." },
        { id: "opt_3", text: "How loudly they speak on the floor." },
        { id: "opt_4", text: "Number of hours spent logged in without making calls." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Manager: [
    {
      text: "Your clinic's OPD conversion rate drops 20% in a single month across all departments. What is your priority action?",
      options: [
        { id: "opt_1", text: "Conduct a cross-department data review, identify the root cause (leads, quality, or process), and set a targeted recovery action plan." },
        { id: "opt_2", text: "Fire the lowest-performing employee immediately without investigation." },
        { id: "opt_3", text: "Send a mass motivational email and take no further action." },
        { id: "opt_4", text: "Assume it is a seasonal trend and wait for next month." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Two department heads disagree on resource allocation for a new campaign. How do you resolve it?",
      options: [
        { id: "opt_1", text: "Facilitate a structured discussion using business impact data and align both on a shared clinic goal before making an objective decision." },
        { id: "opt_2", text: "Side with the more senior of the two department heads automatically." },
        { id: "opt_3", text: "Avoid the discussion entirely and delay the campaign launch." },
        { id: "opt_4", text: "Split resources equally without analyzing operational needs." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A vendor is consistently delivering consumables late, affecting clinic OT schedules. How should you address this?",
      options: [
        { id: "opt_1", text: "Formally escalate to the vendor with documented evidence, issue a performance warning, and initiate alternative vendor evaluation in parallel." },
        { id: "opt_2", text: "Accept the delays as unavoidable and adjust the OT schedule indefinitely." },
        { id: "opt_3", text: "Verbally complain to the delivery person without escalating to vendor management." },
        { id: "opt_4", text: "Switch vendors immediately with no transition plan, risking a supply gap." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a manager set realistic monthly performance targets for a growing clinic team?",
      options: [
        { id: "opt_1", text: "Base targets on historical performance data, team capacity, lead volume, and seasonal trends — then align the team through a structured briefing." },
        { id: "opt_2", text: "Randomly assign large targets to motivate the team through pressure." },
        { id: "opt_3", text: "Set identical targets for all staff regardless of their experience level." },
        { id: "opt_4", text: "Let each employee set their own targets with no management input." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A key team leader resigns unexpectedly one week before a peak operational period. What is your immediate plan?",
      options: [
        { id: "opt_1", text: "Conduct an internal knowledge transfer, temporarily promote a high-performing senior agent, and accelerate a replacement hiring process in parallel." },
        { id: "opt_2", text: "Do nothing and hope the team self-manages." },
        { id: "opt_3", text: "Cancel the peak period operations." },
        { id: "opt_4", text: "Assign the work to yourself indefinitely without hiring support." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a manager ensure that SOPs (Standard Operating Procedures) are consistently followed across all departments?",
      options: [
        { id: "opt_1", text: "Conduct regular SOP audits, provide refresher training when gaps are identified, and recognize teams that consistently comply." },
        { id: "opt_2", text: "Print the SOPs and hope employees read them independently." },
        { id: "opt_3", text: "Punish every minor SOP deviation without investigation or context." },
        { id: "opt_4", text: "Only enforce SOPs during external audits or inspections." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the best approach for a manager when presenting monthly performance results to clinic leadership?",
      options: [
        { id: "opt_1", text: "Present accurate, data-supported insights with root cause analysis for gaps and a clear action plan for the next cycle." },
        { id: "opt_2", text: "Only share positive results and hide underperformance figures." },
        { id: "opt_3", text: "Submit raw data without any analysis or commentary." },
        { id: "opt_4", text: "Blame the team for all shortfalls without presenting improvement plans." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "HR Recruiter": [
    {
      text: "You receive 200 applications for a Telecaller position. What is the most efficient first screening step?",
      options: [
        { id: "opt_1", text: "Apply pre-defined qualification criteria (education, experience, communication) to shortlist candidates objectively from the application pool." },
        { id: "opt_2", text: "Call all 200 candidates for full interviews immediately." },
        { id: "opt_3", text: "Select candidates based on profile photo attractiveness." },
        { id: "opt_4", text: "Forward all applications to the manager without screening." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A shortlisted candidate accepts the offer verbally but fails to show up on the joining date. How do you handle it?",
      options: [
        { id: "opt_1", text: "Contact the candidate professionally to understand the reason, update the records, and promptly re-activate the next shortlisted candidate in the pipeline." },
        { id: "opt_2", text: "Call them repeatedly and threaten legal action." },
        { id: "opt_3", text: "Wait indefinitely for them without informing the hiring manager." },
        { id: "opt_4", text: "Close the position without filling the vacancy." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the most effective way to write a job description that attracts high-quality clinic candidates?",
      options: [
        { id: "opt_1", text: "Clearly define the role responsibilities, required qualifications, key skills, compensation range, and a compelling overview of the clinic's culture." },
        { id: "opt_2", text: "Copy and paste a generic JD from the internet with no customization." },
        { id: "opt_3", text: "Write a vague JD to attract as many candidates as possible without filtering." },
        { id: "opt_4", text: "Leave the salary and role details blank to negotiate later." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "During a structured interview, a candidate gives rehearsed textbook answers. How do you probe for genuine competency?",
      options: [
        { id: "opt_1", text: "Ask situational and behavioral follow-up questions such as 'Tell me about a specific time you handled X' to assess real-world experience." },
        { id: "opt_2", text: "Accept rehearsed answers at face value and recommend hiring immediately." },
        { id: "opt_3", text: "Ask personal and unrelated questions to catch them off guard." },
        { id: "opt_4", text: "End the interview early because scripted answers indicate high preparation." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "An employee raises a confidential workplace grievance. What is the correct HR protocol?",
      options: [
        { id: "opt_1", text: "Acknowledge receipt confidentially, document the complaint, investigate impartially, and ensure the employee is protected from retaliation." },
        { id: "opt_2", text: "Discuss the grievance openly with other team members to gather opinions." },
        { id: "opt_3", text: "Dismiss the complaint if it seems minor and advise the employee to ignore it." },
        { id: "opt_4", text: "Share the complaint details with the accused party immediately before investigating." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should offer letters and employment contracts be handled to ensure legal compliance?",
      options: [
        { id: "opt_1", text: "Ensure all terms (role, compensation, notice period, confidentiality) are clearly stated, reviewed by management, and signed by both parties before the joining date." },
        { id: "opt_2", text: "Issue verbal offers only and create written documents after 3 months of employment." },
        { id: "opt_3", text: "Use a single template for all roles regardless of the position terms." },
        { id: "opt_4", text: "Skip contracts for probationary employees to save time." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the primary purpose of an employee onboarding program in a clinic environment?",
      options: [
        { id: "opt_1", text: "To familiarize new hires with clinic SOPs, team structure, role expectations, and culture — accelerating their productivity and reducing early attrition." },
        { id: "opt_2", text: "To test whether new employees can figure out their role without guidance." },
        { id: "opt_3", text: "To introduce paperwork formalities with no practical orientation." },
        { id: "opt_4", text: "To assign maximum workload on the first day to filter serious candidates." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Receptionist: [
    {
      text: "Three patients arrive for appointments at the exact same time while the front desk telephone is ringing. How do you prioritize?",
      options: [
        { id: "opt_1", text: "Acknowledge in-person patients with a warm smile, place the caller on a brief polite hold, and check in patients in arrival order." },
        { id: "opt_2", text: "Ignore the in-person patients and have an extended conversation on the phone." },
        { id: "opt_3", text: "Walk away from the front desk until the crowd disperses." },
        { id: "opt_4", text: "Ask the patients to leave and come back in an hour." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A patient is visibly upset because their doctor consultation is running 25 minutes late due to an ongoing procedure. How should you handle it?",
      options: [
        { id: "opt_1", text: "Offer sincere empathy, explain that the doctor is concluding a delicate surgical step, and provide refreshments with updated wait timing." },
        { id: "opt_2", text: "Tell the patient that delays are normal and they must wait silently." },
        { id: "opt_3", text: "Blame the surgeon loudly in the waiting area." },
        { id: "opt_4", text: "Cancel the patient's appointment without their consent." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Why is strict patient confidentiality crucial when handling intake forms at the front desk?",
      options: [
        { id: "opt_1", text: "Patient medical history, contact info, and aesthetic records are legally protected private data." },
        { id: "opt_2", text: "It is only important if the patient is a celebrity." },
        { id: "opt_3", text: "Confidentiality is optional in private healthcare clinics." },
        { id: "opt_4", text: "It prevents other staff members from seeing clinic revenue." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should the receptionist ensure that the reception lobby maintains Clinic Ryan's premium brand standard?",
      options: [
        { id: "opt_1", text: "Keep seating immaculate, brochures neatly displayed, ambient lighting welcoming, and desk clutter-free." },
        { id: "opt_2", text: "Allow empty coffee cups and discarded papers to remain until end of day." },
        { id: "opt_3", text: "Play loud personal music on phone speakers at the front desk." },
        { id: "opt_4", text: "Keep the waiting area closed to visitors." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A visitor arrives demanding immediate entry to see a surgeon without an appointment. How do you respond?",
      options: [
        { id: "opt_1", text: "Politely explain the clinic appointment policy, check the surgeon's schedule for next open slot, and offer to book them." },
        { id: "opt_2", text: "Interrupt an active surgery to let the visitor in." },
        { id: "opt_3", text: "Argue aggressively with the visitor." },
        { id: "opt_4", text: "Give out the surgeon's private home phone number." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What step should a receptionist take when collecting post-consultation payment from a patient?",
      options: [
        { id: "opt_1", text: "Verify the billed amount against doctor recommendations, provide a detailed digital receipt, and thank them warmly." },
        { id: "opt_2", text: "Collect payment without issuing any bill or invoice." },
        { id: "opt_3", text: "Add arbitrary hidden charges without informing the patient." },
        { id: "opt_4", text: "Refuse digital payment methods and demand only cash." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should shift handovers between morning and evening reception staff be conducted?",
      options: [
        { id: "opt_1", text: "Review pending patient arrivals, uncollected payments, doctor schedule adjustments, and special requests thoroughly." },
        { id: "opt_2", text: "Leave immediately at the end of the shift without communicating." },
        { id: "opt_3", text: "Delete all daily log notes before the next receptionist arrives." },
        { id: "opt_4", text: "Only discuss non-work personal topics during handover." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Counsellor: [
    {
      text: "A patient is hesitant between two procedure packages and is overwhelmed with technical details. How should you guide them?",
      options: [
        { id: "opt_1", text: "Simplify the core differences, align recommendations with their aesthetic goals and scalp density, and provide transparent guidance." },
        { id: "opt_2", text: "Force them to buy the most expensive package regardless of medical suitability." },
        { id: "opt_3", text: "Tell them to figure it out themselves on Google." },
        { id: "opt_4", text: "Rush them into paying a deposit before answering their questions." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A patient with Grade 6 baldness expects a full teenager hairline from a single small session. What is your ethical responsibility?",
      options: [
        { id: "opt_1", text: "Set realistic expectations transparently regarding donor capacity, coverage density, and medical limitations." },
        { id: "opt_2", text: "Falsely promise 100% full density to secure the deposit payment." },
        { id: "opt_3", text: "Mock the patient's expectation." },
        { id: "opt_4", text: "Perform the consultation without mentioning donor capacity." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a counsellor handle price objections when a patient mentions a discount clinic offering half the price?",
      options: [
        { id: "opt_1", text: "Explain Clinic Ryan's surgeon-led protocols, advanced graft preservation, sterile OT standards, and natural result longevity." },
        { id: "opt_2", text: "Match the competitor's cut-rate price immediately without authorization." },
        { id: "opt_3", text: "Insult the competitor clinic and get angry." },
        { id: "opt_4", text: "Advise the patient to go to the cheap clinic." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the most critical follow-up practice after a successful in-clinic consultation?",
      options: [
        { id: "opt_1", text: "Send a personalized summary within 24 hours addressing their specific concerns and confirming tentative procedure dates." },
        { id: "opt_2", text: "Spam them with 10 generic marketing SMS messages every hour." },
        { id: "opt_3", text: "Never follow up and wait for them to call back." },
        { id: "opt_4", text: "Transfer their file to a different department without notes." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you explain the post-procedure 'shedding phase' (shock loss) to an anxious hair transplant patient?",
      options: [
        { id: "opt_1", text: "Reassure them that temporary shedding of transplanted hair shafts between weeks 3–8 is a normal biological cycle before new roots sprout." },
        { id: "opt_2", text: "Tell them that shedding means the surgery has completely failed." },
        { id: "opt_3", text: "Avoid mentioning shedding to prevent them from worrying." },
        { id: "opt_4", text: "Prescribe unauthorized medications over the phone." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What role does empathy play in medical aesthetic counselling?",
      options: [
        { id: "opt_1", text: "It builds deep patient trust, alleviates vulnerability around appearance, and creates lasting clinic-patient relationships." },
        { id: "opt_2", text: "It is unnecessary because patients only care about numbers." },
        { id: "opt_3", text: "It reduces sales revenue." },
        { id: "opt_4", text: "It is only useful for marketing brochures." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should payment and financing options (EMIs) be presented during a consultation?",
      options: [
        { id: "opt_1", text: "Clearly break down monthly installments, terms, and processing transparency without hidden charges." },
        { id: "opt_2", text: "Conceal interest rates and extra charges until after agreement signing." },
        { id: "opt_3", text: "Refuse to explain financing options." },
        { id: "opt_4", text: "Require full cash payment immediately." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Trainer: [
    {
      text: "How do you evaluate whether a new hire onboarding training program was truly successful?",
      options: [
        { id: "opt_1", text: "By measuring post-training conversion rates, call quality scores, and speed to first successful consultation booking." },
        { id: "opt_2", text: "By checking whether trainees sat quietly in the classroom." },
        { id: "opt_3", text: "By the number of PowerPoint slides shown." },
        { id: "opt_4", text: "By having trainees sign an attendance sheet without skill testing." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "When coaching an agent who struggles with objection handling, what training method is most effective?",
      options: [
        { id: "opt_1", text: "Simulated live roleplaying with immediate constructive feedback and playback analysis." },
        { id: "opt_2", text: "Telling them to read the script 50 times in silence." },
        { id: "opt_3", text: "Publicly criticizing their errors during team lunch." },
        { id: "opt_4", text: "Banning them from making calls." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you handle a trainee who is consistently resistant to feedback and insists their old habits are better?",
      options: [
        { id: "opt_1", text: "Conduct a private 1-on-1, review objective performance data, and explain how clinic standards drive their personal conversion success." },
        { id: "opt_2", text: "Argue with them during class to assert dominance." },
        { id: "opt_3", text: "Let them do whatever they want without guidance." },
        { id: "opt_4", text: "Pass them without completing required evaluations." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the best way to structure product training on complex medical aesthetic procedures for non-medical freshers?",
      options: [
        { id: "opt_1", text: "Break down medical concepts into patient-friendly benefits, clear FAQs, and visual before-and-after illustrations." },
        { id: "opt_2", text: "Give them 500 pages of advanced surgical textbooks to memorize." },
        { id: "opt_3", text: "Skip procedure knowledge completely." },
        { id: "opt_4", text: "Tell them to invent procedure details on the phone." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How frequently should call calibration sessions be held with Team Leaders to maintain objective quality scoring?",
      options: [
        { id: "opt_1", text: "Regularly (e.g. bi-weekly/monthly) to ensure consistent, unbiased scoring criteria across all evaluators." },
        { id: "opt_2", text: "Once every three years." },
        { id: "opt_3", text: "Never, because calibration is not needed." },
        { id: "opt_4", text: "Only when an agent files a formal complaint." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What technique keeps adult learners engaged during multi-day training workshops?",
      options: [
        { id: "opt_1", text: "Interactive exercises, gamified quizzes, case study breakdowns, and active peer roleplays." },
        { id: "opt_2", text: "Monotone 8-hour continuous lectures without breaks." },
        { id: "opt_3", text: "Strict silence and reading slides verbatim." },
        { id: "opt_4", text: "Showing unrelated entertainment videos all day." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a trainer handle knowledge updates when Clinic Ryan introduces a new procedure or updated package?",
      options: [
        { id: "opt_1", text: "Create concise refresher battlecards, host brief floor briefings, and run rapid knowledge check quizzes." },
        { id: "opt_2", text: "Assume all agents will guess the new details correctly." },
        { id: "opt_3", text: "Keep the new information secret from sales staff." },
        { id: "opt_4", text: "Send a 100-page email with no explanation." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Stock Manager": [
    {
      text: "What does the FIFO (First-In, First-Out) principle mean in clinic stock and consumable management?",
      options: [
        { id: "opt_1", text: "Consumables with the earliest expiration dates/manufacturing batches are utilized before newer stock." },
        { id: "opt_2", text: "The first employee to enter the stockroom takes whatever supplies they want." },
        { id: "opt_3", text: "Always use newly arrived stock first and leave old stock on shelves." },
        { id: "opt_4", text: "Throw away half the stock every month regardless of expiry." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "You notice a discrepancy between the physical count of surgical punch blades and the digital stock register. What is your first step?",
      options: [
        { id: "opt_1", text: "Conduct a physical recount, audit recent procedure requisition slips, and investigate consumption logs." },
        { id: "opt_2", text: "Manually alter the register numbers to match without investigation." },
        { id: "opt_3", text: "Blame the surgical team without checking logs." },
        { id: "opt_4", text: "Ignore the mismatch until the yearly audit." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should sterile medical supplies and surgical micromotor consumables be stored in the clinic?",
      options: [
        { id: "opt_1", text: "In a dedicated, clean, moisture-controlled, and temperature-monitored secure storage area." },
        { id: "opt_2", text: "In an open, dusty outdoor corridor." },
        { id: "opt_3", text: "Mixed with cleaning detergents and toxic chemicals." },
        { id: "opt_4", text: "Left scattered on patient waiting room tables." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is a 'Reorder Point' (ROP) in clinical inventory management?",
      options: [
        { id: "opt_1", text: "The predetermined minimum stock level that automatically triggers a new purchase order before stockouts occur." },
        { id: "opt_2", text: "The day the clinic runs out of items completely." },
        { id: "opt_3", text: "The maximum budget allowed for holiday parties." },
        { id: "opt_4", text: "The price at which vendors sell defective goods." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "When a vendor delivers a shipment of clinical consumables, what must be verified before signing the delivery challan?",
      options: [
        { id: "opt_1", text: "Quantity, batch numbers, expiry dates, seal integrity, and matching against the approved Purchase Order (PO)." },
        { id: "opt_2", text: "Sign immediately without opening or checking any boxes." },
        { id: "opt_3", text: "Only check the color of the outer packaging box." },
        { id: "opt_4", text: "Ask the delivery driver to store the items anywhere." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should expired clinical medications or damaged consumables be handled?",
      options: [
        { id: "opt_1", text: "Quarantined immediately, logged in the disposal register, and disposed of per biomedical waste regulations." },
        { id: "opt_2", text: "Used on clinic patients anyway to save costs." },
        { id: "opt_3", text: "Sold informally outside the clinic." },
        { id: "opt_4", text: "Thrown into general public street trash bins." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How does the Stock Manager ensure that the OT (Operation Theatre) never faces a shortage during procedures?",
      options: [
        { id: "opt_1", text: "Review the surgical calendar 24–48 hours in advance and prepare pre-checked surgery consumable kits." },
        { id: "opt_2", text: "Wait until surgery begins to see what items might be missing." },
        { id: "opt_3", text: "Order supplies only after a doctor complains." },
        { id: "opt_4", text: "Keep the OT stockroom locked during working hours." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "MIS Executive": [
    {
      text: "Which Excel function is most robust for cross-referencing patient IDs across two different branch lead spreadsheets?",
      options: [
        { id: "opt_1", text: "XLOOKUP (or INDEX/MATCH) for dynamic, bidirectional exact matching." },
        { id: "opt_2", text: "Manually scrolling through 10,000 rows with a magnifying glass." },
        { id: "opt_3", text: "CONCATENATE without criteria." },
        { id: "opt_4", text: "RANDBETWEEN to fill missing patient IDs." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "You notice duplicate lead phone numbers in the weekly conversion report. What is the best data hygiene workflow?",
      options: [
        { id: "opt_1", text: "Identify duplicates using conditional formatting/unique filters, analyze timestamp attribution, and merge records cleanly." },
        { id: "opt_2", text: "Delete all duplicate records completely without checking which one had the booking." },
        { id: "opt_3", text: "Ignore duplicates and count them twice to artificially inflate lead counts." },
        { id: "opt_4", text: "Rename the spreadsheet and pretend it is accurate." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the primary benefit of using automated Pivot Tables and Power Query in clinic reporting?",
      options: [
        { id: "opt_1", text: "They automate recurring data transformation and summary metrics with zero manual calculation errors." },
        { id: "opt_2", text: "They make the spreadsheet file size 100 times larger for no reason." },
        { id: "opt_3", text: "They prevent senior management from viewing reports." },
        { id: "opt_4", text: "They replace the need for accurate source data." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "When managing patient contact databases, which data security practice is mandatory?",
      options: [
        { id: "opt_1", text: "Restricting file permissions, password-protecting sensitive exports, and never sharing unmasked PII over public channels." },
        { id: "opt_2", text: "Uploading patient phone numbers to public social media forums." },
        { id: "opt_3", text: "Emailing full unencrypted databases to personal email accounts." },
        { id: "opt_4", text: "Saving passwords in plain text in public folders." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "If two clinic branch reports show conflicting numbers for the same marketing campaign ROI, how do you resolve it?",
      options: [
        { id: "opt_1", text: "Trace back to raw source transaction logs and CRM booking timestamps to verify accurate attribution." },
        { id: "opt_2", text: "Pick the higher number because it makes the report look better." },
        { id: "opt_3", text: "Average the two numbers without checking facts." },
        { id: "opt_4", text: "Delete both reports." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What metric calculates the efficiency of marketing spend in acquiring consultation leads?",
      options: [
        { id: "opt_1", text: "Cost Per Lead (CPL) = Total Ad Spend / Total Valid Leads Generated." },
        { id: "opt_2", text: "Total number of font styles used in the presentation." },
        { id: "opt_3", text: "Number of rows in the spreadsheet." },
        { id: "opt_4", text: "How long it took to download the CSV file." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should an MIS Executive handle an urgent ad-hoc data request from senior management?",
      options: [
        { id: "opt_1", text: "Clarify exact required parameters, validate output accuracy quickly, and present concise executive summaries." },
        { id: "opt_2", text: "Send raw, unformatted, error-filled data immediately." },
        { id: "opt_3", text: "Ignore the request until next week." },
        { id: "opt_4", text: "Refuse to assist management." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Technical / Developer": [
    {
      text: "In a React/Next.js application, what is the key difference between Server Components and Client Components ('use client')?",
      options: [
        { id: "opt_1", text: "Server Components execute solely on the server without client JS bundle overhead, while Client Components enable browser interactivity and hooks." },
        { id: "opt_2", text: "Server Components cannot fetch data from databases." },
        { id: "opt_3", text: "Client Components only run on mobile phones." },
        { id: "opt_4", text: "There is no difference between them in Next.js." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should sensitive credentials (such as API secret keys) be secured in a web application?",
      options: [
        { id: "opt_1", text: "Store them in server-side environment variables and never prefix with NEXT_PUBLIC_ or expose in client bundles." },
        { id: "opt_2", text: "Hardcode them directly in client-side React component state." },
        { id: "opt_3", text: "Commit them into public GitHub repository files." },
        { id: "opt_4", text: "Store them in localStorage visible to all browser scripts." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What HTTP status code should a REST API endpoint return when payload validation fails on required fields?",
      options: [
        { id: "opt_1", text: "400 Bad Request (or 422 Unprocessable Entity)." },
        { id: "opt_2", text: "200 OK." },
        { id: "opt_3", text: "500 Internal Server Error." },
        { id: "opt_4", text: "404 Not Found." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you prevent SQL/NoSQL injection vulnerabilities in database queries?",
      options: [
        { id: "opt_1", text: "Use parameterized queries, schema validation, and strict sanitization of all user-supplied input." },
        { id: "opt_2", text: "Concatenate raw user strings directly into query statements." },
        { id: "opt_3", text: "Disable all database authentication." },
        { id: "opt_4", text: "Rely solely on client-side HTML form validation." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What technique prevents rapid multiple form submissions (double-clicks) from creating duplicate records in APIs?",
      options: [
        { id: "opt_1", text: "Client-side button disabling during in-flight requests combined with server-side idempotency / token tracking." },
        { id: "opt_2", text: "Refreshing the page repeatedly." },
        { id: "opt_3", text: "Removing error handling from fetch promises." },
        { id: "opt_4", text: "Allowing unlimited concurrent write requests." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the primary cause of Cumulative Layout Shift (CLS) in web applications, and how is it resolved?",
      options: [
        { id: "opt_1", text: "Images/elements rendering without explicit width/height dimensions; resolved by reserving aspect ratio space." },
        { id: "opt_2", text: "Using too many comments in JavaScript code." },
        { id: "opt_3", text: "Having a fast internet connection." },
        { id: "opt_4", text: "Using dark mode themes." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you safely handle asynchronous network requests in JavaScript to avoid unhandled promise rejections?",
      options: [
        { id: "opt_1", text: "Wrap async/await calls inside try/catch blocks with explicit timeout signals and fallback error states." },
        { id: "opt_2", text: "Never use async functions." },
        { id: "opt_3", text: "Ignore all error objects." },
        { id: "opt_4", text: "Write infinite while loops to wait for data." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Medicine Sales Executive": [
    {
      text: "A busy doctor declines to meet you and says they are already prescribing a competitor's product. What is the best approach?",
      options: [
        { id: "opt_1", text: "Request a 3-minute appointment, bring clinical data comparing efficacy and safety, and focus on patient outcome benefits." },
        { id: "opt_2", text: "Argue that the competitor's product is inferior without any clinical evidence." },
        { id: "opt_3", text: "Offer personal cash incentives to the doctor for switching prescriptions." },
        { id: "opt_4", text: "Leave a leaflet and never follow up again." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "You are 3 days away from the end of the month and still 40% short of your sales target. What do you do?",
      options: [
        { id: "opt_1", text: "Prioritize high-potential doctors and chemists, intensify follow-ups, and highlight any ongoing promotional offers." },
        { id: "opt_2", text: "Falsify the order data to show a higher number temporarily." },
        { id: "opt_3", text: "Stop working since the target cannot be achieved." },
        { id: "opt_4", text: "Blame the product quality and refuse to visit more doctors." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What does 'product detailing' mean in pharmaceutical sales?",
      options: [
        { id: "opt_1", text: "A structured clinical presentation to doctors about a product's mechanism, efficacy, dosage, and safety profile." },
        { id: "opt_2", text: "Cleaning and polishing the product packaging before delivery." },
        { id: "opt_3", text: "Listing product prices to chemists and distributors." },
        { id: "opt_4", text: "Reading out the package insert aloud to the doctor without customization." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A chemist reports that your product's stock is near expiry and wants to return it. How do you handle this?",
      options: [
        { id: "opt_1", text: "Acknowledge the issue immediately, initiate a proper return process per company policy, and replace with fresh stock." },
        { id: "opt_2", text: "Tell the chemist to sell the near-expiry stock at full price quickly." },
        { id: "opt_3", text: "Ignore the complaint and avoid visiting that chemist." },
        { id: "opt_4", text: "Ask the chemist to change the expiry date on the label." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the most ethical way to promote a pharmaceutical product to healthcare professionals?",
      options: [
        { id: "opt_1", text: "Share evidence-based clinical data, peer-reviewed studies, and approved product information only." },
        { id: "opt_2", text: "Make unsubstantiated claims about the product curing all conditions." },
        { id: "opt_3", text: "Offer expensive gifts and cash payments to prescribers." },
        { id: "opt_4", text: "Withhold known side effect information to improve prescription rates." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a medicine sales executive build a long-term relationship with a high-prescribing doctor?",
      options: [
        { id: "opt_1", text: "Provide consistent clinical value, share updated research, support CME programs, and respond to queries promptly." },
        { id: "opt_2", text: "Visit only when new products are launched and ignore them otherwise." },
        { id: "opt_3", text: "Bring personal gifts unrelated to the product on every visit." },
        { id: "opt_4", text: "Only communicate through WhatsApp promotional groups." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A competitor MR (medical representative) is spreading negative information about your product to doctors in your territory. How do you respond?",
      options: [
        { id: "opt_1", text: "Calmly address the concern by presenting factual clinical evidence and reinforcing your product's established safety profile." },
        { id: "opt_2", text: "Retaliate by spreading negative claims about the competitor's product." },
        { id: "opt_3", text: "File a complaint on social media against the competitor." },
        { id: "opt_4", text: "Stop visiting the doctors who were approached by the competitor." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Nursing Staff": [
    {
      text: "A patient returning from a hair transplant procedure complains of sudden severe scalp pain and swelling. What is your first action?",
      options: [
        { id: "opt_1", text: "Immediately assess vitals, notify the attending doctor, document symptoms, and administer prescribed analgesics if ordered." },
        { id: "opt_2", text: "Tell the patient it is normal and ask them to wait quietly." },
        { id: "opt_3", text: "Administer any available painkiller from the cabinet without a doctor's prescription." },
        { id: "opt_4", text: "Send the patient home and ask them to visit the next day." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the most critical principle of aseptic technique in an OT (Operation Theatre) environment?",
      options: [
        { id: "opt_1", text: "Maintaining a sterile field at all times by avoiding any contamination of sterile instruments and surfaces." },
        { id: "opt_2", text: "Wearing gloves only when handling sharps." },
        { id: "opt_3", text: "Sterilizing instruments by wiping with a dry cloth." },
        { id: "opt_4", text: "Limiting hand washing to before and after each shift." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Before administering prescribed medication to a patient, what checks must a nurse perform?",
      options: [
        { id: "opt_1", text: "Verify patient identity, medication name, dose, route, timing, and check for known allergies (5 Rights + Allergy check)." },
        { id: "opt_2", text: "Administer the medication quickly without checking the prescription." },
        { id: "opt_3", text: "Check only the patient's name on the file." },
        { id: "opt_4", text: "Ask the patient what dose they prefer." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should post-operative wound care be documented in the patient's nursing record?",
      options: [
        { id: "opt_1", text: "Record the wound appearance, drainage characteristics, dressing type applied, patient response, and attending nurse's signature with timestamp." },
        { id: "opt_2", text: "Only note if the wound looks 'good or bad' without specifics." },
        { id: "opt_3", text: "Document nothing and wait for the doctor to make notes." },
        { id: "opt_4", text: "Record only when the patient complains about the wound." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A patient becomes panicked and anxious before their scheduled hair transplant procedure. How should the nursing staff respond?",
      options: [
        { id: "opt_1", text: "Speak calmly, explain each procedural step in simple terms, reassure them about anesthesia comfort, and inform the doctor if anxiety persists." },
        { id: "opt_2", text: "Tell them not to worry and rush them into the OT." },
        { id: "opt_3", text: "Ignore their anxiety as it is considered normal." },
        { id: "opt_4", text: "Administer a sedative without consulting the doctor." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What infection control measure is mandatory before and after every patient contact in a clinic setting?",
      options: [
        { id: "opt_1", text: "Thorough hand hygiene using soap and water or an alcohol-based hand sanitizer per WHO hand-rub technique." },
        { id: "opt_2", text: "Wearing the same gloves for multiple patients throughout the shift." },
        { id: "opt_3", text: "Sanitizing only when visibly soiled hands are noticed." },
        { id: "opt_4", text: "Hand hygiene is only needed before surgery, not general care." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "During shift handover, what key nursing information must be communicated to the incoming nurse?",
      options: [
        { id: "opt_1", text: "Patient condition updates, pending medications, doctor instructions, IV line status, wound observations, and any alerts or concerns." },
        { id: "opt_2", text: "Only which patients were difficult or uncooperative." },
        { id: "opt_3", text: "Nothing — the incoming nurse should start fresh without prior information." },
        { id: "opt_4", text: "Only the patient's name and bed number." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Doctor: [
    {
      text: "A patient presents requesting a hair transplant but has an uncontrolled systemic condition. What is the correct clinical approach?",
      options: [
        { id: "opt_1", text: "Defer the procedure, manage the systemic condition first, obtain medical clearance, and schedule surgery once the patient is stable." },
        { id: "opt_2", text: "Proceed with surgery immediately to avoid losing the patient to another clinic." },
        { id: "opt_3", text: "Ask the patient to sign a waiver and proceed without stabilization." },
        { id: "opt_4", text: "Prescribe extra blood thinners and proceed with the transplant." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the most critical element of valid informed consent before an elective cosmetic procedure?",
      options: [
        { id: "opt_1", text: "The patient fully understands the procedure, realistic outcomes, risks, alternatives, and post-care, and consents voluntarily without coercion." },
        { id: "opt_2", text: "The patient signs the form without necessarily understanding the details." },
        { id: "opt_3", text: "Informed consent is only required for general anesthesia procedures." },
        { id: "opt_4", text: "Verbal agreement over the phone is sufficient." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "During a hair transplant surgery, the patient's blood pressure drops suddenly. What is your immediate response?",
      options: [
        { id: "opt_1", text: "Pause the procedure, assess airway, breathing, and circulation, administer appropriate intervention, and monitor vitals continuously." },
        { id: "opt_2", text: "Continue the procedure as the BP drop is likely temporary." },
        { id: "opt_3", text: "Ask the nurse to fan the patient and continue." },
        { id: "opt_4", text: "Discharge the patient immediately and ask them to rest at home." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a doctor manage a patient who is dissatisfied with their hair transplant results at a 6-month follow-up?",
      options: [
        { id: "opt_1", text: "Listen empathetically, objectively assess graft growth against documented pre-op photos, explain the growth timeline, and propose a clinical action plan." },
        { id: "opt_2", text: "Dismiss the complaint and tell them results take time." },
        { id: "opt_3", text: "Blame the patient's post-op care routine without clinical assessment." },
        { id: "opt_4", text: "Offer a full refund immediately without clinical review." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the medical significance of the donor area density in hair transplant candidacy assessment?",
      options: [
        { id: "opt_1", text: "It determines the maximum number of grafts that can be safely harvested without causing visible donor zone depletion." },
        { id: "opt_2", text: "It only determines the patient's hair colour." },
        { id: "opt_3", text: "Donor density has no relevance to transplant planning." },
        { id: "opt_4", text: "It determines which brand of surgical tools must be used." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A patient requests a hairline design that is clinically inappropriate for their age and future hair loss progression. How do you respond?",
      options: [
        { id: "opt_1", text: "Explain the long-term implications, propose an age-appropriate design with future density banking in mind, and document the discussion." },
        { id: "opt_2", text: "Comply with exactly what the patient requests to avoid conflict." },
        { id: "opt_3", text: "Refuse to treat the patient without explanation." },
        { id: "opt_4", text: "Design whatever will make the immediate result look best regardless of future consequences." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What does the Norwood-Hamilton scale measure and why is it clinically important in hair restoration?",
      options: [
        { id: "opt_1", text: "It classifies the progressive stages of male pattern baldness (MPB) and guides treatment planning, graft estimation, and candidate eligibility." },
        { id: "opt_2", text: "It measures the patient's weight and BMI for surgical risk assessment." },
        { id: "opt_3", text: "It is a blood pressure classification system used in pre-operative screening." },
        { id: "opt_4", text: "It measures the thickness of individual hair follicles in microns." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Transplant Technician": [
    {
      text: "During FUE graft extraction, the surgeon notices transection rates increasing. What is the most likely cause and corrective action?",
      options: [
        { id: "opt_1", text: "The punch angle or depth may be misaligned with follicle direction; the technician should recheck follicle exit angles and communicate with the surgeon immediately." },
        { id: "opt_2", text: "The patient is moving too much; ask them to stay completely still." },
        { id: "opt_3", text: "Increase punch rotation speed to extract faster." },
        { id: "opt_4", text: "Continue at the same rate and correct during implantation." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the maximum safe 'out-of-body time' for harvested grafts to maintain optimal graft viability?",
      options: [
        { id: "opt_1", text: "As minimal as possible — ideally under 6 hours — with grafts kept hydrated in chilled Ringer's Lactate or HypoThermosol solution." },
        { id: "opt_2", text: "Grafts can survive for 24 hours at room temperature in plain water." },
        { id: "opt_3", text: "Viability is not impacted by out-of-body time as long as grafts look intact." },
        { id: "opt_4", text: "Grafts must be dried completely before implantation to prevent infection." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should extracted grafts be categorized and prepared for implantation during a DHI procedure?",
      options: [
        { id: "opt_1", text: "Sort by graft size (1-, 2-, 3-hair units), keep moist in a cool holding solution, and load into Choi pens based on surgeon requirements." },
        { id: "opt_2", text: "Mix all graft sizes together and implant randomly." },
        { id: "opt_3", text: "Leave grafts drying on a gauze pad until needed." },
        { id: "opt_4", text: "Store grafts in saline at room temperature under direct light for rapid access." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the purpose of maintaining correct graft density and angle during implantation?",
      options: [
        { id: "opt_1", text: "To achieve a natural hair growth direction, cosmetic density, and prevent unnatural clumping or directional inconsistency." },
        { id: "opt_2", text: "To implant as many grafts as possible in the shortest time regardless of direction." },
        { id: "opt_3", text: "Graft angle only matters for the frontal hairline, not the crown." },
        { id: "opt_4", text: "Implantation angle has no clinical significance if grafts survive." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "During a prolonged surgery, the graft holding solution temperature rises above safe levels. What should the technician do?",
      options: [
        { id: "opt_1", text: "Immediately inform the surgeon, refresh the solution with properly chilled Ringer's Lactate, and check graft integrity." },
        { id: "opt_2", text: "Continue implanting at a faster speed to use grafts before damage occurs." },
        { id: "opt_3", text: "Place the graft container under a heat lamp to stabilize temperature." },
        { id: "opt_4", text: "Add tap water to the solution to cool it down quickly." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What OT (Operation Theatre) hygiene practice is mandatory before and during a hair transplant procedure?",
      options: [
        { id: "opt_1", text: "Sterile gloves, surgical cap, mask, and gown; all instruments must be sterilized; surfaces must be disinfected between patients." },
        { id: "opt_2", text: "Regular hand wash with soap is sufficient without gloves." },
        { id: "opt_3", text: "OT hygiene protocols apply only to general anesthesia surgeries." },
        { id: "opt_4", text: "Instruments can be reused across patients after wiping with alcohol wipes." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should a transplant technician handle a situation where the patient's scalp bleeds excessively during donor harvesting?",
      options: [
        { id: "opt_1", text: "Apply gentle pressure with sterile gauze, immediately notify the surgeon, and pause harvesting until bleeding is controlled." },
        { id: "opt_2", text: "Continue harvesting to minimize procedure time." },
        { id: "opt_3", text: "Apply direct heat to the area to cauterize the bleeding independently." },
        { id: "opt_4", text: "Use excess local anesthetic injections without consulting the surgeon." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Software Developer": [
    {
      text: "In a React/Next.js application, when should you use a Server Component versus a Client Component ('use client')?",
      options: [
        { id: "opt_1", text: "Use Server Components for data fetching, SEO rendering, and static content; use Client Components only when browser interactivity, hooks, or event listeners are needed." },
        { id: "opt_2", text: "Always use Client Components for everything since they are more powerful." },
        { id: "opt_3", text: "Server Components should be used only for authentication pages." },
        { id: "opt_4", text: "There is no meaningful difference — they are interchangeable." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "A REST API endpoint is responding with 200 OK but returning incorrect data for some requests. How do you diagnose this?",
      options: [
        { id: "opt_1", text: "Add request/response logging, reproduce with controlled test inputs, inspect data transformation logic and database query output systematically." },
        { id: "opt_2", text: "Restart the server and hope the issue resolves itself." },
        { id: "opt_3", text: "Change the API status code to 204 so the client ignores the response." },
        { id: "opt_4", text: "Ask the frontend team to ignore the incorrect data fields." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should secret environment variables (API keys, database URIs) be managed in a Next.js application?",
      options: [
        { id: "opt_1", text: "Store them in .env.local (server-only), never prefix with NEXT_PUBLIC_, exclude from .gitignore to prevent public commits, and use a secrets manager for production." },
        { id: "opt_2", text: "Hardcode them directly in the React component state for easy access." },
        { id: "opt_3", text: "Store them in a public JSON file accessible from the client browser." },
        { id: "opt_4", text: "Store them in localStorage for persistence across sessions." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the best strategy to optimize a MongoDB query that is causing slow response times on a frequently accessed collection?",
      options: [
        { id: "opt_1", text: "Analyze with explain(), add compound indexes on queried fields, avoid full collection scans, and project only required fields." },
        { id: "opt_2", text: "Increase the server's RAM and ignore the query design." },
        { id: "opt_3", text: "Remove all indexes as they slow down write operations." },
        { id: "opt_4", text: "Cache all MongoDB responses in a global variable on the client." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What HTTP status code should be returned when a user submits a form with a missing required field?",
      options: [
        { id: "opt_1", text: "400 Bad Request — the client submitted invalid or incomplete data." },
        { id: "opt_2", text: "200 OK — always return OK to avoid frontend error handling complexity." },
        { id: "opt_3", text: "500 Internal Server Error — the server could not process the incomplete form." },
        { id: "opt_4", text: "301 Redirect — redirect the user to re-enter their data." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you prevent Cross-Site Scripting (XSS) attacks in a web application?",
      options: [
        { id: "opt_1", text: "Sanitize and escape all user-generated content before rendering, use Content Security Policy (CSP) headers, and avoid dangerouslySetInnerHTML in React." },
        { id: "opt_2", text: "Only use HTTPS to prevent XSS attacks." },
        { id: "opt_3", text: "XSS is only relevant to PHP applications, not React." },
        { id: "opt_4", text: "Disable JavaScript in the browser to prevent injections." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the purpose of code reviews in a professional software development workflow?",
      options: [
        { id: "opt_1", text: "To ensure code quality, catch bugs early, enforce standards, share knowledge across the team, and reduce technical debt." },
        { id: "opt_2", text: "To slow down development and create unnecessary delays." },
        { id: "opt_3", text: "To assign blame when production bugs are found." },
        { id: "opt_4", text: "They are only necessary for junior developers." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Other: [
    {
      text: "When assigned multiple urgent tasks with overlapping deadlines, what is the best professional approach?",
      options: [
        { id: "opt_1", text: "Assess task impact, communicate with supervisors to clarify priority order, and execute systematically." },
        { id: "opt_2", text: "Panic and abandon all tasks." },
        { id: "opt_3", text: "Complete only the easiest task and leave the rest without informing anyone." },
        { id: "opt_4", text: "Complain publicly to colleagues." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How should you respond when receiving constructive criticism or feedback from your team leader?",
      options: [
        { id: "opt_1", text: "Listen receptively with an open mind, seek clarification on expectations, and apply the feedback to improve." },
        { id: "opt_2", text: "Argue immediately and become defensive." },
        { id: "opt_3", text: "Ignore the feedback and repeat the same mistakes." },
        { id: "opt_4", text: "Stop speaking to your team leader." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What does patient confidentiality and professional integrity mean in a clinic environment?",
      options: [
        { id: "opt_1", text: "Protecting patient privacy, safeguarding clinic records, and upholding ethical conduct at all times." },
        { id: "opt_2", text: "Discussing patient medical details with friends outside of work." },
        { id: "opt_3", text: "Sharing internal clinic documents on personal social media." },
        { id: "opt_4", text: "Ignoring clinic standard operating procedures." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "If you realize you made a clerical or operational mistake at work, what is the most responsible action?",
      options: [
        { id: "opt_1", text: "Own the mistake promptly, inform your supervisor, and take immediate corrective steps to resolve it." },
        { id: "opt_2", text: "Try to conceal the mistake and blame a teammate." },
        { id: "opt_3", text: "Pretend the mistake never happened." },
        { id: "opt_4", text: "Delete computer logs to hide evidence." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "How do you handle a demanding or upset customer in a professional healthcare setting?",
      options: [
        { id: "opt_1", text: "Maintain a calm and respectful demeanor, actively listen to their grievance, and offer solution-focused assistance." },
        { id: "opt_2", text: "Raise your voice and shout back at them." },
        { id: "opt_3", text: "Roll your eyes and walk away." },
        { id: "opt_4", text: "Tell them to find another clinic." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "What is the key to building strong collaboration and positive relationships within a clinic team?",
      options: [
        { id: "opt_1", text: "Clear communication, mutual respect, punctuality, and supporting colleagues during peak operational rushes." },
        { id: "opt_2", text: "Engaging in workplace gossip and creating cliques." },
        { id: "opt_3", text: "Refusing to help teammates when your own tasks are finished." },
        { id: "opt_4", text: "Taking credit for others' contributions." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Why is punctuality, reliability, and schedule adherence critical in a high-touch clinic environment?",
      options: [
        { id: "opt_1", text: "It ensures seamless patient appointments, prevents workflow bottlenecks, and respects colleagues' time." },
        { id: "opt_2", text: "It is only important on inspection days." },
        { id: "opt_3", text: "It has no impact on patient experience." },
        { id: "opt_4", text: "It is an outdated rule." },
      ],
      correctOptionId: "opt_1",
    },
  ],
};

/**
 * Maps position string to role pool key
 */
function resolveRoleKey(position) {
  if (!position || typeof position !== "string") return "Other";
  const pos = position.trim();

  // ── Explicit exact-string matches for current dropdown positions ──────────
  // Checked first so renamed/new roles always resolve to their own pool
  // without accidentally matching a fuzzy heuristic below.
  if (pos === "Pharmacy Executive") return "Medicine Sales Executive";
  if (pos === "Nursing Staff / OT Staff") return "Nursing Staff";
  if (pos === "Manager") return "Manager";
  if (pos === "HR Recruiter") return "HR Recruiter";

  // ── Exact key match for any other known role ──────────────────────────────
  if (ROLE_COMPETENCIES[pos]) return pos;

  // ── Fuzzy heuristics for legacy or variant position strings ──────────────
  const lower = pos.toLowerCase();
  if (lower.includes("telecall") || lower.includes("caller") || lower.includes("sales") || lower.includes("bpo")) {
    return "Telecaller";
  }
  if (lower.includes("lead") || lower.includes("supervisor") || (lower.includes("manager") && !lower.includes("stock"))) {
    return "Team Leader";
  }
  if (lower.includes("reception") || lower.includes("front") || lower.includes("desk")) {
    return "Receptionist";
  }
  if (lower.includes("counsel") || lower.includes("consultant")) {
    return "Counsellor";
  }
  if (lower.includes("train")) {
    return "Trainer";
  }
  if (lower.includes("stock") || lower.includes("inventory") || lower.includes("warehouse")) {
    return "Stock Manager";
  }
  if (lower.includes("mis") || lower.includes("excel") || lower.includes("data")) {
    return "MIS Executive";
  }
  if (lower.includes("tech") || lower.includes("developer") || lower.includes("software") || lower.includes("engineer")) {
    return "Technical / Developer";
  }
  if (lower.includes("medicine") || lower.includes("pharma") || lower.includes("medical rep") || lower.includes("mr ") || lower.includes("drug")) {
    return "Medicine Sales Executive";
  }
  if (lower.includes("nurs") || lower.includes("ot staff")) {
    return "Nursing Staff";
  }
  if (lower.includes("recruiter") || lower.includes("hr ") || lower.includes("human resource")) {
    return "HR Recruiter";
  }
  if (lower.includes("doctor") || lower.includes("physician") || lower.includes("surgeon")) {
    return "Doctor";
  }
  if (lower.includes("transplant") || lower.includes("technician") || lower.includes("tech ot") || lower.includes("fue") || lower.includes("dhi")) {
    return "Transplant Technician";
  }
  if (lower.includes("software dev") || lower.includes("web dev")) {
    return "Software Developer";
  }
  return "Other";
}

/**
 * Fisher-Yates shuffle of a question's options array.
 * Reassigns stable option IDs (opt_1…opt_4) to shuffled positions and
 * updates correctOptionId to point to the new position of the correct answer.
 * The question text is never altered.
 *
 * @param {{ options: Array<{ id: string, text: string }>, correctOptionId: string }} q
 * @returns {{ options: Array<{ id: string, text: string }>, correctOptionId: string }}
 */
function shuffleOptions(q) {
  // Build a mapping: original id → text
  const optsCopy = q.options.map((o) => ({ id: o.id, text: o.text }));

  // Fisher-Yates shuffle
  for (let i = optsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optsCopy[i], optsCopy[j]] = [optsCopy[j], optsCopy[i]];
  }

  // Find where the correct answer landed after shuffle
  const correctOriginalText = q.options.find((o) => o.id === q.correctOptionId)?.text;

  // Reassign stable IDs (opt_1, opt_2, opt_3, opt_4) in new order
  const newOptions = optsCopy.map((o, idx) => ({ id: `opt_${idx + 1}`, text: o.text }));
  const newCorrectOptionId =
    newOptions.find((o) => o.text === correctOriginalText)?.id || `opt_1`;

  return { options: newOptions, correctOptionId: newCorrectOptionId };
}

/**
 * Safely shuffles and returns `count` unique MCQs from the pool without mutating the original pool.
 * Also randomizes each question's option order server-side so the correct answer is
 * not always displayed as Option A.
 *
 * @param {Array<Object>} pool - Pool of MCQs
 * @param {number} count - Number of questions
 * @returns {Array<{ id: string, text: string, options: Array<{ id: string, text: string }>, correctOptionId: string }>}
 */
function getRandomMCQsFromPool(pool, count = TOTAL_QUESTIONS, defaultPool = DEFAULT_FALLBACK_QUESTIONS.Other) {
  const source = Array.isArray(pool) && pool.length >= count ? pool : defaultPool;
  const cloned = source.map((item) => ({
    text: item.text,
    options: item.options.map((opt) => ({ id: opt.id, text: opt.text })),
    correctOptionId: item.correctOptionId,
  }));

  // Fisher-Yates shuffle of question order
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  const selected = cloned.slice(0, Math.min(count, cloned.length));
  return selected.map((q, idx) => {
    // Shuffle options of each selected question independently
    const shuffled = shuffleOptions(q);
    return {
      id: `q_${idx + 1}`,
      text: q.text,
      options: shuffled.options,
      correctOptionId: shuffled.correctOptionId,
    };
  });
}

/**
 * Generates 7 role-specific Multiple Choice Questions (MCQs) via OpenAI with 4 options each and 1 correct answer.
 * Generates questions in either clear English or natural conversational Hinglish (Roman script) based on candidate preference.
 * Falls back safely to randomized curated MCQs in the selected language if OpenAI is unconfigured or unavailable.
 *
 * @param {Object} params
 * @param {string} params.position - Applied job position
 * @param {string} params.experienceType - "Fresher" | "Experienced"
 * @param {number} params.yearsOfExperience - Number of years
 * @param {string} [params.language] - "en" | "hinglish" (default: "en")
 * @returns {Promise<Array<{ id: string, text: string, options: Array<{ id: string, text: string }>, correctOptionId: string }>>}
 */
export async function generateInterviewQuestions({ position, experienceType, yearsOfExperience, language = "en" }) {
  const isHinglish = language === "hinglish";
  const resolvedKey = resolveRoleKey(position);
  const roleInfo = ROLE_COMPETENCIES[resolvedKey] || ROLE_COMPETENCIES.Other;

  // Select language-appropriate fallback pool
  const fallbackPools = isHinglish ? DEFAULT_FALLBACK_QUESTIONS_HINGLISH : DEFAULT_FALLBACK_QUESTIONS;
  const fallbackList = fallbackPools[resolvedKey] || fallbackPools.Other;
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. If OpenAI API key is missing, immediately return randomized fallback MCQs in the selected language
  if (!apiKey) {
    return getRandomMCQsFromPool(fallbackList, TOTAL_QUESTIONS, fallbackPools.Other);
  }

  // 2. Build language-specific directive
  const languageDirective = isHinglish
    ? `LANGUAGE REQUIREMENT: HINGLISH (Conversational Hindi + English in Roman script).
- Every question text and all 4 options MUST be written in natural, everyday conversational Hinglish using the Roman English alphabet (strictly NO Devanagari script).
- Naturally combine common conversational Hindi with standard English professional terms (e.g., 'customer', 'appointment', 'target', 'doctor', 'clinic', 'call', 'delay', 'issue', 'team', 'conversion').
- Question style example: "Agar koi customer appointment delay hone ki wajah se upset hai, toh aap us situation ko kaise handle karenge?"
- Option style example: "Politely delay ka reason explain karenge, empathy dikhayenge aur refreshments offer karenge."
- Avoid difficult Sanskritized or literary Hindi.
- Avoid mechanical word-by-word translations; keep sentences smooth, conversational, and instantly understandable for Indian candidates.`
    : `LANGUAGE REQUIREMENT: ENGLISH.
- All question texts and all 4 options MUST be written in clear, professional, modern English.`;

  // 3. Build structured OpenAI prompt for 7 role-specific MCQs
  const systemPrompt = `
You are a senior talent assessment expert at Clinic Ryan, a premier hair transplant and aesthetic healthcare clinic.
Your task is to generate exactly ${TOTAL_QUESTIONS} distinct, high-quality, professional Multiple Choice Questions (MCQs) to evaluate a job candidate.

POSITION: ${position} (${roleInfo.title})
EXPERIENCE LEVEL: ${experienceType} (${yearsOfExperience || 0} years)
KEY ROLE COMPETENCIES TO COVER:
${roleInfo.focusAreas.map((f, i) => `${i + 1}. ${f}`).join("\n")}

${languageDirective}

MCQ FORMAT REQUIREMENTS:
1. Generate EXACTLY ${TOTAL_QUESTIONS} questions.
2. Each question MUST contain EXACTLY 4 options (ids: "opt_1", "opt_2", "opt_3", "opt_4").
3. Exactly ONE option MUST be unambiguously the correct/best professional answer, identified by "correctOptionId" (e.g. "opt_1", "opt_2", "opt_3", or "opt_4").
4. The remaining 3 options must be realistic but suboptimal, counter-productive, or incorrect professional actions.
5. Randomly vary which option id is the correct answer across questions (do not make "opt_1" always correct).
6. Every question must test a distinct practical workplace scenario, objection handling, problem-solving, or competency check relevant to "${position}".
7. Both the question text and all 4 options MUST be in the requested language (${isHinglish ? "Hinglish" : "English"}).
8. Do not repeat questions or near-duplicate scenarios.

${QUESTION_GENERATION_SAFETY_PROMPT}

OUTPUT JSON SCHEMA:
{
  "questions": [
    {
      "id": "q_1",
      "text": "Question scenario text...",
      "options": [
        { "id": "opt_1", "text": "Option 1 description" },
        { "id": "opt_2", "text": "Option 2 description" },
        { "id": "opt_3", "text": "Option 3 description" },
        { "id": "opt_4", "text": "Option 4 description" }
      ],
      "correctOptionId": "opt_2"
    }
  ]
}
`.trim();

  const variationSeeds = [
    "Focus on handling high-pressure clinic scenarios, patient communication nuances, and practical judgment.",
    "Focus on practical problem-solving, objection handling, and operational accuracy.",
    "Focus on customer service standards, de-escalation, conversion quality, and ethical clinical conduct.",
    "Focus on workflow discipline, teamwork, compliance, and unexpected obstacle resolution.",
  ];
  const selectedSeed = variationSeeds[Math.floor(Math.random() * variationSeeds.length)];

  const userPrompt = isHinglish
    ? `Generate ${TOTAL_QUESTIONS} distinct, professional 4-option MCQs in natural HINGLISH (conversational Roman-script Hindi + English) for a candidate applying for "${position}" with ${experienceType} background (${yearsOfExperience || 0} years experience). Both question text and all 4 options must be in Hinglish. ${selectedSeed}`
    : `Generate ${TOTAL_QUESTIONS} distinct, professional 4-option MCQs in clear English for a candidate applying for "${position}" with ${experienceType} background (${yearsOfExperience || 0} years experience). ${selectedSeed}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[AI-Interview] OpenAI MCQ generation error: HTTP ${res.status}. Using randomized ${language} fallback.`);
      return getRandomMCQsFromPool(fallbackList, TOTAL_QUESTIONS, fallbackPools.Other);
    }

    const data = await res.json();
    const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");

    // Post-generation validation of MCQs
    if (Array.isArray(parsed.questions) && parsed.questions.length >= TOTAL_QUESTIONS) {
      const validQuestions = [];
      const seenTexts = new Set();

      for (const q of parsed.questions) {
        if (!q || typeof q.text !== "string" || !Array.isArray(q.options) || q.options.length !== 4) continue;
        const text = q.text.trim();
        const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, "");

        // Verify valid options and correctOptionId
        const validOptions = q.options.every((opt) => opt && opt.id && typeof opt.text === "string" && opt.text.trim().length > 0);
        const hasValidCorrectId = q.options.some((opt) => opt.id === q.correctOptionId);

        if (text.length >= 15 && validOptions && hasValidCorrectId && !seenTexts.has(normalized)) {
          seenTexts.add(normalized);
          validQuestions.push({
            text,
            options: q.options.map((opt, oIdx) => ({
              id: opt.id || `opt_${oIdx + 1}`,
              text: opt.text.trim(),
            })),
            correctOptionId: q.correctOptionId,
          });
        }
      }

      if (validQuestions.length >= TOTAL_QUESTIONS) {
        return validQuestions.slice(0, TOTAL_QUESTIONS).map((q, idx) => {
          // Shuffle options of each OpenAI-generated question independently
          const shuffled = shuffleOptions(q);
          return {
            id: `q_${idx + 1}`,
            text: q.text,
            options: shuffled.options,
            correctOptionId: shuffled.correctOptionId,
          };
        });
      }
    }

    console.warn(`[AI-Interview] OpenAI returned insufficient valid MCQs. Using randomized ${language} fallback pool.`);
    return getRandomMCQsFromPool(fallbackList, TOTAL_QUESTIONS, fallbackPools.Other);
  } catch (err) {
    console.error("[AI-Interview] OpenAI MCQ generation failed (timeout/network):", err.name || err.message);
    return getRandomMCQsFromPool(fallbackList, TOTAL_QUESTIONS, fallbackPools.Other);
  }
}

/**
 * Server-side evaluation of candidate's MCQ responses against the authoritative session answer key.
 * Deterministic and objective MCQ evaluation: evaluates whether selected option matches the correct answer.
 * Candidates answering in Hinglish or English face zero language bias.
 *
 * @param {Object} params
 * @param {string} params.position - Applied role
 * @param {string} params.experienceType - "Fresher" | "Experienced"
 * @param {number} params.yearsOfExperience - Years of experience
 * @param {string} [params.language] - "en" | "hinglish"
 * @param {Array<{ questionId: string, questionText: string, selectedOptionId: string, correctOptionId: string }>} params.qaPairs
 * @returns {Promise<Object>} Structured evaluation with overallScore, passed flag
 */
export async function evaluateCandidateAnswers({ position, experienceType, yearsOfExperience, language = "en", qaPairs }) {
  if (!Array.isArray(qaPairs) || qaPairs.length === 0) {
    return {
      success: false,
      error: "No assessment answers provided for evaluation.",
    };
  }

  // Deterministic and objective MCQ scoring
  let correctCount = 0;
  qaPairs.forEach((qa) => {
    if (qa.selectedOptionId && qa.correctOptionId && qa.selectedOptionId === qa.correctOptionId) {
      correctCount++;
    }
  });

  const overallScore = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
  const passed = overallScore >= BASE_SCORE;

  return {
    success: true,
    overallScore,
    correctCount,
    totalQuestions: TOTAL_QUESTIONS,
    roleKnowledge: overallScore,
    communication: overallScore,
    problemSolving: overallScore,
    answerQuality: overallScore,
    relevance: overallScore,
    language: language === "hinglish" ? "Hinglish" : "English",
    summary: `Candidate answered ${correctCount} of ${TOTAL_QUESTIONS} MCQs correctly (${overallScore}%).`,
    baseScore: BASE_SCORE,
    passed,
  };
}
