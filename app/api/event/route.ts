import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, description, lat, long } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newEvent = await prisma.event.create({
      data: {
        name: name,
        description: description,
        lat: lat,
        long: long,
        creator: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(newEvent);
  } catch (e: any) {
    console.log(e, 'ERROR_SETTINGS');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
