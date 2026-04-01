import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Calendar,
  CalendarCheck,
  ClipboardList,
  Clock,
  DollarSign,
  FileText,
  HandHeart,
  Heart,
  HeartHandshake,
  HelpCircle,
  Home,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  User,
  Users,
  Video,
  Wallet,
} from "lucide-react";

const lucideIconRegistry: Record<string, LucideIcon> = {
  Leaf,
  Sparkles,
  HeartHandshake,
  Calendar,
  CalendarCheck,
  Clock,
  DollarSign,
  FileText,
  HandHeart,
  Heart,
  HelpCircle,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Stethoscope,
  Sun,
  User,
  Users,
  Video,
  Wallet,
  Brain,
  ClipboardList,
};

export function getLucideIcon(name?: string | null): LucideIcon {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (trimmed && lucideIconRegistry[trimmed]) {
    return lucideIconRegistry[trimmed];
  }
  return Leaf;
}

/** Sanity Studio dropdown options (title = value for clarity). */
export const lucideIconSelectOptions = Object.keys(lucideIconRegistry)
  .sort((a, b) => a.localeCompare(b))
  .map((value) => ({ title: value, value }));
