import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Tools
function getWeatherDetails(city) {
    const weatherData = {
        london: '10°C',
        paris: '15°C',
        berlin: '5°C',
        patiala: '10°C',
        mohali: '14°C'
    };
    return weatherData[city.toLowerCase()] || 'Unknown';
}


const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, Observation, and Output states.
Wait for the user prompt and first PLAN using available tools.
After planning, take the action with appropriate tools and wait for the observation based on the action.
Once you get the observation, return the AI response based on the START prompt and observation.

Available Tools:
- function getWeatherDetils(city: string):string
getWeatherDetails function will return the weather of the city in Celsius.

Example:
START
{ "type": "user", "user": "What is the sum of weather of Patiala and Mohali?" }

{ "type": "plan", "plan": "I will call the getWeatherDetails for Patiala" }

{ "type": "action", "function": "getWeatherDetails", "input": "patiala" }

{ "type": "observation", "observation": "10°C" }

{ "type": "plan", "plan": "I will call getWeatherDetails for Mohali" }

{ "type": "action", "function": "getWeatherDetails", "input": "mohali" }

{ "type": "observation", "observation": "14°C" }

{ "type": "output", "output": "The sum of weather of Patiala and Mohali is 24°C" }
`;





const prompt = "Hey, what's the weather in London?";

client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: prompt}],
    max_tokens: 100
}).then(response => {
    const botResponse = response.choices[0].message.content;
    console.log(botResponse);
}).catch(err => console.log(err));


