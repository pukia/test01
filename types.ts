export enum Tab {
  SCENES = 'SCENES',
  RULES = 'RULES',
  FAQ = 'FAQ',
  PHOTOGRAPHERS = 'PHOTOGRAPHERS',
  BOOKING = 'BOOKING',
}

export interface Scene {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

export interface Photographer {
  id: string;
  name: string;
  style: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingFormState {
  name: string;
  email: string;
  scene: string;
  date: string;
  props: string;
  photographer: string;
  remarks: string;
}