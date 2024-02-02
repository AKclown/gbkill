import React from 'react';
import { render as inkRender } from 'ink';
import Template from './Template.js';
import Exit from './Exit.js';
import Git from '../git.js';
import Version from './Version.js';

class UI {
  private git: Git;

  constructor(git: Git) {
    this.git = git;
  }

  onEventTrigger(taskId: string, branchName: string) {
    this.git.deleteLocalBranch(taskId, branchName);
  }

  clearConsole() {
    // $ 因为ink的clear函数不生效，因此采用此方法来进行清空屏幕
    // https://gist.github.com/timneutkens/f2933558b8739bbf09104fb27c5c9664
    process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
    console.clear();
  }

  render(branches: Array<any>, merged: string) {
    this.clearConsole();
    inkRender(
      <Template
        branches={branches}
        merged={merged}
        onEventTrigger={this.onEventTrigger.bind(this)}
      />
    );
  }

  renderVersion(lastVersion: string, currentVersion: string) {
    this.clearConsole();
    inkRender(
      <>
        <Version lastVersion={lastVersion} currentVersion={currentVersion} />
        <Exit code={0} />
      </>
    );
    process.exit(0);
  }

  renderExit(code: number) {
    this.clearConsole();
    inkRender(<Exit code={code} />);
  }
}
export default UI;
