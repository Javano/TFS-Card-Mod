
/*

FORMAT CONSOLE OUTPUT:
window.console.log("%c%s","color: red; background: yellow; font-size: 24px;","WARNING!");

*/

//var identitiesURL = "/MainProjects/_apis/IdentityPicker/Identities/me/mru/common?operationScopes%5B%5D=ims&properties%5B%5D=DisplayName&properties%5B%5D=IsMru&properties%5B%5D=ScopeName&properties%5B%5D=SamAccountName&properties%5B%5D=Active&properties%5B%5D=Department&properties%5B%5D=JobTitle&properties%5B%5D=Mail&properties%5B%5D=MailNickname&properties%5B%5D=PhysicalDeliveryOfficeName&properties%5B%5D=SignInAddress&properties%5B%5D=Surname&properties%5B%5D=Guest&properties%5B%5D=TelephoneNumber&properties%5B%5D=Description";


var tfsPath = "";

var goURL = "https://go.itracks.com/GO/en-US/Login.aspx";
var goVersion = "";
var goVersionInt = "";
var goBranch = "";
var goVerPlaceholder = "[LOADING VERSION]";
var pattern = /(\w+)\.(\d+\.\d+\.\d+)/
var hexPtrn = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
var fNamePtrn = /ITRACKS\\(\w+)\./
var tagIconProdDict = {
    CHAT: "icons/chat.png",
    VIDEOCHAT: "icons/vchat.png",
    VIDEOVAULT: "icons/vault.png",
    VAULT: "icons/vault.png",
    IMARKIT: "icons/imarkit.png",
    IDI: "icons/idi.png",
    BOARD: "icons/board.png",
    BBFG: "icons/board.png"
};
var tagIconPlatDict = {
    ANDROID: "icons/android.png",
    IOS: "icons/ios.png"
};
var tagIconBrowsDict = {
    IE: "icons/ie.png",
    IE9: "icons/ie.png",
    IE10: "icons/ie.png",
    IE11: "icons/ie.png",
    IE12: "icons/ie.png",
    FIREFOX: "icons/firefox.png",
    CHROME: "icons/chrome.png",
    SAFARI: "icons/safari.png",
    EDGE: "icons/edge.png"
};
var tagIconMiscDict = {
    PRODUCTIONBUG: "icons/prod.png",
    PRODUCTIONISSUE: "icons/prod.png",
    DOCUMENTATION: "icons/doc.png",
    PATCH: "icons/patch.png",
    AUTOMATEDTESTING: "icons/auto.png",
    AUTOMATION: "icons/auto.png"
};
var settingColors = false;
var settingBuildNums = false;
var settingBuildNums_GO = false;
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
var settingsSumHours = false;
var settingShowMissingWork = false;
var settingBreakdownHours = false;
var settingSeverity = false;
var settingAutoColumns = false;
var tfsVersion;


