import React from 'react';
import { render as inkRender } from 'ink';
import Template from './Template.js'
import Exit from './Exit.js';

class UI {

    private clear?: () => void

    constructor() { }

    render(branches: Array<any>) {
        const { clear } = inkRender(<Template branches={branches} />)
        this.clear = clear
    }

    renderExit(code: number) {
        // TODO : 打印前清除屏幕打印
        inkRender(<Exit code={code} />)
    }

}
export default UI
