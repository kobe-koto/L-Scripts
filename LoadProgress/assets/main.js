document.getElementById("vURL").value="https://file.koto.cc/api/raw/?path=/Media/%E3%80%90%E4%B8%AD%E8%8B%B1%E6%AD%8C%E8%A9%9E%E5%AD%97%E5%B9%95%E3%80%91%20Wap%20-%20Cardi%20B%20feat.%20Megan%20Thee%20Stallion%20(Lyrics).mp4";
function LoadVideo (URL) {
    document.getElementById("PleaseWait").innerHTML = "Please wait while the video is loading...";
    let video = document.getElementById("video");
    window.URL = window.URL || window.webkitURL;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL, true);
    xhr.responseType = "blob";

    xhr.onload = function() {
        if (this.status === 200) {
            let blob = this.response;
            video.onload = function() {
                window.URL.revokeObjectURL(video.src);
            };
            video.src = window.URL.createObjectURL(blob);
        }
        document.getElementById("PleaseWait").innerHTML="Loaded!";
    }

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            document.getElementById("xhr-progress").style.width= (event.loaded / event.total * 100) + "%";
        }
    }

    xhr.send();

}
