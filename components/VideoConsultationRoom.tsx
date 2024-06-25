import React, { useEffect, useRef } from 'react';
import { initializeSession } from '../utils/vonage';

interface VideoConsultationRoomProps {
  sessionData: {
    sessionId: string;
    token: string;
  };
  onEnd: () => void;
}

const VideoConsultationRoom: React.FC<VideoConsultationRoomProps> = ({ sessionData, onEnd }) => {
  const publisherRef = useRef<HTMLDivElement>(null);
  const subscriberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VONAGE_API_KEY;
    if (!apiKey) {
      console.error('Vonage API key is missing');
      return;
    }

    initializeSession(apiKey, sessionData.sessionId, sessionData.token);

    // Clean up function
    return () => {
      // Add cleanup logic here (e.g., ending the Vonage session)
    };
  }, [sessionData]);

  return (
    <div className="video-consultation-room">
      <div ref={publisherRef} className="publisher"></div>
      <div ref={subscriberRef} className="subscriber"></div>
      <button onClick={onEnd}>End Consultation</button>
    </div>
  );
};

export default VideoConsultationRoom;