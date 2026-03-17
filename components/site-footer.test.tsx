import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("shows the send feedback button only after text is entered", async () => {
    const user = userEvent.setup();

    render(<SiteFooter />);

    const feedbackField = screen.getByRole("textbox", { name: "Feedback" });

    expect(screen.queryByRole("button", { name: /send feedback/i })).not.toBeInTheDocument();

    await user.type(feedbackField, "I found what I wanted quickly.");
    expect(screen.getByRole("button", { name: /send feedback/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /send feedback/i }));

    expect(feedbackField).toHaveValue("");
    expect(screen.queryByRole("button", { name: /send feedback/i })).not.toBeInTheDocument();
    expect(screen.getByText("Thanks. Your feedback has been received.")).toBeInTheDocument();
  });
});
