import {useState, useEffect} from "react";

export interface UseAnimatedScaleProps {
    start : () => void, 
    scale : number
}

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) : UseAnimatedScaleProps => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}