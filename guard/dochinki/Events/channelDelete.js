const Discord = require("discord.js");
const { closeall } = require("../functions");
module.exports = async(channel) => {

    if (channel.guild.id !== config.server) return;
    const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let user = channel.guild.members.cache.get(id)
    if(id === config.owner) return;
    if(id === channel.guild.owner.id) return;
    let safezone = config.safezone || [];
    if(safezone.some(a => user.id === a)) return;
    let safebots = config.safezone || [];
    if(safebots.some(a => user.id === a)) return;
    if (entry.executor.id === client.user.id) return;
//////////////////
    await channel.clone().then(async kanal => {
        if (channel.parentID != null) await kanal.setParent(channel.parentID);
        await kanal.setPosition(channel.position);
        if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
      });
//////////////////
    await user.ban({reason: config.reason})
    await closeall(channel.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
      await channel.guild.channels.cache.get(config.log).send(
        new Discord.MessageEmbed()
        .setDescription(`${user} (${user.user.tag}) **Kullanıcısı sunucumuzda kanal silmeye çalıştı ve beni geçemedi ;)**`)
        .setColor("RANDOM")
        .setFooter(user.id, user.user.avatarURL())
      )
//////////////////
    }; 
  module.exports.configuration = {
      name: "channelDelete"
    }