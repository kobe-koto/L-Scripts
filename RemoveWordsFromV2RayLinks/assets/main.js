function remove(id,ori,rep) {
    if (document.getElementById(id).value.match(/(https:\/\/|http:\/\/)/i)) {
        const subXHR = new XMLHttpRequest();
        subXHR.open("GET",document.getElementById(id).value,true);
        subXHR.onerror=function () {
            subXHR.onload=function(){};
            document.getElementById(id).value="we cant request this sub link, sorry.";
        }
        subXHR.onload=function () {
            subXHR.onerror=function(){};
            document.getElementById(id).value="ok, sub link requested.";
            document.getElementById(id).value=subXHR.response;
            remove(id);
        }
        subXHR.send();
        document.getElementById(id).value="requesting.";
    } else if (ori != "") {
        const oriText = document.getElementById(ori).value;
        const repText = document.getElementById(rep).value;
        rawText = document.getElementById(id).value.split("\n");
        const Replacer = new RegExp(oriText,"gi");
        for (let s=0;s<rawText.length;s++) {
            if (rawText[s].match(/(vmess:\/\/)/i)) {
                rawText[s]="vmess://"+btoa(atob(rawText[s].split("vmess:\/\/")[1]).replace(Replacer,repText))
            } else {
                rawText[s]=rawText[s].replace(Replacer,repText);
            }
        }
        document.getElementById(id).value = rawText.toString().replace(/,/gi,"\r\n");
    } else {
        document.getElementById(id).value="Sorry, but the value you entered is incorrect.";
    }
}
