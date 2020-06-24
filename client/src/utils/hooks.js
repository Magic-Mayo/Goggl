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