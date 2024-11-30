import { create } from 'zustand'

interface LoginState {
  userType:"owner"|"inspector"|"client"|null,
  setUserType: (value:"owner"|"inspector"|"client") => void,
  clearUserType: () => void
}

const useLoginStore = create<LoginState>()((set) => ({
    userType:null,
    setUserType: (value:"owner"|"inspector"|"client") => {
        set({ userType:value })
    },
    clearUserType: () => {
        set({ userType:null })
    },
}))

export { useLoginStore }