$(document).ready(function () {

    if (window.location.hostname.includes("2018")) {
        tfsPath = "";
        tfsVersion = 2018;
    } else {
        tfsPath = "/tfs";
        tfsVersion = 2015;
    }
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
    $('head').append('<style type="text/css">.card {z-index:10 !important;}</style>');
    if (settingCosmetics) {
        $('head').append('<style type="text/css">.card {z-index:10 !important; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 5px; border-top-left-radius: 5px; box-shadow: 0px 1px 1px #aaaaaa; border: none !important; width: 99% !important;} .card:hover { opacity: 1 !important;} .card .cardShadow { border-top-left-radius: 10px; border-bottom-left-radius: 10px; } .cardShadow:hover {opacity: 0.8;} .card.ui-draggable-dragging{z-index: 11 !important} </style>');
    }
    if (settingSeverity) {
        $('head').append('<style>.severityDiv { display: inline;background-color: rgb(191, 190, 190);border-radius: 3px;padding: 0px 3px 0px 3px;font-weight: bold;height:15px;bottom: 1px;width: 15px;line-height: 100%;position: absolute;border: #9c9c9c 1px solid;margin-left:1px;} .severity1 {background-color: rgba(255, 7, 7, 0.65); border-color: #d20101;}</style>');
    }
    if (settingScrolls) {
        $('head').append('<style type="text/css"> ::-webkit-scrollbar { width: 12px; } ::-webkit-scrollbar-track {border: 1px solid rgba(214, 214, 214, 0.81); border-radius: 10px; background-color: rgba(236, 234, 234, 0.85);} ::-webkit-scrollbar-thumb {border: 1px solid #bbbbbb;border-radius: 10px; background-color: rgb(204, 204, 204);}</style>');
    }
    if (settingAutoColumns) {
        $('head').append(`<style type="text/css" id="settingFixColumns">.backlogItem .children{display: flex;} #columnHeaders{display: flex;} #columnHeaders{position:relative !important;}   .content-section{overflow-x:hidden;} .hub-content{overflow-x:hidden;}</style>`);

    }
    if (settingBuildNums_GO) {
        $('head').append('<style type="text/css">#mi_4_teams{ max-width: none !important; } #mi_4_teams .text{ padding-right: 10px; }</style>');

    }    

    if (settingFixTitle) {
        switch (tfsVersion) {
            case 2015:
                document.title = $(".menu-bar li span").first().text();
                break;
            case 2018:
                document.title = $(".l1-navigation-text").attr("title");
                break;
        }
    }
    //Fixes the close/maximize icons overlapping in the task view
    //  $('head').append('<style type="text/css">.ui-dialog .ui-dialog-titlebar-close{right: 0 !important;} .ui-corner-all{right: 65px !important;} </style>');
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
                if (goVersion != "ERROR") {
                    $(`*:contains("${goVerPlaceholder}")`).each(function () {
                        if ($(this).children().length < 1)
                        $(this).html($(this).html().replace(`${goVerPlaceholder}`,`${goVersion} [${goBranch}]`));
                    });
                } else {

                    $(`*:contains("${goVerPlaceholder}")`).each(function () {
                        if ($(this).children().length < 1)
                            $(this).html($(this).html().replace(`${goVerPlaceholder}`,"<span style='color:#FF0000;text-weight:bold;'>ERROR</span>"));
                    });
                }
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
                evaluateCardVer(this, $(this).attr("task-buildnum").trim());
            });
        }
        if (settingSumHours) {
            $(".columnHeader").each(function () {
                var columnType = $(this).attr("data-columntype");
                var totalCount = 0;
                $('[data-columntype="' + columnType + '"] .card').each(function () {
                    var countStr = $(this).find(".taskBoardCardColumn3").text().replace("h", "").trim();

                    var countStr = $(this).attr("task-remainingwork");
                    if (countStr != null && countStr != "") {
                        totalCount += parseFloat(countStr);
                    }
                });
                if ($(this).find(".itemCountSum").length < 1) {
                    $(this).find(".itemCount").append("<span class='itemCountSum' style='background:none; padding-left:0px;'></span>");
                }
                $(this).find(".itemCountSum").text(" (" + totalCount + "h)");
            });
        }

        // Insert TFS Card Mod sig tag in Help Menu
        var manifestData = chrome.runtime.getManifest();
        switch (tfsVersion) {
            case 2015:
                if ($('.help-menu li ul li').length > 0 && $('.tfs-card-mod-sig').length == 0) {
                    $(".help-menu li ul").append('<li id="mi_30" role="menuitem" class="menu-item tfs-card-mod-sig" title="TFS Card Mod ' + manifestData.version + '" onclick="window.open(\'https://chrome.google.com/webstore/detail/olfpjmbnimcoagkbkbnchlkcmloagdkd\',\'_blank\');"><span class="text">TFS Card Mod ' + manifestData.version + '</span><span class="html"></span></li>');

                }
                break;
            case 2018:
                if ($('#ms-vss-tfs-web-header-level1-right-menu-bar ul.sub-menu li').length > 0 && $('.tfs-card-mod-sig').length == 0) {
                    $("#ms-vss-tfs-web-header-level1-right-menu-bar ul.sub-menu").last().append(`<li id="mi_196" class="menu-item menu-item-separator" role="separator" title=""><div class="separator"></div></li><li class="menu-item tfs-card-mod-sig" tabindex="-1" role="menuitem" title="" aria-disabled="false" aria-posinset="5" aria-setsize="5"><span class="text" role="button" onclick="window.open(\'https://chrome.google.com/webstore/detail/olfpjmbnimcoagkbkbnchlkcmloagdkd\',\'_blank\');">TFS Card Mod ${manifestData.version}</span><span class="html"></span></li>`);
                }
                break;

        }

    }, 100);
    if (settingAutoColumns) {
        setTimeout(checkForColumnCount, 300);
    }
}
function checkForColumnCount() {
    if ($("#columnHeaders .columnHeader").length) {
        var colCount = $("#columnHeaders .columnHeader").length;
        var columnWidth = (100 / colCount);
        var columnMinWidth = (1020 / colCount);

        $('#settingFixColumns').html(`<style type="text/css" setting="settingFixColumns"> .backlogItem .children{display: flex;} #columnHeaders{display: flex;} #columnHeaders{position:relative !important;}  .content-section{overflow-x:hidden;} .hub-content{overflow-x:hidden;} .backlogItem .children{display: flex;} #columnHeaders{display: flex;} .content-section{overflow-x:hidden;} .hub-content{overflow-x:hidden;} #columnHeaders{position:relative !important;} div.columnHeader{min-width: ${columnMinWidth}px !important; max-width: ${columnWidth}vw !important;width: ${columnWidth}vw;} div.column{min-width: ${columnMinWidth}px !important; max-width: ${columnWidth}vw !important;width: ${columnWidth}vw;}</style>`);
    } else {
        setTimeout(checkForColumnCount, 300);
    }

}

