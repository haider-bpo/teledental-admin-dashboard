export type Dentist = {
  _id: string;
  firstName: string;
  lastName: string;
  businessName: string;
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
  dob: Date;
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
    goodStanding: 'yes' | 'no';
    boardActions: 'yes' | 'no';
    boardActionsExplanation: string;
    specialty: string;
    specialtyDescription: string;
    additionalNotes: string;
  };
  status: 'active' | 'inactive' | 'suspended';
};
