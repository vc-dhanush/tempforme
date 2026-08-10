import {
  Person,
  NavItem,
  Experience,
  Project,
  ResearchPaper,
  SkillCategory,
  Achievement,
  Certificate,
  GalleryItem,
  Education,
} from "./types";

export const person: Person = {
  name: "Dhanush V C",
  shortName: "Dhanush",
  title: "AI/ML Engineer | Computer Vision | Software Developer",
  location: "Bangalore, India",
  email: "dhanushvc183@gmail.com",
  tagline:
    "Building practical AI systems at the intersection of machine learning research, computer vision, and real-world software.",
  summary:
    "Aspiring AI/ML engineer with hands-on experience building end-to-end machine learning pipelines, computer vision systems, and biomedical signal-processing models. Skilled in Python, PyTorch, and deep learning frameworks, with experience translating research problems into working technical solutions across healthcare and industrial vision applications.",
  aboutLong: [
    "I am an engineering student specializing in Artificial Intelligence and Machine Learning, with a strong interest in building practical AI systems and research-oriented solutions.",
    "My work combines Machine Learning, Computer Vision, Deep Learning, software development, and applied research to solve real-world problems—especially in healthcare AI and industrial vision.",
    "I focus on turning research concepts into practical prototypes and deployable applications: from synthetic NIR pipelines for biomedical prediction to robust object detection under environmental degradation.",
  ],
  interests: [
    "Artificial Intelligence & Machine Learning",
    "Computer Vision",
    "Generative AI",
    "Healthcare AI",
    "Machine Learning Research",
    "AI-powered Software Applications",
    "Android & AI Integration",
    "Intelligent Automation",
  ],
  careerInterests: [
    "Applied AI/ML engineering roles",
    "Computer vision and perception systems",
    "Healthcare and biomedical ML research",
    "End-to-end product development for AI systems",
  ],
  technicalFocus: [
    "Deep learning model development and evaluation",
    "Computer vision pipelines (detection, OCR, robustness)",
    "Biomedical signal processing and spectral ML",
    "Domain adaptation and transfer learning",
    "Full-stack prototyping for AI applications",
  ],
  goals: [
    "Build practical AI systems that solve measurable real-world problems.",
    "Operate at the intersection of AI, research, software development, and real-world applications.",
    "Continue publishing and presenting research while shipping working prototypes.",
  ],
  mantra: "Build. Research. Test. Improve.",
  profileImage: "/images/profile.jpg",
  resumeUrl: "/documents/Dhanush_VC_Resume.pdf",
  socials: {
    github: "https://github.com/vc-dhanush",
    linkedin: "https://www.linkedin.com/in/DhanushVC",
    quora: "https://www.quora.com/profile/Vc-Dhanush",
    youtube: "https://youtube.com/@DhanushVC",
    email: "mailto:dhanushvc183@gmail.com",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Skills", href: "/skills" },
  { label: "Achievements", href: "/achievements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const education: Education[] = [
  {
    institution: "PES Institute of Technology and Management",
    degree: "Bachelor of Engineering",
    field: "Artificial Intelligence & Machine Learning",
    location: "Bangalore, India",
    duration: "2022 – 2026",
    highlights: [
      "Built strong problem-solving and debugging skills through hands-on engineering projects",
      "Specializing in Artificial Intelligence and Machine Learning",
    ],
  },
  {
    institution: "St. Charles Composite Pre-University College",
    degree: "Class XII",
    field: "Science",
    location: "Bangalore, India",
    duration: "2020 – 2022",
    highlights: [
      "Built strong fundamentals in mathematics, physics, and programming",
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "zidio",
    organization: "Zidio Development",
    role: "Data Analyst Intern / Machine Learning & Data Analytics Intern",
    location: "Bangalore, India",
    duration: "Mar 2025 – Jun 2025",
    type: "Internship",
    summary:
      "Completed the Zidio AI & Data Science internship, applying machine learning techniques to real-world datasets and building end-to-end ML workflows.",
    responsibilities: [
      "Completed the Zidio AI & Data Science internship, applying machine learning techniques to real-world datasets",
      "Performed data preprocessing and feature engineering to prepare datasets for model training",
      "Built end-to-end ML pipelines in Python, covering data ingestion through model output",
      "Evaluated model performance using standard metrics and structured experimentation",
      "Worked on data cleaning, preprocessing, analysis, and machine-learning workflows",
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "Scikit-learn"],
    contributions: [
      "Developed practical experience building and evaluating data-driven solutions",
      "Applied ML techniques across structured experimentation pipelines",
    ],
    relatedProjectSlugs: ["employee-emotion-management"],
  },
  {
    id: "mindmatrix",
    organization: "MindMatrix (VTU Internship Program)",
    role: "Android App Development using Generative AI",
    location: "India",
    duration: "Internship Program",
    type: "Internship",
    summary:
      "Worked on Android application development concepts and explored integration of Generative AI with application development through the Skill-Exchange project.",
    responsibilities: [
      "Worked on Android application development concepts",
      "Explored integration of Generative AI with application development",
      "Built practical understanding of AI-assisted software development",
    ],
    technologies: ["Android", "Kotlin / Java", "Firebase", "Generative AI"],
    contributions: [
      "Developed Skill-Exchange, a barter-based Android application for rural and local technicians",
      "Designed skill profiles, swap offers, trust scores, and real-time skill board concepts",
    ],
    links: [
      {
        label: "Live Demo",
        url: "https://vc-dhanush.github.io/tempforme/",
      },
      {
        label: "GitHub",
        url: "https://github.com/vc-dhanush/InternshipProject",
      },
    ],
    relatedProjectSlugs: ["skill-exchange"],
  },
  {
    id: "ieee-volunteer",
    organization: "IEEE",
    role: "Technical Event Volunteer",
    location: "Bangalore, India",
    duration: "Apr 2025",
    type: "Volunteering",
    summary:
      "Collaborated with the IEEE team on technical event execution, participant coordination, and on-ground operations.",
    responsibilities: [
      "Collaborated with the IEEE team on technical event execution",
      "Coordinated participants across multiple sessions",
      "Managed on-ground operations and event flow",
      "Facilitated technical discussions with attendees and industry experts",
    ],
    technologies: [],
    contributions: [
      "Supported technical event operations and participant experience",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "glucose-monitoring",
    title: "Non-Invasive Continuous Blood Glucose Monitoring",
    shortTitle: "Glucose Monitoring",
    subtitle: "Near-Infrared Spectroscopy + Machine Learning",
    shortDescription:
      "Research-oriented system for non-invasive glucose estimation using NIR spectroscopy, synthetic spectral pipelines, and ML regression models.",
    category: ["AI/ML", "Healthcare", "Research", "Computer Vision"],
    featured: true,
    status: "Research / Ongoing related work",
    duration: "2025 – Present",
    problem:
      "Conventional blood glucose monitoring is invasive and inconvenient for continuous use. Non-invasive estimation from optical signals is challenging due to noise, physiological variation, limited datasets, and generalization issues.",
    motivation:
      "Enable continuous, non-invasive glucose-related prediction by combining optical signal modeling with robust machine-learning regression pipelines.",
    solution:
      "Built a synthetic near-infrared (NIR) pipeline for biomedical signal generation, modeled noise and degradation, and benchmarked Random Forest, CNN, and Transformer models for prediction accuracy.",
    architecture: [
      "Synthetic NIR / spectral signal generation pipeline",
      "Noise, degradation, and variability modeling",
      "Spectral + clinical feature combination",
      "Regression models: Random Forest, CNN, Transformer",
      "Validation with RMSE, MAE, R², and k-fold cross-validation",
    ],
    methodology: [
      "Designed a pipeline covering optical signal acquisition concepts, preprocessing, feature extraction, model development, and prediction",
      "Simulated real-world signal distortion conditions",
      "Compared models for non-invasive glucose prediction accuracy",
      "Investigated challenges such as noise, physiological variation, limited datasets, and model generalization",
    ],
    features: [
      "Synthetic NIR pipeline for biomedical signal generation",
      "Noise and degradation simulation",
      "Multi-model benchmarking (RF, CNN, Transformer)",
      "Structured evaluation with standard regression metrics",
    ],
    results: [
      "Compared Random Forest, CNN, and Transformer approaches for non-invasive glucose prediction",
      "Validated performance using RMSE, MAE, R², and k-fold cross-validation",
      "Research presented at ICECIT 2025 (IEEE)",
      "Received a Best Paper Award for the research",
    ],
    challenges: [
      "Noise and signal distortion in optical measurements",
      "Physiological variation across subjects",
      "Limited datasets and model generalization",
    ],
    futureImprovements: [
      "Broader multimodal biomedical signal fusion",
      "Stronger real-world clinical validation pathways",
      "Continued model robustness under degradation",
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "CNN",
      "Transformers",
      "Random Forest",
      "NIR Spectroscopy",
      "Signal Processing",
    ],
    heroTone: "teal",
    githubUrl: undefined,
    demoUrl: undefined,
    researchSlug: "nir-glucose-monitoring",
    relatedAchievementIds: ["best-paper-ieee"],
  },
  {
    slug: "robust-object-detection",
    title: "Robust Object Detection Under Extreme Environmental Degradation",
    shortTitle: "Robust Detection",
    subtitle: "YOLO & SSD stress-testing under fog, blur, and noise",
    shortDescription:
      "Image degradation engine and detection benchmarks to evaluate YOLO and SSD robustness under extreme visual distortions.",
    category: ["AI/ML", "Computer Vision"],
    featured: true,
    status: "Completed",
    duration: "Mar 2025 – Jul 2025",
    problem:
      "Object detectors can fail under real-world visual distortions such as fog, blur, and noise, limiting reliability for edge and outdoor deployments.",
    motivation:
      "Quantify and improve detector robustness by simulating extreme environmental degradation and measuring performance trade-offs.",
    solution:
      "Built an image degradation engine, benchmarked YOLO and SSD with mAP and precision-recall curves, and improved robustness through augmentation and adversarial training.",
    architecture: [
      "Image degradation engine (fog, blur, noise)",
      "YOLO and SSD evaluation pipeline",
      "mAP and precision-recall analysis",
      "Augmentation and adversarial training loop",
      "Latency / edge-deployment trade-off analysis",
    ],
    methodology: [
      "Simulated real-world visual distortions to stress-test detection models",
      "Benchmarked detection models using mAP and precision-recall curves",
      "Applied data augmentation and adversarial training",
      "Analyzed latency and edge-deployment trade-offs for real-time use cases",
    ],
    features: [
      "Configurable degradation simulation",
      "Multi-detector benchmarking",
      "Robustness-focused training strategies",
      "Deployment-oriented latency analysis",
    ],
    results: [
      "Established a stress-test workflow for detectors under fog, blur, and noise",
      "Improved model robustness through augmentation and adversarial training",
      "Documented latency vs. robustness considerations for edge use",
    ],
    challenges: [
      "Balancing robustness gains with inference latency",
      "Realistic simulation of compound degradation",
    ],
    futureImprovements: [
      "Broader detector family comparisons",
      "On-device profiling for edge hardware",
    ],
    technologies: ["Python", "YOLO", "SSD", "OpenCV", "Computer Vision", "Deep Learning"],
    heroTone: "copper",
  },
  {
    slug: "cross-domain-industrial-vision",
    title: "Cross-Domain Adaptation Framework for Small-Scale Industrial Vision Systems",
    shortTitle: "Domain Adaptation Vision",
    subtitle: "Defect detection under limited labels and distribution shift",
    shortDescription:
      "Defect detection framework addressing cross-domain performance gaps with transfer learning and domain adaptation for small-scale industrial vision.",
    category: ["AI/ML", "Computer Vision", "Research"],
    featured: true,
    status: "Completed",
    duration: "Oct 2024 – Feb 2025",
    problem:
      "Small-scale industrial vision systems often fail when labeled data is limited and target domains differ from training distributions.",
    motivation:
      "Diagnose and mitigate distribution shift so defect detection remains useful across domains with scarce labels.",
    solution:
      "Built a defect detection system for limited-label scenarios, identified cross-domain degradation causes, and applied transfer learning and domain adaptation techniques.",
    architecture: [
      "Limited-label defect detection pipeline",
      "Cross-domain performance diagnosis",
      "Transfer learning / domain adaptation stage",
      "Ablation and robustness validation",
    ],
    methodology: [
      "Identified and analyzed cross-domain performance degradation",
      "Diagnosed distribution shift as the root cause of model failures",
      "Applied transfer learning and domain adaptation techniques",
      "Validated results using performance metrics, ablation studies, and robustness tests",
    ],
    features: [
      "Limited-label industrial defect detection",
      "Distribution-shift diagnosis",
      "Domain adaptation workflow",
      "Ablation-driven validation",
    ],
    results: [
      "Closed cross-domain performance gaps using adaptation techniques",
      "Validated improvements with metrics, ablations, and robustness tests",
    ],
    challenges: [
      "Scarce labeled industrial data",
      "Severe distribution shift across domains",
    ],
    futureImprovements: [
      "Broader industrial category coverage",
      "Semi-supervised adaptation extensions",
    ],
    technologies: [
      "Python",
      "Transfer Learning",
      "Domain Adaptation",
      "Computer Vision",
      "Deep Learning",
    ],
    heroTone: "slate",
  },
  {
    slug: "vcf-finance-analyzer",
    title: "VC Finance Analyzer",
    shortTitle: "Finance Analyzer",
    subtitle: "Automated financial intelligence from transaction PDFs",
    shortDescription:
      "Full-stack system that extracts, analyzes, and generates actionable insights from transaction PDFs using Python, FastAPI, and MongoDB.",
    category: ["Software Development", "AI/ML"],
    featured: true,
    status: "Completed",
    duration: "2025 – 2026",
    problem:
      "Transaction PDFs (Paytm/UPI statements) are unstructured and hard to turn into actionable personal finance insights.",
    motivation:
      "Convert unstructured financial documents into structured analysis with behavioral insights, not just raw totals.",
    solution:
      "Built a full-stack analyzer: PDF extraction, Pandas analysis, insight engine, FastAPI backend, MongoDB storage, and HTML/JS frontend.",
    architecture: [
      "PDF upload frontend",
      "FastAPI processing API",
      "pdfplumber extraction layer",
      "Pandas analysis + intelligence engine",
      "MongoDB persistence",
    ],
    methodology: [
      "Parse transaction PDFs and extract sender/receiver, amount, type, and tags",
      "Compute tag-wise and person-wise financial flows",
      "Detect behavioral patterns such as micro-spending and money leakage",
      "Surface savings rate, financial health signals, and recommendations",
    ],
    features: [
      "PDF transaction extraction",
      "Tag-wise spending and income breakdown",
      "Person-wise financial flow",
      "Savings rate and financial health signals",
      "Personalized insights and warnings",
    ],
    results: [
      "Converts unstructured PDF data into structured insights",
      "Combines data engineering with behavioral finance analysis",
      "Deployed demo available on Vercel",
    ],
    challenges: [
      "Inconsistent PDF layouts",
      "Turning raw transactions into useful behavioral signals",
    ],
    futureImprovements: [
      "Monthly trend analysis with visualization",
      "AI-based financial prediction",
      "User authentication",
      "Interactive React dashboard",
      "Automated budgeting system",
    ],
    technologies: ["Python", "FastAPI", "Pandas", "pdfplumber", "MongoDB", "HTML", "JavaScript"],
    githubUrl: "https://github.com/vc-dhanush/VCFiananceAnalyzer",
    demoUrl: "https://vc-fianance-analyzer.vercel.app",
    heroTone: "teal",
  },
  {
    slug: "carbon-ai-parser",
    title: "Carbon AI – Intelligent Bank Statement Parser Agent",
    shortTitle: "Carbon AI Agent",
    subtitle: "Autonomous coding agent for bank PDF parsers",
    shortDescription:
      "Autonomous agent that generates custom bank statement parsers from PDFs with self-debug loops, validation, and modular architecture.",
    category: ["AI/ML", "Software Development"],
    featured: false,
    status: "Completed",
    duration: "2025",
    problem:
      "Manually extracting, validating, and formatting bank statement data is slow and error-prone across bank-specific PDF formats.",
    motivation:
      "Demonstrate AI workflow design and autonomous agent patterns for practical document automation.",
    solution:
      "Built an extensible modular agent with bank-specific parser modules, retry strategies, validation, CLI support, and Streamlit UI.",
    architecture: [
      "Agent workflow with self-debug / retry loops",
      "Plug-and-play bank parser modules",
      "PDF parsing via camelot / pdfplumber strategies",
      "DataFrame validation layer",
      "CLI + optional Streamlit interface",
    ],
    methodology: [
      "Generate custom parsers per bank target",
      "Retry with alternate extraction strategies on failure",
      "Validate extracted data against expected schema/CSV",
      "Keep architecture modular for extensibility",
    ],
    features: [
      "CLI support",
      "Self-debug loops",
      "DataFrame validation",
      "Automated parser generation",
      "Streamlit UI",
    ],
    results: [
      "Completed the Agent-as-Coder challenge workflow",
      "Demonstrated autonomous parsing with validation and retries",
    ],
    challenges: [
      "Handling inconsistent PDF layouts",
      "Designing reliable self-correcting loops",
    ],
    futureImprovements: [
      "More bank adapters",
      "Stronger evaluation harnesses",
    ],
    technologies: ["Python", "LangGraph", "Streamlit", "camelot", "pdfplumber", "pandas", "pytest"],
    githubUrl: "https://github.com/vc-dhanush/Karbon-ai-challenge",
    heroTone: "copper",
  },
  {
    slug: "employee-emotion-management",
    title: "Employee Emotion Management / AI-Powered Task Optimizer",
    shortTitle: "Emotion Task Optimizer",
    subtitle: "Multimodal emotion detection for workplace well-being",
    shortDescription:
      "AI system that detects employee emotions from text, video, and speech, recommends mood-aligned tasks, and supports stress/burnout awareness.",
    category: ["AI/ML", "Healthcare", "Software Development"],
    featured: false,
    status: "Completed",
    duration: "2025",
    problem:
      "Workplace well-being signals are hard to monitor continuously across text, speech, and visual cues, making stress and burnout difficult to surface early.",
    motivation:
      "Explore multimodal emotion detection as a practical application for understanding employee well-being and aligning tasks to mood.",
    solution:
      "Designed an AI-powered task optimizer that detects emotions from multiple modalities, tracks emotional trends, and can alert HR about stress or burnout signals.",
    architecture: [
      "Multimodal inputs: text, video, speech",
      "Emotion detection models",
      "Mood-aligned task recommendation",
      "Trend tracking and alerting concepts",
    ],
    methodology: [
      "Explored text, speech, and visual data for emotion detection",
      "Applied machine-learning and deep-learning approaches",
      "Designed the system around employee well-being use cases",
    ],
    features: [
      "Multimodal emotion detection",
      "Mood-aligned task recommendations",
      "Emotional trend tracking",
      "Stress / burnout alert concepts",
    ],
    results: [
      "Prototype direction for workplace emotion-aware task optimization",
      "Connected to Zidio AI internship workstreams",
    ],
    challenges: [
      "Multimodal fusion complexity",
      "Sensitive workplace data considerations",
    ],
    futureImprovements: [
      "Stronger real-time multimodal fusion",
      "Privacy-preserving deployment patterns",
    ],
    technologies: ["Python", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
    githubUrl: "https://github.com/vc-dhanush/Employee-emotion-management",
    heroTone: "slate",
    relatedAchievementIds: [],
  },
  {
    slug: "skill-exchange",
    title: "Skill-Exchange – Android App using GenAI",
    shortTitle: "Skill-Exchange",
    subtitle: "Barter-based skill marketplace for local technicians",
    shortDescription:
      "Android application for rural and local technicians to exchange services using a barter-based system, developed under MindMatrix VTU Internship.",
    category: ["Software Development", "Other"],
    featured: false,
    status: "Completed",
    duration: "MindMatrix VTU Internship",
    problem:
      "Village technicians often need help from others but may not have enough cash to pay for services, and there is no proper platform to connect skill exchange.",
    motivation:
      "Encourage self-employment, local skill utilization, and trust-based collaboration through a barter-based community platform.",
    solution:
      "Built Skill-Exchange with skill profiles, need posts, swap offers, trust scores, real-time skill board, and chat-based negotiation—plus GenAI-assisted recommendations.",
    architecture: [
      "Android frontend (XML / Jetpack Compose)",
      "Firebase Authentication",
      "Firebase Realtime Database / Firestore",
      "GenAI recommendation layer",
    ],
    methodology: [
      "User registration and skill profile creation",
      "Post required services and browse available skills",
      "Send swap requests, chat, confirm exchange",
      "Update trust score after successful exchanges",
    ],
    features: [
      "Skill profiles",
      "Need posts",
      "Swap offers",
      "Trust score",
      "Real-time skill board",
      "Chat-based negotiation",
      "GenAI smart recommendations",
    ],
    results: [
      "Functional concept and demo for community-driven skill exchange",
      "Internship project under MindMatrix VTU program",
    ],
    challenges: [
      "Designing trust and negotiation flows for barter exchanges",
      "Real-time synchronization of skills and requests",
    ],
    futureImprovements: [
      "Broader community rollout",
      "Richer recommendation quality",
    ],
    technologies: ["Android", "Kotlin / Java", "Firebase", "Generative AI"],
    githubUrl: "https://github.com/vc-dhanush/InternshipProject",
    demoUrl: "https://vc-dhanush.github.io/tempforme/",
    heroTone: "teal",
  },
  {
    slug: "handwritten-notes-converter",
    title: "Handwritten Notes to Digital Text Converter",
    shortTitle: "Notes Converter",
    subtitle: "OCR + NLP for structured digital documents",
    shortDescription:
      "AI-based system for converting handwritten notes into structured digital text using OCR, computer vision, and NLP correction.",
    category: ["AI/ML", "Computer Vision"],
    featured: false,
    status: "Explored / Prototype",
    duration: "—",
    problem:
      "Handwritten notes are unstructured and hard to reuse digitally without manual transcription.",
    motivation:
      "Convert unstructured handwritten content into usable digital documents.",
    solution:
      "Explored OCR and computer vision for handwriting recognition, with NLP-based processing for text correction and structuring.",
    architecture: [
      "Handwriting image input",
      "OCR / CV recognition stage",
      "NLP correction and structuring",
      "Digital document output",
    ],
    methodology: [
      "Explored OCR and computer vision techniques for handwriting recognition",
      "Applied NLP-based processing for text correction and structuring",
    ],
    features: [
      "Handwriting recognition exploration",
      "Text correction and structuring",
      "Document-oriented output focus",
    ],
    results: [
      "Prototype exploration of handwritten-to-digital conversion workflow",
    ],
    challenges: [
      "Handwriting variability",
      "Reliable post-OCR structuring",
    ],
    futureImprovements: [
      "Stronger document layout understanding",
      "End-to-end productization",
    ],
    technologies: ["OCR", "OpenCV", "NLP", "Computer Vision", "Tesseract", "EasyOCR"],
    heroTone: "copper",
  },
  {
    slug: "smart-reminder",
    title: "Smart Reminder & Task Manager",
    shortTitle: "Smart Reminder",
    subtitle: "AI-assisted task reminders and productivity tooling",
    shortDescription:
      "Smart reminder and task manager with deadlines, priorities, categories, recurring reminders, and ML-oriented scheduling concepts.",
    category: ["AI/ML", "Software Development"],
    featured: false,
    status: "Completed",
    duration: "2025",
    problem:
      "Traditional reminder apps are static—they notify at fixed times without learning from user behavior.",
    motivation:
      "Build a smarter reminder system that can adapt scheduling concepts using ML-oriented insights.",
    solution:
      "Built a reminder/task application with task CRUD, deadlines, priorities, categories, recurring reminders, and ML prediction concepts for better timing.",
    architecture: [
      "Task management UI",
      "Reminder and notification layer",
      "ML prediction / scheduling concepts",
      "Backup and restore support",
    ],
    methodology: [
      "Implement task management workflows",
      "Explore ML predictions for task timing",
      "Support notifications and productivity features",
    ],
    features: [
      "Add, edit, delete, search tasks",
      "Deadlines, priorities, categories",
      "Recurring reminders",
      "Backup / restore",
      "ML timing suggestion concepts",
    ],
    results: [
      "Functional smart reminder project documented on GitHub",
    ],
    challenges: [
      "Limited training data for personalized predictions",
      "Keeping models lightweight for responsive UX",
    ],
    futureImprovements: [
      "Voice command integration",
      "Calendar sync",
      "Advanced ML models",
      "Mobile extension",
    ],
    technologies: ["Python", "Streamlit", "React", "Machine Learning"],
    githubUrl: "https://github.com/vc-dhanush/react_ml-remainder",
    heroTone: "slate",
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    slug: "nir-glucose-monitoring",
    title:
      "Non-Invasive Continuous Blood Glucose Monitoring Using Near-Infrared Spectroscopy and Machine Learning",
    year: "2025",
    venue: "ICECIT 2025, IEEE",
    role: "Author",
    award: "Best Paper Award",
    abstract:
      "This research explores non-invasive continuous blood glucose monitoring by combining near-infrared spectroscopy concepts with machine learning. A synthetic NIR pipeline simulates glucose-related optical signals under noise and distortion, then benchmarks Random Forest, CNN, and Transformer regression models using RMSE, MAE, R², and k-fold cross-validation.",
    problem:
      "Invasive glucose monitoring limits continuous comfort and adherence. Optical non-invasive approaches face noise, physiological variation, and generalization challenges.",
    methodology: [
      "Built a synthetic NIR pipeline for glucose signal simulation",
      "Simulated noise and signal distortion conditions",
      "Developed Random Forest, CNN, and Transformer regression models",
      "Compared models for non-invasive glucose prediction accuracy",
      "Validated results using RMSE, MAE, R², and k-fold cross-validation",
    ],
    systemArchitecture: [
      "Synthetic spectral signal generation",
      "Degradation / noise modeling",
      "Feature preparation for ML regression",
      "Model family comparison and cross-validated evaluation",
    ],
    results: [
      "Demonstrated a complete simulation-to-evaluation workflow for non-invasive glucose prediction research",
      "Compared classical and deep regression approaches under controlled degradation",
      "Presented at an IEEE international conference and recognized with a Best Paper Award",
    ],
    limitations: [
      "Synthetic signal pipelines require careful translation to clinical sensor realities",
      "Dataset scale and physiological diversity remain central constraints",
    ],
    futureWork: [
      "Stronger multimodal biomedical signal fusion",
      "Expanded robustness testing under real acquisition conditions",
      "Continued model comparison and deployment-oriented evaluation",
    ],
    publicationDetails: {
      conference: "ICECIT 2025",
      publisher: "IEEE",
      authors: ["Dhanush V C"],
      year: "2025",
    },
    relatedProjectSlug: "glucose-monitoring",
    interestsOverlap: ["Healthcare AI", "Signal Processing", "Deep Learning"],
  },
];

export const researchInterests = [
  "Healthcare AI and biomedical signal processing",
  "Non-invasive sensing with machine learning",
  "Computer vision robustness under distribution shift",
  "Domain adaptation for industrial vision",
  "Applied deep learning systems",
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    skills: ["Python", "C", "C++", "Java", "SQL"],
  },
  {
    name: "AI / Machine Learning",
    skills: [
      "Machine Learning",
      "Regression",
      "Model Evaluation",
      "Data Preprocessing",
      "Feature Engineering",
      "Transfer Learning",
      "Domain Adaptation",
    ],
  },
  {
    name: "Deep Learning",
    skills: ["Neural Networks", "CNN", "Transformers", "PyTorch", "TensorFlow"],
  },
  {
    name: "Computer Vision",
    skills: ["OpenCV", "YOLO", "SSD", "OCR (Tesseract, EasyOCR)", "Image Degradation Modeling"],
  },
  {
    name: "NLP",
    skills: ["NLP", "Text Processing", "Emotion Analysis from Text"],
  },
  {
    name: "Frameworks",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "LangGraph", "Streamlit", "Flask", "Django", "FastAPI"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "MongoDB"],
  },
  {
    name: "Development",
    skills: ["REST APIs", "Android Development", "Full-Stack Fundamentals", "HTML / JavaScript"],
  },
  {
    name: "Cloud",
    skills: ["AWS", "Docker"],
  },
  {
    name: "Tools",
    skills: ["Git", "GitHub", "Pandas", "NumPy", "pdfplumber"],
  },
];

export const achievements: Achievement[] = [
  {
    id: "best-paper-ieee",
    title: "Best Paper Award – IEEE International Conference",
    category: "Research",
    event: "ICECIT 2025, IEEE",
    date: "2025",
    description:
      "Received a Best Paper Award for research on Non-Invasive Continuous Blood Glucose Monitoring Using Near-Infrared Spectroscopy and Machine Learning.",
    details: [
      "Research presentation on non-invasive blood glucose estimation using NIR spectroscopy and machine learning",
      "Conference: ICECIT 2025 (IEEE)",
    ],
    relatedResearchSlug: "nir-glucose-monitoring",
    relatedProjectSlug: "glucose-monitoring",
  },
  {
    id: "ieee-presentation",
    title: "IEEE Conference Research Presentation",
    category: "Research",
    event: "ICECIT 2025",
    date: "2025",
    description:
      "Presented research on non-invasive blood glucose estimation using NIR spectroscopy and machine learning at an IEEE international conference.",
    relatedResearchSlug: "nir-glucose-monitoring",
  },
  {
    id: "hackathon-46h",
    title: "46-Hour Intensive Hackathon",
    category: "Hackathon",
    date: "—",
    description:
      "Participated in a 46-hour intensive hackathon focused on AI-driven solutions.",
    details: ["Focus: AI-driven solutions"],
  },
  {
    id: "rbi-quiz",
    title: "RBI All India Quiz",
    category: "Competition",
    event: "RBI All India Quiz",
    date: "—",
    description: "Participated in the RBI All India Quiz.",
  },
  {
    id: "ieee-events",
    title: "IEEE Technical Events & Competitions",
    category: "Technical Event",
    date: "2025",
    description:
      "Participated in IEEE technical events and national-level technical competitions; also volunteered for IEEE technical event operations in April 2025.",
    details: [
      "IEEE technical event volunteer (Apr 2025)",
      "Coordinated participants and managed on-ground operations",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: "best-paper-cert",
    name: "Best Paper Award Certificate",
    organization: "ICECIT 2025 / IEEE",
    date: "2025",
    description:
      "Award recognition for the paper on Non-Invasive Continuous Blood Glucose Monitoring Using Near-Infrared Spectroscopy and Machine Learning.",
    relatedAchievementId: "best-paper-ieee",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "profile",
    title: "Profile",
    category: "Other",
    src: "/images/profile.jpg",
    alt: "Dhanush V C profile photo",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getResearch(slug: string) {
  return researchPapers.find((r) => r.slug === slug);
}

export function getAchievement(id: string) {
  return achievements.find((a) => a.id === id);
}

export const projectCategories = [
  "All",
  "AI/ML",
  "Computer Vision",
  "Healthcare",
  "Software Development",
  "Research",
  "Other",
] as const;
