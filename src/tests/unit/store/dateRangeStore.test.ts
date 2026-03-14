import {
  DATE_RANGE_PRESETS,
  useDateRangeStore,
} from "../../../store/dateRangeStore";

const initialState = {
  selectedPreset: "last7days" as const,
  customRange: null,
};

describe("dateRangeStore", () => {
  beforeEach(() => {
    useDateRangeStore.setState(initialState);
  });

  it("has default preset of last7days", () => {
    expect(useDateRangeStore.getState().selectedPreset).toBe("last7days");
  });

  it("has default customRange of null", () => {
    expect(useDateRangeStore.getState().customRange).toBeNull();
  });

  it("setSelectedPreset changes preset", () => {
    useDateRangeStore.getState().setSelectedPreset("thisMonth");
    expect(useDateRangeStore.getState().selectedPreset).toBe("thisMonth");
  });

  it("setCustomRange sets range and changes preset to custom", () => {
    const range = { from: "2026-01-01", to: "2026-01-31" };
    useDateRangeStore.getState().setCustomRange(range);
    const state = useDateRangeStore.getState();
    expect(state.customRange).toEqual(range);
    expect(state.selectedPreset).toBe("custom");
  });

  it("setSelectedPreset after setCustomRange changes preset back", () => {
    useDateRangeStore
      .getState()
      .setCustomRange({ from: "2026-01-01", to: "2026-01-31" });
    useDateRangeStore.getState().setSelectedPreset("today");
    expect(useDateRangeStore.getState().selectedPreset).toBe("today");
  });

  it("DATE_RANGE_PRESETS contains 6 values", () => {
    expect(DATE_RANGE_PRESETS).toHaveLength(6);
  });
});
