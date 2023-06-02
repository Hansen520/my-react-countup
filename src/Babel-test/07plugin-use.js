/*
 * @Author: Hansen
 * @Date: 2023-05-24 17:27:36
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-31 17:11:20
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\07plugin-use.js
 * @Description: 插件的使用方式
 */
export default function(api, options) {
    return {
        plugins: ['pluginA'],
        presets: [['presetsB', { options: 'bbb'}]]
    }
  }