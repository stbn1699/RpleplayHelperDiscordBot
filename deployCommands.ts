import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

// Définition des commandes
const commands = [
	new SlashCommandBuilder()
		.setName("getmessages")
		.setDescription("Récupère tout les messages d'un salon et les envoie sous forme de fichier texte")
		.addStringOption(option => option
			.setName("channel")
			.setDescription("le nom du salon")
			.setRequired(true)),
].map(command => command.toJSON());

// Initialisation de REST
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

// Fonction pour enregistrer les commandes
(async () => {
	try {
		console.log("🔄 Déploiement des commandes...");

		// Enregistrement global (ATTENTION : prend environ 1 heure à se propager)
		// await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), { body: commands });

		// Enregistrement dans une guilde (instantané)
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
			{ body: commands }
		);

		console.log("✅ Les commandes ont été enregistrées !");
	} catch (error) {
		console.error("❌ Erreur lors de l'enregistrement des commandes :", error);
	}
})();