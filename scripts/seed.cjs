var admin = require("firebase-admin");

// Download your service account key from:
// Firebase Console > Project Settings > Service Accounts > Generate new private key
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const researchData = [
  {
    title: "Deep Learning Approaches for Natural Language Processing",
    authors: ["Jane Smith", "Carlos Mendez"],
    abstract: "This paper explores transformer-based architectures for NLP tasks, demonstrating state-of-the-art results on benchmark datasets including GLUE, SuperGLUE, and SQuAD. We present a novel fine-tuning strategy that reduces computational cost by 40%.",
    subjects: ["computer-science"],
    year: 2024,
    journal: "Journal of Machine Learning Research",
    doi: "10.1234/jmlr.2024.001",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "CRISPR-Cas9 Gene Editing in Hereditary Disease Treatment",
    authors: ["Dr. Emily Chen", "Prof. Kwame Asante"],
    abstract: "We demonstrate the efficacy of targeted CRISPR-Cas9 editing in correcting pathogenic variants associated with sickle cell disease and beta-thalassemia, with clinical trial data from 45 patients over 18 months.",
    subjects: ["biology", "medicine"],
    year: 2024,
    journal: "Nature Medicine",
    doi: "10.1038/nm.2024.089",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Quantum Computing Algorithms for Cryptographic Applications",
    authors: ["Aisha Nkemdi", "Liam O'Brien"],
    abstract: "We present a new family of quantum-resistant cryptographic algorithms optimized for near-term quantum hardware. Our benchmarks show a 3x speedup over existing post-quantum candidates on standard security tasks.",
    subjects: ["computer-science", "mathematics", "physics"],
    year: 2023,
    journal: "IEEE Transactions on Information Theory",
    doi: "10.1109/tit.2023.456",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Climate Change Impacts on Coastal Biodiversity",
    authors: ["Prof. Maria Gonzalez"],
    abstract: "A 10-year longitudinal study examining species migration patterns and population decline in Pacific coastal ecosystems, correlating temperature rise with measurable biodiversity loss at multiple trophic levels.",
    subjects: ["environmental", "biology"],
    year: 2023,
    journal: "Global Change Biology",
    doi: "10.1111/gcb.2023.177",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Behavioral Economics and Public Health Policy",
    authors: ["Dr. Samuel Park", "Dr. Fatima Al-Rashid"],
    abstract: "Analyzing nudge theory interventions across six countries, this study evaluates how behavioral economics principles can improve vaccination uptake, dietary habits, and smoking cessation rates in low-income populations.",
    subjects: ["economics", "social-sciences", "psychology"],
    year: 2024,
    journal: "The Lancet Public Health",
    doi: "10.1016/lph.2024.022",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Advances in Solid-State Battery Technology for Electric Vehicles",
    authors: ["Dr. Yuki Tanaka", "Dr. Priya Sharma"],
    abstract: "This paper presents breakthrough results in solid-state electrolyte formulations achieving energy densities of 500 Wh/kg, with cycle stability exceeding 2,000 charge-discharge cycles at room temperature.",
    subjects: ["engineering", "chemistry"],
    year: 2024,
    journal: "Nature Energy",
    doi: "10.1038/nenergy.2024.055",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Neural Correlates of Decision-Making Under Uncertainty",
    authors: ["Dr. Zara Ahmed", "Prof. James Liu"],
    abstract: "Using fMRI and EEG multimodal imaging, we identify prefrontal-limbic circuit dynamics that predict risk-averse versus risk-seeking behaviour in financial decision tasks across 120 healthy adult participants.",
    subjects: ["psychology", "medicine"],
    year: 2023,
    journal: "Nature Neuroscience",
    doi: "10.1038/nn.2023.312",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: "Constitutional AI and the Governance of Large Language Models",
    authors: ["Prof. Sofia Reyes", "Dr. Arjun Patel"],
    abstract: "We propose a regulatory framework for LLM deployment drawing on international law, product liability doctrine, and algorithmic accountability theory, with comparative case studies from the EU AI Act and US Executive Order 14110.",
    subjects: ["law", "social-sciences", "computer-science"],
    year: 2024,
    journal: "Harvard Journal of Law & Technology",
    doi: "10.2139/ssrn.2024.789",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

async function seed() {
  console.log("Seeding Firestore with research data...\n");
  const batch = db.batch();

  for (const item of researchData) {
    const ref = db.collection("research").doc();
    batch.set(ref, item);
    console.log(`  + ${item.title.slice(0, 60)}...`);
  }

  await batch.commit();
  console.log(`\nDone! ${researchData.length} research papers added to Firestore.`);
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
