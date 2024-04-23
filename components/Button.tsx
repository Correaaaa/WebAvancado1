// components/Button.tsx
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <button className="btn">{children}</button>
    </Link>
  );
};

export default Button;
