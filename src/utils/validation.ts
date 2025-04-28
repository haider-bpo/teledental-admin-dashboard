import mongoose from 'mongoose';

export function isEmptyBody(body: any): boolean {
  return !body || Object.keys(body).length === 0;
}

export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
