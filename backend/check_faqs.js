const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const faqs = await prisma.faq.findMany()
  console.log('FAQs count in DB:', faqs.length)
  console.log('FAQs:', JSON.stringify(faqs, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
