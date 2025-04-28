import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Dentist } from '../types';
import { useUpdateDentist } from '../hooks/use-update-dentist';
import { Loader2 } from 'lucide-react';

function ApprovalStatusCell({ dentist }: { dentist: Dentist }) {
  const { mutate: updateDentist, isPending } = useUpdateDentist();

  const handleApprovalChange = (value: string) => {
    console.log('_id value: ', dentist._id);
    updateDentist({
      id: dentist._id,
      updatedData: { isApproved: value === 'true' },
    });
  };

  return (
    <Select
      value={dentist.isApproved ? 'true' : 'false'}
      onValueChange={handleApprovalChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : dentist.isApproved ? (
            <Badge variant="default">Approved</Badge>
          ) : (
            <Badge variant="secondary">Pending</Badge>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'true'}>
          <Badge variant="default">Approved</Badge>
        </SelectItem>
        <SelectItem value="false">
          <Badge variant="secondary">Pending</Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ApprovalStatusCell;
