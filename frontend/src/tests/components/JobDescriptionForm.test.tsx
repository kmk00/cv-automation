import { expect, test, vi } from "vitest";
import JobDescriptionForm from "../../components/JobDescriptionForm";
import { render } from "vitest-browser-react";

const mockSetApplicationSteps = vi.fn(() => {});
const mockSetJobListing = vi.fn(() => {});

test("JobDescriptionForm renders a textarea and a button", () => {
  const { getByText } = render(
    <JobDescriptionForm
      setApplicationSteps={mockSetApplicationSteps}
      setJobListing={mockSetJobListing}
    />
  );

  expect(getByText("Generate CV")).toBeInTheDocument();
});
