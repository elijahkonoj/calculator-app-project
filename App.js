
import { useState } from 'react'; 
 
/**const calcData = [
  {
    id: "clear",
    value: 'AC'
  },
  {
    id: "divide",
    value: "/"
  },
  {
    id: "multiply",
    value: "*"
  },
  {
    id: "seven",
    value: 7
  },
  {
    id: "eight",
    value: 8
  },
  {
    id: "nine",
    value: 9
  },
  {
    id: "subtract",
    value: "-"
  },
  {
    id: "four",
    value: 4
  },
  {
    id: "five",
    value: 5
  },
  {
    id: "six",
    value: 6
  },
  {
    id: "add",
    value: "+"
  },
  {
    id: "one",
    value: 1
  },
  {
    id: "two",
    value: 2
  },
  {
    id: "three",
    value: 3
  },
  {
    id: "equals",
    value: "="
  },
  {
    id: "zero",
    value: 0
  },
  {
    id: "decimal",
    value: "."
  },
  
]

const numbers = [0,1,2,3,4,5,6,7,8,9];

const operators = ["/", '*', "-", ".", "=", "+"];

const KeyBoard = ( {handleInput} ) => {
 return <div className="keys">
     {calcData.map((key) => (
        <button key={key.id} onClick={() => handleInput()}>
        {key.value}
      </button>
      
      ))}
  </div>
}

const Display = ( {input, output} ) => {
  return <div className="output">
    <span className='result'>{output}</span>
    <span id='display' className='input'>{input}</span>
  </div>
} */


function App() {
   const [input, setInput] = useState("0")
   const [output, setOutput] = useState("0")
   



 /**  try {
    const result = eval(input).toString();
    setInput(result);
    setOutput(result)
  } catch (error) {
    setInput("Error");
    setOutput("Error")
  }**/
  const parseExpression = (expression) => {
    const tokens = expression.match(/\d+\.?\d*|[-+*/()]/g);
    console.log("Tokens:", tokens);
    const parsedTokens = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === '-' && (i === 0 || tokens[i - 1] === '(')) {
        // Handle negative numbers
        const nextToken = tokens[i + 1];
        if (nextToken && !isNaN(nextToken)) {
          parsedTokens.push(parseFloat(token + nextToken));
          i++; // Skip the next token
        } else {
          parsedTokens.push(token);
        }
      } else {
        parsedTokens.push(token);
      }
    }
  
    console.log("Parsed tokens:", parsedTokens);
    return parsedTokens;
  };
  
  const evaluateExpression = (parsedTokens) => {
    let currentOperator = '+';
    let result = 0;
  
    for (let i = 0; i < parsedTokens.length; i++) {
      const token = parsedTokens[i];
  
      if (!isNaN(token)) {
        const operand = parseFloat(token);
        switch (currentOperator) {
          case '+':
            result += operand;
            break;
          case '-':
            result -= operand;
            break;
          case '*':
            result *= operand;
            break;
          case '/':
            result /= operand;
            break;
          default:
            break;
        }
      } else if (token === '-') {
        // Handle negative numbers or subtraction
        const nextToken = parsedTokens[i + 1];
        if (!isNaN(nextToken)) {
          const negativeOperand = -parseFloat(nextToken);
          switch (currentOperator) {
            case '+':
              result += negativeOperand;
              break;
            case '-':
              result -= negativeOperand;
              break;
            case '*':
              result *= negativeOperand;
              break;
            case '/':
              result /= negativeOperand;
              break;
            default:
              break;
          }
          i++; // Skip the next token since it's already processed
        } else {
          currentOperator = '-';
        }
      } else {
        currentOperator = token;
      }
    }
  
    return result.toString();
  };
  
  
  const handleSubmit = () => {
    const parsedTokens = parseExpression(input);
    console.log("Parsed expression:", parsedTokens);
    const result = evaluateExpression(parsedTokens);
    console.log("Result:", result);
    setInput(result.toString());
    setOutput(result.toString());
  };
  

 


const handleClear = () => {
 setInput("0");
 setOutput("0");
}

const handleNumbers = (event) => {
 const numbers = event.target.textContent;
 
 if (input === "Error" || input === "0") {
   setInput(numbers)
   setOutput(numbers)
 } else {
   setInput(input + numbers);
   setOutput(input + numbers);
 }
}

const handleDotOperator = () => {
  const tokens = input.split(" ");
  const lastToken = tokens[tokens.length - 1];

  // Check if it's the only token
  if (tokens.length === 1) {
      if (!lastToken.includes(".")) {
          setInput(input + ".");
          setOutput(input + ".");
      }
  } else {
      // Check if the last token is empty or starts with 0
      if (lastToken === "" || lastToken.startsWith("0")) {
          setInput(input + "0."); // Add "0" before the decimal point
          setOutput(input + "0."); // Update output accordingly
      } else {
          setInput(input + ".");
          setOutput(input + ".");
      }
  }
}


const handleOperators = (event) => {
 const operators = event.target.textContent;
 
 
 
 const lastChar = input.slice(-1);

const isLastCharOperator = /[-+*/]/.test(lastChar);

const isLastCharNegative = lastChar === '-';

if (isLastCharOperator && operators === '-') {
  // If the last character is an operator and the new operator is '-', 
  // consider it as part of a negative number, so append it to the input
  setInput(input + operators);
  setOutput(output + operators); 
} else if (isLastCharNegative || input === "") {
  // If the last character is a negative sign or the input is empty,
  // consider the '-' as part of a negative number, so append it to the input
  setInput(input + operators);
  setOutput(output + operators);
} else {
  // Otherwise, append the new operator to the input
  setInput(input + " " + operators + " ");
  setOutput(output + " " + operators + " ");
}

};

  return <div id="container">
  <div id="calculator">
  <div id='display'>
    <div id="output">
      <span id="output">{output}</span>
    </div>
    <div id="input">
      <span id="input">{input}</span>
    </div>
    
  </div>
  <div id='btn-grid'>
  <button id='clear' onClick={handleClear}>AC</button>
  <button id='divide' onClick={handleOperators}>/</button>
  <button id='multiply' onClick={handleOperators}>*</button>
  <button id='seven' onClick={handleNumbers}>7</button>
  <button id='eight' onClick={handleNumbers}>8</button>
  <button id='nine' onClick={handleNumbers}>9</button>
  <button id='subtract' onClick={handleOperators}>-</button>
  <button id='four' onClick={handleNumbers}>4</button>
  <button id='five' onClick={handleNumbers}>5</button>
  <button id='six' onClick={handleNumbers}>6</button>
  <button id='add' onClick={handleOperators}>+</button>
  <button id='one' onClick={handleNumbers}>1</button>
  <button id='two' onClick={handleNumbers}>2</button>
  <button id='three' onClick={handleNumbers}>3</button>
  <button id='equals' onClick={handleSubmit}>=</button>
  <button id='zero' onClick={handleNumbers}>0</button>
  <button id='decimal' onClick={handleDotOperator}>.</button>
    </div>
  </div>
</div>
    
      
  
  
}

export default App;
