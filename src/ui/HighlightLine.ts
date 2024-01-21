import { useState, useEffect } from 'react';
import { useStdout } from 'ink';
import ansiEscapes from 'ansi-escapes';
import colors from 'colors'

export interface Position {
    x: number;
    y: number;
}

// TODO 暂时不知道如何绘制背景线条
const useHighlightLine = () => {
    const { stdout } = useStdout();

    const print = (message: string) => {
        stdout.write(message)
    }

    const setCursorAt = ({ x, y }: Position) => {
        print(ansiEscapes.cursorTo(x, y));
    }

    const printAt = (message: string, position: Position) => {
        setCursorAt(position);
        print(message);
    }

    const paintBgRow = (row: number, columns: number) => {
        let paintSpaces = '';
        for (let i = 0; i < columns; ++i) {
            paintSpaces += ' ';
        }
        printAt(colors.bgBlue(paintSpaces), { x: 0, y: row })
    }

    return paintBgRow
}

export default useHighlightLine