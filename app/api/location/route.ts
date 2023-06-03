import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { lat, long } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        lat: lat,
        long: long,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (e: any) {
    console.log(e, 'ERROR_SETTINGS');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
