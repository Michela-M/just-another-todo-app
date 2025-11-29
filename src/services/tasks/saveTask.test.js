import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { saveTask } from "./saveTask";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    addDoc: vi.fn(),
    collection: vi.fn(),
    serverTimestamp: vi.fn(() => "2025-01-01T12:00:00Z"),
  };
});

describe("saveTask", () => {
  const mockAddDoc = addDoc;
  const mockCollectionRef = {};

  beforeEach(() => {
    vi.clearAllMocks();
    collection.mockReturnValue(mockCollectionRef);
  });

  it("should create a new task with valid data", async () => {
    mockAddDoc.mockResolvedValueOnce({ id: "task123" });

    const onTaskAdded = vi.fn();
    await saveTask("New Task", "abc123", onTaskAdded);

    expect(collection).toHaveBeenCalledWith(db, "tasks");
    expect(mockAddDoc).toHaveBeenCalledWith(mockCollectionRef, {
      description: "New Task",
      userId: "abc123",
      isArchived: false,
      isCompleted: false,
      createdAt: "2025-01-01T12:00:00Z",
      updatedAt: "2025-01-01T12:00:00Z",
    });
    expect(onTaskAdded).toHaveBeenCalled();
  });

  it("should throw if title is missing", async () => {
    await expect(saveTask("", "abc123", vi.fn())).rejects.toThrow(
      "Task title is required",
    );
  });

  it("should attach correct userId to new task", async () => {
    mockAddDoc.mockResolvedValueOnce({ id: "task123" });

    await saveTask("New Task", "abc123", vi.fn());

    const [[, taskData]] = mockAddDoc.mock.calls;
    expect(taskData.userId).toBe("abc123");
  });

  it("should throw if userId is missing", async () => {
    await expect(saveTask("New Task")).rejects.toThrow("User ID is required");
  });
});
