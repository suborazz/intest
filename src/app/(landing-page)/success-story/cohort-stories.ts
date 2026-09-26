export interface BuiltinCohortStory {
  id: string;
  slug: string;
  title: string;
  category: string;
  serialNo?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
  authorName: string;
  authorRole: string;
  authorEmail?: string;
  imageUrl: string;
  images?: string[];
  readTime: string;
  excerpt: string;
  summary: string;
  content: string;
  internshipDetails?: {
    location: string;
    participantsCount: number;
    duration: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

export const BUILTIN_COHORT_STORIES: BuiltinCohortStory[] = [
  {
    id: "cohort-spring-2026",
    slug: "iiinternship-spring-2026-cohort",
    title: "IIInternship Spring 2026 Flagship Cohort: Accelerating Global Careers",
    category: "Technology",
    serialNo: "COHORT-2026-01",
    date: "March 2026",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    location: "Global Hybrid / Lucknow Center",
    authorName: "Placement Cell & Academic Board",
    authorRole: "Program Director",
    authorEmail: "placement@iiinternship.com",
    imageUrl: "/images/hero-success-stories.jpg",
    images: [
      "/images/hero-success-stories.jpg",
      "/images/hero-running-internship.jpg",
      "/images/hero-immersion.jpg"
    ],
    readTime: "6 min read",
    excerpt:
      "Over 450+ student interns graduated from our flagship Spring 2026 cohort with direct industry project implementations and recognized credits.",
    summary:
      "Over 450+ student interns graduated from our flagship Spring 2026 cohort with direct industry project implementations and recognized credits.",
    content: `<p>The <strong>International Institute of Internship [i3]</strong> successfully concluded its Spring 2026 Flagship Cohort, marking an extraordinary milestone in hands-on industry training and experiential education. Over 450+ undergraduate and postgraduate scholars from engineering, management, and research disciplines participated in comprehensive project tracks.</p>
<p>Each cohort participant engaged in real-world software architecture, cloud deployments, full-stack microservices, and AI workflow integration guided by senior industry mentors.</p>
[INTERNSHIP_OVERVIEW]
<h3>Key Achievements and Real-World Impact</h3>
<p>During the 8-week intensive track, interns built production-grade web applications, automated DevOps delivery pipelines, and contributed to open research datasets aligned with UGC NEP-2020 experiential learning mandates.</p>
<ul>
  <li><strong>100% Verifiable Credentials:</strong> All graduates received ISO 21001:2018 certified digital completion certificates with secure verification IDs.</li>
  <li><strong>Direct Industry Mentorship:</strong> 1-on-1 sprint reviews and code audits conducted weekly by senior architects.</li>
  <li><strong>Placement Transitions:</strong> More than 80% of eligible participants secured internship-to-job pre-placement interview opportunities.</li>
</ul>
<p>Congratulations to all our graduates for their dedication and outstanding technical achievements!</p>`,
    internshipDetails: {
      location: "Hybrid (Online + Lucknow Placement Cell)",
      participantsCount: 450,
      duration: "8 Weeks",
      startDate: "Jan 15, 2026",
      endDate: "Mar 10, 2026",
      status: "COMPLETED",
    },
  },
  {
    id: "cohort-ai-ml-2026",
    slug: "ai-data-science-national-cohort",
    title: "National AI & Data Science Cohort: Transforming Academic Projects into Live Products",
    category: "Technology",
    serialNo: "COHORT-2026-02",
    date: "February 2026",
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z",
    location: "Online / Virtual Lab",
    authorName: "Dr. R. K. Verma",
    authorRole: "Chief Research Mentor",
    authorEmail: "research@iiinternship.com",
    imageUrl: "/images/on-campus-hero.jpg",
    images: [
      "/images/on-campus-hero.jpg",
      "/images/immersion-hero.jpg"
    ],
    readTime: "5 min read",
    excerpt:
      "A deep dive into how 320+ interns developed machine learning pipelines, predictive analytics models, and automated data pipelines.",
    summary:
      "A deep dive into how 320+ interns developed machine learning pipelines, predictive analytics models, and automated data pipelines.",
    content: `<p>The National Artificial Intelligence and Machine Learning Cohort focused on real-world dataset analytics, deep learning neural networks, and scalable deployment using Docker and cloud endpoints.</p>
<p>Interns were challenged to solve data synchronization bottlenecks, build computer vision inspection utilities, and fine-tune open weights LLMs for domain-specific knowledge bases.</p>
[INTERNSHIP_OVERVIEW]
<h3>Hands-On Laboratory Highlights</h3>
<p>Participants developed automated data processing pipelines capable of processing millions of records with high concurrency.</p>
<ul>
  <li><strong>Practical Neural Network Training:</strong> PyTorch & TensorFlow pipelines for automated defect identification.</li>
  <li><strong>Cloud-Native Deployment:</strong> Containerized REST APIs deployed with monitoring and automated health checks.</li>
  <li><strong>Capstone Evaluation:</strong> Evaluated by an independent jury of academic leaders and industry data scientists.</li>
</ul>`,
    internshipDetails: {
      location: "Virtual Cloud Labs",
      participantsCount: 320,
      duration: "6 Weeks",
      startDate: "Jan 05, 2026",
      endDate: "Feb 18, 2026",
      status: "COMPLETED",
    },
  },
  {
    id: "cohort-cloud-cyber-2026",
    slug: "cyber-security-cloud-cohort",
    title: "Cyber Security & Cloud Infrastructure Cohort: Hands-On Threat Modeling",
    category: "Career",
    serialNo: "COHORT-2026-03",
    date: "January 2026",
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z",
    location: "Hybrid Training Centers",
    authorName: "Amit Kumar",
    authorRole: "Senior Security Specialist",
    authorEmail: "cybersec@iiinternship.com",
    imageUrl: "/images/immersion-hero.jpg",
    images: [
      "/images/hero-immersion.jpg",
      "/images/hero-virtual-internship.jpg"
    ],
    readTime: "7 min read",
    excerpt:
      "280+ aspiring security engineers conducted network vulnerability assessments, ethical penetration tests, and secure cloud provisioning.",
    summary:
      "280+ aspiring security engineers conducted network vulnerability assessments, ethical penetration tests, and secure cloud provisioning.",
    content: `<p>Cloud security and proactive defense are core pillars of modern enterprise resilience. In this intensive winter cohort, participants configured multi-tier AWS environments, isolated VPC networks, and enforced zero-trust access controls.</p>
[INTERNSHIP_OVERVIEW]
<h3>Curriculum & Project Deliverables</h3>
<p>Interns performed active penetration testing drills in controlled sandbox lab environments.</p>
<ul>
  <li><strong>Penetration Testing:</strong> Real-world OWASP Top 10 web vulnerabilities discovery and mitigation.</li>
  <li><strong>SIEM & Log Monitoring:</strong> Log aggregation and automated alerting rule generation.</li>
  <li><strong>Compliance Standards:</strong> Auditing cloud configurations against ISO/IEC 27001 baseline standards.</li>
</ul>`,
    internshipDetails: {
      location: "Hybrid (Delhi, Lucknow, Bengaluru)",
      participantsCount: 280,
      duration: "8 Weeks",
      startDate: "Nov 20, 2025",
      endDate: "Jan 15, 2026",
      status: "COMPLETED",
    },
  },
  {
    id: "cohort-global-immersion-2026",
    slug: "global-immersion-tech-cohort",
    title: "Global Industry Immersion: Bridging the Gap Between Academia and Enterprise",
    category: "Immersion",
    serialNo: "COHORT-2026-04",
    date: "December 2025",
    createdAt: "2025-12-28T10:00:00.000Z",
    updatedAt: "2025-12-28T10:00:00.000Z",
    location: "BCC Greens, Deva Road & Online",
    authorName: "Academic Dean & Immersion Directorate",
    authorRole: "Immersion Lead",
    authorEmail: "immersion@iiinternship.com",
    imageUrl: "/images/donation-hero.jpg",
    images: [
      "/images/donation-hero.jpg",
      "/images/on-campus-hero.jpg"
    ],
    readTime: "5 min read",
    excerpt:
      "Immersive enterprise exposure program linking students across 50+ universities to live corporate workflow immersion cohorts.",
    summary:
      "Immersive enterprise exposure program linking students across 50+ universities to live corporate workflow immersion cohorts.",
    content: `<p>The Global Industry Immersion cohort provided immersive experiential exposure to cross-functional industry workflows. Interns worked alongside senior tech leads, participating in daily standups, code reviews, and stakeholder presentations.</p>
[INTERNSHIP_OVERVIEW]
<h3>Immersion Highlights</h3>
<ul>
  <li><strong>Live Sprint Cadence:</strong> Agile Kanban boards, weekly demos, and stakeholder reviews.</li>
  <li><strong>Cross-Disciplinary Teamwork:</strong> Engineers collaborating with designers and domain analysts.</li>
  <li><strong>Verified Certificates:</strong> Verifiable digital completion records linked to student registration IDs.</li>
</ul>`,
    internshipDetails: {
      location: "Corporate Hub & Remote",
      participantsCount: 380,
      duration: "6 Weeks",
      startDate: "Nov 01, 2025",
      endDate: "Dec 15, 2025",
      status: "COMPLETED",
    },
  },
];

export function getMergedBlogs(apiBlogs: any[]): any[] {
  if (!apiBlogs || apiBlogs.length === 0) {
    return BUILTIN_COHORT_STORIES;
  }

  const existingIds = new Set(apiBlogs.map((b) => b.id?.toLowerCase()));
  const existingSlugs = new Set(
    apiBlogs.map((b) =>
      (
        (b.slug && b.slug.trim()) ||
        (b.serialNo && b.serialNo.trim()) ||
        b.title ||
        ""
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    ),
  );

  const fallbackItems = BUILTIN_COHORT_STORIES.filter(
    (b) => !existingIds.has(b.id?.toLowerCase()) && !existingSlugs.has(b.slug?.toLowerCase()),
  );

  return [...apiBlogs, ...fallbackItems];
}