function setupPage() {
    if (settingBuildNums_GO && $("#lblGOVer").length == 0) {

        switch (tfsVersion) {
            case 2015:
                $("#header-row").append(`<span class="slash">-</span><span id="lblGOVer" > GO Version: </span><span id="goVerNum"><img class="load-spinner" id="goVerSpinner" src="${tfsPath}/Areas/UrbanTurtle/Content/images/small-spinner.gif" style="margin: 9px 5px 0 6px;"/></span>`);
                $("#header-row").css("color", "#FFF");
                $("#goVerNum").css("font-weight", "700");
                break;
            case 2018:
                $(`#ms-vss-tfs-web-header-level1-navigation-text span.l1-navigation-text`).append(` / <span id="lblGOVer" > ${goVerPlaceholder} </span><span id="goVerNum"><img class="load-spinner" id="goVerSpinner" src="${tfsPath}/Areas/UrbanTurtle/Content/images/small-spinner.gif" style="margin: 9px 5px 0 6px;"/></span>`);
                // $("#header-row").css("color", "#FFF");
                $("#goVerNum").css("font-weight", "700");
                break;
        }
    }


}

function updateVerNumbers() {
    if (settingBuildNums_GO) {
        var goxmlhttp = new XMLHttpRequest();
        goxmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == "200") {
                try {
                    var page2 = document.implementation.createHTMLDocument("");
                    page2.documentElement.innerHTML = this.responseText;
                    var sourceStr = page2.querySelector('#M_B_PC_lblVersion').textContent.trim();
                    var verMatch = pattern.exec(sourceStr);
                    goVersion = verMatch[2];
                    goBranch = verMatch[1];
                    goVersionInt = parseInt(goVersion.replace(/\./g, ""));
                } catch (err) {
                    console.log("Error fetching Go version.\n[See Options menu to disable Go version checking: chrome-extension://olfpjmbnimcoagkbkbnchlkcmloagdkd/options.html]");
                    console.log(err);
                    if (goVersion == "") {
                        goVersion = "ERROR";
                    }
                }
            }
        };
        goxmlhttp.open("GET", goURL, true);
        try {
            goxmlhttp.send();
        } catch (err) {
            console.log("Error sending HTTP request (Go is rolling?)");
        }
    }
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
        newCardID.css("margin", "2px 0px 0px 3px");
        newCardID.css("text-align", "center");
        newCardID.css("position", "relative");
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
        cardDetails.find(".title").css("margin-left", "5px");
        cardDetails.find(".cardFooter").css("position", "absolute");
        cardDetails.find(".cardFooter").css("width", "auto");
        cardDetails.find(".cardFooter").css("left", "15px");
        cardDetails.find(".cardFooter").css("right", "0px");
        cardDetails.find(".cardFooter").css("bottom", "0px");

        $(card).find('.taskBoardCardColumn2').css("width", "calc(100% - 70px)");
        $(card).find('.taskBoardCardColumn2').css("margin-left", "2px");


        cardShadow.css("width", "13px");
        cardShadow.css("height", "92px");
        cardShadow.css("border-top-left-radius", "5px");
        cardShadow.css("border-bottom-left-radius", "5px");
        cardShadow.find("img").hide();
        cardDetails.css("width", "90%");
        cardDetails.css("padding-left", "1px");


    }

    if (settingSeverity) {
        $(card).find(".cardFooter").prepend("<div class='severityDiv' style='visibility:hidden'></div>");
        $(card).find('.taskBoardCardColumn2').css("margin-left", "19px");
        $(card).find('.taskBoardCardColumn2').css("width", "calc(100% - 85px)");

        if (settingCosmetics) {
            $(card).find('.severityDiv').css("bottom", "2px");
        }
    }
    if (settingCosmetics || settingNameStamp || settingDisplayAvatar) {
        cardControls.css("cssText", "margin-right: 0px !important;");
        cardControls.css("margin-left", "1px");
        cardControls.css("float", "left");
    }
    if (settingScrolls) {
        cardDetails.find(".title").css("overflow-y", "auto");
    }
    if (settingBuildNums) {
        $(idBar).prepend("<div class='buildNumDiv' style='margin: 5px 2px 0 1px; float: left; font-weight: bold;'></div>");
    }


    if (settingBreakdownHours) {
        $(card).find(".taskBoardCardColumn3").css("cssText", "max-width: 61px; width: 61px !important; margin-right: 5px;text-align: right;");
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
        var branch = match[1];
        var version = match[2];
        labelValInt = parseInt(version.replace(/\./g, ""));
        if (settingBuildNums_GO) {
            if (goVersion != "" && goBranch != "") {
                //This is a GO Version Number
                if (goBranch == branch && labelValInt <= goVersionInt) {
                    $(card).css('opacity', $(card).attr('opac'));
                    $(card).css('border', '1px outset  #d6d6d6');
                } else {
                    $(card).css('opacity', '0.6');
                    $(card).css('border', '1px solid #d6d6d6');
                }
            }
        } else {
            $(card).css('opacity', '1');
        }

        $(card).find('.load-spinner').remove();
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
    var jqxhr = $.post(tfsPath + "/MainProjects/_api/_wit/workitems?__v=5&ids=" + taskNum, {
        __RequestVerificationToken: $('[name="__RequestVerificationToken"]').val()
    }).done(function () {
        var responseText = jQuery.parseJSON(jqxhr.responseText);
        if (settingBuildNums) {
            var verNum = responseText["__wrappedArray"][0]["fields"]["10046"];
            if (verNum) {
                $(card).attr("task-buildnum", verNum);
            } else {
                $(card).attr("task-buildnum", "");
            }
        }
        var hoursDev = responseText["__wrappedArray"][0]["fields"]["10115"];
        if (hoursDev == "" || hoursDev == null) {
            hoursDev = "-";
        }
        var hoursTest = responseText["__wrappedArray"][0]["fields"]["10116"];
        if (hoursTest == "" || hoursTest == null) {
            hoursTest = "-";
        }
        var hoursRemaining = responseText["__wrappedArray"][0]["fields"]["10043"];
        var actualWork = responseText["__wrappedArray"][0]["fields"]["10114"];
        $(card).attr("task-remainingwork", hoursRemaining);
        var taskType = responseText["__wrappedArray"][0]["fields"]["25"];


        var severity = responseText["__wrappedArray"][0]["fields"]["10053"];
        if (settingSeverity && severity != "" & severity != null) {
            var severityDiv = $(card).find(".severityDiv");
            switch (severity.charAt(0)) {
                case ('1'):
                    $(severityDiv).addClass("severity1");
                    break;
                case ('2'):
                    $(severityDiv).addClass("severity2");
                    break;
                case ('3'):
                    $(severityDiv).addClass("severity3");
                    break;
                case ('4'):
                    $(severityDiv).addClass("severity4");
                    break;
                case ('5'):
                    $(severityDiv).addClass("severity5");
                    break;
            }
            $(severityDiv).text(severity.charAt(0));
        }
        if (settingBugHours) {
            // Fill in "Remaining Work" field for Bugs fix
            if (taskType == "Bug" && hoursRemaining > 0) {
                $(card).find('.taskBoardCardColumn3').text(hoursRemaining + " h");
                $(card).find('.taskBoardCardColumn3').attr("data-referencename", "Microsoft.VSTS.Scheduling.RemainingWork");
                $(card).find('.taskBoardCardColumn3').attr("title", "Remaining Work");
            }
        }
        if (settingBreakdownHours) {
            if (hoursRemaining) {
                $(card).find('.taskBoardCardColumn3').text(hoursRemaining + " [" + hoursDev + "/" + hoursTest + "]");
                $(card).find('.taskBoardCardColumn3').attr("title", "Remaining Work: " + hoursRemaining + "h [Development: " + hoursDev + "h, Testing: " + hoursTest + "h]");
            }
        }

        if (settingSeverity) {
            if (taskType == "Bug") {
                $(card).find(".severityDiv").css("visibility", "visible");
            } else {
                $(card).find(".taskBoardCardColumn2").css("margin-left", "2px");
            }
        }

        if (settingShowMissingWork) {
            var columnType = $(card).closest(".column").attr("data-columntype");
            if (actualWork >= 0 || columnType == "To Do" || columnType == "In Progress") {
                $(card).css("box-shadow", "");
                $(card).attr("title", "");
                $(card).find(".title").attr("title", $(card).find(".title").text());
            } else {
                $(card).attr("title", "ERROR: Missing 'Actual Work' value.");
                $(card).find(".title").attr("title", "ERROR: Missing 'Actual Work' value.");
                $(card).css("box-shadow", "0px 0px 5px 2px #ff0000", "important");
            }
        }


        if (settingTagIcons) {
            $(card).find(".cardControls").first().before("<span id='miscIcons'></span><span id='prodIcons'></span><span id='platIcons'></span><span id='browsIcons'></span>");
        }

        processTags(card, responseText["__wrappedArray"][0]["fields"]["80"]);
        processAvatar(card, responseText["__wrappedArray"][0]["fields"]["24"]);
    }).fail(function () {
        console.log("ERROR FETCHING DATA FOR TASK " + taskNum + " -- URI: " + tfsPath + "/MainProjects/_api/_wit/workitems?__v=5&ids=" + taskNum)
    })
}

