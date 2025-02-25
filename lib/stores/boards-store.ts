
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
  selectedBoard: string | null
  setSelectedBoard: (boardName: string | null) => void
  addBoard: (board: Board) => void
  removeBoard: (id: string) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
}

export const useBoardsStore = create<BoardsStore>()(
  persist(
    (set) => ({
      boards: [],
      selectedBoard: null,
      setSelectedBoard: (boardName) => set({ selectedBoard: boardName }),
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
