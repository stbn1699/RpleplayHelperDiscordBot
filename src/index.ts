import { ChannelType, Client, GatewayIntentBits, Interaction } from "discord.js";
import dotenv from "dotenv";

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
		interaction.reply(GetMessages());
	}
});

client.login(process.env.TOKEN);