import { Markup, Telegraf } from "telegraf";
import { InitOllama, GetResponse } from "./ollamaPart";

let modelChoosed = false;

// Your token here
const token = "";

const deepseek = "deepseek-r1:7b";
const qwen = "qwen2.5:3b";

const bot = new Telegraf(token);
const keyboard = Markup.keyboard([
    [qwen],
    [deepseek]
]).oneTime().resize();


bot.start(ctx => {
    return ctx.reply("Choose a model: ", keyboard);
});

bot.on("text", async ctx => {
    const text = ctx.message.text.trim();

    if(text === "deepseek-r1:7b" || text === "qwen2.5:3b"){
        InitOllama(text);
        ctx.reply(`Hi! I'm ${text === "deepseek-r1:7b"? "deepseek-r1:7b" : "qwen2.5:3b"}! How can I help you today?`);
        modelChoosed = true;
        return;
    }

    if(!modelChoosed || !text) return;

    const prompt = text;
    const response = await GetResponse(prompt);
    ctx.reply(response);
});

bot.launch();