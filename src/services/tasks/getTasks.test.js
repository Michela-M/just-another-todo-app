import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTasks } from "./getTasks";
import { getDocs, collection } from "firebase/firestore";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    getDocs: vi.fn(),
    collection: vi.fn(() => ({})),
  };
});

const mockTasks = [
  {
    id: "1",
    userId: "abc123",
    description: "Task 1",
    isCompleted: false,
    isArchived: false,
    updatedAt: {
      seconds: Math.floor(new Date("2025-01-02T10:00:00Z").getTime() / 1000),
    },
  },
  {
    id: "2",
    userId: "abc123",
    description: "Task 2",
    isCompleted: true,
    isArchived: false,
    updatedAt: {
      seconds: Math.floor(new Date("2025-01-01T09:00:00Z").getTime() / 1000),
    },
  },
  {
    id: "3",
    userId: "abc123",
    description: "Task 3",
    isCompleted: false,
    isArchived: false,
    updatedAt: {
      seconds: Math.floor(new Date("2025-01-03T08:00:00Z").getTime() / 1000),
    },
  },
  {
    id: "4",
    userId: "otherUser",
    description: "Task 4",
    isCompleted: true,
    isArchived: false,
    updatedAt: {
      seconds: Math.floor(new Date("2025-01-04T07:00:00Z").getTime() / 1000),
    },
  },
  {
    id: "5",
    userId: "abc123",
    description: "Task 5",
    isCompleted: true,
    isArchived: true,
    updatedAt: {
      seconds: Math.floor(new Date("2025-01-05T07:00:00Z").getTime() / 1000),
    },
  },
];

describe("getTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: mockTasks.map((task) => ({
        id: task.id,
        data: () => task,
      })),
    });
  });

  it("should return all tasks sorted by lastUpdated", async () => {
    const tasks = await getTasks("abc123");
    expect(tasks.map((t) => t.id)).toEqual(["3", "1", "2"]);
  });

  it("should return only completed tasks", async () => {
    const tasks = await getTasks("abc123", true);
    expect(tasks.map((t) => t.id)).toEqual(["2"]);
  });

  it("should return only active tasks", async () => {
    const tasks = await getTasks("abc123", false);
    expect(tasks.map((t) => t.id)).toEqual(["3", "1"]);
  });

  it("should return empty list if user has no tasks", async () => {
    const tasks = await getTasks("nouser");
    expect(tasks).toEqual([]);
  });

  it("should exclude tasks belonging to other users", async () => {
    const tasks = await getTasks("abc123");
    expect(tasks.every((t) => t.userId === "abc123")).toBe(true);
  });
});
