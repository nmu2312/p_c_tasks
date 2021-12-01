import axios from 'axios';

export const isZipCode = async (zipCode: string): Promise<boolean> => {
  // NOTE: 外部のAPIをコールするため事前に入力形式が正しいかチェックする
  // NOTE: 存在しない郵便コードが入力された場合はfalseを返却
  if (!/\d{3}-\d{4}/.test(zipCode)) {
    return false;
  }
  const { data } = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);

  const results = data.results;

  return results != null && results.length != 0;
};

const fortune: { [key: number]: string } = {};
fortune[0] = '大吉';
fortune[1] = '吉';
fortune[2] = '中吉';
fortune[3] = '凶';
export const printFortune = (): void => {
  console.log(fortune[Math.floor(Math.random() * 4)]);
};

export class Person {
  private _age: number;
  private _firstName: string;
  private _lastName: string;

  public constructor(age: number, firstName: string, lastName: string) {
    this._age = age;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  public get age(): number {
    return this._age;
  }

  public set age(theAge: number) {
    if (theAge <= 0 || theAge >= 200) {
      throw new Error('The age is invalid');
    }
    this._age = theAge;
  }

  public getFullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}

export const getPerson = async (age: number): Promise<Person> => {
  const { data } = await axios.get('https://random-data-api.com/api/name/random_name');

  return new Person(age, data.first_name, data.last_name);
};
