

const { cmd } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3');

cmd({
  pattern: "dk2",
  desc: "Download songs.",
  category: "download",
  react: '?',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A Song Name or Url ?*");
    
    // Search for the song using yt-search
    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No Song Found Matching Your Query ?*");
    }

    const songData = searchResults.videos[0];
    const songUrl = songData.url;

    // Using denethdev-ytmp3 to fetch the download link
    const result = await ddownr.download(songUrl, 'mp3'); // Download in mp3 format
    const downloadLink = result.downloadUrl; // Get the download URL

    let songDetailsMessage = `*?? ????? ?????????? ??*

*?=========================?*
*¨q©¬©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¬?*
*©§* ? *Title:* *${yts.title}*
*©§* 
*©§* ? *Duration:* *${yts.timestamp}*
*©§* 
*©§* ? *Views:* *${yts.views}*
*©§* 
*©§* ? *Author:* *${yts.author.name}*
*©§* 
*©§* ? *Link:* *${yts.url}*
*¨t©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¬?*

*???©¥©­©¥©­©¥©­©¥©­©¥©­©¥©­©¥©­©¥©­©¥©­©¥???*

*? Reply below number*

*¨q©¬©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¬?*
*©§1 ©¦??? AUDIO DOWNLOAD* ?
*©§2 ©¦??? VOICE DOWNLOAD* ?
*¨t©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¬?*

*Github Repo:* *https://github.com/deviltech567/DEVIL-TECH-MD*

*??????? ?? ????? ????  ??£Ä*`;
        
        let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363395467876104@newsletter',
                newsletterName: '????? ???? ??',
                serverMessageId: 143
            }
        };

    // Send the video thumbnail with song details
    await messageHandler.sendMessage(from, {
      image: { url: songData.thumbnail },
      caption: songDetailsMessage,
    }, { quoted: quotedMessage });
    
    const messageID = sentMsg.key.id;

        // React to the thumbnail message
        await conn.sendMessage(from, { react: { text: '?', key: sentMsg.key } });

        // Event listener to capture reply
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mekInfo = messageUpdate?.messages[0];
            if (!mekInfo?.message) return;

            const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
            const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToSentMsg) {
                let userReply = messageType.trim();
                let msg;
                
                if (userReply === "1") {
                    msg = await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", contextInfo }, { quoted: mek });
                    mp3Url = audio;
                } else
    // Send the song as a PTT (Push-To-Talk)
    if (userReply === "2") {
                    msg = await messageHandler.sendMessage(from, {
      audio: { url: downloadLink },
      mimetype: "audio/mpeg",
      ptt: true, // PTT enabled
    }, { quoted: quotedMessage }); mp3Url = voice;
                } else

  } catch (error) {
    console.error(error);
    reply("*An Error Occurred While Processing Your Request ?*");
  }
});