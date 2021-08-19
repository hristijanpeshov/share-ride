import { TripType } from './trip-type.enum';

export class Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  type: TripType;
  rated: number;

  constructor(
    id: number,
    from: string,
    to: string,
    date: string,
    time: string,
    type: TripType
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.date = date;
    this.time = time;
    this.type = type;
    this.rated = 0;
  }
}
