import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import AcceptConsultation from './AcceptConsultation';
import VideoConsultationRoom from './VideoConsultationRoom';

interface ConsultationFlowProps {
  userType: 'doctor' | 'patient';
}

const ConsultationFlow: React.FC<ConsultationFlowProps> = ({ userType }) => {
  const [consultationState, setConsultationState] = useState<'waiting' | 'active' | 'ended'>('waiting');
  const [sessionData, setSessionData] = useState<{ sessionId: string; token: string } | null>(null);

  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      // Handle unauthenticated user
      console.error('User not authenticated');
    }
  }, []);

  const handleAcceptConsultation = async () => {
    try {
      const response = await fetch('/api/create-session', { method: 'POST' });
      const data = await response.json();
      setSessionData(data);
      setConsultationState('active');
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleEndConsultation = () => {
    setConsultationState('ended');
  };

  if (userType === 'doctor' && consultationState === 'waiting') {
    return <AcceptConsultation onAccept={handleAcceptConsultation} />;
  }

  if (userType === 'patient' && consultationState === 'waiting') {
    return <div>Waiting for the doctor to accept the consultation...</div>;
  }

  if (consultationState === 'active' && sessionData) {
    return <VideoConsultationRoom sessionData={sessionData} onEnd={handleEndConsultation} />;
  }

  if (consultationState === 'ended') {
    return <div>The consultation has ended. Thank you for using our service.</div>;
  }

  return null;
};

export default ConsultationFlow;