$(document).ready(() => {
    console.log("jQuery is ready")
})

var BoxOpened = "";
var ImgOpened = "";

// entire card block
var Source = "#cards";

var ImgSource = [
    "https://static.wikia.nocookie.net/arresteddevelopment/images/7/7b/2x06_Afternoon_Delight_%2834%29.png/revision/latest/top-crop/width/220/height/220?cb=20121216212355",
    "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-arrested-development-david-cross.jpg",
    "https://us-east-1.linodeobjects.com/gunaxin/2010/12/tobias1.png",
    "https://i.redd.it/03qvpj1qvm711.jpg",
    "https://pyxis.nymag.com/v1/imgs/1b5/a70/76e64eeafe718092d5f7557d04606dac9e-19-tobias-funke.rsquare.w330.jpg",
    "https://pbs.twimg.com/profile_images/644157694136422400/d4ho5P5S_400x400.jpg",
    "https://i.ytimg.com/vi/wBMKARtQReE/hqdefault.jpg",
    "https://i.pinimg.com/originals/73/87/c6/7387c62541a1a78d1eb04e5d003874d3.jpg",
    "https://pyxis.nymag.com/v1/imgs/327/edf/86a0bc145b8026e67d875393100c3c6056-27-5-Tobias.rsquare.w700.jpg"

];

// get a random number for image array
function getRandomArbitrary(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}


function ShuffleImages() {
    var allImages = $(Source).children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    console.log(allImages)
    console.log(ImgThis)
    console.log(ImgArr)

    for (var i = 0; i < allImages.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
        console.log(ImgArr[i]);
    }

    // console.log(ImgArr)

    ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < allImages.length; z++) {
        var RandomNumber = getRandomArbitrary(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
        console.log(ImgArr)
    }
}

function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    BoxOpened = "";
    ImgOpened = "";

    return false;
}

function OpenCard() {
    // gets the div id
    var id = $(this).attr("id");
    console.log(id)

    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);

        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == "") {
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            console.log(ImgOpened)
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + BoxOpened + " img").parent().css("visibility", "hidden");

                BoxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }



    }
}

$(function () {
    // since there are 10 images this makes a copy of the image so that it can be matched
    for (var y = 1; y < 3; y++) {
        $.each(ImgSource, function (i, val) {
            $(Source).append(`<div id=card${y}${i}><img src=${val} />`);
        });
    }
    $(Source + " div").click(OpenCard);
    ShuffleImages();
});