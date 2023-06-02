import prisma from '@/app/libs/prismadb';
import getSession from '@/app/actions/getSession';

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session?.user?.email,
        },
      },
    });
  } catch (e: any) {
    return [];
  }
};

export default getUsers;
