


// Saves options to chrome.storage
function save_options() {
  var colors = document.getElementById('cbColors').checked;
  var buildNums = document.getElementById('ddlBuildNums').value;
  var icons = document.getElementById('cbIcons').checked;
  var tags = document.getElementById('cbTags').checked;
  var owner = document.getElementById('ddlOwner').value;
  var bugHours = document.getElementById('cbBugHours').checked;
  var scrolls = document.getElementById('cbScrolls').checked;
  var cosmetics = document.getElementById('cbCosmetics').checked;
  var RTE = document.getElementById('cbRTE').checked;
  var title = document.getElementById('cbTitle').checked;
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
    sTitle: title
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    sColors: "true",
    sBuildNums: "both",
    sIcons: "true",
    sTags: "true",
    sOwner: "avatar",
    sBugHours: "true",
    sScrolls: "true",
    sCosmetics: "true",
    sRTE: "true",
    sTitle: "true"
  }, function (items) {
    document.getElementById('cbColors').checked = items.sColors;
    document.getElementById('ddlBuildNums').value = items.sBuildNums;
    document.getElementById('cbIcons').checked = items.sIcons;
    document.getElementById('cbTags').checked = items.sTags;
    document.getElementById('ddlOwner').value = items.sOwner;
    document.getElementById('cbBugHours').checked = items.sBugHours;
    document.getElementById('cbScrolls').checked = items.sScrolls;
    document.getElementById('cbCosmetics').checked = items.sCosmetics;
    document.getElementById('cbRTE').checked = items.sRTE;
    document.getElementById('cbTitle').checked = items.sTitle;
  });
}

function clear_options() {
  chrome.storage.sync.clear(function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
      var status = document.getElementById('status');
    status.textContent = 'Resetting options...';
    setTimeout(function () {
  location.reload();
    }, 750);
}


document.addEventListener('DOMContentLoaded', restore_options);

$(document).ready(function () {

$("#save").click(function () {
  save_options();
  return false;
});
$("#reset").click(function () {
  clear_options();
  return false;
});
});

