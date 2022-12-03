async function POST() {
 
   
          fetch("https://8080-kaiquepires-loginmodule-gu67nicbdse.ws-us77.gitpod.io/", {
            method: 'POST',
            mode:"no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            body: JSON.stringify({ "kaique": "lindo" })
        }).then(console.log("rodou"))
}


let appendice = {
    "comando": `git commit "configuring server"`,
    "pages": ["https://dev.to/alexandrefreire/o-que-e-fetch-1laa", "https://pt.stackoverflow.com/questions/466798/express-req-body-n%C3%A3o-acha-os-dados-enviados-pelo-cliente", "https://pt.stackoverflow.com/questions/432506/enviando-par%C3%A2metro-body-via-fetch-api", "https://pt.stackoverflow.com/questions/528292/req-body-retornando-objeto-vazio"]
}