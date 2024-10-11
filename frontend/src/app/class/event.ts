import { Dayjs } from 'dayjs';

export class Event {
  id: number;
  title: string;
  color: string | null;
  start: Dayjs;
  end: Dayjs;
  description: string | null;
  type: TypeEvent;

  constructor(
    id: number,
    title: string,
    start: Dayjs,
    end: Dayjs,
    description: string,
    type: TypeEvent
  ) {
    this.id = id;
    this.title = title;
    this.color = null;
    this.start = start;
    this.end = end;
    this.description = null;
    this.type = type;
  }
}

export enum TypeEvent {
  WORK = 'work',
  MEETING = 'meeting',
  OTHER = 'other',
}

export const fromStringToTypeEvent = (type: string): TypeEvent => {
  switch (type) {
    case 'work':
      return TypeEvent.WORK;
    case 'meeting':
      return TypeEvent.MEETING;
    default:
      return TypeEvent.OTHER;
  }
};
