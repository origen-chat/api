export type Event = {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
};

export type EventCategory = 'Share' | 'Button';
