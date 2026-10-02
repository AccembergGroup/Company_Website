'use strict';

require('dotenv').config({ override: true });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ── 1. Clean existing records ────────────────────────────────────────────────
  await prisma.testimonial.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.partner.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.product.deleteMany({});
  console.log('🧹 Cleaned existing records (testimonials, FAQs, partners, services, products).');

  // ── 2. Seed Services ─────────────────────────────────────────────────────────
  await prisma.service.createMany({
    data: [
      {
        title: 'Full-Stack Development',
        description:
          'End-to-end web and mobile application development. We architect, build, and ship production-ready products using modern frameworks — React, Next.js, Node.js, and beyond.',
        icon: 'code-2',
        order: 1,
      },
      {
        title: 'System Architecture & Integrations',
        description:
          'Designing scalable, fault-tolerant backend systems and third-party integrations. From microservices to event-driven architectures, we build systems that grow with your business.',
        icon: 'network',
        order: 2,
      },
      {
        title: 'Rapid SaaS Builds',
        description:
          'Go from idea to a revenue-generating MVP in 4–6 weeks. Our Rapid SaaS Factory is optimised for speed, market validation, and iteration — without sacrificing quality.',
        icon: 'rocket',
        order: 3,
      },
      {
        title: 'Technical Consulting',
        description:
          'Stuck on an architecture decision or scaling bottleneck? Our senior engineers provide technology audits, stack recommendations, and hands-on strategic guidance.',
        icon: 'lightbulb',
        order: 4,
      },
      {
        title: 'QA, Deployment & DevOps',
        description:
          'Automated testing pipelines, CI/CD workflows, cloud deployments (AWS, GCP, Vercel), and infrastructure-as-code. We handle the entire release cycle so your team stays focused.',
        icon: 'shield-check',
        order: 5,
      },
      {
        title: 'Post-Launch Maintenance',
        description:
          'Ongoing SLA-backed support covering security patches, dependency upgrades, performance monitoring, and 24/7 incident response for critical enterprise systems.',
        icon: 'wrench',
        order: 6,
      },
    ],
  });
  console.log('✅ Seeded Services (6 records).');

  // ── 3. Seed Products ─────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [
      {
        name: 'Agnishakti',
        description: 'A next-generation emergency response and hazard prediction platform leveraging real-time data streams to proactively mitigate disaster risks.',
        features: ['Python', 'React', 'Machine Learning', 'Data Engineering'],
        ctaLink: null,
        badge: 'Flagship',
      },
      {
        name: 'Niramaya',
        description: 'A comprehensive healthcare management system streamlining patient records and enabling predictive health analytics for medical institutions.',
        features: ['Next.js', 'Node.js', 'MongoDB', 'Express'],
        ctaLink: null,
        badge: 'Active Track',
      },
      {
        name: 'VaakSetu',
        description: 'Real-time multilingual speech-to-text platform designed to break language barriers and facilitate seamless cross-regional enterprise communications.',
        features: ['Python', 'NLP', 'React', 'WebSockets'],
        ctaLink: null,
        badge: 'New',
      },
    ],
  });
  console.log('✅ Seeded Products (3 records).');

  // ── 4. Seed Partners ─────────────────────────────────────────────────────────
  await prisma.partner.createMany({
    data: [
      {
        name: 'IIT Kottayam',
        logoUrl: '/partners/iit-kottayam.png',
        website: 'https://iitkottayam.ac.in',
        isVerified: true,
      },
    ],
  });
  console.log('✅ Seeded Partners (1 record — IIT Kottayam).');

  // ── 5. Seed Testimonials ─────────────────────────────────────────────────────
  // No real client testimonials yet. Add real ones here as they come in — do not
  // seed placeholder/fictional names (this table previously shipped with entries
  // like "Sarah Connor / Cyberdyne Systems" and "Bruce Wayne / Wayne Enterprises",
  // which is exactly the kind of fabricated content that shouldn't reach a live site).
  await prisma.testimonial.createMany({
    data: [],
  });
  console.log('✅ Seeded Testimonials (0 — none real yet, add as they come in).');

  // ── 6. Seed FAQs ─────────────────────────────────────────────────────────────
  await prisma.faq.createMany({
    data: [
      {
        question: 'What is Accemberg?',
        answer:
          'Accemberg is a hybrid venture studio that eliminates the trade-off between building scalable SaaS products and generating consistent revenue — simultaneously. We run three engines: a Client Services arm, a Rapid SaaS Factory, and a Flagship Product Lab.',
        order: 1,
        isActive: true,
      },
      {
        question: 'What services does Accemberg offer?',
        answer:
          'We offer full-stack development, system architecture and integrations, rapid SaaS builds, technical consulting, QA and DevOps, and post-launch maintenance. See our Services page for detailed breakdowns.',
        order: 2,
        isActive: true,
      },
      {
        question: 'What is your typical project timeline?',
        answer:
          'For rapid SaaS builds, we typically deliver a production-ready MVP in 4 to 6 weeks. Larger enterprise platforms and database migrations range from 3 to 6 months depending on scope and regulatory compliance.',
        order: 3,
        isActive: true,
      },
      {
        question: 'Which engagement models do you support?',
        answer:
          'We support both Time & Materials (sprint-based engineering pods) and Fixed-Scope contracts. Most clients begin with a brief Discovery phase to align on specifications before selecting an engagement model.',
        order: 4,
        isActive: true,
      },
      {
        question: 'How do you ensure code quality and performance?',
        answer:
          'We run multi-stage QA gates at every sprint, enforce peer code reviews, maintain a documentation-first culture, and monitor production systems with real-time observability tooling. Performance targets (e.g., 60 fps UI, sub-200 ms API p95) are contractually defined.',
        order: 5,
        isActive: true,
      },
      {
        question: 'Do you offer custom SLA agreements?',
        answer:
          'Yes. We provide flexible post-launch SLAs ranging from routine security updates and dependency upgrades to 24/7 active infrastructure monitoring and hot-fix response for enterprise clients.',
        order: 6,
        isActive: true,
      },
      {
        question: 'How do I book a discovery call?',
        answer:
          'Click the "Book a Call" button anywhere on the site, fill in your details, and our team will reach out within one business day to confirm a slot that works for you.',
        order: 7,
        isActive: true,
      },
      {
        question: 'What is the Rapid SaaS Factory?',
        answer:
          'The Rapid SaaS Factory is our internal production engine designed for speed, experimentation, and market validation. We target narrow, underserved problems and launch MVPs quickly — then iterate aggressively on traction signals.',
        order: 8,
        isActive: true,
      },
      {
        // Inactive draft — filtered out by public API
        question: 'This FAQ should not show up.',
        answer: 'This is an inactive FAQ used for testing the isActive filter in the API.',
        order: 99,
        isActive: false,
      },
    ],
  });
  console.log('✅ Seeded FAQs (8 active + 1 inactive draft).');

  console.log('\n🌱 Database seeding completed successfully!');
  console.log('   Services:     6');
  console.log('   Products:     3');
  console.log('   Partners:     1 (IIT Kottayam)');
  console.log('   Testimonials: 0 (add real ones as they come in)');
  console.log('   FAQs:         8 active + 1 inactive draft');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
