export const FEATURES: [string, string][] = [
  ["Emergency", "Hold to activate. Your family is alerted and your location is shared until you resolve it."],
  ["Journeys", "Share a trip to a real destination and see when it runs late."],
  ["Family map", "A real map with safe-place circles. Location shows only while someone allows it."],
  ["Check-ins", "Ask if everyone is okay. They answer Safe or Not safe."],
  ["Voice Guard", "Say your safeword. FAST starts an emergency after a 5 second window to cancel."],
  ["FAST AI", "Ask how anything works, or what to do next."],
  ["Safety tools", "Trusted contacts, a safety plan, safe places and safe words."],
  ["Made for everyone", "A dyslexia-friendly font option, strong contrast and a daily mood check-in."],
];

export const SCREENS = [
  { title: "A calm welcome", text: "A private network for the people who matter. Location is shared only with consent.", alt: "FAST welcome screen" },
  { title: "Sign in with your phone", text: "Your number is your FAST account. No email needed.", alt: "Phone sign-in screen" },
  { title: "See where they are", text: "A real map of your family, live only while someone is sharing.", alt: "Family map screen" },
  { title: "Daily check-ins", text: "A quick mood check-in with kind words, and support when it is needed.", alt: "Daily check-in screen" },
  { title: "Ask FAST AI", text: "Setup, journeys, Voice Guard and safety plans, explained simply.", alt: "FAST AI chat screen" },
];

export const EMOJI = ["🤗","💛","🌱","🌸","☀️","🕊️","💪","🌈","🫶","✨","🌻","🦋","🧡","💚","🌿","🫂","🌟","🍀","💫","🌷","🤍","🌼","🪴","💖","🙌"];
export const QUOTES = "You matter.|You are not alone.|It is not your fault.|One step at a time.|You deserve to feel safe.|Your voice counts.|Asking for help is brave.|You are stronger than you know.|Healing is not a straight line.|Be gentle with yourself today.|You are worthy of respect.|Today is a fresh start.|Breathe. You are here.|Your feelings are valid.|Love should never hurt.|You are enough.|Someone is on your side.|You can start again.|Small steps still count.|You are doing better than you think.|Your family is your strength.|Rest is allowed.|You deserve kindness.|Hope is a real plan.|You are seen.|Safe is a right, not a favour.|Reach out. People care.|You have survived every hard day so far.|Your story is not over.|Trust yourself.|You are allowed to say no.|Courage can be quiet.|Peace starts with safety.|You are loved.|Better days are possible.|Take the help that is offered.|You are not a burden.|Listening is love.|Believe survivors.|Together we are stronger.|Your worth is not up for debate.|Every call for help is a brave one.|Let someone carry it with you.|Joy is allowed.|You deserve a calm home.|Look after each other.|Stay close. Stay safe.|Tomorrow can be softer.|You are someone's whole world.|Keep going. We are with you.".split("|");

