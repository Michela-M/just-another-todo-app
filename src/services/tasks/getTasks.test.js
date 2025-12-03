import { beforeEach, describe, expect, it, vi } from "vitest";
import { collection, getDocs } from "firebase/firestore";
import { getTasks } from "./getTasks";

const MILLISECONDS_IN_SECOND = 1000;

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    collection: vi.fn(() => ({})),
    getDocs: vi.fn(),
  };
});

const mockTasks = [
  {
    description: "Task 1",
    id: "1",
    isArchived: false,
    isCompleted: false,
    updatedAt: {
      seconds: Math.floor(
        new Date("2025-01-02T10:00:00Z").getTime() / MILLISECONDS_IN_SECOND,
      ),
    },
    userId: "abc123",
  },
  {
    description: "Task 2",
    id: "2",
    isArchived: false,
    isCompleted: true,
    updatedAt: {
      seconds: Math.floor(
        new Date("2025-01-01T09:00:00Z").getTime() / MILLISECONDS_IN_SECOND,
      ),
    },
    userId: "abc123",
  },
  {
    description: "Task 3",
    id: "3",
    isArchived: false,
    isCompleted: false,
    updatedAt: {
      seconds: Math.floor(
        new Date("2025-01-03T08:00:00Z").getTime() / MILLISECONDS_IN_SECOND,
      ),
    },
    userId: "abc123",
  },
  {
    description: "Task 4",
    id: "4",
    isArchived: false,
    isCompleted: true,
    updatedAt: {
      seconds: Math.floor(
        new Date("2025-01-04T07:00:00Z").getTime() / MILLISECONDS_IN_SECOND,
      ),
    },
    userId: "otherUser",
  },
  {
    description: "Task 5",
    id: "5",
    isArchived: true,
    isCompleted: true,
    updatedAt: {
      seconds: Math.floor(
        new Date("2025-01-05T07:00:00Z").getTime() / MILLISECONDS_IN_SECOND,
      ),
    },
    userId: "abc123",
  },
];

describe("getTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: mockTasks.map((task) => ({
        data: () => task,
        id: task.id,
      })),
    });
  });

  it("should return all tasks sorted by lastUpdated", async () => {
    const tasks = await getTasks("abc123");
    expect(tasks.map((task) => task.id)).toEqual(["3", "1", "2"]);
  });

  it("should return only completed tasks", async () => {
    const tasks = await getTasks("abc123", true);
    expect(tasks.map((task) => task.id)).toEqual(["2"]);
  });

  it("should return only active tasks", async () => {
    const tasks = await getTasks("abc123", false);
    expect(tasks.map((task) => task.id)).toEqual(["3", "1"]);
  });

  it("should return empty list if user has no tasks", async () => {
    const tasks = await getTasks("nouser");
    expect(tasks).toEqual([]);
  });

  it("should exclude tasks belonging to other users", async () => {
    const tasks = await getTasks("abc123");
    expect(tasks.every((task) => task.userId === "abc123")).toBe(true);
  });
});
