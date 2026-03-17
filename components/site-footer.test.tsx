import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";

describe("SiteFooter", () => {
  it("clears the feedback field after submission", async () => {
    const user = userEvent.setup();

    render(<SiteFooter />);

    const feedbackField = screen.getByRole("textbox", { name: "Feedback" });

    await user.type(feedbackField, "I found what I wanted quickly.");
    await user.click(screen.getByRole("button", { name: /send feedback/i }));

    expect(feedbackField).toHaveValue("");
    expect(screen.getByText("Thanks. Your feedback has been received.")).toBeInTheDocument();
  });
});
