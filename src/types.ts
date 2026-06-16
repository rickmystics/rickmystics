export type PageType = 'home' | 'about' | 'work' | 'skills' | 'leadership' | 'contact';

export interface ProjectType {
  id: string;
  title: string;
  tag: string;
  description: string;
  tech: string[];
  category: 'hackathons' | 'internships' | 'leadership' | 'all';
}

export interface ExperienceType {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'internship' | 'leadership' | 'milestone';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  sources?: string[];
}
