const { decryptMedia } = require('@open-wa/wa-automate')
const wa = require('@open-wa/wa-automate')  
const banner = require('./src/banner')
const number = '5574988562578'

wa.create().then(bot => start(bot))

function start(bot) {
    bot.onMessage(async message => {
        console.log(message)
        fulltime = new Date()
        hora = fulltime.getHours()
        minutos = fulltime.getMinutes()
        alltime = (`${hora}:${minutos}`)
        try{
            if (message.body === '$debug') {
                if (message.sender.id == `${number}@c.us`) {
                    await bot.reply(message.chat.id, `\`\`\`[200] - OK 🤖 ✔️ \`\`\``, message.id)
                }
                else {
                    await bot.reply(message.chat.id, `\`\`\`[404] - ❌ \`\`\``, message.id)
                    setTimeout(() => {
                        bot.sendText(`${number}@c.us`, `*${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou usar o _debuger_ sem permissão 🤖`)
                    
                    }, 1000);
                }
            }

            //send link group
            if (message.chat.isGroup == true){
              try{
                  if (message.body == '!link') {
                      var link = await bot.getGroupInviteLink(message.chat.id)
                      await bot.reply(message.chat.id, link, message.id)
                      await bot.simulateTyping(message.chat.id, true)
                      await bot.sendText(message.chat.id, 'Aqui está o link do grupo!')
                      setTimeout(() => {
                          bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Link do grupo ${message.chat.name} gerado ✔️`)
                      }, 1000);
                  }
                  if (message.body == '!revogar') {
                      var linkrevoke = await bot.revokeGroupInviteLink(message.chat.id)
                      if (linkrevoke == true){
                        await bot.sendText(message.chat.id, 'Link resetado 🤖 ✔️')
                        setTimeout(() => {
                          bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Link do grupo ${message.chat.name} redefinido ✔️`)
                      }, 1000);
                      }
                  }
              } catch {
                  await bot.reply(message.chat.id, 'O bot precisa ser admin ❌', message.id)
                  setTimeout(() => {
                      bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Comandos de link => Not Admin ❌`)
                  }, 800);
              }
            }
            else {
                await bot.simulateTyping(message.chat.id, true)
                await bot.reply(message.chat.id, '❌ Este comando é funcional somente em grupo!')
            }

            //criador
            if (message.body === '!criador') {
                await bot.sendContact(message.chat.id, `${number}@c.us`)
                await setTimeout(() => {
                    bot.sendText(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Aqui está o contato do meu criador`)
                }, 500);
                //debug
                await bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Seu contato foi solicitado`)
            }

            // send sticker
            if (message.type == 'image') {
                if (message.caption == '!sticker') {
                    await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')} - Solicitado por ${message.sender.pushname}\`\`\` \n\nAguarde...⌛`, message.id)
                    const imagem = await decryptMedia(message)
                    const sticker = `data:${message.mimetype};base64,${imagem.toString('base64')}`
                    await bot.sendImageAsSticker(message.chat.id, sticker)

                    await setTimeout(() => {
                        bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Gerou uma figurinha 🤖`)
                    }, 1000);
                }
            }
            else if (message.type == 'video'){
              if (message.caption == '!sticker') {
                  const video = await decryptMedia(message)
                  const stickerV = `data:${message.mimetype};base64,${video.toString('base64')}`
                  await bot.sendMp4AsSticker(message.chat.id, stickerV)

                  await setTimeout(()=> {
                      bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou gerar uma figurinha com vídeo 🤖`)
                  }, 1000);
              }
            }

            if (message.body == '!sticker') {
              try {
                  if (message.quotedMsg.type == 'image') {
                      await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')} - Solicitado por ${message.sender.pushname}\`\`\` \n\nAguarde...⌛`, message.id)
                      const dp1 = await decryptMedia(message.quotedMsg)
                      const sticker1 = `data:${message.quotedMsg.mimetype};base64,${dp1.toString('base64')}`
                      await bot.sendImageAsSticker(message.from, sticker1)

                      await setTimeout(() => {
                          bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou gerar uma figurinha com imagem marcada 🤖`)

                      }, 1000);
                  }
                  else if (message.quotedMsg.type == 'video') {
                      await bot.sendReplyWithMentions(message.chat.id, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')} - Solicitado por ${message.sender.pushname}\`\`\` \n\nAguarde...⌛`, message.id)
                      const dp2 = await decryptMedia(message.quotedMsg)
                      const sticker2 = `data:${message.quotedMsg.mimetype};base64,${dp2.toString('base64')}`
                      await bot.sendMp4AsSticker(message.from, sticker2)

                      await setTimeout(() => {
                          bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Tentou gerar uma figurinha com vídeo marcado 🤖`)

                      }, 1000);
                  }
              } catch(e) {
                  await bot.simulateTyping(message.chat.id, true)
                  await bot.sendReplyWithMentions(message.chat.id, `[ *${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}* ] Metadados error ❌\n\n› Este comando necessita de uma imagem.`)
              }
            }
            
            //help
            if (message.body == '!help'){
              await bot.simulateTyping(message.chat.id, true)
              await bot.reply(message.chat.id, banner.banner(), message.id)
              setTimeout(() => {
                  bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Commands: _!help_ 🤖`)
              })
          }

            // impropes
            lista = [] // list of the words impropes here

            for (var xingamento in lista) {
                if (message.body.includes(`${lista[xingamento]}`)){
                    await bot.deleteMessage(message.chat.id, message.id)
                    await bot.sendText(message.chat.id, '✅ - Mensagem imprópria deletada')
                    await setTimeout(() => {
                        bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ > Xingamento no grupo!`)

                    }, 1000);
                }
            }

            // all mentions
            if (message.chat.isGroup == true){
                num = message.chat.groupMetadata.participants
                for (membros in num) {
                    if (message.body === '!all') {
                        admin = num[membros]['isAdmin']
                        ids = num[membros]['id']
                        grupo = message.chat.name
                        total = message.chat.participantsCount
                        if (admin == true){ 
                            if (message.sender.id == ids){
                                userList = []
                                for (usuarios in num){
                                    users = num[usuarios]['id']
                                    newUser = users.replace('@c.us', '')
                                    userList.push(`› *@${newUser.replace(',', '')}*\n`)
                                }
                                listString = userList.toString()
                                await bot.sendReplyWithMentions(message.chat.id, `--------〘 _TODOS MENCIONADOS_ 〙 --------\n\n \`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` ➣ *${grupo}*\n ➣ *${total} Membros*\n\n ${listString}`, message.id)
                                
                                await setTimeout(() => {
                                    //debug
                                    bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - Todos mencionados no grupo 🤖`)
    
                                }, 10000);
                            }  
                        }
                    }
                }
            }

            else {   
                //debug 
                await setTimeout(() => {
                    bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - *${message.sender.pushname}* | _${message.sender.id.replace('@c.us', '')}_ - $ Interação no pv: 🤖\n\n\n _Mensagem:_ \`\`\`${message.body}\`\`\``)
                
                }, 1000);
            }

        }
        catch{
            //debug
            await setTimeout(() => {
                bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - O meu código teve algum erro 🤖`)
            }, 1000);
        }
    })

    // Boas vindas
    const groupChatId = "GROUP_ID";
    bot.onParticipantsChanged(
        groupChatId,
        async (changeEvent) => {
            try{
                if (changeEvent.action == "add") {
                    await bot.sendTextWithMentions(groupChatId, `Bem vindo, *@${changeEvent.who.replace('@c.us', '')}*`)
                    await setTimeout(() => {
                        bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Alguem entrou no grupo 🤖`)
                        
                    }, 1000);
                }
                if (changeEvent.action == "remove") {
                    await bot.sendText(groupChatId, '👋 Menos um')
                    await setTimeout(() => {
                        bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - Alguem saiu do grupo 🤖`)
                        
                    }, 10000);
                }
            }
            catch{
                await setTimeout(() => {
                    bot.sendText(`${number}@c.us`, `\`\`\`[${String(hora).padStart('2', '0')}:${String(minutos).padStart('2', '0')}]\`\`\` - O meu código teve algum erro 🤖`)
                }, 1000);
            }
        }
    )
}