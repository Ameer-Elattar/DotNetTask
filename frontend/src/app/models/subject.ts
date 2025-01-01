export class Subject {
  constructor(
    public id: number,
    public name: string,
    public students: Array<Subject>
  ) {}
}
