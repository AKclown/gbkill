



import { useState, useEffect, useCallback } from 'react';
import { useInput, Key } from 'ink';

const userInput = () => {
    const eventlistener = useCallback((input: string, key: Key) => {
        console.log('input: ', input);
        console.log('key: ', key);
    }, [])

    useInput(eventlistener)
}

export default userInput




