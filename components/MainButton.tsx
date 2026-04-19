'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface LinkButtonProps {
  text: string;
  link: string;
  type: 'primary' | 'secondary';
}

const LinkButton = ({ text, link, type }: LinkButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className={type === 'primary' ? 'primary-btn' : 'secondary-btn'}
      onClick={() => {
        router.push(link);
      }}
    >
      {text}
    </Button>
  );
};

export default LinkButton;
