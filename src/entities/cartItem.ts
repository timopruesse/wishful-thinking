import { Product } from "./product";

export class CartItem {
  public readonly productId: number;
  private _quantity = 1;
  private _price = 0;

  public constructor(product: Product, quantity = 1) {
    this.productId = product.id;
    this.price = product.price;
    this.quantity = quantity;
  }

  public static from(product: Product, quantity = 1) {
    return new CartItem(product, quantity);
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(count: number) {
    if (count < 1) {
      throw new Error(
        "quantity needs to be greater or equal to 1; got " + count
      );
    }

    this._quantity = count;
  }

  get price(): number {
    return this._price;
  }

  set price(amount: number) {
    if (amount < 0) {
      throw new Error("the price cannot be less than 0; got " + amount);
    }

    this._price = amount;
  }

  get total(): number {
    return this.price * this.quantity;
  }

  public add = (item: CartItem) => {
    this.quantity += item.quantity;
    this.price = item.price;

    return this;
  };
}
