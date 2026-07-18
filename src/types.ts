export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  featured: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface EmailReply {
  id: string;
  body: string;
  timestamp: string;
  sender: 'system' | 'admin';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  planSelected?: string;
  timestamp: string;
  automatedReply?: string;
  manualReplies: EmailReply[];
}

export interface CMSContent {
  services: Service[];
  portfolio: PortfolioItem[];
  process: ProcessStep[];
  plans: PricingPlan[];
  testimonials: Testimonial[];
  seo: SEOConfig;
}
