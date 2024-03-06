import {useState, useEffect, CSSProperties} from "react";

export interface UseAnimatedScaleProps {
    start : () => void, 
    scale : number
}

export interface UseDimensionProps {
    w : number, 
    h : number 
}

export interface UseStyleProps {
    parentStyle() : CSSProperties,
    fixInMiddleStyle(rot : number) : CSSProperties,
    blockStyle() : CSSProperties, 
    circleStyle() : CSSProperties 
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

const sinify = (scale : number) : number => Math.min(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number, color : string) : UseStyleProps => {
    const sf : number = sinify(scale)
    const size : number = Math.min(w, h) / 10 
    const position = 'absolute'
    return {
        parentStyle() : CSSProperties {
            return {
                position
            }
        },
        fixInMiddleStyle(rot : number) : CSSProperties {
            return {
                position,
                left: `${w / 2}px`,
                top: `${h / 2}px`,
                transform: `rotate(${rot * sf}deg)`
            }
        },
        blockStyle() : CSSProperties {
            return {
                position,
                top: `${-size}px`,
                left:"0px",
                width: `${size}px`,
                height: `${size}px`,
                background: color
            }
        },
        circleStyle() : CSSProperties {
            return {
                position, 
                top: `${ -size -h * 0.5 * (1 - sf)}px`,
                left: `${-size}px`,
                borderRadius: '50%',
                width: `${size}px`,
                height: `${size}px`,
                background: color
            }
        }
    }    
}