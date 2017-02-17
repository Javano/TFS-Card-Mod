


var bbfgURL = "https://bbfg.itracks.com/BBFG4/en-us/login.aspx";
var goURL = "https:/go.itracks.com/GO/en-US/Login.aspx";
var goVersion = "";
var goVersionInt = "";
var bbfgVersion = "";
var bbfgVersionInt = "";
var pattern = /(\d+)\.\d+\.\d+\.\d+/
var hexPtrn = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
var fNamePtrn = /ITRACKS\\(\w+)\./
var tagIconDict = {
    CHAT: "icons/chat.png",
    VIDEOCHAT: "icons/vchat.png",
    VIDEOVAULT: "icons/vault.png",
    IMARKIT: "icons/imarkit.png",
    IDI: "icons/idi.png",
    BOARD: "icons/board.png",
    BBFG: "icons/board.png",
    ANDROID: "icons/android.png",
    IOS: "icons/ios.png",
    IE: "icons/ie.png",
    FIREFOX: "icons/firefox.png",
    CHROME: "icons/chrome.png",
    SAFARI: "icons/safari.png",
    EDGE: "icons/edge.png"

};


var settingColors = false;
var settingBuildNums = false;
var settingTagIcons = false;
var settingDisplayTags = false;
var settingNameStamp = false;
var settingDisplayAvatar = false;
var settingBugHours = false;
var settingScrolls = false;
var settingCosmetics = false;
var settingRTECommands = false;
var settingFixTitle = false;
var settingsLoaded = false;




$(document).ready(function () {

    loadSettings();

    checkIfReady();

});

function checkIfReady() {
    if (settingsLoaded) {
        run();
    } else {
        setTimeout(checkIfReady, 250)
    }
}

