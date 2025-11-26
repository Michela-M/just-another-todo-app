import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTasks } from "./getTasks";
import { getDocs, collection } from "firebase/firestore";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    getDocs: vi.fn(),
    collection: vi.fn(() => ({})),
    query: vi.fn((...args) => args),
    where: vi.fn(),
  };
});

const mockTasks = [
  {
    id: "1",
    text: "Task 1",
    isCompleted: false,
    archived: false,
    updatedAt: new Date("2025-01-02T10:00:00Z"),
  },
  {
    id: "2",
    text: "Task 2",
    isCompleted: true,
    archived: false,
    updatedAt: new Date("2025-01-01T09:00:00Z"),
  },
  {
    id: "3",
    text: "Task 3",
    isCompleted: false,
    archived: false,
    updatedAt: new Date("2025-01-03T08:00:00Z"),
  },
  {
    id: "4",
    text: "Task 4",
    isCompleted: true,
    archived: true,
    updatedAt: new Date("2025-01-04T07:00:00Z"),
  },
];

describe("get tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    collection.mockReturnValue({});
    getDocs.mockResolvedValue({
      docs: mockTasks
        .filter((task) => task.archived === false)
        .map((task) => ({
          id: task.id,
          data: () => ({
            text: task.text,
            isCompleted: task.isCompleted,
            archived: task.archived,
            updatedAt: { seconds: Math.floor(task.updatedAt.getTime() / 1000) },
          }),
        })),
    });
  });

  it("should return all tasks sorted by lastUpdated", async () => {
    const tasks = await getTasks();
    expect(tasks).toEqual([
      {
        id: "3",
        text: "Task 3",
        isCompleted: false,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-03T08:00:00Z").getTime() / 1000,
          ),
        },
      },
      {
        id: "1",
        text: "Task 1",
        isCompleted: false,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-02T10:00:00Z").getTime() / 1000,
          ),
        },
      },
      {
        id: "2",
        text: "Task 2",
        isCompleted: true,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-01T09:00:00Z").getTime() / 1000,
          ),
        },
      },
    ]);
  });
  it("should return only isCompleted tasks", async () => {
    const tasks = await getTasks(true);
    expect(tasks).toEqual([
      {
        id: "2",
        text: "Task 2",
        isCompleted: true,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-01T09:00:00Z").getTime() / 1000,
          ),
        },
      },
    ]);
  });
  it("should return only active tasks", async () => {
    const tasks = await getTasks(false);
    expect(tasks).toEqual([
      {
        id: "3",
        text: "Task 3",
        isCompleted: false,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-03T08:00:00Z").getTime() / 1000,
          ),
        },
      },
      {
        id: "1",
        text: "Task 1",
        isCompleted: false,
        archived: false,
        updatedAt: {
          seconds: Math.floor(
            new Date("2025-01-02T10:00:00Z").getTime() / 1000,
          ),
        },
      },
    ]);
  });
});
