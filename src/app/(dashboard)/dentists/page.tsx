import React from 'react';
import { DentistsTable } from '../../../features/dentists/components/dentists-table';

function Dentists() {
  return (
    <div className="container mx-auto max-w-[100%] space-y-6 p-4 md:max-w-[95%] md:p-6">
      <div className="bg-card rounded-xl border">
        <div className="p-4 md:p-6">
          <DentistsTable />
        </div>
      </div>
    </div>
  );
}

export default Dentists;
