var bbfgURL = "https://bbfg.itracks.com/BBFG4/en-us/login.aspx";
var goURL = "https:/go.itracks.com/GO/en-US/Login.aspx";
var goVersion = "";
var goVersionInt = "";
var bbfgVersion = "";
var bbfgVersionInt = "";
var pattern = /(\d+)\.\d+\.\d+\.\d+/
var hexPtrn = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

$(document).ready(function () {
    $('head').append('<style type="text/css" > .card { border-radius:10px;     box-shadow: 0px 1px 1px #aaaaaa; } .card:hover { opacity: 1 !important;} .card .cardShadow { border-top-left-radius: 10px; border-bottom-left-radius: 10px; } </style>');

    document.title = $(".menu-bar li span").first().text();


    setupPage();

    setInterval(function () {
        updateVerNumbers();
    }, 10 * 1000);

    setInterval(function () {
        if (goVersion) {
            $("#goVerNum").html(goVersion);
        }
        if (bbfgVersion) {
            $("#bbfgVerNum").html(bbfgVersion);
        }

        var newCards = [];

        //Find unprocessed cards and style them
        $('.card:not([task-buildnum])').each(function (i, obj) {
            initializeCard(this);
            newCards.push($(this));

        });

        //Loop through all new cards
        $(newCards).each(function (i, obj) {
            var card = newCards[i];
            $(card).attr("task-buildnum", "pending");
            //Modify cosmetics
            formatCard(card);
            //Fetch and display task details
            fetchTaskInfo(card);
            //Card has been processed. Remove from "New Cards" array.
            $(newCards).remove(card);
        });

        //Update pre-existing cards
        $('.card[task-buildnum][task-buildnum!="pending"]').each(function (i, obj) {
            evaluateCardVer(this, $(this).attr("task-buildnum"));
        });

    }, 100);

});

function setupPage() {
    $("#header-row").append('<span class="slash">/</span><span> BBFG Version: </span><span id="bbfgVerNum"><img class="load-spinner" id="bbfgVerSpinner" src="//tfs:8080/tfs/Areas/UrbanTurtle/Content/images/small-spinner.gif" style="margin: 9px 5px 0 6px;"/></span>')
    $("#header-row").css("color", "#FFF");
    $("#bbfgVerNum").css("font-weight", "700");
    $("#header-row").append('<span class="slash">-</span><span> GO Version: </span><span id="goVerNum"><img class="load-spinner" id="goVerSpinner" src="//tfs:8080/tfs/Areas/UrbanTurtle/Content/images/small-spinner.gif" style="margin: 9px 5px 0 6px;"/></span>')
    $("#header-row").css("color", "#FFF");
    $("#goVerNum").css("font-weight", "700");
}

function updateVerNumbers() {
    var bbfgxmlhttp = new XMLHttpRequest();
    bbfgxmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == "200") {
            var page1 = document.implementation.createHTMLDocument("");
            page1.documentElement.innerHTML = this.responseText;
            bbfgVersion = page1.querySelector('#M_M_M_M_B_B_B_Body_lblVersion').textContent.trim();
            bbfgVersionInt = parseInt(bbfgVersion.replace(/\./g, ""));
        }
    };
    bbfgxmlhttp.open("GET", bbfgURL, true);
    bbfgxmlhttp.send();

    var goxmlhttp = new XMLHttpRequest();
    goxmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == "200") {
            var page2 = document.implementation.createHTMLDocument("");
            page2.documentElement.innerHTML = this.responseText;
            goVersion = page2.querySelector('#M_B_PC_lblVersion').textContent.trim();
            goVersionInt = parseInt(goVersion.replace(/\./g, ""));
        }
    };

    goxmlhttp.open("GET", goURL, true);
    goxmlhttp.send();



}

function formatCard(card) {
    card.find(".cardControls").css("float", "left");
    var cardID = $(card).find(".cardId");
    var cardShadow = $(card).find(".cardShadow");
    var cardDetails = $(card).find(".cardDetails");
    var idBar = $(cardDetails).find(".idBar");
    var taskNum = $(cardID).find('a').text();
    $(cardShadow).prepend($(cardID)[0].outerHTML);
    $(cardID).remove();
    var newCardID = $(cardShadow).find(".cardId");
    newCardID.css("width", "7px");
    newCardID.css("word-wrap", "break-word");
    newCardID.css("margin", "0px");
    newCardID.css("text-align", "center");
    newCardID.css("position", "relative");
    newCardID.css("left", "3px");
    newCardID.find("a").css("text-decoration", "none");
    newCardID.find("a").css("outline", "none");
    newCardID.find("a").css("color", "#000000");
    newCardID.find("a").css("opacity", "0.6");
    newCardID.find("a").css("font-size", "13px");
    cardShadow.css("width", "15px");
    cardDetails.css("width", "90%");
    $(idBar).prepend("<div class='buildNumDiv' style='margin: 6px 3px 0 6px; float: left; font-weight: bold;'></div>");
}

