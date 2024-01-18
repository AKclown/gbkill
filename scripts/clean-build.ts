// 删除构建产物
import shell from 'shelljs';

function run() {
    shell.rm('-rf', 'lib/**');

}
run()

export default run;