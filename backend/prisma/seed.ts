// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const products = [
//     {
//       title: 'Fjallraven - Foldsack No. 1 Backpack',
//       price: 109.95,
//       description: 'Your perfect pack for everyday use...',
//       category: "men's clothing",
//       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//       ratingRate: 3.9,
//       ratingCount: 120,
//     },
//     {
//       title: 'Mens Casual Premium Slim Fit T-Shirts',
//       price: 22.3,
//       description: 'Slim-fitting style...',
//       category: "men's clothing",
//       image:
//         'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
//       ratingRate: 4.1,
//       ratingCount: 259,
//     },
//   ];

//   for (const product of products) {
//     await prisma.product.create({
//       data: product,
//     });
//   }

//   console.log('Products seeded successfully.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
