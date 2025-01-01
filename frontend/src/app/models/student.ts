export class Student {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public subjects: Array<Student>
  ) {}
}