export const telHref = (n: string) => "tel:" + n.replace(/[^\d*+#]/g, "").replace("#", "%23");

export const CALLS = {
  sap: { label: "Call police 10111", number: "10111" },
  e112: { label: "Call 112", number: "112" },
  gbv: { label: "Call GBV Command Centre", number: "0800 428 428" },
  shel: { label: "Call National Shelter Movement", number: "0800 001 005" },
  child: { label: "Call Childline 116", number: "116" },
  sgv: { label: "Call Stop Gender Violence", number: "0800 150 150" },
  life: { label: "Call Lifeline", number: "0861 322 322" },
} as const;

export type PanelKey = "danger" | "leave" | "sexual" | "friend" | "unsure";
export const PANELS: Record<PanelKey, { pick: string; steps: string[]; calls: (keyof typeof CALLS)[] }> = {
  danger: { pick: "I am in danger right now", calls: ["sap", "e112"], steps: [
    "Call 10111 or 112. Say your address first, then what is happening. 112 works from any cellphone, even without airtime.",
    "Get out if it is safe: a neighbour, a shop, a busy road. Take your phone and keys.",
    "Avoid the kitchen and rooms with no exit. Do not lock yourself in.",
    "If you cannot speak, stay on the line. Make noise so they can hear what is happening."] },
  leave: { pick: "I want to leave", calls: ["gbv", "shel"], steps: [
    "Call the GBV Command Centre. They can find you a shelter and a social worker.",
    "Choose a time when the abuser is out. Tell one person you trust.",
    "Pack the essentials from the safety-bag list below. Documents and medication matter most.",
    "Apply for a protection order. It is free at any magistrate's court.",
    "Take your children if you can, and tell the helpline you have them."] },
  sexual: { pick: "I was sexually assaulted", calls: ["gbv", "sap"], steps: [
    "Go to a Thuthuzela Care Centre or any hospital, ideally within 72 hours. Medicine that helps prevent HIV works best in that window.",
    "If you can, do not wash or change clothes before you are examined. Bring them in a paper bag if you have changed.",
    "You are not to blame, whatever happened and whoever it was.",
    "Call the GBV Command Centre to find the nearest centre and have someone to talk to. You can report to police now or later."] },
  friend: { pick: "Someone I know is being hurt", calls: ["gbv", "child"], steps: [
    "Listen. Believe them. Do not blame them or ask why they stay.",
    "Do not confront the abuser. It can make things more dangerous.",
    "Share the helplines and offer to go with them. Let them choose what happens next.",
    "Agree a code word they can text you if they need help.",
    "If they are in immediate danger call 10111. If a child is involved, call Childline."] },
  unsure: { pick: "I am not sure if it is abuse", calls: ["sgv", "life"], steps: [
    "If you are afraid of your partner, controlled, put down or forced, it is serious enough to talk about.",
    "You do not have to decide anything. A counsellor will listen and explain your options.",
    "Write down what happens and when, and keep it somewhere private."] },
};

export const SIGNS: [string, string][] = [
  ["Physical", "Hitting, choking, blocking doors, throwing things. Strangulation is a serious warning sign."],
  ["Emotional", "Insults, threats, cutting you off from family and friends, making you doubt yourself."],
  ["Sexual", "Forcing or pressuring sex, or refusing contraception. Sex without consent is rape, even in a relationship."],
  ["Money", "Taking your pay, hiding money, stopping you from working or studying."],
  ["Digital", "Checking your phone, tracking your location, sharing or threatening to share images."],
];

export const PACK = ["ID document or passport", "Bank card and some cash", "Phone and charger", "House and car keys", "Medication", "Children's birth certificates and clinic cards", "Protection order or case number", "Clothes for a few days", "A trusted person's number written on paper"];

export const HELPLINES = [
  { name: "GBV Command Centre", number: "0800 428 428", note: "24 hours. Social worker and shelter referral", href: telHref("0800428428") },
  { name: "Please call me, free", number: "*120*7867#", note: "Dial from any cell phone and they call you back", href: telHref("*120*7867#") },
  { name: "Stop Gender Violence", number: "0800 150 150", note: "Counselling for women and men", href: telHref("0800150150") },
  { name: "Police", number: "10111", note: "Emergency response", href: telHref("10111") },
  { name: "Ambulance", number: "10177", note: "Medical emergency", href: telHref("10177") },
  { name: "Childline", number: "116", note: "For children and anyone worried about one", href: telHref("116") },
  { name: "Lifeline", number: "0861 322 322", note: "24 hour counselling", href: telHref("0861322322") },
  { name: "SADAG suicide crisis line", number: "0800 567 567", note: "If you are thinking of ending your life", href: telHref("0800567567") },
  { name: "Complain about police service", number: "0800 333 177", note: "GBV related complaints about SAPS", href: telHref("0800333177") },
  { name: "National Shelter Movement", number: "0800 001 005", note: "Safe places to stay", href: telHref("0800001005") },
  { name: "Rise, on WhatsApp", number: "081 589 4308", note: "Domestic violence support by message", href: "https://wa.me/27815894308" },
];

export const TIP_RULES: [string, string][] = [["nav a[href='#tour']", "See real screens from the app"], ["nav a[href='#features']", "What FAST does when it matters"], ["nav .hl", "Free helplines and what to do next"], ["nav .btn", "Get FAST for your device"], [".gbv", "Jump to help if you or someone you know is being hurt"], [".hero .cta .btn:not(.ghost)", "Pick Windows, Android or iPhone"], [".hero .cta .ghost", "Free, private guidance. Nothing is saved"], [".emb img", "The FAST family emblem"], [".ph", "A screen from the FAST app"], [".mq span", "A little kindness, just for you"], [".pick button", "See the steps and who to call"], [".signs div", "A common sign of abuse"], [".pack label", "Tick it off. This list is not saved"], [".poster", "Stop GBV in South Africa. Help is available"], [".dc .btn[aria-disabled=true]", "This link goes live at launch"], [".dc a.btn", "Starts your download"]];
export const ROW_TIPS: Record<string, string> = {"Emergency": "Hold, confirm, then a countdown you set (0, 3, 5 or 10 seconds) before your family is alerted.", "Journeys": "Live progress from real GPS, with late-arrival detection and trip history.", "Family map": "Choose Cartoon, Minimal or Classic map styles, and search any place.", "Check-ins": "A safety timer flags a missed or due check-in.", "Voice Guard": "Arm it once. Your safeword starts a 5 second cancel window, then an emergency and a call to 112.", "FAST AI": "Replies stream live and remember your family and notes.", "Safety tools": "Safe places show as radius circles on the map.", "Made for everyone": "Switch to the OpenDyslexic font with one toggle."};
