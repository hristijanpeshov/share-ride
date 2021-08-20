import { TripType } from './trip-type.enum';

export class Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  type: TripType;
  rated: number;
  payingMethod: string;

  constructor(
    id: number,
    from: string,
    to: string,
    date: string,
    time: string,
    type: TripType,
    payingMethod: string
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.date = date;
    this.time = time;
    this.type = type;
    this.payingMethod = payingMethod;
    this.rated = 0;
  }
}
