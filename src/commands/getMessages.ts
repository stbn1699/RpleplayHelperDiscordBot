import client from "../index";
import { TextChannel } from "discord.js";

export async function getMessages(channelName: string): Promise<string>{
	const guild = client.guilds.cache.get(process.env.GUILD_ID!);
	const channel = guild?.channels.cache.find((channel) => channel.name === channelName) as TextChannel;
	if (channel) {
		let messages: any[] = [];
		let lastMessageId;
		while (true) {
			const fetchedMessages: any = await channel.messages.fetch({limit: 100, before: lastMessageId});
			if (fetchedMessages.size === 0) break;
			messages = messages.concat(Array.from(fetchedMessages.values()));
			lastMessageId = fetchedMessages.last()?.id;
		}
		const archive = messages.map(msg => ({
			author: msg.author.tag, content: msg.content
		}));
		return `Voici les messages du salon ${channelName}\n\`\`\`${archive.reverse().map(msg => `Auteur: ${msg.author}\nContenu: ${msg.content}`).join('\n\n')}\`\`\``;
	}
	return `Le salon ${channelName} n'existe pas`;
}