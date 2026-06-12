"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface IntroContextType {
  hasPlayedIntro: boolean
  isDrawing: boolean
}

const IntroContext = createContext<IntroContextType>({
  hasPlayedIntro: false,
  isDrawing: true,
})

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)
  const [isDrawing, setIsDrawing] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setIsDrawing(false), 2500)
    const t2 = setTimeout(() => {
      setHasPlayedIntro(true)
    }, 4500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <IntroContext.Provider value={{ hasPlayedIntro, isDrawing }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)
