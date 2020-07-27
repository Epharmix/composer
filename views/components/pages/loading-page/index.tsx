import React from 'react';

/**
 * react-loadable doesn't export the props interface
 * but this is a sub-set of the one defined in that package
 */
interface LoadingPageProps {
  pastDelay: boolean;
}

// TO DO: Make this actually look good...
const LoadingPage: React.FC<LoadingPageProps> = ({ pastDelay }) => {
  if (pastDelay) {
    return <div>Loading...</div>;
  }

  return null;
};

export default LoadingPage;
