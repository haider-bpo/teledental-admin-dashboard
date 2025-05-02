import ApiError from '@/lib/api-error';
import AdminModel from '@/models/admin.model';

export class AuthService {
  static async signinAdmin(email: string, password: string) {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      throw new ApiError('Admin not found', 404);
    }

    const isPasswordValid = admin.verifyPassword(password);

    if (!isPasswordValid) {
      throw new ApiError('Invalid password', 401);
    }

    return admin;
  }
}

export default AuthService;
