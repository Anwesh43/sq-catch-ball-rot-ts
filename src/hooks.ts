import {useState, useEffect} from "react";

export interface UseAnimatedScaleProps {
    start : () => void, 
    scale : number
}

export interface UseDimensionProps {
    w : number, 
    h : number 
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

export const useDimension = () : UseDimensionProps => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const resizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener("resize", resizeListener, false)
        return () => {
            window.removeEventListener("resize", resizeListener)
        }
    })
    return {
        w, 
        h
    }
}