function run() {
    if (settingCosmetics) {
        $('head').append('<style type="text/css"> .card { border-radius:10px;     box-shadow: 0px 1px 1px #aaaaaa; } .card:hover { opacity: 1 !important;} .card .cardShadow { border-top-left-radius: 10px; border-bottom-left-radius: 10px; } </style>');
    }
    if (settingScrolls) {
        $('head').append('<style type="text/css"> ::-webkit-scrollbar { width: 12px; } ::-webkit-scrollbar-track {border: 1px solid rgba(214, 214, 214, 0.81); border-radius: 10px; background-color: rgba(236, 234, 234, 0.85);} ::-webkit-scrollbar-thumb {border: 1px solid #bbbbbb;border-radius: 10px; background-color: rgb(204, 204, 204);}</style>');
    }
    if (settingFixTitle) {
        document.title = $(".menu-bar li span").first().text();
    }


    if (settingBuildNums) {
        setupPage();
        setInterval(function () {
            updateVerNumbers();
        }, 10 * 1000);
    }
    setInterval(function () {

        if (settingRTECommands) {
            //Custom commands override hook for RTE
            rteOverride();
        }

        if (settingBuildNums) {
            if (goVersion) {
                $("#goVerNum").html(goVersion);
            }
            if (bbfgVersion) {
                $("#bbfgVerNum").html(bbfgVersion);
            }
        }
        var newCards = [];

        //Find unprocessed cards and style them
        $('.card:not([task-buildnum])').each(function (i, obj) {
            if (settingBuildNums) {
                initializeCard(this);
            }
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

        if (settingBuildNums) {
            //Update pre-existing cards
            $('.card[task-buildnum][task-buildnum!="pending"]').each(function (i, obj) {
                evaluateCardVer(this, $(this).attr("task-buildnum"));
            });
        }
    }, 100);
}

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
    var cardID = $(card).find(".cardId");
    var cardShadow = $(card).find(".cardShadow");
    var cardDetails = $(card).find(".cardDetails");
    var idBar = $(cardDetails).find(".idBar");
    var cardControls = $(idBar).find(".cardControls");
    var taskNum = $(cardID).find('a').text();

    if (settingCosmetics) {
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
        cardDetails.find(".title").css("font-family", "Arial");
        cardDetails.find(".title").css("overflow-x", "hidden");
        cardDetails.find(".title").css("overflow-y", "hidden");
        cardDetails.find(".title").css("overflow-wrap", "break-word");
        cardDetails.find(".title").css("position", "absolute");
        cardDetails.find(".title").css("width", "auto");
        cardDetails.find(".title").css("left", "12px");
        cardDetails.find(".title").css("right", "2px");
        cardDetails.find(".cardFooter").css("position", "absolute");
        cardDetails.find(".cardFooter").css("width", "auto");
        cardDetails.find(".cardFooter").css("left", "15px");
        cardDetails.find(".cardFooter").css("right", "0px");
        cardDetails.find(".cardFooter").css("bottom", "0px");
        $(card).find('.taskBoardCardColumn2').css("width", "70%");
        $(card).find(".taskBoardCardColumn3").css("cssText", "width: 20% !important");
        cardShadow.css("width", "15px");
        cardDetails.css("width", "90%");
        cardControls.css("cssText", "margin-right: 0px !important;");
        cardControls.css("margin-left", "3px");
        cardControls.css("float", "left");
    }
    if (settingScrolls) {
        cardDetails.find(".title").css("overflow-y", "auto");
    }
    if (settingBuildNums) {
        $(idBar).prepend("<div class='buildNumDiv' style='margin: 5px 0px 0 3px; float: left; font-weight: bold;'></div>");
    }

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
            if (settingBuildNums) {
                var verNum = responseText["__wrappedArray"][0]["fields"]["10046"];
                if (verNum) {
                    $(card).attr("task-buildnum", verNum);
                } else {
                    $(card).attr("task-buildnum", "");
                }
            }

            if (settingBugHours) {
                // Fill in "Remaining Work" field for Bugs fix
                if (responseText["__wrappedArray"][0]["fields"]["25"] == "Bug" && responseText["__wrappedArray"][0]["fields"]["10043"]) {
                    $(card).find('.taskBoardCardColumn3').text(responseText["__wrappedArray"][0]["fields"]["10043"] + " h");
                }
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
    if (settingDisplayTags) {
        $(cardFooter).text("");
    }
    if (tagsStr) {
        var tagsArr = tagsStr.split(";");

        for (var i = 0; i < tagsArr.length; i++) {
            var match = hexPtrn.exec(tagsArr[i]);
            if (!match) {
                if (settingTagIcons && tagIconDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) {

                    $(card).find(".cardControls").first().before("<a class='cardControls' href='#' hidefocus='hidefocus' style='float: left;padding-top: 5px;cursor: move;margin-left: 3px;margin-right: 0px !important'><img src='" + chrome.extension.getURL(tagIconDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) + "' title='" + tagsArr[i] + "' alt='" + tagsArr[i] + "' width='16' height='16'></a>");

                } else if (settingDisplayTags) {
                    if ($(cardFooter).text() != "") {
                        $(cardFooter).text($(cardFooter).text() + ", ");
                    }
                    $(cardFooter).text($(cardFooter).text() + tagsArr[i]);
                }
            } else if (settingColors) {
                $(card).find(".cardShadow").css("background-color", match[0]);
            }
        }
    }
    if (settingDisplayTags) {
        $(cardFooter).attr("title", $(cardFooter).text());
    }
}

function processAvatar(card, assignedUserStr) {
    if (assignedUserStr) {


        var userID = assignedUserStr.substring(assignedUserStr.indexOf('<') + 1, assignedUserStr.indexOf('>'));
        if (settingDisplayAvatar) {
            var avatarURL = "/tfs/MainProjects/_api/_common/IdentityImage?id=&identifier=" + userID;
            $(card).css("background-image", "url(" + encodeURI(avatarURL) + ")");
            $(card).css("background-size", "28px");
            $(card).css("background-repeat", "no-repeat");
            $(card).css("background-position", "top right");
        }

        if (settingNameStamp) {
            //Stamp name
            var idBar = $(card).find(".idBar");
            idBar.append("<div class='nameStamp' style='font-weight: bold;float: right;position: absolute;color: #ff0000;box-shadow: inset 0px 0px 1px 1px #ff0000;padding: 3px;border-radius: 5px;transform: rotate(10deg);top: 6px;right: 3px;background-color: rgba(241, 0, 0, 0.09);text-transform: capitalize;'></div>");
            var nameStamp = idBar.find(".nameStamp");
            var match = fNamePtrn.exec(userID);
            if (match && match[1]) {
                nameStamp.text(match[1]);
            }
        }

    }
}

function rteOverride() {
    $('.richeditor-editarea iframe:not([listenerAdded])').each(function (i, obj) {
        if (obj.contentWindow.document.body) {
            obj.contentWindow.document.body.addEventListener('keydown', function (e) {
                switch (e.which) {
                    case (9):
                        if (e.shiftKey) {
                            e.preventDefault();
                            $('div.tab-page[aria-expanded="true"] .richeditor-toolbar-outdent').click();
                        } else {
                            e.preventDefault();
                            $('div.tab-page[aria-expanded="true"] .richeditor-toolbar-indent').click();
                        }
                        break;
                    case (56):
                        if (e.ctrlKey) {
                            if (e.shiftKey) {
                                e.preventDefault();
                                $('div.tab-page[aria-expanded="true"] .richeditor-toolbar-insertorderedlist').click();
                            } else {
                                e.preventDefault();
                                $('div.tab-page[aria-expanded="true"] .richeditor-toolbar-insertunorderedlist').click();
                            }
                        }
                        break;
                }

            });
            $(this).attr("listenerAdded", "true");
        }
    });
}

function loadSettings() {
    chrome.storage.sync.get({
        sColors: "true",
        sBuildNums: "true",
        sIcons: "true",
        sTags: "true",
        sOwner: "avatar",
        sBugHours: "true",
        sScrolls: "true",
        sCosmetics: "true",
        sRTE: "true",
        sTitle: "true"
    }, function (items) {
        settingColors = items.sColors;
        settingBuildNums = items.sBuildNums;
        settingTagIcons = items.sIcons;
        settingDisplayTags = items.sTags;
        if (items.sOwner == "avatar") {
            settingDisplayAvatar = true;
        } else if (items.sOwner == "name") {
            settingNameStamp = true;
        }
        settingBugHours = items.sBugHours;
        settingScrolls = items.sScrolls;
        settingCosmetics = items.sCosmetics;
        settingRTECommands = items.sRTE;
        settingFixTitle = items.sTitle;
        settingsLoaded = true;
    });
}