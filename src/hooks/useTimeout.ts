import {useCallback, useEffect} from "react";

export const useTimeout = (callback: () => void, delay: number) => {
    useEffect(() => {
        const timer = setTimeout(useCallback, delay)

        return () => clearTimeout(timer)
    }, []);
}

export default useTimeout