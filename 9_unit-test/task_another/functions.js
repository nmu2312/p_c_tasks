export class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }

  asyncGetName() {
    return Promise.resolve(this.#name + 'さん');
  }
}
