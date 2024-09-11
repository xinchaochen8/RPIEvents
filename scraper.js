const fs = require('fs')
const { parse } = require("node-html-parser");
const main = () => {
    fetch("https://events.rpi.edu/cal/main/setMainEventList.do?b=de", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0",
            "Accept": "text/html, /; q=0.01",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://events.rpi.edu/cal/main/showEventList.rdo;jsessionid=NgntDGa2Mti1mjBAcXCsVkH4LcopWaRaNPZ2h0Ts.bedework1",
        "body": "skinNameSticky=widget-html&start=2024-04-12&sort=dtstart.utc%3Aasc&listMode=true&fexpr=(categories.href!%3D%22%2Fpublic%2F.bedework%2Fcategories%2FOngoing%22)+and+(entity_type%3D%22event%22+or+entity_type%3D%22todo%22)&setappvar=navDate(2024-04-12)&count=10",
        "method": "POST",
        "mode": "cors"
    }).then(function (response) {
        return response.text();
    }).then(function (data) {
        var eventDetails = []; 
        var eventTimes = [];
        var events = parse(data).querySelectorAll(".bwevent");
        var times = parse(data).querySelectorAll(".bwDateRow");
        for (i of events) {
            let e = {};
            e["title"] = i.querySelector("a").text;
            e["time"] = i.querySelector(".eventListTime").text.replaceAll(/\s/g,'');
            eventDetails.push(e);
        }
        for (i of times){
            let e = {};
            eventTimes.push(i.querySelector("h2").text);
        }
        var eventJson = {};
        for (var i = 0; i < eventTimes.length; i++){
            eventJson[eventTimes[i]] = eventDetails[i]; 

        }
        

        fs.writeFile('./result.json', JSON.stringify(eventJson), err => {
            if (err) {
                console.error(err);
            }
        });
    });
}

// run
main();