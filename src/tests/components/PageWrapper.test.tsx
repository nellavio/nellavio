import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock child components and utilities
jest.mock("../../components/common/Breadcrumbs", () => ({
  // Corrected Path
  Breadcrumbs: function MockBreadcrumbs({ pageName }: { pageName?: string }) {
    return (
      <div data-testid="breadcrumbs" data-pagename={pageName ?? "undefined"}>
        Mocked Breadcrumbs
      </div>
    );
  },
}));
// Import original icon path
import { DownloadIcon } from "../../assets/icons/DownloadIcon";
// Auto-mock icon module
jest.mock("../../assets/icons/DownloadIcon");

// Mock the utility function
import { exportToCSV } from "../../utils/exportToCSV";
jest.mock("../../utils/exportToCSV");

// Mock next-intl hook
jest.mock("next-intl", () => ({
  useTranslations: () => jest.fn((key) => key ?? ""), // Return a dummy 't' function
}));

// Import the component to test
import { PageWrapper } from "../../components/common/PageWrapper";

describe("PageWrapper Component", () => {
  beforeEach(() => {
    // Clear mocks and provide icon implementation
    (exportToCSV as jest.Mock).mockClear();
    (DownloadIcon as jest.Mock).mockImplementation(() => (
      <svg data-testid="download-icon" />
    ));
  });

  // Test 1: Default rendering (hidePaper=false)
  it("should render children, breadcrumbs, and disabled CSV button when hidePaper is false and no dataForExport", () => {
    const childContent = "Page Content";
    const page = "MyPage";
    // Wrap childContent in a paragraph for better parent selection
    render(
      <PageWrapper pageName={page}>
        <p>{childContent}</p>
      </PageWrapper>
    );

    const main = screen.getByRole("main");
    const breadcrumbs = screen.getByTestId("breadcrumbs");
    const csvButton = screen.getByRole("button", { name: /csv/i });

    expect(main).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument(); // Check if child exists
    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).toHaveAttribute("data-pagename", page);
    expect(csvButton).toBeInTheDocument();
    expect(screen.getByTestId("download-icon")).toBeInTheDocument();
    expect(csvButton).toBeDisabled();
    // Check the parent of the <p> tag for the background class
    expect(screen.getByText(childContent).parentElement).toHaveClass(
      "bg-primaryBg"
    ); // This should now target the correct 'paper' div
  });

  // Test 2: Rendering with content variant (Analytics page)
  it("should render children, breadcrumbs, and disabled CSV button without paper background for content pages", () => {
    const childContent = "No Paper Content";
    const page = "Analytics";
    // Wrap childContent in a paragraph
    render(
      <PageWrapper pageName={page}>
        <p>{childContent}</p>
      </PageWrapper>
    );

    const main = screen.getByRole("main");
    const breadcrumbs = screen.getByTestId("breadcrumbs");
    // Find button by text/closest due to potential aria-hidden parent
    const csvButton = screen.getByText(/csv/i).closest("button");

    expect(main).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument();
    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs).toHaveAttribute("data-pagename", page);
    expect(csvButton).toBeInTheDocument(); // Check if button exists
    expect(screen.getByTestId("download-icon")).toBeInTheDocument();
    // Assert disabled state on the found button
    expect(csvButton).toBeDisabled();
    // Check the parent of the <p> tag - should NOT have the paper class
    expect(screen.getByText(childContent).parentElement).not.toHaveClass(
      "bg-primaryBg"
    );
  });

  // Test 3: CSV Button enablement
  it("should enable CSV button when dataForExport is provided", () => {
    const exportData = [{ col1: "val1" }];
    render(<PageWrapper dataForExport={exportData}>Content</PageWrapper>);
    // Use getByRole here as it should not be inside aria-hidden=true in default state
    const csvButton = screen.getByRole("button", { name: /csv/i });
    expect(csvButton).toBeEnabled();
  });

  // Test 4: CSV Export functionality with pageName
  it("should call exportToCSV with correct arguments when CSV button is clicked and pageName exists", () => {
    const exportData = [{ id: 1, name: "Test" }];
    const page = "DataPage";
    render(
      <PageWrapper dataForExport={exportData} pageName={page}>
        Content
      </PageWrapper>
    );
    const csvButton = screen.getByRole("button", { name: /csv/i });
    fireEvent.click(csvButton);

    expect(exportToCSV).toHaveBeenCalledTimes(1);
    expect(exportToCSV).toHaveBeenCalledWith(
      exportData,
      page.toLowerCase(),
      page
    );
  });

  // Test 5: CSV Export functionality without pageName
  it("should call exportToCSV with default filename when CSV button is clicked and pageName is missing", () => {
    const exportData = [{ value: "abc" }];
    render(<PageWrapper dataForExport={exportData}>Content</PageWrapper>);
    const csvButton = screen.getByRole("button", { name: /csv/i });
    fireEvent.click(csvButton);

    expect(exportToCSV).toHaveBeenCalledTimes(1);
    expect(exportToCSV).toHaveBeenCalledWith(exportData, "export", undefined);
  });

  // Test 6: CSV Button interaction when disabled
  it("should not call exportToCSV when CSV button is clicked and disabled", () => {
    render(<PageWrapper>Content</PageWrapper>);
    const csvButton = screen.getByRole("button", { name: /csv/i });
    fireEvent.click(csvButton);

    expect(csvButton).toBeDisabled();
    expect(exportToCSV).not.toHaveBeenCalled();
  });
});
