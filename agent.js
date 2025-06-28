import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const messages = [
    {
      role: "system",
      content: `You are Jerry, a financial expert. Who track expenses, income and advice and suggest how to spend money of current month ${new Date().toUTCString()}.`,
    },
  ];

  messages.push({
    role: "user",
    content: `How much money I have spend in this month ?`,
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
      }

      messages.push({
        role: "tool",
        content: result,
        tool_call_id: tool.id,
      });
    }
  }
}

main();

//Get total Expenses

function getTotalExpenses({ from, to }) {
  console.log("GetTotal Expenses function", from, to);
  return "10000 INR";
}
