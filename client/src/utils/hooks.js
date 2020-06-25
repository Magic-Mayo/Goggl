import {useEffect, useState} from 'react';

export const useWindowDimensions = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const setDimensions = window.addEventListener('resize', () => {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        });

        return () => window.removeEventListener('resize', setDimensions);
    }, []);

    return [innerWidth, innerHeight];
}

export const useBrowserTimeout = () => {
    const [isMouseMoving, setIsMouseMoving] = useState(false);
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    useEffect(() => {
        window.addEventListener('mousemove', () => setIsMouseMoving(true))
        window.addEventListener('keypress', () => setIsKeyPressed(true))
    }, []);

    return [isKeyPressed, isMouseMoving, setIsKeyPressed, setIsMouseMoving];
}