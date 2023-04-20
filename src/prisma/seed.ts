import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  // CREATE ROLES

  const admin = await prisma.role.upsert({
    create: {
      name: 'Admin',
    },
    where: { name: 'Admin' },
    update: {},
  });

  // CREATE CLAIMS

  await prisma.claim.upsert({
    create: {
      name: 'read-role',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'read-role' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'create-role',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'create-role' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'update-role',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'update-role' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'update-role',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'update-role' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'delete-role',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'delete-role' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'read-claim',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'read-claim' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'read-user',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'read-user' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'create-user',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'create-user' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'update-user',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'update-user' },
    update: {},
  });

  await prisma.claim.upsert({
    create: {
      name: 'delete-user',
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { name: 'delete-user' },
    update: {},
  });

  // CREATE USER

  const pwd = await bcrypt.hash('12345678', 14);

  await prisma.user.upsert({
    create: {
      email: 'olucas16@gmail.com',
      password: pwd,
      recoverToken: crypto.randomBytes(32).toString('hex'),
      roles: {
        connect: {
          id: admin.id,
        },
      },
    },
    where: { email: 'olucas16@gmail.com' },
    update: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
