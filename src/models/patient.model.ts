import { model, Schema, models } from 'mongoose';

const PatientSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [
        {
          type: Number,
        },
      ],
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    email: { type: String, trim: true, unique: true },
    contactNumber: { type: String, default: '' },
    contactName: { type: String, default: '' },
    password: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    provider: {
      type: String,
      default: '',
    },
    accessToken: {
      type: String,
      default: '',
    },
    verificationCode: {
      type: Number,
      default: 0,
    },
    codeExpiryTime: { type: Date },
    isVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    medicalHistory: [{ type: String, trim: true }],
    allergies: [{ type: String, trim: true }],
    currentMedications: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Check if the model exists before creating it
const PatientModel = models.Patients || model('Patients', PatientSchema);

export default PatientModel;
