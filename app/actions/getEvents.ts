import getSession from '@/app/actions/getSession';
import prisma from '@/app/libs/prismadb';
const getEvents = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    return prisma.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (e: any) {
    return [];
  }
};

export default getEvents;
