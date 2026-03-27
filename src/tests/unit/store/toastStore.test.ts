import { useToastStore } from "@/store/toastStore";

describe("toastStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toast: null });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has default toast of null", () => {
    expect(useToastStore.getState().toast).toBeNull();
  });

  it("showToast creates toast with correct properties", () => {
    useToastStore.getState().showToast("success", "Title", "Description");
    const toast = useToastStore.getState().toast;
    expect(toast).not.toBeNull();
    expect(toast?.variant).toBe("success");
    expect(toast?.title).toBe("Title");
    expect(toast?.description).toBe("Description");
  });

  it("clearToast sets toast to null", () => {
    useToastStore.getState().showToast("success", "Title", "Desc");
    useToastStore.getState().clearToast();
    expect(useToastStore.getState().toast).toBeNull();
  });

  it("auto-dismisses after 5000ms", () => {
    useToastStore.getState().showToast("success", "Title", "Desc");
    expect(useToastStore.getState().toast).not.toBeNull();
    vi.advanceTimersByTime(5000);
    expect(useToastStore.getState().toast).toBeNull();
  });

  it("does not auto-dismiss before 5000ms", () => {
    useToastStore.getState().showToast("success", "Title", "Desc");
    vi.advanceTimersByTime(4999);
    expect(useToastStore.getState().toast).not.toBeNull();
  });

  it("second showToast overwrites the first", () => {
    useToastStore.getState().showToast("success", "First", "Desc1");
    useToastStore.getState().showToast("destructive", "Second", "Desc2");
    const toast = useToastStore.getState().toast;
    expect(toast?.title).toBe("Second");
    expect(toast?.variant).toBe("destructive");
  });

  it("clearToast prevents auto-dismiss", () => {
    useToastStore.getState().showToast("success", "Title", "Desc");
    useToastStore.getState().clearToast();
    vi.advanceTimersByTime(5000);
    expect(useToastStore.getState().toast).toBeNull();
  });

  it("showToast assigns unique ids", () => {
    useToastStore.getState().showToast("success", "First", "Desc1");
    const id1 = useToastStore.getState().toast?.id;
    useToastStore.getState().showToast("success", "Second", "Desc2");
    const id2 = useToastStore.getState().toast?.id;
    expect(id1).not.toBe(id2);
  });
});
