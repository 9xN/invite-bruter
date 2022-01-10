const Math = require('math');
const request = require('request');
const fs = require('fs');

var webhook_url = "ur webhook here lol"


function makeInvite() {
    var length = 8
    var inviteCode = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        inviteCode += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    return inviteCode;
}

checkCode = function(inviteCode) {
    var link = `https://discord.gg/${inviteCode}`
    const options = {
        'method': 'GET',
        'url': `https://discord.com/api/v9/invites/${inviteCode}`,
        'headers': {
            'Cookie': 'penis lol'
        }
    };
    request(options, function(error, response) {

        try {
            if (response.statusCode == 200) {
                console.log(`This link should work unless an error is posted below! ${link}\n`);
                var options = {
                    'method': 'POST',
                    'url': webhook_url,
                    'headers': {
                        'Cookie': 'penis lol'
                    },
                    formData: {
                        'content': link
                    }
                };
                request(options, function(error, response) {
                    if (error) throw new Error(error);
                    console.log(response.body);
                });

                fs.writeFileSync(__dirname + '/working_links.json', JSON.stringify(link, null, 4));
            } else if (response.statusCode == 429) {

                console.log("Rate limited!\n");

            } else {
                console.log(`${link} is an invalid link!\n`);
            }
        } catch (error) {
            console.log("An error occurred:\n");
            console.log(error + "\n");
            return;
        }
    });


};

setInterval(() => {
    checkCode(makeInvite());
}, 1000);
