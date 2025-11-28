import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "../../src/firebase";
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

describe("save task", () => {
  const mockAddDoc = addDoc,
    mockCollectionRef = {};

  beforeEach(() => {
    vi.clearAllMocks();
    collection.mockReturnValue(mockCollectionRef);
  });

  it("should create a new task with valid data", async () => {
    mockAddDoc.mockResolvedValueOnce({ id: "task123" });

    const onTaskAdded = vi.fn();
    await saveTask("New Task", onTaskAdded);

    expect(collection).toHaveBeenCalledWith(db, "tasks");
    expect(mockAddDoc).toHaveBeenCalledWith(mockCollectionRef, {
      isArchived: false,
      isCompleted: false,
      createdAt: "2025-01-01T12:00:00Z",
      description: "New Task",
      updatedAt: "2025-01-01T12:00:00Z",
    });
    expect(onTaskAdded).toHaveBeenCalled();
  });

  it("should throw if title is missing", async () => {
    await expect(saveTask("", vi.fn())).rejects.toThrow(
      "Task title is required",
    );
  });
});
