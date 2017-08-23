


// Saves options to chrome.storage
function save_options() {
  var colors = document.getElementById('cbColors').checked;
  var buildNums = document.getElementById('cbBuildNums').checked;
  var icons = document.getElementById('cbIcons').checked;
  var tags = document.getElementById('cbTags').checked;
  var owner = document.getElementById('ddlOwner').value;
  if (!$("#cbOwner")[0].checked) {
    owner = "disabled";
  }
  var bugHours = document.getElementById('cbBugHours').checked;
  var scrolls = document.getElementById('cbScrolls').checked;
  var cosmetics = document.getElementById('cbCosmetics').checked;
  var RTE = document.getElementById('cbRTE').checked;
  var title = document.getElementById('cbTitle').checked;
  var showMissingWork = document.getElementById('cbShowMissingWork').checked;
  var colTotals = document.getElementById('cbColTotals').checked;
  var severity = document.getElementById('cbSeverity').checked;
  var breakdownHours = document.getElementById('cbBreakdownHours').checked;
  chrome.storage.sync.set({
    sColors: colors,
    sBuildNums: buildNums,
    sIcons: icons,
    sTags: tags,
    sOwner: owner,
    sBugHours: bugHours,
    sScrolls: scrolls,
    sCosmetics: cosmetics,
    sRTE: RTE,
    sTitle: title,
    sShowMissingWork: showMissingWork,
    sColTotals: colTotals,
    sSeverity: severity,
    sBreakdownHours: breakdownHours
  }, function () {
    // Update status to let user know options were saved.
    $("#version").hide();
    $("#status").show();
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
    $("#status").hide();
    $("#version").show();
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
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
    sSeverity: true,
    sBreakdownHours: true

  }, function (items) {
    document.getElementById('cbColors').checked = items.sColors;

    if (items.sBuildNums != "disabled" && items.sBuildNums != false) {
      document.getElementById('cbBuildNums').checked = true;
    } else {
      document.getElementById('cbBuildNums').checked = false;
    }
    document.getElementById('cbIcons').checked = items.sIcons;
    document.getElementById('cbTags').checked = items.sTags;
    switch (items.sOwner) {
      case ("disabled"):
        $("#cbOwner")[0].checked = false;
        $("#ddlOwner").prop("disabled", true);
        $("#ddlOwner").parent().prop("disabled", true);
        break;
      case ("avatar"):
        $("#cbOwner")[0].checked = true;
        $("#ddlOwner")[0].value = items.sOwner;
        $("#ddlOwner").prop("disabled", false);
        $("#ddlOwner").parent().prop("disabled", false);
        break;
      case ("name"):
        $("#cbOwner")[0].checked = true;
        $("#ddlOwner")[0].value = items.sOwner;
        $("#ddlOwner").prop("disabled", false);
        $("#ddlOwner").parent().prop("disabled", false);
        break;
    }
    document.getElementById('cbBugHours').checked = items.sBugHours;
    document.getElementById('cbScrolls').checked = items.sScrolls;
    document.getElementById('cbCosmetics').checked = items.sCosmetics;
    document.getElementById('cbRTE').checked = items.sRTE;
    document.getElementById('cbTitle').checked = items.sTitle;
    document.getElementById('cbShowMissingWork').checked = items.sShowMissingWork;
    document.getElementById('cbColTotals').checked = items.sColTotals;
    document.getElementById('cbSeverity').checked = items.sSeverity;
    document.getElementById('cbBreakdownHours').checked = items.sBreakdownHours;
  });
}

function clear_options() {
  chrome.storage.sync.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  $("#version").hide();
  $("#status").show();
  var status = document.getElementById('status');
  status.textContent = 'Resetting options...';
  setTimeout(function () {
    location.reload();
  }, 750);
}


document.addEventListener('DOMContentLoaded', restore_options);

$(document).ready(function () {

  var manifestData = chrome.runtime.getManifest();
  $("#version").text("v " + manifestData.version);
  $("#cbOwner").click(function () {
    $("#ddlOwner").prop('disabled', !$("#cbOwner")[0].checked);
  });

  $("#save").click(function () {
    save_options();
    return false;
  });
  $("#reset").click(function () {
    clear_options();
    return false;
  });
});

