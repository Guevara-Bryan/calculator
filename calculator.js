const add = (a, b) => a + b;

const sub = (a, b) => a - b;

const mult = (a, b) =>  a * b;

const div = (a, b) => { if(b) return a / b; }


function operate(op, num1, num2){
    _op = op.match(/\+|-|x|\//);
    if(_op === null) return;

    let result;
    switch(_op[0]){
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = sub(num1, num2);
            break;
        case "x":
            result = mult(num1, num2);
            break;
        case "/":
            result = div(num1, num2);
            break;
        default:
            console.log("ERROR");
            break;
    }

    return result;
}
