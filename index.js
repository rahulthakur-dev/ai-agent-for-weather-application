import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Tools
function getWeatherDetails(city){
    if(city.toLowerCase() == 'london') return '10°C';
    if(city.toLowerCase() == 'paris') return '15°C';
    if(city.toLowerCase() == 'berlin') return '5°C';
}

const prompt = "Hey, what's the weather in London?";

client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: prompt}],
    max_tokens: 100
}).then(response => {
    const botResponse = response.choices[0].message.content;
    console.log(botResponse);
}).catch(err => console.log(err));


