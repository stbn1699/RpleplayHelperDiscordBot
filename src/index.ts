import { AttachmentBuilder, ChannelType, Client, GatewayIntentBits, Interaction } from "discord.js";
import dotenv from "dotenv";
import { getMessages } from "./commands/getMessages";
import { join } from "path";
import { tmpdir } from "os";
import { writeFileSync } from "fs";

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
});
export default client;

client.on("ready", () => {
	console.log(`Bot connecté en tant que ${client.user?.tag}`);
});

let currentInteraction: Interaction | null = null;

export function setCurrentInteraction(interaction: Interaction): void {
	currentInteraction = interaction;
}

export function getCurrentInteraction(): Interaction | null {
	return currentInteraction;
}

client.on("interactionCreate", async (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const {commandName} = interaction;
	setCurrentInteraction(interaction);

	if (commandName === "getmessages") {
		const messages = await getMessages(interaction.options.getString("channel")!);
		const filePath = join(tmpdir(), "message.txt");
		writeFileSync(filePath, messages);
		const attachment = new AttachmentBuilder(filePath);
		interaction.reply({ files: [attachment] });
	}
});

client.login(process.env.TOKEN);