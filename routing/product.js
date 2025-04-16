class Product {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }


  static #products = [];


  static getAll() {
    return this.#products;
  }

  static add(product) {
    this.#products.push(product);
  }

  static findByName(name) {
    return this.#products.find(product => product.name === name);
  }

  static deleteByName(name) {
    const index = this.#products.findIndex(product => product.name === name);
    if (index !== -1) {
      return this.#products.splice(index, 1)[0];
    }
    return null; 
  }

  static getLast() {
    if (this.#products.length > 0) {
      return this.#products[this.#products.length - 1];
    }
    return null;
  }
}

module.exports = Product;
