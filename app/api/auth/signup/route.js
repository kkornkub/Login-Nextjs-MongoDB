import bcrypt from 'bcryptjs';
import connectMongo from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    await connectMongo();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
}
