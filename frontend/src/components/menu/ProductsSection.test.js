import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsSection from "./ProductsSection";
import products from "../../mocks/products";
import CartContext from "../../context/cart_context/cart-context";
import cartProducts from "../../mocks/cartProducts";

let addToCart = jest.fn();
let addToTotalCost = jest.fn();

describe("ProductsSection render", () => {
  it("renders not found message after not getting match search results", () => {
    render(
      <CartContext.Provider
        value={{
          cartProducts: [],
          addToCart,
          addToTotalCost,
        }}
      >
        <MemoryRouter initialEntries={["/menu"]}>
          <ProductsSection isLoading={false} products={[]} />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(
      screen.getByText("No se han encontrado coincidencias, intenta de nuevo!!")
    ).toBeInTheDocument();
  });

  it("renders products  of  the match search result", () => {
    render(
      <CartContext.Provider
        value={{
          cartProducts,
          addToCart,
          addToTotalCost,
        }}
      >
        <MemoryRouter initialEntries={["/menu"]}>
          <ProductsSection isLoading={false} products={products.data} />
        </MemoryRouter>
      </CartContext.Provider>
    );

    expect(
      screen.queryByText(
        "No se han encontrado coincidencias, intenta de nuevo!!"
      )
    ).not.toBeInTheDocument();

    expect(screen.getAllByRole("article")).toHaveLength(products.data.length);
  });
});
