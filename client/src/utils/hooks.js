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
        const mousemove = window.addEventListener('mousemove', () => setIsMouseMoving(true));
        const keys = window.addEventListener('keypress', () => setIsKeyPressed(true));
        const mouseClick = window.addEventListener('click', () => setIsMouseMoving(true));

        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('keypress', keys);
            window.removeEventListener('click', mouseClick);
        }
    }, []);

    return [isKeyPressed, isMouseMoving, setIsKeyPressed, setIsMouseMoving];
}