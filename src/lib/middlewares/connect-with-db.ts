import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../connectDB';
import { NextHandler } from 'next-connect';

// Database connection middleware
const connectWithDB = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  try {
    // Establish the database connection
    await connectDB();
    console.log('Database connected before route handler');

    // Proceed to the next middleware or route handler
    return next();
  } catch (error: any) {
    // If the connection fails, handle the error and return a response
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      details: error.message,
    });
  }
};

export default connectWithDB;
