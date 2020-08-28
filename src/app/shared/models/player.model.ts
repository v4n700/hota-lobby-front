export class Player {
  constructor(
    public id: number,
    public name: string,
    public rating: number,
    public reputation: number,
    public lastSeenAt: Date,
    public registeredAt: Date
  ) {}
}
