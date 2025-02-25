
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Board {
  id: string
  name: string
  description: string
  createdAt: string
}

interface BoardsStore {
  boards: Board[]
  addBoard: (board: Board) => void
  removeBoard: (id: string) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
}

export const useBoardsStore = create<BoardsStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: (board) => 
        set((state) => ({ 
          boards: [...state.boards, board] 
        })),
      removeBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id)
        })),
      updateBoard: (id, updates) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, ...updates } : board
          )
        }))
    }),
    {
      name: 'boards-storage'
    }
  )
)
