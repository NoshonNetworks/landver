import { create } from 'zustand'

interface LoginState {
  userType:"owner"|"inspector"|"client"|null,
  setUserType: (value:"owner"|"inspector"|"client") => void
}

const useLoginStore = create<LoginState>()((set) => ({
    userType:"client",
    setUserType: (value:"owner"|"inspector"|"client") => {
        set({ userType:value })
    }
}))

export { useLoginStore }