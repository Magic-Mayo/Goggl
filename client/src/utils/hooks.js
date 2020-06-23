import {useEffect, useState} from 'react';

export const useInnerWidth = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const widthListener = window.addEventListener('resize', () => setInnerWidth(window.innerWidth));

        return () => window.removeEventListener('resize', widthListener);
    }, []);

    return innerWidth;
}