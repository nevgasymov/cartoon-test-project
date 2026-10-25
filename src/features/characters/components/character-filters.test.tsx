// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  withNuqsTestingAdapter,
  type UrlUpdateEvent,
} from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import { CharacterFilters } from "./character-filters";

function renderFilters(searchParams: string) {
  const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
  render(<CharacterFilters />, {
    wrapper: withNuqsTestingAdapter({ searchParams, onUrlUpdate }),
  });
  const user = userEvent.setup();
  const lastUpdate = () => onUrlUpdate.mock.lastCall?.[0];
  return { user, onUrlUpdate, lastUpdate };
}

describe("CharacterFilters", () => {
  it("writes the name to the URL after a pause and goes back to page 1", async () => {
    const { user, onUrlUpdate, lastUpdate } = renderFilters("?page=3");

    await user.type(screen.getByLabelText("Name"), "rick");
    expect(screen.getByLabelText("Name")).toHaveValue("rick");
    expect(onUrlUpdate).not.toHaveBeenCalled();

    await vi.waitFor(() => expect(onUrlUpdate).toHaveBeenCalledOnce());
    expect(lastUpdate()?.queryString).toBe("?name=rick");
    expect(lastUpdate()?.options).toMatchObject({
      shallow: false,
      history: "replace",
    });
  });

  it("adds a history entry when a status is picked", async () => {
    const { user, lastUpdate } = renderFilters("?name=rick&page=2");

    await user.selectOptions(screen.getByLabelText("Status"), "dead");

    expect(lastUpdate()?.queryString).toBe("?name=rick&status=dead");
    expect(lastUpdate()?.options.history).toBe("push");
  });

  it("shows the values from the URL and clears them all", async () => {
    const { user, lastUpdate } = renderFilters(
      "?name=rick&species=human&gender=male&page=4",
    );
    expect(screen.getByLabelText("Name")).toHaveValue("rick");
    expect(screen.getByLabelText("Gender")).toHaveValue("male");

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(lastUpdate()?.queryString).toBe("");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Species")).toHaveValue("");
    expect(screen.getByLabelText("Gender")).toHaveValue("");
    expect(
      screen.getByRole("button", { name: "Clear filters" }),
    ).toBeDisabled();
  });
});
