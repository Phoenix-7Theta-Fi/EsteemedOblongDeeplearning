import React from 'react';

interface AcceptConsultationProps {
  onAccept: () => void;
}

const AcceptConsultation: React.FC<AcceptConsultationProps> = ({ onAccept }) => {
  return (
    <div className="accept-consultation">
      <h2>New Consultation Request</h2>
      <p>A patient is waiting for a consultation. Are you ready to begin?</p>
      <button onClick={onAccept}>Accept Consultation</button>
    </div>
  );
};

export default AcceptConsultation;