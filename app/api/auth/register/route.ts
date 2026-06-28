import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return Response.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({ success: false, message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }
}
