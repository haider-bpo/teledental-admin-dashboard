import React from 'react';
import { PatientsTable } from '../../../features/patients/components/patients-table';

function Patients() {
  return (
    <div className="container mx-auto max-w-[100%] space-y-6 p-4 md:max-w-[95%] md:p-6">
      <div className="bg-card rounded-xl border">
        <div className="p-4 md:p-6">
          <PatientsTable />
        </div>
      </div>
    </div>
  );
}

export default Patients;
