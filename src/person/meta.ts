export interface IPerson {
  name: string;
  age: number;
  married: boolean;
  title(name: string): string;
}
