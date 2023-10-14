export interface Event {
    id: number,
    creator: string,
    date: string,
    description: string,
    image: string,
    lastDate: string,
    maxAttenders: number,
    registeredAttenders: number,
    namesOfRegisteredAttenders: string[]
    price: number,
    title: string
}

export interface Events {
    data: [
        Event
    ]
}