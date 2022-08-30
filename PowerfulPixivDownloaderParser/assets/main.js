let
    FileInput = document.getElementById("FileUploader"),
    Info = document.getElementById("FileInfo"),
    EndingData,
    CDNLinks;
FileInput.addEventListener("change", function () {
    if (!FileInput.value) {
        Info.innerHTML = "没有选择文件";
        return;
    }
    Info.innerHTML =
        "檔案: " + FileInput.files[0].name + "<br>" +
        "大小: " + FileInput.files[0].size + "<br>";
    let reader = new FileReader();
    reader.onload = function(e) {
        window.ParsedData = JSON.parse(atob(e.target.result.split("base64,")[1]));
        EndingData = {}
        EndingData.id = ParsedData[0].idNum;

        EndingData.Link=[];
        EndingData.CDNLink=[];

        for (let rr=0;rr<ParsedData.length;rr++) {
            EndingData.Link[rr]=ParsedData[rr].original;

            EndingData.CDNLink[rr] =
                "https://pixiv.re/" +
                ParsedData[rr].id.split("_p")[0] +
                "-" +
                (ParsedData[rr].id.split("_p")[1] - 1 + 2).toString() +
                ParsedData[rr].original.split(ParsedData[rr].id)[1]
            ;
            // EndingData.CDNLink[rr]=ParsedData[rr].original.replace("https://i.pximg.net/","https://pixiv.re/");
        }
        CDNLinks = "";
        for (let ee=0;ee<EndingData.CDNLink.length;ee++) {
            CDNLinks += EndingData.CDNLink[ee]+"<br/>";
        }
        document.getElementById("FileInfo").innerHTML+="<br/>"+CDNLinks;

    };
    reader.readAsDataURL(FileInput.files[0]);
});