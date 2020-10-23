const { cookie } = require("./cookie");

const request = {
    cookie: "id=1;username=demo;SESSID=49ijwio-239wo-239djowe;io=a939afd94W==",
};

const cookies = cookie.parse(request.cookie);

cookies.add({
    name: "_uid",
    value: "93482910",
});

console.log(cookies.toJSON());

cookie.destroy();