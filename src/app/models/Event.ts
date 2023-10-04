export interface Event {
    id: number,
    creator: string,
    date: string,
    description: string,
    image: string,
    lastDate: string,
    maxAttenders: number,
    registeredAttenders: number,
    namesOfRegisteredAttenders: []
    price: number,
    title: string
}