function evaluateCardVer(card, labelVal) {
    var buildNumDiv = $(card).find(".buildNumDiv");
    var match = pattern.exec(labelVal);
    var labelValInt = "";
    if (match == null && labelVal) {
        //No build number but field is not empty.
        $(card).css('opacity', $(card).attr('opac'));
        $(card).css('border', '1px outset  #d6d6d6');
        $(card).find('.load-spinner').remove();
    } else if (match == null && !labelVal) {
        //No build number but and field is empty.
        $(card).css('opacity', '0.6');
        $(card).css('border', '1px solid #d6d6d6');
        $(card).find('.load-spinner').remove();
    } else if (match) {
        //Build number found.
        labelValInt = parseInt(match[0].replace(/\./g, ""));
        if (match[1] == '1' && goVersion != "") {
            //This is a GO Version Number
            if (labelValInt > goVersionInt) {
                $(card).css('opacity', '0.6');
                $(card).css('border', '1px solid #d6d6d6');
            } else {
                $(card).css('opacity', $(card).attr('opac'));
                $(card).css('border', '1px outset  #d6d6d6');
            }
            $(card).find('.load-spinner').remove();
        } else if (match[1] == '4' && bbfgVersion != "") {
            //This is a BBFG Version Number
            if (labelValInt > bbfgVersionInt) {
                $(card).css('opacity', '0.6');
                $(card).css('border', '1px solid #d6d6d6');
            } else {
                $(card).css('opacity', $(card).attr('opac'));
                $(card).css('border', '1px outset  #d6d6d6');
            }
            $(card).find('.load-spinner').remove();
        }
    }
    if (labelVal) {
        $(buildNumDiv).text("[" + labelVal + "]");
        $(buildNumDiv).show();
    } else {
        $(buildNumDiv).text("");
        //  $(buildNumDiv).hide();
    }
}

function fetchTaskInfo(card) {
    var cardShadow = $(card).find(".cardShadow");
    var taskNum = $(card).find(".cardId").find('a').text();
    var jqxhr = $.post("/tfs/MainProjects/_api/_wit/workitems?__v=5&ids=" + taskNum, { __RequestVerificationToken: $('[name="__RequestVerificationToken"]').val() })
        .done(function () {
            var responseText = jQuery.parseJSON(jqxhr.responseText);
            var verNum = responseText["__wrappedArray"][0]["fields"]["10046"];
            if (verNum) {
                $(card).attr("task-buildnum", verNum);
            } else {
                $(card).attr("task-buildnum", "");
            }

            processTags(card, responseText["__wrappedArray"][0]["fields"]["80"]);
            processAvatar(card, responseText["__wrappedArray"][0]["fields"]["24"]);
        })
        .fail(function () {
            console.log("ERROR FETCHING DATA FOR TASK " + taskNum + " -- URI: " + "http://tfs:8080/tfs/MainProjects/_api/_wit/workitems?__v=5&ids=" + taskNum)
        })
}

function initializeCard(card) {
    $(card).attr('opac', $(card).css('opacity'));
    $(card).css('border', 'none');
    $(card).css('opacity', '0.2');
    $(card).find('.idBar').prepend("<img class='load-spinner' src='//tfs:8080/tfs/Areas/UrbanTurtle/Content/images/small-spinner.gif' style='margin: 9px 5px 0 6px;float: left;'/>")
}

function processTags(card, tagsStr) {
    var cardFooter = $(card).find('.cardFooter .taskBoardCardColumn2');
    $(cardFooter).css("width", "70%");
    $(card).find(".taskBoardCardColumn3").css("cssText", "width: 20% !important;");
    $(cardFooter).text("");
    if (tagsStr) {
        var tagsArr = tagsStr.split(";");

        for (var i = 0; i < tagsArr.length; i++) {
            var match = hexPtrn.exec(tagsArr[i]);
            if (!match) {
                if ($(cardFooter).text() != "") {
                    $(cardFooter).text($(cardFooter).text() + ", ");
                }
                $(cardFooter).text($(cardFooter).text() + tagsArr[i]);
            } else {
                $(card).find(".cardShadow").css("background-color", match[0]);
            }
        }
    }
    $(cardFooter).attr("title", $(cardFooter).text());
}

function processAvatar(card, assignedUserStr) {
    if (assignedUserStr) {
        var userID = assignedUserStr.substring(assignedUserStr.indexOf('<') + 1, assignedUserStr.indexOf('>'));
        var avatarURL = "/tfs/MainProjects/_api/_common/IdentityImage?id=&identifier=" + userID;
        $(card).css("background-image", "url(" + encodeURI(avatarURL) + ")");
        $(card).css("background-size", "30px");
        $(card).css("background-repeat", "no-repeat");
        $(card).css("background-position", "top right");
    }
}