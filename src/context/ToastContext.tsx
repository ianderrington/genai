import React, { createContext, useContext, useState, useCallback } from 'react'
import { Toast } from '../components/Toast'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = useCallback((newMessage: string) => {
    setMessage(newMessage)
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 m-8">
        <Toast message={message} type="info" isVisible={isVisible} />
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 