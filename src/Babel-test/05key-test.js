/*
 * @Author: Hansen
 * @Date: 2023-05-23 16:57:48
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-23 17:11:51
 * @FilePath: \user-endd:\project\my-react-countup\src\Babel-test\key-test05.js
 * @Description: 生成新的关键字
 */

const acorn = require('acorn');

const Parser = acorn.Parser;
const TokenType = acorn.TokenType;

Parser.acorn.keywordTypes['hansen'] = new TokenType('hansen', { keyword: 'hansen' });

function wordsRegexp(words) {
    return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
}

var hansenKeyword = function(Parser) {
    return class extends Parser {
        parse(program) {
            let newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
            newKeywords += " hansen";
            this.keywords = new RegExp("^(?:" + newKeywords.replace(/ /g, "|") + ")$");
            return(super.parse(program));
        }

        parseStatement(context, topLevel, exports) {
            var startType = this.type;

            if (startType == Parser.acorn.keywordTypes["hansen"]) {
                var node = this.startNode();
                return this.parseHansenStatement(node);
            } else {
                return(super.parseStatement(context, topLevel, exports));
            }
        }

        parseHansenStatement(node) {
            this.next();
            return this.finishNode({value: 'hansen'}, 'HansenStatement')
        }
    }
}
const newParser = Parser.extend(hansenKeyword);

var program = `
    hansen
    const a = 1
`;
const ast = newParser.parse(program);
/*
    Node {
        type: 'Program',
        start: 0,
        end: 28,
        body: [
            { value: 'hansen', type: 'HansenStatement', end: 11 },
            Node {
            type: 'VariableDeclaration',
            start: 16,
            end: 27,
            declarations: [Array],
            kind: 'const'
            }
        ],
        sourceType: 'script'
        }
*/
console.log(ast, 54);