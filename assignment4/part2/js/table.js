/*
    Lucas Torres
    lucas_torres@student.uml.edu
    COMP.4610 OL CE2 045 GUI Programming I 2024 Summer
    Homework 4
*/

// the valid range for the numerical inputs
var range = [-50, 50];

// enable tabs
$("#tabs").tabs();
var tabID = 0;

// enable sliders
$(".slider").slider({
    min: range[0],
    max: range[1],
});

// bind slider events to update the text boxes
$(".slider").on("slide", function(event, ui) {
    // find the corresponding <input>
    let textBox = $(this).parent().prev().children("input");
    // set the value of the <input> to match the slider
    textBox.val(ui.value);
    // trigger a keyup event to get the jquery validation plugin to re-valid this particular field
    textBox.trigger("keyup");
    // regenerate the table
    updateMainTable()
});

// bind text box events to update the sliders
$(".paramInput").on("input", function() {
    // find the corresponding <div> for the slider
    let slider = $(this).parent().next().children(".slider");
    // set the value of the slider to match the text box
    slider.slider("value", $(this).val())
    // regenerate the table
    updateMainTable()
});

// setup the onClick listener for the "close all tabs" button
$("#megaClose").on("click", closeAllTabs);

// add the "min" and "max" tag to each input box
// and default them to zero
$("#tableForm input").each(function() {
    $(this).attr("min", range[0]);
    $(this).attr("max", range[1]);
    $(this).val(0);
});

// semi-dynamically create the rules and error messages that will
// be given to the jquery validation plugin
var plainMessage = "Must be an integer between " + range[0] + " and " + range[1];
var rules = {};
var messages = {};
for (x of ["xmin", "xmax", "ymin", "ymax"]) {
    rules[x] = {
        number: true,
        required: true,
        step: 1,
        range: range,
    };
    messages[x] = {
        number: plainMessage + " (Not a number!)",
        required: plainMessage + " (Can't be blank!)",
        min: plainMessage + " (Too low!)",
        max: plainMessage + " (Too high!)",
        step: plainMessage + " (Not a whole number!)",
    };
}

// give the jquery validation plugin the rules and error messages
$("#tableForm").validate({
    rules: rules,
    messages: messages,
    errorClass: "is-invalid",
    errorPlacement: function(error, element) {
        // this function is used to place the error message slightly higher up the DOM
        // hierarchy so that it is shown below the slider as well
        error.appendTo(element.parent().parent());
    },
});


// add a listener to the submit button to generate the table
$("#tableForm").on("submit", function(event) {
    event.preventDefault();

    let vals = getTableParams();
    if (vals === undefined) {
        return;
    }

    // create the tab page div and the table within it
    let tabPage = $('<div>', {id: "fragment-" + ++tabID, class: "overflow-scroll"});
    let tabCloseButton = $('<button class="btn btn-danger btn-sm">Close this tab</button>');
    tabPage.append(tabCloseButton);
    let table = $('<table>', {class: "table table-sm table-bordered table-striped table-striped-columns"});
    tabPage.append(table);

    // call a function to generate the multiplication table
    table.append(generateTable(...vals));

    // setup the onClick event for the close tab button
    tabCloseButton.on("click", clickedClosedTab);

    // create a new tab header
    let tabNub = $('<li><a href="#fragment-' + tabID + '">' + vals + '</a></li>');
    $("#tabs > ul").append(tabNub);

    // add the created tab page to the site
    $("#tabs").append(tabPage);

    updateTabs();
});

function getTableParams() {
    // don't do anything if the form is invalid
    if (!$("#tableForm").valid()) {
        return;
    }

    // grab the values from the input boxes
    let xmin = parseInt($("#xmin").val());
    let xmax = parseInt($("#xmax").val());
    let ymin = parseInt($("#ymin").val());
    let ymax = parseInt($("#ymax").val());

    // sanity check
    if (Number.isNaN(xmin) || Number.isNaN(xmax) || Number.isNaN(ymin) || Number.isNaN(ymax)) {
        return;
    }
    return [xmin, xmax, ymin, ymax];
}

function updateMainTable() {
    let vals = getTableParams();
    if (vals === undefined) {
        return;
    }

    // clear the table of any prior elements
    $("#mainTable").empty();

    // add the completed table row to the table
    $("#mainTable").append(generateTable(...vals));
}

// generates a <tbody> element with the multiplication table in it, and returns it
function generateTable(xmin, xmax, ymin, ymax) {
    let tableBody = $('<tbody>');

    // calculate how many times the row and column for() loops will have to iterate,
    // +2 because: +1 to account for including the ending number, +1 to account for the header
    let colCount = Math.abs(xmin - xmax) + 2;
    let rowCount = Math.abs(ymin - ymax) + 2;

    // generate the table
    for (let y = 0; y < rowCount; y++) {
        // create a table row
        let row = $("<tr></tr>");

        for (let x = 0; x < colCount; x++) {
            // top left corner cell is just empty
            if (y == 0 && x == 0) {
                row.append($('<th class="table-dark"></th>'));
                continue;
            }

            // calculate the current position, accounting
            // for backwards order (in case the table is in reverse order)
            let xVal;
            if (xmin < xmax) {
                xVal = xmin - 1 + x;
            } else {
                xVal = xmin + 1 - x;
            }
            let yVal;
            if (ymin < ymax) {
                yVal = ymin - 1 + y;
            } else {
                yVal = ymin + 1 - y;
            }
            let value = xVal * yVal;

            // column header
            if (y == 0) {
                row.append($('<th class="table-dark">' + xVal + "</th>"));
                continue;
            }

            // row header
            if (x == 0) {
                row.append($('<th class="table-dark">' + yVal + "</th>"));
                continue;
            }

            // regular value
            row.append($("<td>" + value + "</td>"));
        }

        // add the completed table row to the table
        tableBody.append(row);
    }
    return tableBody;
}


// function used by the delete tab button
function clickedClosedTab() {
    // get the parent of the button, which should be the div for the entire tab page
    let p = $(this).parent();

    // get the id of this tab in order to find the corresponding tab nub
    let id = p.attr("id");

    // delete the tab nub and the tab page
    $('[href="#' + id + '"]').parent().remove();
    p.remove();

    updateTabs();
}

function closeAllTabs() {
    // delete all tab nubs that aren't the main tab
    $("#tabs > ul > li:has(a[href!=\\#fragment-main])").each(function() {
        $(this).remove();
    });

    // delete all tab pages that aren't the main tab
    $("#tabs > div[id!=fragment-main]").each(function() {
        $(this).remove();
    });

    updateTabs();
}

function updateTabs() {
    // tell the jquery UI plugin to refresh
    $("#tabs").tabs("refresh");

    // update the visibility of the "close all tabs" button
    // depending on how many tabs there are
    let tabCount = $("#tabs > ul").children().length - 1;
    let megaCloseButton = $("#megaClose").attr("hidden", tabCount < 1);
}
