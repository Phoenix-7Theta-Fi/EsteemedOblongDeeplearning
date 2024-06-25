// User related types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserProfile extends User {
  first_name: string;
  last_name: string;
  role: 'patient' | 'doctor';
  specialty?: string; // Only for doctors
}

// Consultation related types
export interface Consultation {
  id: string;
  patient_id: string;
  doctor_id: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduled_time: string;
  actual_start_time?: string;
  actual_end_time?: string;
  notes?: string;
}

export interface ConsultationSession {
  sessionId: string;
  token: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Component prop types
export interface VideoConsultationRoomProps {
  sessionData: ConsultationSession;
  onEnd: () => void;
}

export interface AcceptConsultationProps {
  onAccept: () => void;
}

export interface ConsultationFlowProps {
  userType: 'doctor' | 'patient';
}

// Vonage (OpenTok) related types
export interface VonageError {
  name: string;
  message: string;
}

// Add more types and interfaces as needed