import { model, models, Schema } from 'mongoose';

const DentistSchema = new Schema(
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
    businessName: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    contactNumber: { type: String, default: '' },
    contactName: { type: String, default: '' },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dob: {
      type: Date,
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
    isApproved: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    specialities: [
      {
        type: String,
        default: '',
      },
    ],
    education: [
      {
        degree: {
          type: String,
          default: '',
        },
        yearCompleted: {
          type: String,
          default: '',
        },
        schoolName: {
          type: String,
          default: '',
        },
        schoolLocation: {
          type: String,
          default: '',
        },
        certificate: {
          type: String,
          default: '',
        },
      },
    ],
    awards: [
      {
        type: String,
        default: '',
      },
    ],
    insurances: [
      {
        type: String,
        default: '',
      },
    ],
    business: {
      officeHours: [
        {
          day: {
            type: String,
            default: '',
          },
          startTime: {
            type: String,
            default: '',
          },
          endTime: {
            type: String,
            default: '',
          },
        },
      ],
      name: { type: String, default: '' },
      address: { type: String, default: '' },
      webAddress: { type: String, default: '' },
      picture: {
        type: String,
        default: '',
      },
    },
    experience: [
      {
        role: {
          type: String,
          default: '',
        },
        employerName: {
          type: String,
          default: '',
        },
        location: {
          type: {
            type: String,
            enum: ['Point'],
            required: true,
          },
          coordinates: {
            type: [Number],
            required: true,
          },
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        certificate: {
          type: String,
          default: '',
        },
      },
    ],
    personalStatement: {
      languages: [
        {
          language: {
            type: String,
            default: '',
          },
          proficiencyLevel: {
            type: String,
            default: '',
          },
        },
      ],
      description: {
        type: String,
        default: '',
      },
    },
    isDirectOnboarded: {
      type: Boolean,
      default: false,
    },
    directOnboardingDetails: {
      dentalDegree: {
        type: String,
        default: '',
      },
      npi: {
        type: String,
        default: '',
      },
      licenses: [
        {
          state: {
            type: String,
            default: '',
          },
          licenseNumber: {
            type: String,
            default: '',
          },
          isVerified: {
            type: Boolean,
            default: false,
          },
        },
      ],
      goodStanding: {
        type: String,
        enum: ['yes', 'no'],
        default: '',
      },
      boardActions: {
        type: String,
        enum: ['yes', 'no'],
        default: '',
      },
      boardActionsExplanation: {
        type: String,
        default: '',
      },
      specialty: {
        type: String,
        default: '',
      },
      specialtyDescription: {
        type: String,
        default: '',
      },
      additionalNotes: {
        type: String,
        default: '',
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'inactive',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const DentistModel = models.Dentists || model('Dentists', DentistSchema);

export default DentistModel;
