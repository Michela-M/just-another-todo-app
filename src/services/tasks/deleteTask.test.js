import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteTask } from "./deleteTask";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    deleteDoc: vi.fn(),
    doc: vi.fn(),
  };
});

describe("deleteTask", () => {
  const mockDocRef = {};

  beforeEach(() => {
    vi.clearAllMocks();
    doc.mockReturnValue(mockDocRef);
  });

  it("should delete a task by ID", async () => {
    const taskId = "task123";
    await deleteTask(taskId);

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
  });

  it("should throw if trying to delete a non-existent task", async () => {
    deleteDoc.mockRejectedValue(new Error("Task not found"));

    const taskId = "nonexistent";
    await expect(deleteTask(taskId)).rejects.toThrow("Task not found");

    expect(doc).toHaveBeenCalledWith(db, "tasks", taskId);
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef);
  });
});
