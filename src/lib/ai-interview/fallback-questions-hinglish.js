/**
 * Clinic Ryan — Curated Role-Specific Hinglish Multiple Choice Questions (MCQs) Pool.
 * Used as high-quality offline/fallback MCQs when the candidate chooses Hinglish.
 * Written in natural, conversational Hinglish (Roman English script).
 * Each question has exactly 4 options and exactly one server-verified correct answer.
 */

export const DEFAULT_FALLBACK_QUESTIONS_HINGLISH = {
  Telecaller: [
    {
      text: "Jab koi prospective patient kehta hai ki budget clinic ke mukable Clinic Ryan ka transplant cost zyada hai, toh best response kya hoga?",
      options: [
        { id: "opt_1", text: "Surgeon credentials, sterile surgical safety, natural hairline design aur long-term graft survival explain karein." },
        { id: "opt_2", text: "Lead lose na ho isliye bina authorization turant 50% discount offer karein." },
        { id: "opt_3", text: "Caller ko bole ki saste clinic mein hamesha donor area damage aur infection ho jata hai." },
        { id: "opt_4", text: "Call jaldi disconnect kar dein kyunki wo qualified lead nahi hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek inbound caller phone par bina clinic visit kiye exact final price quote maangta hai. Aapko kaise respond karna chahiye?",
      options: [
        { id: "opt_1", text: "Caller ko interested rakhne ke liye phone par koi bhi random estimated amount bol dein." },
        { id: "opt_2", text: "Politely explain karein ki pricing individual graft requirement aur scalp density par depend karta hai, jo doctor in-person consultation mein check karke batate hain." },
        { id: "opt_3", text: "Jab tak appointment book na kare, aage baat karne se mana karein." },
        { id: "opt_4", text: "Lowest starting rate quote karein aur doctor visit ko optional batayein." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "Clinic Ryan mein pre-screening telecalling consultation ka primary objective kya hota hai?",
      options: [
        { id: "opt_1", text: "Phone par hi medical diagnosis dena aur medicines prescribe karna." },
        { id: "opt_2", text: "Patient concerns samajhna, unki suitability qualify karna aur doctor consultation schedule karwana." },
        { id: "opt_3", text: "Pehli cold call par hi credit card payment collect karna." },
        { id: "opt_4", text: "Sirf call duration badhana chahe appointment book ho ya na ho." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "Agar koi lead phone uthakar bole 'Main abhi busy hoon, baad mein call karo', toh sabse effective approach kya hai?",
      options: [
        { id: "opt_1", text: "Unke schedule ko acknowledge karein aur ek exact convenient callback time (jaise aaj shaam 5 baje) confirm karein." },
        { id: "opt_2", text: "Call cut hone se pehle jaldi-jaldi poori pitch bolna continue rakhein." },
        { id: "opt_3", text: "Lead ko CRM mein permanently not-interested mark kar dein." },
        { id: "opt_4", text: "Lagaatar 5 baar back-to-back call karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Inme se kaun si practice clinic telecallers ke liye unethical aur prohibited hai?",
      options: [
        { id: "opt_1", text: "Procedure ke baad clinic ka post-care follow-up explain karna." },
        { id: "opt_2", text: "Sale close karne ke liye patient ko 100% permanent zero-shedding medical guarantee ka jhootha vaada karna." },
        { id: "opt_3", text: "Flexible EMI aur payment plan options share karna." },
        { id: "opt_4", text: "Past clinic patients ke real before-and-after cases share karna." },
      ],
      correctOptionId: "opt_2",
    },
    {
      text: "High-volume calling shift ke dauran lagataar rejections aane par aap apna motivation kaise maintain karenge?",
      options: [
        { id: "opt_1", text: "Emotional resilience banaye rakhein, pitch tone review karein aur next call fresh energy se karein." },
        { id: "opt_2", text: "Agla call cut karke baith jayein." },
        { id: "opt_3", text: "Next caller par pichhli call ka gussa nikaalein." },
        { id: "opt_4", text: "Calling chhodkar fake call records enter karne lagein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Caller puchhta hai: 'Kya hair transplant surgery mein bohot dard hota hai?' Best response kya hai?",
      options: [
        { id: "opt_1", text: "Bolein ki surgery bohot painful aur unbearable hoti hai." },
        { id: "opt_2", text: "Explain karein ki experienced specialists local anesthesia administer karte hain taaki procedure completely comfortable aur pain-free rahe." },
        { id: "opt_3", text: "Bolein ki anesthesia ki koi zaroorat nahi padti." },
        { id: "opt_4", text: "Topic change karke price par baat karne lagein." },
      ],
      correctOptionId: "opt_2",
    },
  ],
  "Team Leader": [
    {
      text: "Aapke team ke ek experienced telecaller ki consultation booking 2 weeks se 35% kam chal rahi hai. Aapka pehla step kya hoga?",
      options: [
        { id: "opt_1", text: "1-on-1 coaching session karein, call recordings audit karein aur specific objection handling bottlenecks identify karein." },
        { id: "opt_2", text: "Open floor par sabke samne direct termination warning de dein." },
        { id: "opt_3", text: "Unke saare leads wapas lekar freshers ko assign kar dein." },
        { id: "opt_4", text: "Issue ko ignore karein aur umeed karein agle mahine theek ho jayega." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Floor par do senior team members ke beech lead distribution ko lekar behes ho gayi. Aap ise kaise resolve karenge?",
      options: [
        { id: "opt_1", text: "Privately dono ko bulayein, CRM lead allocation rules objectively review karein aur transparent distribution enforce karein." },
        { id: "opt_2", text: "Uss agent ka side lein jisne pichhle mahine zyada revenue banaya tha." },
        { id: "opt_3", text: "Unhe floor par aapas mein ladne dein." },
        { id: "opt_4", text: "Dono agents ki lead allocation permanently band kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek high-net-worth patient ne rude telecaller pitch ki complaint kari hai. Team Leader ko kya response dena chahiye?",
      options: [
        { id: "opt_1", text: "Patient se personally connect karein, politely apologize karein, issue resolve karein aur agent ke saath internal corrective action lein." },
        { id: "opt_2", text: "Patient ko blame karein ki wo over-sensitive hain." },
        { id: "opt_3", text: "Receptionist ko bolkar patient ka number block karwa dein." },
        { id: "opt_4", text: "Bina patient ki baat sune agent ko defend karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Daily morning floor briefing ka main objective kya hota hai?",
      options: [
        { id: "opt_1", text: "Daily booking targets align karna, top performers ko appreciate karna, common objections discuss karna aur team ko energize karna." },
        { id: "opt_2", text: "Colleagues ke samne underperformers ko daantna." },
        { id: "opt_3", text: "Ek ghante tak generic administrative emails read out karna." },
        { id: "opt_4", text: "Calling operations shuru hone mein delay karna." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "CRM mein stale ya untouched leads ko stagnation se bachane ke liye TL ko kya karna chahiye?",
      options: [
        { id: "opt_1", text: "Automated lead recycling rules lagayein taaki 48 hours tak untouched leads redistribute ho sakein." },
        { id: "opt_2", text: "Top agents ko untouched leads unlimited time tak rakhne dein." },
        { id: "opt_3", text: "3 din se purani saari leads delete kar dein." },
        { id: "opt_4", text: "Hazaaron leads ko sticky notes par manually track karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Fresher ko calling sikhate waqt sabse pehle kaun si skill develop karwani chahiye?",
      options: [
        { id: "opt_1", text: "First 10 seconds mein rapport build karna aur open-ended qualifying questions puchhna." },
        { id: "opt_2", text: "5-page ki script ko bina ruke speed mein read karna." },
        { id: "opt_3", text: "Busy bolne wale callers ke saath argue karna." },
        { id: "opt_4", text: "Surgical terms ko Latin mein memorize karna." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic calling agent ki true efficiency measure karne ke liye best metric kya hai?",
      options: [
        { id: "opt_1", text: "Lead-to-consultation conversion rate aur patient show-up percentage." },
        { id: "opt_2", text: "Daily kitne unanswered dials kiye gaye." },
        { id: "opt_3", text: "Agent floor par kitni loud voice mein bolta hai." },
        { id: "opt_4", text: "Bina call kiye kitne ghante logged in raha." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Manager: [
    {
      text: "Aapke clinic ka monthly OPD conversion achanak 20% drop ho gaya. Aapka priority action kya hona chahiye?",
      options: [
        { id: "opt_1", text: "Cross-department data audit karein, root cause (lead quality, pitch ya counseling) identify karein aur targeted recovery plan execute karein." },
        { id: "opt_2", text: "Lowest-performing staff member ko bina inquiry ke turant fire kar dein." },
        { id: "opt_3", text: "Sirf ek motivational email bhej kar aage kuch na karein." },
        { id: "opt_4", text: "Isse seasonal trend samajh kar next month ka wait karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Do department heads ke beech campaign resources aur budget ko lekar disagreement hai. Aap ise kaise solve karenge?",
      options: [
        { id: "opt_1", text: "Data aur business impact ke basis par structured discussion conduct karein aur clinic goals ke hisaab se objective decision lein." },
        { id: "opt_2", text: "Senior department head ka bina soche side lein." },
        { id: "opt_3", text: "Discussion ko ignore karein aur campaign launch postpone kar dein." },
        { id: "opt_4", text: "Bina operational need check kiye 50-50 divide kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek vendor medical consumables consistently late deliver kar raha hai jisse OT schedule affect ho raha hai. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "Documented evidence ke saath vendor management ko formally escalate karein, warning issue karein aur backup vendor evaluate karein." },
        { id: "opt_2", text: "Delay ko normal maan kar surgeries postpone karte rahein." },
        { id: "opt_3", text: "Delivery boy par gussa karein par management ko na batayein." },
        { id: "opt_4", text: "Bina backup plan ke turant saare orders cancel kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Growing clinic team ke liye realistic monthly performance targets kaise set karne chahiye?",
      options: [
        { id: "opt_1", text: "Historical performance data, team capacity, lead inflow aur seasonal trends ke basis par clear aur measurable targets set karein." },
        { id: "opt_2", text: "Team par pressure banane ke liye unachievable high targets assign karein." },
        { id: "opt_3", text: "Bina experience dekhe sabhi employees ke liye identical target rakhein." },
        { id: "opt_4", text: "Har employee ko khud apna target decide karne dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Peak season se theek ek hafte pehle ek key team leader achanak resign kar deta hai. Manager ka immediate plan kya hona chahiye?",
      options: [
        { id: "opt_1", text: "Knowledge transfer conduct karein, top senior performer ko temporarily promote karein aur replacement hiring expedite karein." },
        { id: "opt_2", text: "Kuch na karein aur team ko bina direction ke chhod dein." },
        { id: "opt_3", text: "Peak season ke clinic operations cancel kar dein." },
        { id: "opt_4", text: "Bina hiring support ke sara kaam akele handle karne lagein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic mein sabhi departments Standard Operating Procedures (SOPs) consistently follow karein, yeh kaise ensure karein?",
      options: [
        { id: "opt_1", text: "Regular SOP audits karein, gaps aane par refresher training provide karein aur compliance ko recognize karein." },
        { id: "opt_2", text: "SOPs print karke chhod dein aur expect karein staff khud padh lega." },
        { id: "opt_3", text: "Chhoti-moti mistake par bina context jane direct harsh punishment dein." },
        { id: "opt_4", text: "SOPs sirf external audit wale din check karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic leadership ko monthly performance review present karte waqt best approach kya hai?",
      options: [
        { id: "opt_1", text: "Accurate data, root-cause analysis aur next cycle ke clear action plan ke saath transparent report present karein." },
        { id: "opt_2", text: "Sirf acchi baatein share karein aur shortfalls ko hide kar lein." },
        { id: "opt_3", text: "Bina kisi analysis ke raw data table forward kar dein." },
        { id: "opt_4", text: "Saari kamiyon ka dosh team par daal kar khud safe ho jayein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "HR Recruiter": [
    {
      text: "Telecaller position ke liye 200 applications aayi hain. Pehla screening step kya hona chahiye?",
      options: [
        { id: "opt_1", text: "Pre-defined qualification criteria (education, communication, experience) ke basis par objectively shortlist karein." },
        { id: "opt_2", text: "Saare 200 candidates ko bina screening direct interview ke liye bula lein." },
        { id: "opt_3", text: "Profile photo ke basis par candidate select karein." },
        { id: "opt_4", text: "Bina filter kiye saari applications hiring manager ko bhej dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek shortlisted candidate ne offer verbally accept kiya par joining date par nahi aaya. Aap kaise handle karenge?",
      options: [
        { id: "opt_1", text: "Candidate se professionally contact karke reason samjhein, records update karein aur pipeline ke next candidate ko activate karein." },
        { id: "opt_2", text: "Candidate ko baar-baar phone karke legal action ki dhamki dein." },
        { id: "opt_3", text: "Bina manager ko bataye candidate ka indefinitely wait karte rahein." },
        { id: "opt_4", text: "Bina kisi ko hire kiye position ko permanently close kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Quality clinic candidates attract karne ke liye job description (JD) kaise likhna chahiye?",
      options: [
        { id: "opt_1", text: "Role responsibilities, required skills, compensation range aur clinic culture clearly aur accurately define karein." },
        { id: "opt_2", text: "Internet se bina customize kiye koi bhi generic JD copy-paste kar dein." },
        { id: "opt_3", text: "Vague JD likhein taaki bohot saare irrelevant log apply karein." },
        { id: "opt_4", text: "Salary aur role details blank chhod dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Interview ke dauran agar candidate textbook scripted answers de raha hai, toh real competency kaise check karein?",
      options: [
        { id: "opt_1", text: "Situational aur behavioral follow-up questions puchhein jaise 'Aapne kisi difficult patient situation ko past mein kaise handle kiya tha?'" },
        { id: "opt_2", text: "Scripted answers ko face value par accept karke turant hire kar lein." },
        { id: "opt_3", text: "Personal aur irrelevant questions puchhna shuru karein." },
        { id: "opt_4", text: "Interview turant beech mein hi cancel kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek employee confidential workplace grievance raise karta hai. Correct HR protocol kya hai?",
      options: [
        { id: "opt_1", text: "Grievance confidentially document karein, impartially investigate karein aur employee ko kisi bhi retaliation se protect karein." },
        { id: "opt_2", text: "Grievance ko doosre colleagues ke saath open floor par discuss karein." },
        { id: "opt_3", text: "Complaint ko minor bata kar employee ko ignore karne ki advice dein." },
        { id: "opt_4", text: "Investigation se pehle hi complaint accused person ko forward kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Employment contracts aur offer letters ke liye legal compliance kaise ensure karein?",
      options: [
        { id: "opt_1", text: "Saari terms (role, compensation, notice period, confidentiality) clearly mention hon aur joining se pehle dono parties sign karein." },
        { id: "opt_2", text: "Sirf verbal offer dein aur 3 mahine baad documentation karein." },
        { id: "opt_3", text: "Bina customize kiye har role ke liye exact same generic letter use karein." },
        { id: "opt_4", text: "Probation employees ke liye documentation poori tarah skip kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic environment mein employee onboarding program ka primary purpose kya hota hai?",
      options: [
        { id: "opt_1", text: "New hires ko clinic SOPs, role expectations aur team culture se familiar karwana taaki unki productivity badhe aur early attrition kam ho." },
        { id: "opt_2", text: "Test karna ki new employee bina kisi help ke survive kar sakta hai ya nahi." },
        { id: "opt_3", text: "Bina practical orientation ke sirf paperwork formalities poori karna." },
        { id: "opt_4", text: "Pehle hi din maximum workload assign karke test lena." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Receptionist: [
    {
      text: "Front desk par teen patients ek saath aate hain aur usi waqt telephone ring ho raha hai. Aap kaise prioritize karenge?",
      options: [
        { id: "opt_1", text: "In-person patients ko smile ke saath acknowledge karein, phone caller ko polite hold par rakhein aur arrival order mein check-in karein." },
        { id: "opt_2", text: "In-person patients ko ignore karke phone par lambi baat shuru karein." },
        { id: "opt_3", text: "Front desk chhod kar andar chale jayein." },
        { id: "opt_4", text: "Patients ko bole ki ek ghante baad wapas aayein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Active surgical procedure lamba chalne ki wajah se doctor consultation 25 minutes late ho gaya aur patient upset hai. Kaise handle karenge?",
      options: [
        { id: "opt_1", text: "Empathetically delay explain karein, updated wait time batayein aur refreshments offer karke unhe comfortably bithayein." },
        { id: "opt_2", text: "Bolein ki delays normal hote hain aur chupchap wait karein." },
        { id: "opt_3", text: "Waiting area mein doctor ko loudly blame karein." },
        { id: "opt_4", text: "Patient ka appointment bina unki marzi ke cancel kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Front desk par patient intake forms aur records ki privacy maintain karna kyun zaroori hai?",
      options: [
        { id: "opt_1", text: "Patient medical history, contact info aur cosmetic treatment records legally protected private data hain." },
        { id: "opt_2", text: "Confidentiality sirf celebrity patients ke liye matter karti hai." },
        { id: "opt_3", text: "Private clinics mein data confidentiality optional hoti hai." },
        { id: "opt_4", text: "Yeh sirf clinic ka revenue doosron se chhupane ke liye hota hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Reception lobby ko Clinic Ryan ke premium brand standard par maintain rakhne ke liye kya zaroori hai?",
      options: [
        { id: "opt_1", text: "Seating clean rakhein, ambient lighting welcoming ho, brochures neatly displayed hon aur desk clutter-free rahe." },
        { id: "opt_2", text: "Empty cups aur waste papers din bhar desk par pade rehne dein." },
        { id: "opt_3", text: "Front desk par mobile phone speaker par loud music chalayein." },
        { id: "opt_4", text: "Visitors ke liye waiting area band rakhein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Bina appointment ke ek visitor doctor se turant milne ki zidd karta hai. Aapka response kya hoga?",
      options: [
        { id: "opt_1", text: "Clinic appointment policy politely samjhayein, doctor ke open slots check karein aur formal booking offer karein." },
        { id: "opt_2", text: "Surgeon ko chalte procedure ke beech bula kar le aayein." },
        { id: "opt_3", text: "Visitor ke saath aggressive argument karein." },
        { id: "opt_4", text: "Doctor ka personal private number visitor ko de dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Consultation ke baad patient se payment collect karte waqt kya step lena zaroori hai?",
      options: [
        { id: "opt_1", text: "Bill amount doctor consultation ke hisaab se verify karein, digital receipt provide karein aur warm greeting ke saath thank you bolein." },
        { id: "opt_2", text: "Bina receipt ya invoice diye payment collect karein." },
        { id: "opt_3", text: "Bina bataye hidden charges bill mein add kar dein." },
        { id: "opt_4", text: "Digital payment lene se mana karein aur sirf cash maangein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Morning aur evening shift handover ke dauran kya communicate karna zaroori hai?",
      options: [
        { id: "opt_1", text: "Pending arrivals, doctor schedule updates, pending payments aur special patient requests detail mein share karein." },
        { id: "opt_2", text: "Shift khatam hote hi bina communicate kiye nikal jayein." },
        { id: "opt_3", text: "Next receptionist ke aane se pehle daily logs delete kar dein." },
        { id: "opt_4", text: "Sirf non-work personal topics par baat karein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Counsellor: [
    {
      text: "Ek patient do procedure packages ke beech confused aur overwhelmed hai. Aap unhe kaise guide karenge?",
      options: [
        { id: "opt_1", text: "Differences simplify karein, unke aesthetic goals aur scalp density ke according transparent aur honest guidance dein." },
        { id: "opt_2", text: "Bina medical suitability dekhe sabse mehnga package lene par force karein." },
        { id: "opt_3", text: "Unhe bolein ki Google par khud samajh lein." },
        { id: "opt_4", text: "Sawalon ka jawab diye bina direct deposit payment maangein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Grade 6 baldness wale patient ko ek chhoti session mein teenager jaisi hairline ki expectation hai. Aapki ethical responsibility kya hai?",
      options: [
        { id: "opt_1", text: "Donor capacity, realistic coverage aur medical limitations transparently explain karke expectations set karein." },
        { id: "opt_2", text: "Deposit lene ke liye 100% full density ka jhootha vaada karein." },
        { id: "opt_3", text: "Patient ki expectation ka mazak udayein." },
        { id: "opt_4", text: "Donor capacity ki baat hi na karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Jab patient saste discount clinic ka reference dekar price objection kare, toh aap kaise handle karenge?",
      options: [
        { id: "opt_1", text: "Clinic Ryan ke surgeon-led protocols, advanced graft preservation, sterile OT standards aur natural longevity explain karein." },
        { id: "opt_2", text: "Competitor ka half rate match karne ka unauthorized promise karein." },
        { id: "opt_3", text: "Competitor clinic ko bura-bhala bolein aur gussa karein." },
        { id: "opt_4", text: "Patient ko bole ki usi saste clinic mein chale jayein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "In-clinic consultation ke baad successful conversion ke liye sabse critical practice kya hai?",
      options: [
        { id: "opt_1", text: "24 hours ke andar personalized consultation summary aur tentative procedure dates ke saath follow-up karein." },
        { id: "opt_2", text: "Har ghante 10 generic promotional messages spam karein." },
        { id: "opt_3", text: "Kabhi follow-up na karein aur patient ke call ka wait karein." },
        { id: "opt_4", text: "Bina notes ke file kisi doosre department ko bhej dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Hair transplant ke baad temporary shedding phase (shock loss) ko anxious patient ko kaise explain karein?",
      options: [
        { id: "opt_1", text: "Reassure karein ki weeks 3-8 ke beech transplanted hair shafts ka shed hona normal natural cycle hai jiske baad nayi roots grow hoti hain." },
        { id: "opt_2", text: "Bolein ki shedding ka matlab surgery completely fail ho chuki hai." },
        { id: "opt_3", text: "Patient ghabra na jaye isliye shedding ki baat hi na karein." },
        { id: "opt_4", text: "Phone par unauthorized medicines prescribe karne lagein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Medical aesthetic counselling mein empathy ka kya role hota hai?",
      options: [
        { id: "opt_1", text: "Yeh patient trust build karti hai, unke appearance concerns ko address karti hai aur long-term relationship banati hai." },
        { id: "opt_2", text: "Empathy ki koi zaroorat nahi hoti kyunki patient sirf paise dekhte hain." },
        { id: "opt_3", text: "Isse conversion kam ho jata hai." },
        { id: "opt_4", text: "Yeh sirf marketing brochures ke liye acchi lagti hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Consultation ke dauran EMI aur payment financing options ko kaise present karna chahiye?",
      options: [
        { id: "opt_1", text: "Monthly installments, terms aur tenure bina kisi hidden charges ke clearly break down karein." },
        { id: "opt_2", text: "Interest rates aur extra charges sign hone tak chhupayein." },
        { id: "opt_3", text: "Financing options explain karne se mana karein." },
        { id: "opt_4", text: "Sirf full advance cash payment maangein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Trainer: [
    {
      text: "New hire onboarding training program successful tha ya nahi, yeh kaise evaluate karenge?",
      options: [
        { id: "opt_1", text: "Post-training conversion rates, call quality audit scores aur speed to first successful booking measure karke." },
        { id: "opt_2", text: "Yeh dekh kar ki trainees classroom mein chupchap baithe the ya nahi." },
        { id: "opt_3", text: "Kitne PowerPoint slides dikhaye gaye usse." },
        { id: "opt_4", text: "Bina evaluation test liye sirf attendance sheet sign karwa kar." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Objection handling mein struggle karne wale agent ko coach karne ka best tareeqa kya hai?",
      options: [
        { id: "opt_1", text: "Simulated live roleplaying karwayein, recording sunayein aur immediate constructive feedback dein." },
        { id: "opt_2", text: "Script ko 50 baar chupchap padhne ko bolein." },
        { id: "opt_3", text: "Lunch time par sabke samne unki galtiyan nikaalein." },
        { id: "opt_4", text: "Unhe calling karne se permanently ban kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ek trainee consistently feedback resist karta hai aur purani aadat nahi chhodta. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "Private 1-on-1 conduct karein, objective data dikhayein aur samjhayein ki clinic standards unke conversion ke liye zaroori hain." },
        { id: "opt_2", text: "Class ke samne unpar chillayein taaki unhe embarrassment ho." },
        { id: "opt_3", text: "Unhe bina sikhaye jo mann kare karne dein." },
        { id: "opt_4", text: "Bina evaluation ke unhe pass kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Non-medical freshers ko complex aesthetic procedures train karne ka best tareeqa kya hai?",
      options: [
        { id: "opt_1", text: "Medical concepts ko patient-friendly benefits, simple FAQs aur real before-after visuals ke through explain karein." },
        { id: "opt_2", text: "Unhe 500 pages ki surgical textbook ratne ko dein." },
        { id: "opt_3", text: "Procedure training poori tarah skip kar dein." },
        { id: "opt_4", text: "Bolein ki phone par jo mann aaye bol dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Call quality scoring objective aur unbiased rahe, iske liye TLs ke saath calibration kitni baar honi chahiye?",
      options: [
        { id: "opt_1", text: "Regularly (e.g. bi-weekly/monthly) taaki sabhi evaluators ka scoring standard consistent rahe." },
        { id: "opt_2", text: "Teen saal mein ek baar." },
        { id: "opt_3", text: "Kabhi nahi kyunki calibration ki zaroorat nahi hoti." },
        { id: "opt_4", text: "Sirf tab jab koi agent formal complaint kare." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Adult learners ko multi-day workshops mein engaged rakhne ke liye kya technique use karein?",
      options: [
        { id: "opt_1", text: "Interactive exercises, practical roleplays, gamified quizzes aur real case study breakdowns." },
        { id: "opt_2", text: "Bina break ke 8 ghante lagataar lecture padhana." },
        { id: "opt_3", text: "Strict silence mein slides verbatim read karna." },
        { id: "opt_4", text: "Din bhar unrelated entertainment videos dikhana." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic Ryan mein jab koi naya procedure ya updated package launch hota hai, toh trainer ko kya karna chahiye?",
      options: [
        { id: "opt_1", text: "Concise battlecards banayein, floor briefing dein aur rapid knowledge check quiz conduct karein." },
        { id: "opt_2", text: "Expect karein ki staff khud guess kar lega." },
        { id: "opt_3", text: "Nayi information sales team se chhupayein." },
        { id: "opt_4", text: "Bina explanation ke 100 pages ka email bhej dein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Stock Manager": [
    {
      text: "Clinic consumable management mein FIFO (First-In, First-Out) principle ka kya matlab hota hai?",
      options: [
        { id: "opt_1", text: "Pehle expire hone wale batches aur purane stock ko naye stock se pehle use karna." },
        { id: "opt_2", text: "Jo employee pehle stockroom aaye wo jo chahe le jaye." },
        { id: "opt_3", text: "Hamesha naya stock pehle use karein aur purana pada rehne dein." },
        { id: "opt_4", text: "Har mahine aadha stock bina expiry dekhe fek dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Surgical punch blades ke physical count aur digital stock register mein farq dikhta hai. Pehla step kya hoga?",
      options: [
        { id: "opt_1", text: "Physical recount karein, recent procedure consumption slips audit karein aur discrepancy investigate karein." },
        { id: "opt_2", text: "Bina investigation register ke numbers manually change kar dein." },
        { id: "opt_3", text: "Bina check kiye direct surgical team par blame daalein." },
        { id: "opt_4", text: "Mismatch ko annual audit tak ignore karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Sterile surgical consumables aur micromotor parts ko clinic mein kaise store kiya jana chahiye?",
      options: [
        { id: "opt_1", text: "Dedicated clean, moisture-controlled aur temperature-monitored secure storage area mein." },
        { id: "opt_2", text: "Khule dusty corridor mein." },
        { id: "opt_3", text: "Cleaning chemical aur acid ke saath mix karke." },
        { id: "opt_4", text: "Waiting area ke tables par rakh kar." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinical inventory management mein 'Reorder Point' (ROP) kya hota hai?",
      options: [
        { id: "opt_1", text: "Wo predetermined minimum stock level jo stockout se pehle automatically naya purchase order trigger kare." },
        { id: "opt_2", text: "Wo din jab clinic ka saara saaman khatam ho jata hai." },
        { id: "opt_3", text: "Holiday party ke liye allowed maximum budget." },
        { id: "opt_4", text: "Wo price jispar defective goods beche jaate hain." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Vendor se shipment receive karte waqt delivery challan sign karne se pehle kya verify karna zaroori hai?",
      options: [
        { id: "opt_1", text: "Quantity, batch numbers, expiry dates, packaging integrity aur approved Purchase Order se match." },
        { id: "opt_2", text: "Bina box khole turant sign kar dein." },
        { id: "opt_3", text: "Sirf outer box ka color check karein." },
        { id: "opt_4", text: "Driver ko saaman kahin bhi rakhne ko bolein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Expired medical supplies ya damaged items ko kaise handle kiya jana chahiye?",
      options: [
        { id: "opt_1", text: "Turant quarantine karein, disposal register mein log karein aur biomedical waste rules ke mutabiq dispose karein." },
        { id: "opt_2", text: "Paise bachane ke liye patients par use kar lein." },
        { id: "opt_3", text: "Clinic ke bahar illegal tareeqe se bech dein." },
        { id: "opt_4", text: "Normal street dustbin mein fek dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Surgery ke dauran Operation Theatre (OT) mein kisi item ki shortage na ho, Stock Manager yeh kaise ensure kare?",
      options: [
        { id: "opt_1", text: "24-48 hours pehle OT surgery calendar review karein aur pre-checked surgery consumable kits prepare karein." },
        { id: "opt_2", text: "Surgery shuru hone ka wait karein ki kya kami padti hai." },
        { id: "opt_3", text: "Doctor ke gussa hone ke baad order place karein." },
        { id: "opt_4", text: "Working hours mein stockroom ko lock rakhein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "MIS Executive": [
    {
      text: "Do alag branches ke patient data spreadsheets ko cross-reference karne ke liye sabse robust Excel function kaun sa hai?",
      options: [
        { id: "opt_1", text: "XLOOKUP (ya INDEX/MATCH) jo exact bidirectional matching smoothly karta hai." },
        { id: "opt_2", text: "10,000 rows ko manually magnifying glass se scroll karna." },
        { id: "opt_3", text: "Bina criteria ke CONCATENATE use karna." },
        { id: "opt_4", text: "Missing IDs fill karne ke liye RANDBETWEEN lagana." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Weekly conversion report mein duplicate leads aane par data hygiene workflow kya hona chahiye?",
      options: [
        { id: "opt_1", text: "Conditional formatting/unique filters se duplicates identify karein, booking attribution verify karein aur clean merge karein." },
        { id: "opt_2", text: "Bina check kiye saare duplicate records delete kar dein." },
        { id: "opt_3", text: "Lead count zyada dikhane ke liye unhe do baar count karein." },
        { id: "opt_4", text: "File ka naam change karke claim karein data theek hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic reporting mein automated Pivot Tables aur Power Query use karne ka main fayda kya hai?",
      options: [
        { id: "opt_1", text: "Recurring data summaries aur calculation bina kisi manual formula error ke automatically update ho jaati hain." },
        { id: "opt_2", text: "File size bina kisi reason ke 100 guna bada ho jata hai." },
        { id: "opt_3", text: "Management ko report dekhne se rokna." },
        { id: "opt_4", text: "Source data ko check karne ki zaroorat khatam ho jana." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Patient contact database manage karte waqt kaun sa data security rule mandatory hai?",
      options: [
        { id: "opt_1", text: "Access restrict rakhein, sensitive export password-protect karein aur public channels par unmasked PII share na karein." },
        { id: "opt_2", text: "Patient phone numbers public forums par upload karna." },
        { id: "opt_3", text: "Unencrypted data personal email accounts par forward karna." },
        { id: "opt_4", text: "Public folders mein plain text passwords save karna." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Do branch reports mein marketing campaign ROI ke numbers alag aa rahe hain. Aap ise kaise resolve karenge?",
      options: [
        { id: "opt_1", text: "Raw source logs aur CRM booking timestamps trace karke accurate attribution verify karein." },
        { id: "opt_2", text: "Jo number zyada bada hai usse select kar lein taaki report acchi lage." },
        { id: "opt_3", text: "Bina facts jaane dono ka average nikaal dein." },
        { id: "opt_4", text: "Dono reports delete kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Ad spend ki efficiency calculate karne ke liye kaun sa metric use hota hai?",
      options: [
        { id: "opt_1", text: "Cost Per Lead (CPL) = Total Ad Spend / Total Valid Leads Generated." },
        { id: "opt_2", text: "Presentation mein kitne fonts use huye." },
        { id: "opt_3", text: "Spreadsheet mein kitni rows hain." },
        { id: "opt_4", text: "CSV file download hone mein kitna time laga." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Senior management se aayi urgent ad-hoc data report request ko kaise handle karein?",
      options: [
        { id: "opt_1", text: "Exact required parameters confirm karein, data quickly validate karein aur clean summary present karein." },
        { id: "opt_2", text: "Bina format kiye error-filled raw data turant bhej dein." },
        { id: "opt_3", text: "Request ko agle hafte tak ignore karein." },
        { id: "opt_4", text: "Management ki help karne se mana kar dein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Medicine Sales Executive": [
    {
      text: "Ek doctor kehta hai ki wo already competitor ka product prescribe kar rahe hain. Best approach kya hoga?",
      options: [
        { id: "opt_1", text: "3-minute meeting request karein, clinical safety data aur patient results present karein aur product benefits samjhayein." },
        { id: "opt_2", text: "Bina clinical proof competitor ke product ko bekar bolein." },
        { id: "opt_3", text: "Prescription switch karne ke liye personal cash incentives offer karein." },
        { id: "opt_4", text: "Leaflet chhod kar chale jayein aur dobara na milein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Month-end mein 3 din bache hain aur target 40% bacha hua hai. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "High-potential doctors aur chemists ko prioritize karein, follow-up intensify karein aur promotional schemes explain karein." },
        { id: "opt_2", text: "Report mein fake orders daal kar number badha lein." },
        { id: "opt_3", text: "Kaam karna band kar dein kyunki target nahi ho sakta." },
        { id: "opt_4", text: "Product quality ko blame karke visit band kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Pharmaceutical sales mein 'product detailing' ka kya matlab hota hai?",
      options: [
        { id: "opt_1", text: "Doctor ko product ke mechanism, clinical efficacy, dosage aur safety profile ki structured presentation dena." },
        { id: "opt_2", text: "Product ke outer packaging box ko saaf karna." },
        { id: "opt_3", text: "Sirf price list chemist ko padh kar sunana." },
        { id: "opt_4", text: "Bina doctor ki specialty samjhe generic paper read karna." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Chemist report karta hai ki stock near-expiry hai aur return karna chahta hai. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "Complaint acknowledge karein, company policy ke mutabiq return process initiate karein aur fresh stock replace karein." },
        { id: "opt_2", text: "Chemist ko bole ki expiry stock jaldi kisi patient ko bech de." },
        { id: "opt_3", text: "Chemist ki shop par jana band kar dein." },
        { id: "opt_4", text: "Chemist ko expiry date change karne ko bolein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Healthcare professionals ko pharmaceutical products promote karne ka ethical tareeqa kya hai?",
      options: [
        { id: "opt_1", text: "Evidence-based clinical data, peer-reviewed studies aur approved indications hi share karein." },
        { id: "opt_2", text: "Jhoothe daawe karein ki product har bimari theek kar deta hai." },
        { id: "opt_3", text: "Prescription badhane ke liye expensive gifts aur cash offer karein." },
        { id: "opt_4", text: "Side effects ki information jaan-bujhkar chhupayein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "High-prescribing doctor ke saath long-term professional relationship kaise build karein?",
      options: [
        { id: "opt_1", text: "Consistent clinical updates share karein, CME programs support karein aur unki queries promptly resolve karein." },
        { id: "opt_2", text: "Sirf tab jayein jab naya product launch ho, baaki time gayab rahein." },
        { id: "opt_3", text: "Har visit par personal gifts le jayein." },
        { id: "opt_4", text: "Sirf WhatsApp promotional groups mein messages bhejte rahein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Competitor medical representative aapke product ke baare mein galat baatein faila raha hai. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "Calmly factual clinical evidence present karein aur product ke safety records reinforce karein." },
        { id: "opt_2", text: "Competitor ke product ke baare mein ulti-seedhi baatein failayein." },
        { id: "opt_3", text: "Social media par public complaint karein." },
        { id: "opt_4", text: "Uss territory ke doctors ke paas jana band kar dein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Nursing Staff": [
    {
      text: "Hair transplant procedure ke baad patient ko scalp mein sudden severe pain aur swelling hoti hai. Aapka pehla step kya hoga?",
      options: [
        { id: "opt_1", text: "Immediately vitals check karein, attending doctor ko notify karein aur prescribed painkiller administer karein." },
        { id: "opt_2", text: "Patient ko bolein yeh normal hai aur chupchap baithein." },
        { id: "opt_3", text: "Bina doctor ke prescription ke cabinet se koi bhi dawai de dein." },
        { id: "opt_4", text: "Patient ko agle din aane ko bolkar ghar bhej dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Operation Theatre (OT) environment mein aseptic technique ka sabse critical rule kya hai?",
      options: [
        { id: "opt_1", text: "Sterile field maintain rakhna aur sterile instruments ko kisi bhi non-sterile surface se touch na hone dena." },
        { id: "opt_2", text: "Gloves sirf sharp instruments pakadte waqt pehanna." },
        { id: "opt_3", text: "Instruments ko dry kapde se saaf karke sterile maan lena." },
        { id: "opt_4", text: "Haath sirf shift ke start aur end mein dhona." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Prescribed medication administer karne se pehle nurse ko kya verify karna mandatory hai?",
      options: [
        { id: "opt_1", text: "Right patient, right medication, right dose, right route, right time aur allergy check (5 Rights)." },
        { id: "opt_2", text: "Bina prescription check kiye dawai jaldi se de dena." },
        { id: "opt_3", text: "Sirf patient ka naam dekh kar injection laga dena." },
        { id: "opt_4", text: "Patient se puchhna ki unhe kitni dose pasand hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Post-operative dressing aur wound care documentation mein kya likhna zaroori hai?",
      options: [
        { id: "opt_1", text: "Wound condition, discharge characteristics, dressing type, patient comfort level aur attending nurse signature with time." },
        { id: "opt_2", text: "Sirf 'theek hai' likh kar chhod dena." },
        { id: "opt_3", text: "Kuch na likhna aur doctor ke aane ka wait karna." },
        { id: "opt_4", text: "Sirf tab document karna jab patient complaint kare." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Hair transplant procedure se pehle patient bohot anxious aur ghabraya hua hai. Nursing staff ko kya karna chahiye?",
      options: [
        { id: "opt_1", text: "Calmly baat karein, procedural steps simple terms mein explain karein, anesthesia comfort reassure karein aur doctor ko inform karein." },
        { id: "opt_2", text: "Patient ko daant kar OT mein le jayein." },
        { id: "opt_3", text: "Patient ki anxiety ignore karein kyunki yeh normal hoti hai." },
        { id: "opt_4", text: "Bina doctor consult kiye sleeping tablet de dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic setting mein infection control ke liye patient contact se pehle aur baad mein kya mandatory hai?",
      options: [
        { id: "opt_1", text: "WHO technique ke mutabiq soap-water ya alcohol sanitizer se proper hand hygiene perform karna." },
        { id: "opt_2", text: "Poori shift mein ek hi pair gloves use karte rehna." },
        { id: "opt_3", text: "Sirf tab haath dhona jab visibly dirty dikhein." },
        { id: "opt_4", text: "Hand hygiene sirf surgery ke pehle zaroori hota hai, regular care mein nahi." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Shift handover ke time incoming nurse ko kya information pass karni chahiye?",
      options: [
        { id: "opt_1", text: "Patient vitals, pending medications, post-op observations, doctor orders aur special care instructions." },
        { id: "opt_2", text: "Bina bole shift khatam hote hi nikal jana." },
        { id: "opt_3", text: "Sirf general gossip discuss karna." },
        { id: "opt_4", text: "Patient files hide kar dena." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Doctor: [
    {
      text: "Cosmetic hair restoration procedure se pehle informed consent lene ka sabse zaroori aspect kya hai?",
      options: [
        { id: "opt_1", text: "Procedure risks, expected realistic growth timeline, possible complications aur alternative treatments clearly explain karna." },
        { id: "opt_2", text: "Patient ko bina padhe turant form par sign karne ko bolna." },
        { id: "opt_3", text: "Consent sirf general anesthesia procedures ke liye zaroori hota hai." },
        { id: "opt_4", text: "Phone par verbal agreement lena kaafi hota hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Hair transplant surgery ke dauran patient ka blood pressure achanak drop ho jata hai. Immediate response kya hona chahiye?",
      options: [
        { id: "opt_1", text: "Procedure pause karein, airway-breathing-circulation assess karein, clinical intervention dein aur vitals continuously monitor karein." },
        { id: "opt_2", text: "Procedure continue rakhein kyunki BP drop temporary hota hai." },
        { id: "opt_3", text: "Nurse ko fan on karne ko bolkar surgery karte rahein." },
        { id: "opt_4", text: "Patient ko turant discharge karke ghar bhej dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "6-month follow-up par agar patient apne hair transplant results se dissatisfied hai, toh doctor ko kaise handle karna chahiye?",
      options: [
        { id: "opt_1", text: "Empathetically sunein, pre-op photos ke against objective growth assess karein, maturation timeline samjhayein aur clinical action plan dein." },
        { id: "opt_2", text: "Complaint ko dismiss karein aur bolein results aane mein time lagta hai." },
        { id: "opt_3", text: "Bina check kiye patient ke post-op routine par dosh daal dein." },
        { id: "opt_4", text: "Bina clinical review ke full refund offer kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Hair transplant candidacy assessment mein donor area density ki medical significance kya hoti hai?",
      options: [
        { id: "opt_1", text: "Yeh determine karta hai ki bina donor zone deplete kiye kitne maximum grafts safely harvest kiye ja sakte hain." },
        { id: "opt_2", text: "Yeh sirf patient ke hair ka color decide karta hai." },
        { id: "opt_3", text: "Donor density ki transplant planning mein koi relevance nahi hoti." },
        { id: "opt_4", text: "Yeh decide karta hai ki kaun se surgical tool brand use honge." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Patient aisi hairline design maangta hai jo unki age aur future hair loss progression ke hisaab se inappropriate hai. Aap kya karenge?",
      options: [
        { id: "opt_1", text: "Long-term implications explain karein, age-appropriate design propose karein aur discussion document karein." },
        { id: "opt_2", text: "Conflict se bachne ke liye jo patient bole wahi draw kar dein." },
        { id: "opt_3", text: "Bina explanation ke patient ka treatment mana kar dein." },
        { id: "opt_4", text: "Future dekhe bina sirf immediate looks ke hisaab se design karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Norwood-Hamilton scale hair restoration mein kya measure karta hai?",
      options: [
        { id: "opt_1", text: "Male pattern baldness (MPB) ke progressive stages ko classify karta hai aur treatment planning mein guide karta hai." },
        { id: "opt_2", text: "Patient ka body weight aur BMI measure karta hai." },
        { id: "opt_3", text: "Pre-operative blood pressure classification system hai." },
        { id: "opt_4", text: "Hair follicles ki thickness microns mein measure karta hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Post-operative infection prevention ke liye surgical antibiotic prophylaxis kab administer karni chahiye?",
      options: [
        { id: "opt_1", text: "Established clinical guidelines ke according incision se theek pehle (pre-op) prescribed dose mein." },
        { id: "opt_2", text: "Surgery ke 3 din baad jab patient complaint kare." },
        { id: "opt_3", text: "Kabhi nahi kyunki hair surgery mein infection nahi hota." },
        { id: "opt_4", text: "Sirf tab jab bleeding bohot zyada ho." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Transplant Technician": [
    {
      text: "FUE graft extraction ke dauran transection rate achanak badhne lagta hai. Sahi corrective action kya hai?",
      options: [
        { id: "opt_1", text: "Punch angle aur depth recheck karein, follicle exit direction verify karein aur surgeon se immediately communicate karein." },
        { id: "opt_2", text: "Punch speed maximum kar dein taaki jaldi extract ho." },
        { id: "opt_3", text: "Extract karte rahein aur implantation ke time theek karne ki sochein." },
        { id: "opt_4", text: "Patient par blame daalein ki wo hil raha hai." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Harvested grafts ki optimal viability ke liye safe out-of-body holding time kitna hota hai?",
      options: [
        { id: "opt_1", text: "As minimal as possible (ideally under 6 hours), chilled Ringer's Lactate ya holding solution mein hydrate rakh kar." },
        { id: "opt_2", text: "Normal tap water mein 24 hours tak bina kisi farq ke." },
        { id: "opt_3", text: "Holding time se graft viability par koi effect nahi padta." },
        { id: "opt_4", text: "Grafts ko dry gauze par dhoop mein rakhna chahiye." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "DHI procedure mein extracted grafts ko implantation ke liye kaise sort kiya jata hai?",
      options: [
        { id: "opt_1", text: "Graft size (1, 2, 3-hair units) ke basis par sort karein, moist solution mein cool rakhein aur Choi pens mein load karein." },
        { id: "opt_2", text: "Saare graft sizes ko mix karke randomly implant karein." },
        { id: "opt_3", text: "Grafts ko bina solution ke open air mein dry hone dein." },
        { id: "opt_4", text: "Room temperature par direct light ke neeche store karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Implantation ke time graft angle aur direction maintain rakhne ka main reason kya hai?",
      options: [
        { id: "opt_1", text: "Natural growth direction aur cosmetic density achieve karna taaki hair unnatural na dikhein." },
        { id: "opt_2", text: "Bina direction dekhe jitne zyada ho sake jaldi implant karna." },
        { id: "opt_3", text: "Angle sirf frontal hairline mein zaroori hota hai, crown mein nahi." },
        { id: "opt_4", text: "Graft angle ka cosmetic appearance se koi lena-dena nahi hota." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Lambi surgery ke dauran graft holding solution ka temperature warm hone lage toh kya karein?",
      options: [
        { id: "opt_1", text: "Surgeon ko immediately inform karein, properly chilled solution se refresh karein aur graft condition check karein." },
        { id: "opt_2", text: "Jaldi-jaldi implant karein bina solution change kiye." },
        { id: "opt_3", text: "Solution mein direct tap water daal dein." },
        { id: "opt_4", text: "Container ko heat lamp ke neeche rakh dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Hair transplant surgery ke dauran OT hygiene aur sterility ka kaun sa rule mandatory hai?",
      options: [
        { id: "opt_1", text: "Sterile gloves, cap, mask aur gown pehanna; saare instruments autoclave sterilized hon aur surfaces disinfected hon." },
        { id: "opt_2", text: "Bina gloves ke sirf normal hand wash kaafi hota hai." },
        { id: "opt_3", text: "Sterility rules sirf general anesthesia surgeries mein follow hote hain." },
        { id: "opt_4", text: "Same instruments ko alcohol wipe karke doosre patient par use kar lena." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Donor harvesting ke dauran agar scalp mein excessive bleeding hone lage toh technician ko kya karna chahiye?",
      options: [
        { id: "opt_1", text: "Sterile gauze se gentle pressure apply karein, surgeon ko immediately notify karein aur bleeding control hone tak pause karein." },
        { id: "opt_2", text: "Procedure jaldi khatam karne ke liye harvesting continue rakhein." },
        { id: "opt_3", text: "Bina surgeon ke approval ke injection de dein." },
        { id: "opt_4", text: "Bleeding par direct heat lagane lagein." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Software Developer": [
    {
      text: "React/Next.js application mein Server Components aur Client Components ('use client') kab use karne chahiye?",
      options: [
        { id: "opt_1", text: "Server Components data fetching aur SEO ke liye use karein; Client Components browser interactivity aur hooks ke liye use karein." },
        { id: "opt_2", text: "Hamesha har component mein 'use client' likhna chahiye." },
        { id: "opt_3", text: "Server Components sirf authentication pages ke liye hote hain." },
        { id: "opt_4", text: "Dono mein koi practical difference nahi hota." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Production web application mein secret API keys aur database URIs kaise secure kiye jaane chahiye?",
      options: [
        { id: "opt_1", text: "Server-side environment variables (.env.local) mein store karein, NEXT_PUBLIC_ prefix na lagayein aur public repo mein commit na karein." },
        { id: "opt_2", text: "Client-side React component state mein hardcode kar dein." },
        { id: "opt_3", text: "Public JSON file mein daal kar browser se access karein." },
        { id: "opt_4", text: "Browser ke localStorage mein save karke chhod dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Client form submission mein required field missing hone par API ko kaun sa HTTP status code return karna chahiye?",
      options: [
        { id: "opt_1", text: "400 Bad Request — client ne incomplete ya invalid data submit kiya hai." },
        { id: "opt_2", text: "200 OK — taaki frontend error handling na karni pade." },
        { id: "opt_3", text: "500 Internal Server Error." },
        { id: "opt_4", text: "301 Redirect." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Frequent queries par slow response dene wale MongoDB collection ko optimize karne ka best approach kya hai?",
      options: [
        { id: "opt_1", text: "explain() se analyze karein, queried fields par compound indexes lagayein aur required fields hi project karein." },
        { id: "opt_2", text: "Server ki RAM badha dein aur query design ignore karein." },
        { id: "opt_3", text: "Saare database indexes delete kar dein." },
        { id: "opt_4", text: "Database ka saara data client global variable mein cache kar lein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Web application mein Cross-Site Scripting (XSS) attacks se bachne ke liye kya karna chahiye?",
      options: [
        { id: "opt_1", text: "User input sanitize aur escape karein, Content Security Policy (CSP) use karein aur dangerouslySetInnerHTML avoid karein." },
        { id: "opt_2", text: "Sirf HTTPS use karna kaafi hota hai XSS rokne ke liye." },
        { id: "opt_3", text: "React apps mein XSS attacks possible hi nahi hote." },
        { id: "opt_4", text: "Browser mein JavaScript disable karne ko bolein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Rapid multiple form submissions (double-click) se duplicate records create hone se kaise rokein?",
      options: [
        { id: "opt_1", text: "In-flight request ke dauran submit button disable karein aur server-side idempotency / token tracking implement karein." },
        { id: "opt_2", text: "Page ko baar-baar reload karne ka logic lagayein." },
        { id: "opt_3", text: "Fetch call se error handling hata dein." },
        { id: "opt_4", text: "Unlimited concurrent writes allow kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Professional software development team mein code review karne ka main purpose kya hota hai?",
      options: [
        { id: "opt_1", text: "Code quality ensure karna, bugs early catch karna, coding standards maintain karna aur technical debt kam karna." },
        { id: "opt_2", text: "Development process ko slow karna." },
        { id: "opt_3", text: "Production bug aane par doosron ko blame karna." },
        { id: "opt_4", text: "Yeh sirf interns ke liye zaroori hota hai." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  "Technical / Developer": [
    {
      text: "React/Next.js application mein Server Components aur Client Components ('use client') kab use karne chahiye?",
      options: [
        { id: "opt_1", text: "Server Components data fetching aur SEO ke liye use karein; Client Components browser interactivity aur hooks ke liye use karein." },
        { id: "opt_2", text: "Hamesha har component mein 'use client' likhna chahiye." },
        { id: "opt_3", text: "Server Components sirf authentication pages ke liye hote hain." },
        { id: "opt_4", text: "Dono mein koi practical difference nahi hota." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Production web application mein secret API keys aur database URIs kaise secure kiye jaane chahiye?",
      options: [
        { id: "opt_1", text: "Server-side environment variables (.env.local) mein store karein, NEXT_PUBLIC_ prefix na lagayein aur public repo mein commit na karein." },
        { id: "opt_2", text: "Client-side React component state mein hardcode kar dein." },
        { id: "opt_3", text: "Public JSON file mein daal kar browser se access karein." },
        { id: "opt_4", text: "Browser ke localStorage mein save karke chhod dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Client form submission mein required field missing hone par API ko kaun sa HTTP status code return karna chahiye?",
      options: [
        { id: "opt_1", text: "400 Bad Request — client ne incomplete ya invalid data submit kiya hai." },
        { id: "opt_2", text: "200 OK — taaki frontend error handling na karni pade." },
        { id: "opt_3", text: "500 Internal Server Error." },
        { id: "opt_4", text: "301 Redirect." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Frequent queries par slow response dene wale MongoDB collection ko optimize karne ka best approach kya hai?",
      options: [
        { id: "opt_1", text: "explain() se analyze karein, queried fields par compound indexes lagayein aur required fields hi project karein." },
        { id: "opt_2", text: "Server ki RAM badha dein aur query design ignore karein." },
        { id: "opt_3", text: "Saare database indexes delete kar dein." },
        { id: "opt_4", text: "Database ka saara data client global variable mein cache kar lein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Web application mein Cross-Site Scripting (XSS) attacks se bachne ke liye kya karna chahiye?",
      options: [
        { id: "opt_1", text: "User input sanitize aur escape karein, Content Security Policy (CSP) use karein aur dangerouslySetInnerHTML avoid karein." },
        { id: "opt_2", text: "Sirf HTTPS use karna kaafi hota hai XSS rokne ke liye." },
        { id: "opt_3", text: "React apps mein XSS attacks possible hi nahi hote." },
        { id: "opt_4", text: "Browser mein JavaScript disable karne ko bolein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Rapid multiple form submissions (double-click) se duplicate records create hone se kaise rokein?",
      options: [
        { id: "opt_1", text: "In-flight request ke dauran submit button disable karein aur server-side idempotency / token tracking implement karein." },
        { id: "opt_2", text: "Page ko baar-baar reload karne ka logic lagayein." },
        { id: "opt_3", text: "Fetch call se error handling hata dein." },
        { id: "opt_4", text: "Unlimited concurrent writes allow kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Professional software development team mein code review karne ka main purpose kya hota hai?",
      options: [
        { id: "opt_1", text: "Code quality ensure karna, bugs early catch karna, coding standards maintain karna aur technical debt kam karna." },
        { id: "opt_2", text: "Development process ko slow karna." },
        { id: "opt_3", text: "Production bug aane par doosron ko blame karna." },
        { id: "opt_4", text: "Yeh sirf interns ke liye zaroori hota hai." },
      ],
      correctOptionId: "opt_1",
    },
  ],
  Other: [
    {
      text: "Jab aapko multiple supervisors se ek hi time par urgent tasks milein, toh sabse professional approach kya hai?",
      options: [
        { id: "opt_1", text: "Task impact assess karein, supervisors se priority order clarify karein aur systematically execute karein." },
        { id: "opt_2", text: "Ghabra kar saare tasks chhod dein." },
        { id: "opt_3", text: "Sirf aasan kaam karein aur baaki bina bataye chhod dein." },
        { id: "opt_4", text: "Colleagues ke samne complain karna shuru karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Supervisor se constructive feedback ya criticism milne par aapko kaise respond karna chahiye?",
      options: [
        { id: "opt_1", text: "Open mind se sunein, expectations clarify karein aur improvement ke liye feedback implement karein." },
        { id: "opt_2", text: "Turant argue karein aur defensive ho jayein." },
        { id: "opt_3", text: "Feedback ko ignore karein aur wahi galti baar-baar repeat karein." },
        { id: "opt_4", text: "Supervisor se baat karna band kar dein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic environment mein patient confidentiality aur professional integrity ka kya matlab hota hai?",
      options: [
        { id: "opt_1", text: "Patient privacy protect karna, clinic records safe rakhna aur ethical conduct maintain karna." },
        { id: "opt_2", text: "Friends ke saath patient details discuss karna." },
        { id: "opt_3", text: "Social media par internal clinic documents share karna." },
        { id: "opt_4", text: "Clinic SOPs aur rules ko ignore karna." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Agar aapse kaam mein koi operational ya clerical mistake ho jaye, toh sabse responsible action kya hai?",
      options: [
        { id: "opt_1", text: "Galti accept karein, supervisor ko turant inform karein aur corrective steps lein." },
        { id: "opt_2", text: "Galti chhupayein aur kisi doosre teammate par blame daal dein." },
        { id: "opt_3", text: "Aise act karein jaise kuch hua hi nahi." },
        { id: "opt_4", text: "Computer logs delete karke sabut mitane ki koshish karein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic mein kisi demanding ya upset customer ko professionally kaise handle karein?",
      options: [
        { id: "opt_1", text: "Calm aur respectful demeanor maintain karein, unki complaint actively sunein aur solution offer karein." },
        { id: "opt_2", text: "Aap bhi unpar loudly chillana shuru karein." },
        { id: "opt_3", text: "Aankhein ghuma kar wahan se walk away kar jayein." },
        { id: "opt_4", text: "Customer ko bolein ki doosra clinic dhoondh lein." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Clinic team mein positive collaboration aur acche workplace relationships build karne ki key kya hai?",
      options: [
        { id: "opt_1", text: "Clear communication, mutual respect, punctuality aur busy hours mein colleagues ko support karna." },
        { id: "opt_2", text: "Workplace politics aur gossip mein involve hona." },
        { id: "opt_3", text: "Apna kaam khatam hote hi colleagues ki help karne se mana kar dena." },
        { id: "opt_4", text: "Doosron ke kaam ka credit khud le lena." },
      ],
      correctOptionId: "opt_1",
    },
    {
      text: "Healthcare clinic environment mein punctuality aur schedule adherence kyun zaroori hoti hai?",
      options: [
        { id: "opt_1", text: "Isse patient appointments smoothly chalte hain, delays prevent hote hain aur colleagues ke time ki respect hoti hai." },
        { id: "opt_2", text: "Punctuality sirf inspection wale din zaroori hoti hai." },
        { id: "opt_3", text: "Iska patient experience par koi positive impact nahi hota." },
        { id: "opt_4", text: "Yeh sirf ek outdated formal rule hai." },
      ],
      correctOptionId: "opt_1",
    },
  ],
};
