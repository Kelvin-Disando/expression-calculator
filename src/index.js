function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let mathExpressionRearranged = rearrangeMathExpression(expr);

    let rightBracketPlace;
    let leftBracketPlace;

    while (mathExpressionRearranged.includes(')')) {
        let chunkInsideBrackets;
        let chunkComputationResult;
        for (let i = 0; i < mathExpressionRearranged.length; i++) {
            if (mathExpressionRearranged[i] === ')') {
                rightBracketPlace = i;
                break;
            }
        }
        for (let i = rightBracketPlace; i >= 0; i--) {
            if (mathExpressionRearranged[i] === '(') {
                leftBracketPlace = i;
                break;
            }
        }

        if (rightBracketPlace !== undefined && leftBracketPlace === undefined) {
            throw new Error('ExpressionError: Brackets must be paired');
        }

        chunkInsideBrackets = mathExpressionRearranged.slice(leftBracketPlace + 1, rightBracketPlace);
        chunkComputationResult = compute(chunkInsideBrackets);
        mathExpressionRearranged.splice(leftBracketPlace, (rightBracketPlace - leftBracketPlace) + 1, chunkComputationResult);
        leftBracketPlace = undefined;
        rightBracketPlace = undefined;
    }

    let closingResult;

    if (mathExpressionRearranged.includes('(')) {
        throw new Error('ExpressionError: Brackets must be paired')
    }
    else {
        closingResult = compute(mathExpressionRearranged);
    }
    return closingResult;

    function add(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }
    function subtract(firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    }
    function multiply(firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    }
    function divide(firstNumber, secondNumber) {
        if (secondNumber == 0) {
            throw new Error('TypeError: Division by zero.')
        }
        else { return firstNumber / secondNumber; }
    }
    function calculate(operator, firstNumber, secondNumber) {
        let result;
        switch (operator) {
            case "+":
                result = add(firstNumber, secondNumber);
                break;
            case "-":
                result = subtract(firstNumber, secondNumber);
                break;
            case "*":
                result = multiply(firstNumber, secondNumber);
                break;
            case "/":
                result = divide(firstNumber, secondNumber);
                break;
        }
        return result;
    }
    function rearrangeMathExpression(str) {
        let mathExpression = str.split('').filter(element => element !== ' ');

        let mathTokens = {
            '*': '*',
            '+': '+',
            '-': '-',
            '/': '/',
            '(': '(',
            ')': ')'
        }

        let consolidatedNumber;

        for (let i = 0; i < mathExpression.length; i++) {
            if (i == 0) { continue }
            if (mathTokens[mathExpression[i]] == undefined && mathTokens[mathExpression[i - 1]] == undefined) {
                consolidatedNumber = mathExpression[i - 1] + mathExpression[i];
                mathExpression.splice((i - 1), 2, consolidatedNumber);
                i = i - 1;
                continue;
            }
        }
        return mathExpression;
    }
    function compute(expression) {
        let resultOfOperation;
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] == "/" || expression[i] == "*") {
                let result = calculate(expression[i], expression[i - 1], expression[i + 1])
                expression.splice((i - 1), 3, result)
                i--;
            }
        }
        if (expression.length == 1) {
            resultOfOperation = expression[0];
        }
        else {
            for (let i = 0; i < expression.length; i++) {
                if (expression[i] == "+" || expression[i] == "-") {
                    finalResult = calculate(expression[i], Number(expression[i - 1]),
                        Number(expression[i + 1]));
                    expression.splice((i - 1), 3, finalResult);
                    i--;
                }
            }
            resultOfOperation = expression[0];
        }
        return resultOfOperation;
    }
}

module.exports = {
    expressionCalculator
}