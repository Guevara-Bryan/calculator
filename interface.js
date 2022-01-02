//------------- HTML Elements --------------------
let HTML_keypad = document.querySelector("#keypad");
let keys = [..."789/456x123-.0=+"];
let screen_lines = document.querySelectorAll(".screen-line");
let clear_button = document.querySelector("#clear-button");


//------------- Objects ---------------------------
let exp = {
    nums: new Array(2),
    current: 0,
    op: "",
    clear(){
        this.nums = [undefined, undefined];
        this.op = "";
        this.current = 0;
        this.result = 0;
    }
}
//--------------------------------------------------



clear_button.addEventListener("click", ()=> {
    screen_lines[0].value = "";
    screen_lines[1].value = "";
    screen_lines[1].placeholder = "0";
    exp.clear();
});

keys.forEach(key => {
    const HTML_key = document.createElement("button");
    HTML_key.textContent = key;
    HTML_key.setAttribute("class", "key");

    if(HTML_key.textContent.match(/\d/)){
        HTML_key.addEventListener("click", ()=> {
            if(screen_lines[1].value === "ERROR") return;
            if(exp.nums[exp.current] === undefined){
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
                    if(screen_lines[1].value === "ERROR") return;
                    if(exp.nums[exp.current] === undefined){
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
                    if(screen_lines[1].value === "ERROR") return;
                    if(screen_lines[1].value.length === 0) return;
                    if(exp.current === 1 && exp.nums[1] !== undefined){
                        if((exp.op === "/") && exp.nums[1] === "0"){
                            exp.clear();
                            screen_lines[0].value = "";
                            screen_lines[1].value = "ERROR";
                            return;
                        }

                        screen_lines[0].value = screen_lines[1].value;
                        let result = operate(exp.op, parseFloat(exp.nums[0]), parseFloat(exp.nums[1]));
                        exp.clear();
                        exp.nums[exp.current] = result;
                        exp.current = 1;
                        exp.op = HTML_key.textContent;
                        screen_lines[1].value = `${Math.round(exp.nums[0] * 1000)/1000}${exp.op}`;
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
                HTML_key.addEventListener("click", ()=>{
                    if(exp.nums[0] === undefined || exp.nums[1] === undefined) return;
                    if((exp.op === "/") && exp.nums[1] === "0"){
                        exp.clear();
                        screen_lines[0].value = "";
                        screen_lines[1].value = "ERROR";
                        return;
                    }
                    screen_lines[0].value = screen_lines[1].value;
                    let result = operate(exp.op, parseFloat(exp.nums[0]), parseFloat(exp.nums[1]));
                    exp.clear();
                    exp.nums[0] = result;
                    screen_lines[1].value = `${Math.round(exp.nums[0] * 1000)/1000}`;
                });
                break;
        }
    }

    HTML_keypad.appendChild(HTML_key);
})

