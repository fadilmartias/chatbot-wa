const qrcode = require('qrcode-terminal');
const fs = require('fs');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
const media = MessageMedia.fromFilePath('abul.jpeg');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// function jokes() {
//     client.on('message', message => {
//         message.reply('Manusia manusia apa yg kek babi adick adickk??');
//         if(msg === "fadil") {
//             message.reply('Salah woi');
//         } else if(msg === 'abul') {
//             message.reply('Betull sekalee! Ini dia penampakan orangnya');
//             message.sendMessage(media);
//         }
// });
// };

client.on('message', message => {
    let msg = message.body.toLowerCase();
	if(msg === "!intro") {
		message.reply('Aku bot yang dibuat padel');
	} else if(msg === '!quotes') {
        message.reply('Teruslah mengocok Petrik -Spongebob');
    }
});

// Mention everyone
client.on('message', async (msg) => {
    if(msg.body === '!everyone') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});
 
 
 
 