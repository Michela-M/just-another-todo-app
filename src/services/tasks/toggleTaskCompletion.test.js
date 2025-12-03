import { beforeEach, describe, expect, it, vi } from "vitest";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toggleTaskCompletion } from "./toggleTaskCompletion";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    doc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

describe("toggleTaskCompletion", () => {
  const mockDocRef = {};

  beforeEach(() => {
    vi.clearAllMocks();
    doc.mockReturnValue(mockDocRef);
  });

  it("should mark a task as isCompleted", async () => {
    const taskId = "abc123";
    await toggleTaskCompletion(taskId, true);

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { isCompleted: true });
  });

  it("should mark a task as not isCompleted", async () => {
    const taskId = "xyz789";
    await toggleTaskCompletion(taskId, false);

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { isCompleted: false });
  });
});
