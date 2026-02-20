import * as XLSX from "xlsx";

const formatHeader = (key: string): string =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

export const exportToXLSX = <T extends object>(
  data: T[],
  filename: string,
): void => {
  if (!data.length) {
    console.warn("No data to export");
    return;
  }

  const headers = Object.keys(data[0]).map(formatHeader);
  const rows = data.map((row) => Object.values(row));

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  worksheet["!cols"] = headers.map((_, i) => {
    const maxLen = Math.max(
      headers[i].length,
      ...rows.map((row) => String(row[i] ?? "").length),
    );
    return { wch: maxLen + 2 };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
