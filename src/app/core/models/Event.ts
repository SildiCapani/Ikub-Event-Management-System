export interface Event {
  id: number;
  creator: string;
  date: string;
  description: string;
  image: string;
  lastDate: string;
  maxAttenders: number;
  registeredAttenders: number;
  namesOfRegisteredAttenders: string[];
  price: number;
  location: string;
  title: string;
  waiting: string[]
  commnets: [
    Comment
  ]
}

export interface Events {
  data: Event
}

export interface Comment {
  userName: string
  comment: string
}
