import React from "react"
import { getYear } from "date-fns"

const footer = () => {
  const today = new Date()
  const currentYear = getYear(today)

  return (
  <div className="min-h-screen">
      <div className="sticky top-[100vh]">
        <div className="font-space-grotesk text-center bg-slate-900">
        <p className="text-white">© {currentYear} </p>
        <a className="text-white cursor-pointer" href="https://github.com/igudy">
          Igunma Goodness Igudy (IG THE CODE SLINGER)
          </a>
          </div>
    </div>
  </div>
  )
}

export default footer
