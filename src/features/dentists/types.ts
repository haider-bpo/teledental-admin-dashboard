export type Dentist = {
  _id: string;
  firstName: string;
  lastName: string;
  location: {
    type: string;
    coordinates: number[];
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  businessName: string;
  email: string;
  password: string;
  profilePhoto: string;
  contactNumber: string;
  contactName: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
  provider: string;
  accessToken: string;
  verificationCode: number;
  codeExpiryTime: Date;
  isApproved: boolean;
  isVerified: boolean;
  role: 'admin' | 'user';
  specialities: string[];
  education: {
    degree: string;
    yearCompleted: string;
    schoolName: string;
    schoolLocation: string;
    certificate: string;
  }[];
  awards: string[];
  insurances: string[];
  business: {
    officeHours: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
    name: string;
    address: string;
    webAddress: string;
    picture: string;
  };
  experience: {
    role: string;
    employerName: string;
    location: {
      type: 'Point';
      coordinates: number[];
    };
    from: Date;
    to: Date;
    currentlyWorking: boolean;
    certificate: string;
  }[];
  personalStatement: {
    languages: {
      language: string;
      proficiencyLevel: string;
    }[];
    description: string;
  };
  isDirectOnboarded: boolean;
  directOnboardingDetails: {
    dentalDegree: string;
    npi: string;
    licenses: {
      state: string;
      licenseNumber: string;
      isVerified: boolean;
    }[];
    licenseStatus: 'yes' | 'no';
    lawsuits: 'yes' | 'no';
    lawsuitsExplanation: string;
    specialty: string;
    specialtyDescription: string;
    additionalNotes: string;
    agreeToTerms: boolean;
  };
  status: 'active' | 'inactive' | 'suspended';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
