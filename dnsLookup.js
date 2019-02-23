const dns = require("dns");

dns.lookup("meetup.com", (err, address) => {
    if(err == null){
        console.log(`O endereço é: ${address}`);
    }else{
        console.log(err);
    }
    
});


console.log('Olá vocês');
