import * as fs from 'fs'

interface ICloudWatchLog {
  timestamp: number,
  message: string
}

interface IlogFormat {
  method: httpMethod,
  id: id,
  device: device,
  browser: browser
};

type httpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';
type id = 100 | 101 | 102 | 103 | 104 | 105 | 106;
type device = 'ios' | 'android' | 'windows' | 'macos' | 'linux';
type browser = 'chrome' | 'ie' | 'safari' | 'firefox';

function randomArrayIndex(length: number) {
  return Math.floor(Math.random() * length);
}

const httpMethod: httpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];
const id: id[] = [100, 101, 102, 103, 104, 105, 106];
const device: device[] = ['ios', 'android', 'windows', 'macos', 'linux'];
const browser: browser[] = ['chrome', 'ie', 'safari', 'firefox'];
const finePath = './output.json';
const logCount = 1000;

try {
  const dt = new Date();
  dt.setHours(dt.getHours() - 240);
  const mthodLen = httpMethod.length;
  const idLen = id.length;
  const deviceLen = device.length;
  const browserLen = browser.length;

  fs.unlinkSync(finePath);
  fs.appendFileSync(finePath, '[');
  for(let i=0; i<logCount; i++){
    const logs = {
      method: httpMethod[randomArrayIndex(mthodLen)],
      id: id[randomArrayIndex(idLen)],
      device: device[randomArrayIndex(deviceLen)],
      browser: browser[randomArrayIndex(browserLen)],
    };

    // console.log(logs);
    dt.setMinutes(dt.getMinutes() + 1);
    const cwLog = {
      timestamp: dt.getTime(),
      message: JSON.stringify(logs)
    };

    if(i === logCount-1) {
      fs.appendFileSync(finePath, `${JSON.stringify(cwLog)}\r\n`);
    } else {
      fs.appendFileSync(finePath, `${JSON.stringify(cwLog)},\r\n`);
    }
  }
  fs.appendFileSync(finePath, ']');
} catch (err) {
  console.log(err);
}