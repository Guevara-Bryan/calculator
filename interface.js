//------------- HTML Elements --------------------
let HTML_keypad = document.querySelector("#keypad");
let keys = [..."789/456x123-.0=+"];
let screen_lines = document.querySelectorAll(".screen-line");
let clear_button = document.querySelectorAll(".option-button")[0];
let backspace_button = document.querySelectorAll(".option-button")[1];


//------------- Objects ---------------------------
let exp = {
    nums: ["", ""],
    current: 0,
    op: "",
    error: false,
    clear(){
        this.nums = ["", ""];
        this.op = "";
        this.current = 0;
        this.result = 0;
    }
}
//--------------------------------------------------

function calculate(){
    if((exp.op === "/") && exp.nums[1] === "0"){
        exp.clear();
        exp.error = true;
        screen_lines[0].value = "";
        screen_lines[1].value = "ERROR";
        return;
    }
    screen_lines[0].value = screen_lines[1].value;
    let result = operate(exp.op, parseFloat(exp.nums[0]), parseFloat(exp.nums[1]));
    exp.clear();
    exp.nums[0] = `${result}`;
    screen_lines[1].value = `${Math.round(exp.nums[0] * 1000)/1000}`;
}

clear_button.addEventListener("click", ()=> {
    screen_lines[0].value = "";
    screen_lines[1].value = "";
    screen_lines[1].placeholder = "0";
    exp.clear();
    exp.error = false;
});

backspace_button.addEventListener("click", ()=>{
    if(screen_lines[1].value.length === 0) return;
    if(exp.error) return;
    screen_lines[1].value = screen_lines[1].value.substring(0, screen_lines[1].value.length - 1);
    if(exp.op === ""){ exp.nums[0] = exp.nums[0].substring(0, exp.nums[0].length - 1); }
    else if (exp.op !== "" && exp.nums[1] === ""){ exp.op = ""; }
    else {
        exp.nums[1] = exp.nums[1].substring(0, exp.nums[1].length - 1);
    }
});

keys.forEach(key => {
    const HTML_key = document.createElement("button");
    HTML_key.textContent = key;
    HTML_key.setAttribute("class", "key");

    if(HTML_key.textContent.match(/\d/)){
        HTML_key.addEventListener("click", ()=> {
            if(exp.error) return;
            if(exp.nums[exp.current] === ""){
                exp.nums[exp.current] = HTML_key.textContent;
            } else {
                exp.nums[exp.current] += HTML_key.textContent;
            }
            screen_lines[1].value += HTML_key.textContent;
        });
    } 
    else {
        switch(HTML_key.textContent){
            case ".":
                HTML_key.addEventListener("click", ()=>{
                    if(exp.error) return;
                    if(exp.nums[exp.current] === ""){
                        screen_lines[1].value += "0.";
                        exp.nums[exp.current] = "0.";
                    }else if (!exp.nums[exp.current].includes(".")){
                        exp.nums[exp.current] += HTML_key.textContent;
                        screen_lines[1].value += HTML_key.textContent;
                    }
                });
                break;
            case "+":
            case "-":
            case "/":
            case "x":
                HTML_key.addEventListener("click", ()=>{
                    if(exp.error) return;
                    if(screen_lines[1].value.length === 0) return;
                    if(exp.current === 1 && exp.nums[1] !== ""){
                        calculate();
                        if(!exp.error){
                            exp.current = 1;
                            exp.op = HTML_key.textContent;
                            screen_lines[1].value += exp.op;
                        }
                    }
                    else {
                        if(exp.op !== "") return;
                        exp.current = 1;
                        exp.op = HTML_key.textContent;
                        screen_lines[1].value += HTML_key.textContent;
                    }
                    
                });
                break;
            case "=":
                HTML_key.addEventListener("click", ()=>{``
                    if(exp.nums[0] === "" || exp.nums[1] === "") return;
                    calculate();
                });
                break;
        }
    }

    HTML_keypad.appendChild(HTML_key);
})

