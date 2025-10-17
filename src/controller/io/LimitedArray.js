export default class LimitedArray extends Array {
  #limit;

  /**
   * @param {int} limit The length to keep the array to
   * @param  {...any} args The elements in the array
   */
  constructor(limit, ...args) {
    super(...args);
    this.#limit = limit;
    if (this.length > this.#limit) {
      this.splice(0, this.length - this.#limit);
    }
  }

  push(...items) {
    super.push(...items);
    if (this.length > this.#limit) {
      this.splice(0, this.length - this.#limit);
    }
    return this.length;
  }

  unshift(...items) {
    super.unshift(...items);
    if (this.length > this.#limit) {
      this.splice(this.#limit, this.length - this.#limit);
    }
    return this.length;
  }
}
