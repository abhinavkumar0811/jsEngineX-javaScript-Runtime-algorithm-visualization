import * as parser from '@babel/parser';

/**
 * Parses raw JavaScript code into an Abstract Syntax Tree (AST).
 * @param {string} code 
 * @returns {object} AST AST representation with locations (loc) enabled.
 */
export function parseCodeToAST(code) {
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
      errorRecovery: true,
      ranges: true,
      tokens: true
    });
    return { success: true, ast };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message,
        line: error.loc?.line || 1,
        column: error.loc?.column || 0
      }
    };
  }
}
