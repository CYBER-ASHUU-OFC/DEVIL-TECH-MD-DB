/* 
ᴄʀᴇᴀᴛᴇᴅ ʙʏ :  𝙲𝚈𝙱𝙴𝚁 𝙰𝚂𝙷𝚄𝚄 𝙾𝙵𝙲
contact me 94760091093
ᴘʟᴇᴀꜱᴇ ᴅᴏɴᴛ ʀᴇᴍᴏᴠᴇ ᴏᴡɴᴇʀ ᴄʀᴇᴅɪᴛꜱ 💀📍
*/

const { cmd } = require('../lib/command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3'); // Importing the denethdev-ytmp3 package for downloading

cmd({
  pattern: "god",
  desc: "Download songs.",
  category: "download",
  react: '🎧',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A Song Name or Url 🙄*");
    
    // Search for the song using yt-search
    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No Song Found Matching Your Query 🧐*");
    }

    const songData = searchResults.videos[0];
    const songUrl = songData.url;

    // Using denethdev-ytmp3 to fetch the download link
    const result = await ddownr.download(songUrl, 'mp3'); // Download in mp3 format
    const downloadLink = result.downloadUrl; // Get the download URL

    let songDetailsMessage = `╭━━━〔 *VOID NEXUS  ＭＤ* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *Use headphones for best experience🎧🎶💆‍♂️*
┃▸└───────────···๏
╰────────────────┈⊷
*╭━━━━━━━━━━━━━━━━━❐━⪼*
*┇๏* *Title* -  ${songData.title}
*┇๏* *Duration* - ${songData.timestamp}
*┇๏* *Uploader* -  ${songData.author.name}
*┇๏* *Release Date* -  ${songData.ago}
*┇๏* *Views* -  ${songData.views}
*┇๏* *Url* -  ${songData.url}
*╰━━━━━━━━━━━━━━━━━❐━⪼*

*🌟 𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝘀 -* https://whatsapp.com/channel/0029Vb9u0GQ8qIzmoGPEtq0s

> *㊛ Ꮲᴏꪝᴇʀᴅ Вʏ  Ꮩᴏɪᴅ Νᴇxᴜꜱ Ꭲᴇᴀᴍ*`;

    // Send the video thumbnail with song details
    await messageHandler.sendMessage(from, {
      image: { url: songData.thumbnail },
      caption: songDetailsMessage,
    }, { quoted: quotedMessage });

// Send audio as forwarded audio
        await conn.sendMessage(from, { audio: { url: downloadlink }, mimetype: "audio/mpeg", contextInfo }, { quoted: mek });

    // Send the song as a PTT (Push-To-Talk)
    await messageHandler.sendMessage(from, {
      audio: { url: downloadLink },
      mimetype: "audio/mpeg",
      ptt: true, // PTT enabled
    }, { quoted: quotedMessage });

  } catch (error) {
    console.error(error);
    reply("*An Error Occurred While Processing Your Request ❗*");
  }
});
