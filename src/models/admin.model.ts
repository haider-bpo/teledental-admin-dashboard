import { makeHashValue } from '@/utils/crypto';
import { model, models, Schema } from 'mongoose';

const AdminSchema = new Schema(
  {
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

AdminSchema.methods.verifyPassword = function (pwd: string) {
  return this.password == makeHashValue(pwd);
};

const AdminModel = models.Admins || model('Admins', AdminSchema);

export default AdminModel;
