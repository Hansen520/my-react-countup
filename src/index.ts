/*
 * @Author: Hansen
 * @Date: 2023-05-22 17:24:08
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-23 14:15:37
 * @FilePath: \user-endd:\project\my-react-countup\src\index.ts
 * @Description: description
 */

console.log('这是创建的一个项目');
const a = 1;
const fn = (a: string, v: string): string => {
    console.log(a, v);
    return a + v;
};
fn('1', '3');
