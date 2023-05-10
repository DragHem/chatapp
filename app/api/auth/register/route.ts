import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    //@todo Dodać walidacje
    if (!email || !name || !password) {
      return new NextResponse('Missing credentials', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    //@todo Zmienić i nie zwracać całego usera

    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e, '‼️ REGISTER');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
