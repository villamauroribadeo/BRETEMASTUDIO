import React from 'react';
import {
  PenTool,
  Globe,
  TrendingUp,
  Search,
  Palette,
  Code,
  Rocket,
  Menu,
  X,
  ArrowRight,
  Check,
  Settings,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Save,
  Undo,
  LogOut,
  Lock,
  RefreshCw,
  FileText,
  Eye,
  Inbox,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Users,
  Layers,
  Award
} from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  PenTool,
  Globe,
  TrendingUp,
  Search,
  Palette,
  Code,
  Rocket,
  Menu,
  X,
  ArrowRight,
  Check,
  Settings,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Save,
  Undo,
  LogOut,
  Lock,
  RefreshCw,
  FileText,
  Eye,
  Inbox,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Users,
  Layers,
  Award
};

export default function LucideIcon({ name, className = '', size = 24 }: LucideIconProps) {
  const IconComponent = iconMap[name] || Globe; // Default fallback to Globe
  return <IconComponent className={className} size={size} />;
}
