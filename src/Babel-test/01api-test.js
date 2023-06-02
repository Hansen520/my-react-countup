/*
 * @Author: Hansen
 * @Date: 2023-05-23 14:15:59
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-23 14:18:59
 * @FilePath: \user-endd:\project\my-react-countup\src\test.js
 * @Description: description
 */
const { codeFrameColumns } = require("@babel/code-frame");

try {
    throw new Error('XXXXXXXX 错误');
} catch(err) {
    console.error(codeFrameColumns(`const name = guang`, {
        start: { line: 1, column: 14 }
    }, {
      highlightCode: true,
      message: err.message
    }));
}