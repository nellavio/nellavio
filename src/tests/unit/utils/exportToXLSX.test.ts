import { vi } from "vitest";

const writeFileMock = vi.fn();
const bookNewMock = vi.fn(() => ({ SheetNames: [], Sheets: {} }));
const bookAppendSheetMock = vi.fn();
const aoaToSheetMock = vi.fn(() => ({}));

vi.mock("xlsx", () => ({
  utils: {
    aoa_to_sheet: (...args: unknown[]) =>
      aoaToSheetMock(...(args as Parameters<typeof aoaToSheetMock>)),
    book_new: () => bookNewMock(),
    book_append_sheet: (...args: unknown[]) =>
      bookAppendSheetMock(...(args as Parameters<typeof bookAppendSheetMock>)),
  },
  writeFile: (...args: unknown[]) =>
    writeFileMock(...(args as Parameters<typeof writeFileMock>)),
}));

let exportToXLSX: (typeof import("../../../utils/exportToXLSX"))["exportToXLSX"];

beforeAll(async () => {
  const mod = await import("../../../utils/exportToXLSX");
  exportToXLSX = mod.exportToXLSX;
});

describe("exportToXLSX", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not create a file when data is empty", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    exportToXLSX([], "empty");

    expect(warnSpy).toHaveBeenCalledWith("No data to export");
    expect(writeFileMock).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("converts camelCase keys to Title Case headers", () => {
    const data = [{ firstName: "John", lastName: "Doe", totalBuys: 100 }];
    exportToXLSX(data, "customers");

    const firstCall = aoaToSheetMock.mock.calls[0] as unknown as [unknown[][]];
    const [headers] = firstCall;
    expect(headers[0]).toEqual(["First Name", "Last Name", "Total Buys"]);
  });

  it("maps object values as rows in correct order", () => {
    const data = [
      { name: "Widget", price: 9.99, stock: 42 },
      { name: "Gadget", price: 19.99, stock: 7 },
    ];
    exportToXLSX(data, "products");

    const firstCall = aoaToSheetMock.mock.calls[0] as unknown as [unknown[][]];
    const [sheetData] = firstCall;
    expect(sheetData[1]).toEqual(["Widget", 9.99, 42]);
    expect(sheetData[2]).toEqual(["Gadget", 19.99, 7]);
  });

  it("writes file with correct .xlsx extension and sheet name", () => {
    exportToXLSX([{ id: 1 }], "orders");

    expect(writeFileMock.mock.calls[0][1]).toBe("orders.xlsx");
    expect(bookAppendSheetMock.mock.calls[0][2]).toBe("orders");
  });

  it("sets auto-sized columns based on content length", () => {
    const worksheetObj: Record<string, unknown> = {};
    aoaToSheetMock.mockReturnValueOnce(worksheetObj);

    const longValue = "a very long value that determines column width";
    exportToXLSX([{ shortKey: longValue }], "test");

    const cols = worksheetObj["!cols"] as { wch: number }[];
    expect(cols).toBeDefined();
    expect(cols[0].wch).toBe(longValue.length + 2);
  });
});
