//Discord and client vars
const Discord= require('discord.js')
const client= new Discord.Client()
//bot vars
const greetings=["Hi","Hello","Greetings"]
const questions=[]
const name=""
var ifNextEntry=Boolean(false)
var ifNextCustom=Boolean(false)
var ifFirstEntry=Boolean(true)

//Logging the bot onto the discord server
client.login('ODU2MDQyNzk3NTkzMDAyMDE0.YM7R-w.9qcZTjTaDiXBXqbkcqKx8u18va8')
client.on('ready', readyDiscord)
function readyDiscord(){
    console.log('Journal Bot Activated')
}

//On the action of a message it will excute the function
client.on('message', gotMessage);

//replies to the client
function gotMessage(msg){
    console.log(" ")
    //new user
    if(msg.content ==='!New'){
        console.log("New User")
        msg.reply("Welcome! My name is JournalBot. What is your name?")
        msg.reply("Respond with '!NameYOURNAME'")
    }
    //sets users name
    if(msg.content.substring(0,5)=='!Name'){
        console.log("Name Recored!")
        console.log("change1")
        const name=msg.content.substring(5,msg.content.length)
        msg.reply(greetings[randomNumberGenerator(greetings.length)]+ " " +name)
    }
    //create a new entry
    if(msg.content === '!Entry'){
        console.log("Entry Open.")
        msg.reply(greetings[randomNumberGenerator(greetings.length)]+ " "+ name+" , I hope you had a good day!" )
        for(let i=0;i<questions.length;i++){
            //client.channels.send(questions[i])
            msg.reply(questions[i])
        }
        ifNextEntry=true
    }
    //Journal Entry
    if(ifNextEntry && !(msg.content==='!Entry') && !(msg.author == client.user)){
        console.log("Entry Logged")
        if(ifFirstEntry){
            saveToDoc(msg.content)
            ifFirstEntry=false
        }else{
            editDoc(msg.content)
        }
        ifNextEntry=false
    }
    //Get all past entries
    if(msg.content === '!Report'){
        console.log("Report Given")
        msg.channel.send('Hey there', {
            files: ['./FileJournalV7.txt']
          })
          .catch(console.error);
    }
    //customize what you want in your
    if(msg.content === '!Customize'){
        console.log("customized")
        msg.reply("send me the question you want me to ask you")
        ifNextCustom=true
    }
    if(ifNextCustom && !(msg.content==='!Customize' ) && !(msg.author == client.user)){
        questions.push(msg.content)
        msg.reply("to add another question/prompt, use !Customize")
        ifNextCustom =false
    }
}

//generates a random numeber between 0 and x
function randomNumberGenerator(x){
    return Math.floor(Math.random() * (x))
}

//creates and saves a journal to a text file
function saveToDoc(txt){
    var os = require("os");
    const fs = require('fs');

    fs.writeFile("FileJournalV7.txt", "Entry: "+os.EOL+txt+os.EOL, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

}

//edits and saves journal to an existing textfile
function editDoc(txt){
    var os = require("os");
    var newData= "/n"+txt
    var fs = require('fs')
    var dataLogger = fs.createWriteStream('FileJournalV7.txt', {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
    dataLogger.write(os.EOL)//creates a new line
    dataLogger.write("Entry:")
    dataLogger.write(os.EOL)
    dataLogger.write(txt) // append string to your file
    dataLogger.write(os.EOL)
}