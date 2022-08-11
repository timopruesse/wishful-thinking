import { CartItem } from "./cartItem";
import { Product } from "./product";

export class Cart {
  constructor(public items: CartItem[] = []) {}

  private findProductIndex = (productId: number) => {
    return this.items.findIndex((item) => item.productId === productId);
  };

  private updateItemAt = (index: number, item: CartItem) => {
    const existingItem = this.items[index];

    if (existingItem.productId !== item.productId) {
      throw new Error(
        `product id mismatch: ${existingItem.productId} / ${item.productId}`
      );
    }

    this.items[index].add(item);
  };

  public add = (product: Product, quantity = 1) => {
    const cartItem = CartItem.from(product, quantity);
    const existingIndex = this.findProductIndex(product.id);

    if (existingIndex > -1) {
      this.updateItemAt(existingIndex, cartItem);
    } else {
      this.items.push(cartItem);
    }

    return this;
  };

  public removeProduct = (id: number) => {
    const cartItemIndex = this.findProductIndex(id);
    if (cartItemIndex < 0) {
      throw new Error(`product (${id}) is not in cart`);
    }

    this.items = this.items.filter((_, index) => index !== cartItemIndex);

    return this;
  };

  get sum(): number {
    return this.items.reduce((s, currentItem) => (s += currentItem.total), 0);
  }

  get quantity(): number {
    return this.items.reduce(
      (q, currentItem) => (q += currentItem.quantity),
      0
    );
  }
}
