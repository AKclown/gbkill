import React from 'react';
import { render as inkRender } from 'ink';
import Template from './Template.js'
import Exit from './Exit.js';
import Git from '../git.js';

class UI {

    private clear?: () => void
    private git: Git;

    constructor(git: Git) {
        this.git = git
    }

    onEventTrigger(taskId: string, branchName: string) {
        this.git.deleteLocalBranch(taskId, branchName)
    }

    render(branches: Array<any>) {
        const { clear } = inkRender(<Template branches={branches} onEventTrigger={this.onEventTrigger.bind(this)} />)
        this.clear = clear
    }

    renderExit(code: number) {
        // TODO : 打印前清除屏幕打印
        this.clear!()
        inkRender(<Exit code={code} />)
    }

}
export default UI
