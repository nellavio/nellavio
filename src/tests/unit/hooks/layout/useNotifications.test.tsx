import { act, renderHook } from "@testing-library/react";

import { useNotificationsModal } from "../../../../components/layout/navbar/hooks/useNotifications";
import type { Notification } from "../../../../components/layout/navbar/hooks/useNotificationsData";

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Update available",
    description: "v2.0 is ready",
    time: "2 min ago",
    icon: "update",
    isNew: true,
  },
  {
    id: "2",
    title: "New user joined",
    description: "John signed up",
    time: "1 hour ago",
    icon: "users",
    isNew: true,
  },
  {
    id: "3",
    title: "Task completed",
    description: "Report generated",
    time: "3 hours ago",
    icon: "check",
    isNew: false,
  },
];

describe("useNotificationsModal", () => {
  it("shows all notifications by default", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );
    expect(result.current.filteredNotifications).toHaveLength(3);
    expect(result.current.filter).toBe("all");
  });

  it("filters to show only new notifications", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    act(() => result.current.setFilter("new"));

    expect(result.current.filteredNotifications).toHaveLength(2);
    expect(result.current.filteredNotifications.every((n) => n.isNew)).toBe(
      true,
    );
  });

  it("filters to show only read notifications", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    act(() => result.current.setFilter("read"));

    expect(result.current.filteredNotifications).toHaveLength(1);
    expect(result.current.filteredNotifications[0].id).toBe("3");
  });

  it("marks single notification as read", () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useNotificationsModal({
        notifications: mockNotifications,
        onNotificationsUpdate: onUpdate,
      }),
    );

    act(() => result.current.handleMarkAsRead("1"));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    const updatedNotifications = onUpdate.mock.calls[0][0] as Notification[];
    const markedNotification = updatedNotifications.find((n) => n.id === "1");
    expect(markedNotification?.isNew).toBe(false);
  });

  it("marks all notifications as read", () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useNotificationsModal({
        notifications: mockNotifications,
        onNotificationsUpdate: onUpdate,
      }),
    );

    act(() => result.current.handleMarkAllAsRead());

    const updatedNotifications = onUpdate.mock.calls[0][0] as Notification[];
    expect(updatedNotifications.every((n) => !n.isNew)).toBe(true);
  });

  it("correctly counts new notifications", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    expect(result.current.newCount).toBe(2);
  });

  it("newCount updates after marking as read", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    expect(result.current.newCount).toBe(2);

    act(() => result.current.handleMarkAsRead("1"));

    expect(result.current.newCount).toBe(1);
  });

  it("newCount is 0 after marking all as read", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    act(() => result.current.handleMarkAllAsRead());

    expect(result.current.newCount).toBe(0);
  });

  it("filtering by new after marking all as read shows empty list", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    act(() => result.current.handleMarkAllAsRead());
    act(() => result.current.setFilter("new"));

    expect(result.current.filteredNotifications).toHaveLength(0);
  });

  it("does not crash when onNotificationsUpdate is not provided", () => {
    const { result } = renderHook(() =>
      useNotificationsModal({ notifications: mockNotifications }),
    );

    expect(() => {
      act(() => result.current.handleMarkAsRead("1"));
    }).not.toThrow();
  });
});
