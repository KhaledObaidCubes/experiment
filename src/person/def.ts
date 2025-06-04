import type { IPerson } from "./meta";

export class Person implements IPerson {
  name: string;
  age: number;
  married: boolean;
  constructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
  }
  title(name: string) {
    return `Mr.${name}`;
  }
}
