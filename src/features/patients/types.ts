export type Patient = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  contactName: string;
  location: {
    type: string;
    coordinates: number[];
    address: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  profilePhoto: string;
  provider: string;
  accessToken: string;
  verificationCode: number;
  isVerified: boolean;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  gender?: 'male' | 'female' | 'other';
  status?: 'active' | 'inactive' | 'suspended';
};

export type PartialPatientType = Partial<Patient>;
