export type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    contactName: string;
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    gender: 'male' | 'female' | 'other';
    status: 'active' | 'inactive' | 'suspended';
    isVerified: boolean;
    medicalHistory: string[];
    allergies: string[];
    currentMedications: string[];
  };
  