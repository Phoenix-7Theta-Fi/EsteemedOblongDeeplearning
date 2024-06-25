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
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Handle unauthenticated user
        console.error('User not authenticated');
      }
    };

    checkUser();
  }, []);

  // ... rest of the component remains the same
};

export default ConsultationFlow;