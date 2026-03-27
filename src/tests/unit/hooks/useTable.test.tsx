import { act, renderHook } from "@testing-library/react";

import { useTable } from "@/hooks/useTable";

const initialFilters = { status: "all", category: "all" };

describe("useTable", () => {
  it("initializes with provided filters", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    expect(result.current.filters).toEqual(initialFilters);
  });

  it("has correct default values", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    expect(result.current.sorting).toEqual([]);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.currentPage).toBe(0);
    expect(result.current.itemsPerPage).toBe(10);
  });

  it("setFilter updates filter and resets currentPage", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.goToPage(3));
    act(() => result.current.setFilter("status", "active"));
    expect(result.current.filters.status).toBe("active");
    expect(result.current.currentPage).toBe(0);
  });

  it("getFilter returns filter value", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    expect(result.current.getFilter("status")).toBe("all");
  });

  it("clearFilter removes filter key", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.clearFilter("status"));
    expect(result.current.getFilter("status")).toBeUndefined();
  });

  it("resetFilters restores initial state", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => {
      result.current.setFilter("status", "active");
      result.current.setSearchQuery("test");
      result.current.goToPage(5);
      result.current.setSorting([{ id: "name", desc: true }]);
    });
    act(() => result.current.resetFilters());
    expect(result.current.filters).toEqual(initialFilters);
    expect(result.current.searchQuery).toBe("");
    expect(result.current.currentPage).toBe(0);
    expect(result.current.sorting).toEqual([]);
  });

  it("nextPage increments currentPage", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.nextPage());
    expect(result.current.currentPage).toBe(1);
  });

  it("prevPage decrements currentPage", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.goToPage(3));
    act(() => result.current.prevPage());
    expect(result.current.currentPage).toBe(2);
  });

  it("goToPage sets specific page", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.goToPage(5));
    expect(result.current.currentPage).toBe(5);
  });

  it("setSearchQuery updates search", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.setSearchQuery("test"));
    expect(result.current.searchQuery).toBe("test");
  });

  it("setSorting updates sorting state", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    const sorting = [{ id: "name", desc: true }];
    act(() => result.current.setSorting(sorting));
    expect(result.current.sorting).toEqual(sorting);
  });

  it("setItemsPerPage updates value", () => {
    const { result } = renderHook(() => useTable(initialFilters));
    act(() => result.current.setItemsPerPage(25));
    expect(result.current.itemsPerPage).toBe(25);
  });
});
