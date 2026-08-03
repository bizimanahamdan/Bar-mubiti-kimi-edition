import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@barmubiti.com' },
    update: {},
    create: {
      email: 'admin@barmubiti.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  await prisma.businessInfo.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Bar Mubiti',
      tagline: "A Taste of Kigali's Grill Scene",
      description: "Nestled in the vibrant city of Kigali, Bar Mubiti is a must-visit destination for those seeking a unique blend of local flavors and lively atmosphere.",
      address: '2332+M8F, Kigali',
      phone: '0788 582 914',
      email: 'info@barmubiti.com',
      whatsapp: '0788582914',
      priceRange: 'RF 1 – 15,000',
      rating: 3.7,
      reviewCount: 111,
    },
  })

  const existingHours = await prisma.openingHour.count()
  if (existingHours === 0) {
    await prisma.openingHour.createMany({
      data: [
        { day: 'Monday', openTime: '11:00 AM', closeTime: '12:00 AM', isOpen: true, order: 1 },
        { day: 'Tuesday', openTime: '11:00 AM', closeTime: '12:00 AM', isOpen: true, order: 2 },
        { day: 'Wednesday', openTime: '11:00 AM', closeTime: '12:00 AM', isOpen: true, order: 3 },
        { day: 'Thursday', openTime: '11:00 AM', closeTime: '12:00 AM', isOpen: true, order: 4 },
        { day: 'Friday', openTime: '11:00 AM', closeTime: '2:00 AM', isOpen: true, order: 5 },
        { day: 'Saturday', openTime: '11:00 AM', closeTime: '2:00 AM', isOpen: true, order: 6 },
        { day: 'Sunday', openTime: '12:00 PM', closeTime: '11:00 PM', isOpen: true, order: 7 },
      ],
    })
  }

  const existingCats = await prisma.menuCategory.count()
  if (existingCats === 0) {
    const cats = await prisma.menuCategory.createMany({
      data: [
        { name: 'Starters', slug: 'starters', order: 1 },
        { name: 'Grill Specials', slug: 'grill-specials', order: 2 },
        { name: 'Main Course', slug: 'main-course', order: 3 },
        { name: 'Sides', slug: 'sides', order: 4 },
        { name: 'Drinks', slug: 'drinks', order: 5 },
        { name: 'Desserts', slug: 'desserts', order: 6 },
      ],
    })

    const grillCat = await prisma.menuCategory.findUnique({ where: { slug: 'grill-specials' } })
    if (grillCat) {
      await prisma.menuItem.createMany({
        data: [
          { name: 'Grilled Beef Skewers', description: 'Tender beef marinated in Rwandan spices, grilled to perfection', price: 8000, categoryId: grillCat.id, isAvailable: true },
          { name: 'BBQ Chicken Wings', description: 'Crispy wings glazed with house BBQ sauce', price: 6000, categoryId: grillCat.id, isAvailable: true },
          { name: 'Grilled Tilapia', description: 'Fresh lake tilapia with lemon butter sauce', price: 12000, categoryId: grillCat.id, isAvailable: true },
          { name: 'Mixed Grill Platter', description: 'A generous selection of beef, chicken, and lamb', price: 15000, categoryId: grillCat.id, isAvailable: true, isSpecial: true },
        ],
      })
    }

    const drinksCat = await prisma.menuCategory.findUnique({ where: { slug: 'drinks' } })
    if (drinksCat) {
      await prisma.menuItem.createMany({
        data: [
          { name: 'Primus Beer', description: 'Rwanda\'s favorite lager', price: 1500, categoryId: drinksCat.id, isAvailable: true },
          { name: 'Mutzig', description: 'Premium Rwandan beer', price: 2000, categoryId: drinksCat.id, isAvailable: true },
          { name: 'House Cocktail', description: 'Signature mix of local spirits and fresh fruit', price: 5000, categoryId: drinksCat.id, isAvailable: true, isSpecial: true },
          { name: 'Fresh Passion Juice', description: 'Freshly squeezed passion fruit', price: 2000, categoryId: drinksCat.id, isAvailable: true },
        ],
      })
    }
  }

  const existingReviews = await prisma.review.count()
  if (existingReviews === 0) {
    await prisma.review.createMany({
      data: [
        { name: 'Jean Pierre N.', rating: 5, text: 'Best grill in Kigali! The atmosphere is electric and the food is incredible.', source: 'google' },
        { name: 'Amina K.', rating: 4, text: 'Great vibes and good service. The mixed grill platter is a must-try.', source: 'google' },
        { name: 'David M.', rating: 4, text: 'Lively place with amazing grilled meat. Perfect for weekend evenings.', source: 'google' },
        { name: 'Claire T.', rating: 3, text: 'Good food but can get very busy. Make a reservation on weekends.', source: 'google' },
      ],
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
