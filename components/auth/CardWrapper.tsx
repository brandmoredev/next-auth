import Link from 'next/link';
import { ReactNode } from 'react';
import Social from './Social';

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;  // Use `string` instead of `String`
  headerText: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  headerText,
  backButtonLabel,
  backButtonHref,
  showSocial
}) => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">{headerLabel}</h1>
      <p className="text-gray-600 text-center mb-6">{headerText}</p>
      <div className="w-full mb-6">
        {children}
      </div>
      {showSocial && (
        <div className="w-full mb-6">
          <Social />
        </div>
      )}
      <div className="text-center mt-4">
        <Link href={backButtonHref} className="text-blue-500 hover:underline text-gray-500 hover:text-blue-700">
          {backButtonLabel}
        </Link>
      </div>
    </div>
  )
};

export default CardWrapper;
