import { Dayjs } from 'dayjs';

export class Event {
  id: number;
  title: string;
  start: Dayjs;
  end: Dayjs;
  description: string | null;
  type: TypeEvent;

  constructor(
    id: number,
    title: string,
    start: Dayjs,
    end: Dayjs,
    type: TypeEvent
  ) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = null;
    this.type = type;
  }
}

export class TypeEvent {
  id: number;
  name: string;
  color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
