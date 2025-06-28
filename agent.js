import readline from "node:readline/promises";
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const expenseDB = [];
const incomeDB = [];

async function main() {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const messages = [
    {
      role: "system",
      content: `You are Jerry, a financial expert. Who track expenses, income and advice and suggest how to spend money of current month ${new Date().toUTCString()}.
      You have access of following tools:
      1.getTotalExpenses({from,to}):string // it return total expense of specific period
      2.addExpense({name,amount}):string // it add expense in database
      3. addIncome({source,amount}):string //it add income in database
      `,
    },
  ];

  //   messages.push({
  //     role: "user",
  //     content: `Bought a macbook of 50000 INR`,
  //   });
  //   messages.push({
  //     role: "user",
  //     content: `My total expense of this month`,
  //   });

  while (true) {
    const user = await r1.question("User :");
    if (user === "bye") {
      break;
    }

    messages.push({
      role: "user",
      content: user,
    });

    while (true) {
      const completion = await groq.chat.completions.create({
        messages: messages,
        model: "llama-3.3-70b-versatile",
        tools: [
          {
            type: "function",
            function: {
              name: "getTotalExpenses",
              description: "To get total expenses from date to date",
              parameters: {
                type: "object",
                properties: {
                  from: {
                    type: "string",
                    description: "From date to get expense",
                  },
                  to: {
                    type: "string",
                    description: "To date to get expense",
                  },
                },
              },
            },
          },
          {
            type: "function",
            function: {
              name: "addExpense",
              description:
                "To add all expenses in Database,Objects will stored in database which contain two properties",
              parameters: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "it is name of expense e.g. bought an iphone",
                  },
                  amount: {
                    type: "string",
                    description: "it is amount of expense eg. 4000 inr,",
                  },
                },
              },
            },
          },
          {
            type: "function",
            function: {
              name: "addIncome",
              description:
                "To add all income in Database,Objects will stored in database which contain two properties source and amount",
              parameters: {
                type: "object",
                properties: {
                  source: {
                    type: "string",
                    description:
                      "it is name of income e.g. earned from freelancing, made money by selling books",
                  },
                  amount: {
                    type: "string",
                    description: "it is amount of income eg. 1000 inr,",
                  },
                },
              },
            },
          },
        ],
      });

      const toolCall = completion.choices[0].message.tool_calls;
      messages.push(completion.choices[0].message);

      if (!toolCall) {
        console.log(
          "Assistant :",
          JSON.stringify(completion.choices[0].message.content, 0, 2)
        );
        break;
      }

      for (let tool of toolCall) {
        const functionName = tool.function.name;
        const functionArgs = JSON.parse(tool.function.arguments);

        let result = "";
        if (functionName === "getTotalExpenses") {
          result = getTotalExpenses(functionArgs);
        } else if (functionName === "addExpense") {
          //   console.log("functionalargument**", functionArgs);
          result = addExpense(functionArgs);
        } else if (functionName === "addIncome") {
          result = addIncome(functionArgs);
        }

        messages.push({
          role: "tool",
          content: result,
          tool_call_id: tool.id,
        });
      }
    }
  }
  r1.close();
}

main();

//Get total Expenses

function getTotalExpenses({ from, to }) {
  //   console.log("GetTotal Expenses function", from, to);
  const expense = expenseDB.reduce((acc, item) => {
    return (acc = acc + item);
  }, 0);
  return `Made total of ${expense} from ${from} to ${to}`;
}

//Add expense in database
function addExpense({ name, amount }) {
  //   console.log(`Made an expense of ${amount} for ${name}`);
  expenseDB.push({ name, amount });
  return `expense added into db of ${amount} for ${name}`;
}

// Add income in database
function addIncome({ source, amount }) {
  incomeDB.push({ source: source, amount: amount });
  return `Earned amount of ${amount} INR from ${source}`;
}
