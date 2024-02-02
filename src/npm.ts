import urlJoin from 'url-join';
import axios from 'axios';
import semver from 'semver';

class Npm {
  getNpmInfo(npmName: string) {
    if (!npmName) {
      return null;
    }
    // 国内环境可能访问外网会非常卡顿
    const npmjs = urlJoin('https://registry.npmjs.org/', npmName);
    const npmmirror = urlJoin('https://registry.npmmirror.com/', npmName);
    const request = [axios.get(npmjs), axios.get(npmmirror)];
    return Promise.race(request)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
        return null;
      })
      .catch(() => {
        return null;
      });
  }

  async getNpmVersions(npmName: string) {
    const data = await this.getNpmInfo(npmName);
    if (data) {
      return Object.keys(data.versions);
    } else {
      return [];
    }
  }

  getSemverVersions(baseVersion: string, versions: Array<string>) {
    const lastVersions = versions
      .filter(version => {
        return !semver.satisfies(version, `~${baseVersion}`);
      })
      .sort((a, b) => {
        return semver.gt(a, b) ? -1 : 1;
      });
    return lastVersions;
  }

  async getNpmSemverVersion(baseVersion: string, npmName: string) {
    const versions = await this.getNpmVersions(npmName);
    const newVersions = this.getSemverVersions(baseVersion, versions);
    if (newVersions && newVersions.length > 0) {
      return newVersions[0];
    }
    return baseVersion;
  }
}

export default Npm;
