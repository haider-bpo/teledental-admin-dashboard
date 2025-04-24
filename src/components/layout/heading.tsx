import { Button } from '../ui/button';

interface HeadingProps {
  title: string;
  description?: string;
  actionButtonLabel?: string;
  actionButtonHandler?: () => void;
  className?: string;
}

export function Heading({
  title,
  description,
  actionButtonLabel = '',
  actionButtonHandler = () => {
    console.log('actionButtonHandler called');
  },
  className = '',
}: HeadingProps) {
  return (
    <>
      <div className={`flex w-full items-center justify-between ${className ? className : ''}`}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        {actionButtonLabel && (
          <div>
            <Button onClick={actionButtonHandler} size={'lg'} variant={'primary'}>
              {actionButtonLabel}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
