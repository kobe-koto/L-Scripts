function GenCounter (ElementID,ThemeID,MinLength) {
    /* ElementID   的innerHTML内容必須為純數字。
     * ThemeID     選取詳見 GitHub/journey-ad/Moe-counter 。
     * MinLength   為位數，自動補0，設定為false不啓用(NaN的話也不會啓用)。
     */
    let ReturnValue = "";
    for (let i=0;
         i<document.getElementById(ElementID).innerHTML.split("").length;
         i++
    ){
        ReturnValue +=
            "<img alt=\"\" src=\"https://cros-cf.ooze.gq/?https://github.com/journey-ad/Moe-counter/raw/master/assets/theme/"+
            ThemeID+
            "/" +
            document.getElementById(ElementID).innerHTML.split("")[i] +
            ".gif\">"
    }
    if (MinLength && !isNaN(MinLength)) {
        if (ReturnValue.length<MinLength) {
            let ValueToFill = MinLength - ReturnValue.length;
            ReturnValue =
                (function () {
                    let value = "";
                    for (let i=0;i<ValueToFill;i++) {
                        value +=
                            "<img alt=\"\" src=\"https://cros-cf.ooze.gq/?https://github.com/journey-ad/Moe-counter/raw/master/assets/theme/"+
                            ThemeID+
                            "/0.gif\">"
                    }
                    return value;
                })()
            + ReturnValue;
        }
    }
    return ReturnValue;
}

let CountLength;
if (
    document.getElementById("busuanzi_value_site_uv").innerHTML.length
    <=
    document.getElementById("busuanzi_value_site_pv").innerHTML.length
) {
    CountLength=document.getElementById("busuanzi_value_site_pv").innerHTML.length;
} else {
    CountLength=document.getElementById("busuanzi_value_site_uv").innerHTML.length;
}

let pv= GenCounter("busuanzi_value_site_pv","rule34",CountLength);
let uv= GenCounter("busuanzi_value_site_uv","rule34",CountLength);

document.getElementsByClassName("φm")[0].getElementsByClassName("φeu")[0].innerHTML+=
    `<is-i class="φce">
       <div class="φch" style="text-align: center;">
         <h3 class="φcl" style="padding: 1.5rem">
           Total Hits
         </h3>
         `+pv+`
         <h3 class="φcl" style="padding: 1.5rem">
           Total Viewers
         </h3>
         `+uv+`
       </div>
     </is-i>`
