import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Create handler for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener with throttling for better performance
    let resizeTimer: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }
    
    window.addEventListener("resize", throttledResize)
    
    // Clean up
    return () => {
      window.removeEventListener("resize", throttledResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Return false during SSR, then actual value after mount
  return isMobile === undefined ? false : isMobile
}
