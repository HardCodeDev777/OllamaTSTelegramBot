import ollama from 'ollama'

let modelName: string = "";

export const InitOllama = (modelNameFromTelegram: string) => modelName = modelNameFromTelegram;

export async function GetResponse(prompt: string): Promise<string>{
    if(modelName === "") return "No model initialized!";
    
    const responseFromOllama = await ollama.chat({
    model: modelName,
    messages: [{ role: 'user', content: prompt }],
    });

    return responseFromOllama.message.content;
};