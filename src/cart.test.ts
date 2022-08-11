import { removeFromCart } from "./actions/cart";
import { Cart } from "./entities/cart";
import { CartItem } from "./entities/cartItem";
import { Product } from "./entities/product";

describe("Cart", () => {
  it("initializes cart with given items", () => {
    const item = CartItem.from({ id: 1, price: 5, name: "Test" });
    const initialCartItems = [item];
    const cart = new Cart(initialCartItems);

    expect(cart.items.length).toBe(1);
    expect(cart.items[0]).toBe(item);
  });

  it("adds an item to the cart", () => {
    const cart = new Cart();

    const product: Product = { price: 10, id: 1, name: "Test" };

    cart.add(product, 3);

    expect(cart.sum).toBe(30);
    expect(cart.quantity).toBe(3);
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].productId).toBe(product.id);
  });

  it("removes an item from the cart", () => {
    const product: Product = { id: 1, name: "Test", price: 10 };
    const cartItem = CartItem.from(product, 5);
    const cart = new Cart([cartItem]);

    cart.removeProduct(product.id);

    expect(cart.sum).toBe(0);
    expect(cart.quantity).toBe(0);
    expect(cart.items.length).toBe(0);
  });

  it("updates an item in the cart", () => {
    const cart = new Cart();
    const product: Product = { id: 1, price: 10, name: "Test" };

    cart.add(product, 3).add(product, 2);

    expect(cart.sum).toBe(50);
    expect(cart.quantity).toBe(5);
    expect(cart.items.length).toBe(1);
  });
});
