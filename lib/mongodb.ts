import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB Atlas Connected');
}
