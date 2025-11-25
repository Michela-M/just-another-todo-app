import { describe, it, expect, vi, beforeEach } from "vitest";
import { toggleTaskCompletion } from "./toggleTaskCompletion";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../src/firebase";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    updateDoc: vi.fn(),
    doc: vi.fn(),
  };
});

describe("toggleTaskCompletion", () => {
  const mockDocRef = {};

  beforeEach(() => {
    vi.clearAllMocks();
    doc.mockReturnValue(mockDocRef);
  });

  it("should mark a task as completed", async () => {
    const taskId = "abc123";
    await toggleTaskCompletion(taskId, true);

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { completed: true });
  });

  it("should mark a task as not completed", async () => {
    const taskId = "xyz789";
    await toggleTaskCompletion(taskId, false);

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { completed: false });
  });
});
