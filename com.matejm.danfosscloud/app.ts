import Homey from 'homey';
import * as DanfossAPI from "./src/danfoss-api"

module.exports = class DanfossCloudApp extends Homey.App {
  async onInit() {
    this.log('DanfossCloudApp has been initialized');
    const token = await DanfossAPI.getAccessToken()
    this.log(token)
  }
}
