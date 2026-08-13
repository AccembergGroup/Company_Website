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
        description:
          'An enterprise-grade AI-powered operations platform for large-scale organisations. Agnishakti unifies workflow automation, real-time analytics, and multi-tenant access control into a single, cohesive system built for scale.',
        features: [
          'Multi-tenant SaaS architecture',
          'Real-time operational analytics',
          'AI-assisted workflow automation',
          'Role-based access control (RBAC)',
          'Enterprise SSO / SAML integration',
          '99.9% uptime SLA',
        ],
        ctaLink: 'https://agnishakti.accemberg.com',
        badge: 'Flagship',
      },
      {
        name: 'FormForge',
        description:
          'A niche rapid-launch tool that turns any data schema into production-ready, validated forms in minutes. Designed for founders and internal teams who need forms without the boilerplate.',
        features: [
          'Schema-to-form generation',
          'Built-in validation engine',
          'Webhook and Zapier integration',
          'Embeddable on any website',
          'Free tier available',
        ],
        ctaLink: null,
        badge: 'Beta',
      },
      {
        name: 'PulseBoard',
        description:
          'A lightweight SaaS status-page and uptime monitoring tool targeted at small engineering teams. Spin up a public or private status page in under five minutes.',
        features: [
          'HTTP / TCP / ICMP health checks',
          'Customisable status page',
          'Slack + email alerts',
          'Incident timeline management',
          'Response-time graphs',
        ],
        ctaLink: null,
        badge: 'Coming Soon',
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
      {
        name: 'Nexus Dynamics',
        logoUrl: 'https://ui-avatars.com/api/?name=Nexus+Dynamics&background=0D8ABC&color=fff&size=128&bold=true',
        website: 'https://nexusdynamics.example.com',
        isVerified: true,
      },
      {
        name: 'FinEdge Solutions',
        logoUrl: 'https://ui-avatars.com/api/?name=FinEdge&background=6C3483&color=fff&size=128&bold=true',
        website: 'https://finedge.example.com',
        isVerified: true,
      },
      {
        name: 'CloudAxis',
        logoUrl: 'https://ui-avatars.com/api/?name=CloudAxis&background=1ABC9C&color=fff&size=128&bold=true',
        website: 'https://cloudaxis.example.com',
        isVerified: true,
      },
      {
        name: 'Meridian Labs',
        logoUrl: 'https://ui-avatars.com/api/?name=Meridian+Labs&background=F39C12&color=fff&size=128&bold=true',
        website: 'https://meridianlabs.example.com',
        isVerified: true,
      },
    ],
  });
  console.log('✅ Seeded Partners (5 records — 1 real [IIT Kottayam], 4 dummy).');

  // ── 5. Seed Testimonials ─────────────────────────────────────────────────────
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Connor',
        role: 'CTO',
        company: 'Cyberdyne Systems',
        review:
          'Accemberg delivered our system integration ahead of schedule. Uncompromising code quality and a team that actually communicates.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
        isFeatured: true,
        sortOrder: 1,
        isActive: true,
        createdAt: new Date('2026-06-01T10:00:00Z'),
      },
      {
        name: 'John Doe',
        role: 'VP of Engineering',
        company: 'Stark Industries',
        review:
          'The UI animations are silky smooth and the underlying architecture is solid. Highly recommended for any serious tech project.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
        isFeatured: true,
        sortOrder: 2,
        isActive: true,
        createdAt: new Date('2026-06-15T12:00:00Z'),
      },
      {
        name: 'Priya Mehta',
        role: 'Head of Digital',
        company: 'FinEdge Solutions',
        review:
          'Our SaaS dashboard was delivered in record time — pixel-perfect and fully accessible. The Accemberg team was responsive throughout.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        isFeatured: true,
        sortOrder: 3,
        isActive: true,
        createdAt: new Date('2026-06-20T09:00:00Z'),
      },
      {
        name: 'Bruce Wayne',
        role: 'Founder',
        company: 'Wayne Enterprises',
        review:
          'Exceptional client experience and enterprise-ready security compliance. Would engage again without hesitation.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        isFeatured: false,
        sortOrder: 4,
        isActive: true,
        createdAt: new Date('2026-06-25T11:00:00Z'),
      },
      {
        name: 'Arjun Kapoor',
        role: 'Product Manager',
        company: 'Nexus Dynamics',
        review:
          "Accemberg's rapid SaaS factory concept is exactly what early-stage startups need. They shipped our MVP in 5 weeks — battle-tested.",
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        isFeatured: false,
        sortOrder: 5,
        isActive: true,
        createdAt: new Date('2026-07-01T08:00:00Z'),
      },
      {
        // Inactive draft — should be filtered out by public API
        name: 'Alice Smith',
        role: 'Director of Product',
        company: 'Oscorp',
        review: 'This draft testimonial should not be visible because it is set to inactive.',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
        isFeatured: false,
        sortOrder: 99,
        isActive: false,
        createdAt: new Date('2026-07-05T08:00:00Z'),
      },
    ],
  });
  console.log('✅ Seeded Testimonials (5 active + 1 inactive draft).');

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
  console.log('   Partners:     5 (4 verified, 1 unverified)');
  console.log('   Testimonials: 5 active + 1 inactive draft');
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
