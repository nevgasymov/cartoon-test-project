// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { loadCharacterSearchParams } from "../search-params";
import { Pagination } from "./pagination";

const renderAt = (query: string, pages: number) =>
  render(
    <Pagination params={loadCharacterSearchParams(query)} pages={pages} />,
  );

describe("Pagination", () => {
  it("links to the neighbour pages and keeps the filters", () => {
    renderAt("?name=rick&status=alive&page=2", 3);

    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/?name=rick&status=alive",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/?name=rick&status=alive&page=3",
    );
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("has no Previous link on the first page and no Next on the last", () => {
    const { unmount } = renderAt("", 3);
    expect(screen.queryByRole("link", { name: "Previous" })).toBeNull();
    unmount();

    renderAt("?page=3", 3);
    expect(screen.queryByRole("link", { name: "Next" })).toBeNull();
  });

  it("renders nothing for a single page", () => {
    const { container } = renderAt("", 1);
    expect(container).toBeEmptyDOMElement();
  });
});
