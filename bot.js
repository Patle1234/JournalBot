//Discord and client vars
const Discord= require('discord.js')
const client= new Discord.Client()
//bot vars
const greetings=["Hi","Hello","Greetings"]
const name=""
var ifNext=Boolean(false)

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
    if(msg.content ==='$New'){
        console.log("New User")
        msg.reply("Welcome! My name is JournalBot. What is your name?")
        msg.reply("Respond with '$NameYOURNAME'")
    }
    //sets users name
    if(msg.content.substring(0,5)=='$Name'){
        console.log("Name Recored")
        console.log("change")
        const name=msg.content.substring(5,msg.content.length)
        msg.reply(greetings[randomNumberGenerator(greetings.length)]+ " " +name)
    }
    //create a new entry
    if(msg.content === '$Entry'){
        console.log("Entry Open")
        msg.reply(greetings[randomNumberGenerator(greetings.length)]+ " " )
        ifNext=true
    }
    //Journal Entry
    if(ifNext){
        console.log("Entry Logged")
        saveToDoc(msg.content)
        ifNext=false
    }
    //Get all past entries
    if(msg.content === '$Report'){
        console.log("Report Given")
    }
    //customize what you want in your
    if(msg.content === '$Customize'){
        console.log("customized")
    }
}

//generates a random numeber between 0 and x
function randomNumberGenerator(x){
    return Math.floor(Math.random() * (x))
}

function saveToDoc(txt){
    // var blob = new Blob([txt],{ type: "text/plain;charset=utf-8" })
    // globalThis.Blob = Blob;
    // saveAs(blob, Name+" Journal.txt");
    const fs = require('fs');

fs.writeFile("Desktop/JournalBot/Journals", txt, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

}