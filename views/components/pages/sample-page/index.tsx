import React from 'react';

interface SamplePageProps {
  title?: string;
}

const SamplePage: React.FC<SamplePageProps> = ({ title }) => {
  return (
    <div>
      <h1>{title || 'Hello World!'}</h1>
    </div>
  );
};

export default SamplePage;