function initializeCard(card) {
    $(card).attr('opac', $(card).css('opacity'));
    $(card).css('border', 'none');
    $(card).css('opacity', '0.2');
    $(card).find('.idBar').prepend("<img class='load-spinner' src='" + tfsPath + "/Areas/UrbanTurtle/Content/images/small-spinner.gif' style='margin: 9px 5px 0 6px;float: left;'/>")

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
                var foundIcon = false;
                if (settingTagIcons) {
                    if (tagIconProdDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) {
                        $(card).find("#prodIcons").prepend("<a class='cardControls' href='#' hidefocus='hidefocus' style='float: left;padding-top: 5px;cursor: move;margin-left: 1px;margin-right: 0px !important'><img src='" + chrome.extension.getURL(tagIconProdDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) + "' title='" + tagsArr[i] + "' alt='" + tagsArr[i] + "' width='16' height='16'></a>");
                        foundIcon = true;
                    } else if (tagIconPlatDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) {
                        $(card).find("#platIcons").prepend("<a class='cardControls' href='#' hidefocus='hidefocus' style='float: left;padding-top: 5px;cursor: move;margin-left: 1px;margin-right: 0px !important'><img src='" + chrome.extension.getURL(tagIconPlatDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) + "' title='" + tagsArr[i] + "' alt='" + tagsArr[i] + "' width='16' height='16'></a>");
                        foundIcon = true;
                    } else if (tagIconBrowsDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) {
                        $(card).find("#browsIcons").prepend("<a class='cardControls' href='#' hidefocus='hidefocus' style='float: left;padding-top: 5px;cursor: move;margin-left: 1px;margin-right: 0px !important'><img src='" + chrome.extension.getURL(tagIconBrowsDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) + "' title='" + tagsArr[i] + "' alt='" + tagsArr[i] + "' width='16' height='16'></a>");
                        foundIcon = true;
                    } else if (tagIconMiscDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) {
                        $(card).find("#miscIcons").prepend("<a class='cardControls' href='#' hidefocus='hidefocus' style='float: left;padding-top: 5px;cursor: move;margin-left: 1px;margin-right: 0px !important'><img src='" + chrome.extension.getURL(tagIconMiscDict[tagsArr[i].trim().replace(" ", "").toUpperCase()]) + "' title='" + tagsArr[i] + "' alt='" + tagsArr[i] + "' width='16' height='16'></a>");
                        foundIcon = true;
                    }
                }
                if (!foundIcon && settingDisplayTags) {
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
            var avatarURL = tfsPath + "/MainProjects/_api/_common/IdentityImage?id=&identifier=" + userID;
            $(card).css("background-image", "url(" + encodeURI(avatarURL) + ")");
            $(card).css("background-size", "28px");
            $(card).css("background-repeat", "no-repeat");
            $(card).css("background-position", "top right");
        }
        if (settingNameStamp) {
            //Stamp name
            var idBar = $(card).find(".idBar");
            idBar.append("<div class='nameStamp' style='font-weight: bold;float: right;position: absolute;padding: 3px;border-radius: 5px;transform: rotate(10deg);top: 6px;right: 3px;text-transform: capitalize;'></div>");
            var nameStamp = idBar.find(".nameStamp");
            var match = fNamePtrn.exec(userID);
            if (match && match[1]) {
                if (match[1] == "for") {
                    nameStamp.css("color", "#3d39ff");
                    nameStamp.css("box-shadow", "inset 0px 0px 1px 1px #3d39ff");
                    nameStamp.css("background-color", "rgba(0, 0, 241, 0.09)");
                    nameStamp.text("For Review");
                } else {
                    nameStamp.css("color", "#ff0000");
                    nameStamp.css("box-shadow", "inset 0px 0px 1px 1px #ff0000");
                    nameStamp.css("background-color", "rgba(241, 0, 0, 0.09)");
                    nameStamp.text(match[1]);
                }
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
        sColors: true,
        sBuildNums: true,
        sIcons: true,
        sTags: true,
        sOwner: "avatar",
        sBugHours: true,
        sScrolls: true,
        sCosmetics: true,
        sRTE: true,
        sTitle: true,
        sShowMissingWork: true,
        sColTotals: true,
        sBreakdownHours: true,
        sSeverity: true,
        sAutoColumns: true
    }, function (items) {
        settingColors = items.sColors;
        if (items.sBuildNums == false) {
            settingBuildNums = false;
            settingBuildNums_GO = false;
        } else {
            settingBuildNums = true;
            settingBuildNums_GO = true;
        }
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
        settingShowMissingWork = items.sShowMissingWork;
        settingSumHours = items.sColTotals;
        settingBreakdownHours = items.sBreakdownHours;
        settingSeverity = items.sSeverity;
        settingAutoColumns = items.sAutoColumns;

        settingsLoaded = true;
    });
}