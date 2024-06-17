/*
    Lucas Torres
    lucas_torres@student.uml.edu
    COMP.4610 OL CE2 045 GUI Programming I 2024 Summer
    Homework 4
*/

// the valid range for the numerical inputs
var range = [-50, 50];

// add the "min" and "max" tag to each input box
$("#tableForm input").each(function() {
    $(this).attr("min", range[0]);
    $(this).attr("max", range[1]);
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
});


// add a listener to the submit button to generate the table
$("#tableForm").on("submit", function(event) {
    event.preventDefault();

    // don't do anything if the form is invalid
    if (!$("#tableForm").valid()) {
        return;
    }

    // clear the table of any prior elements
    $("#table").empty();

    // grab the values from the input boxes
    var xmin = parseInt($("#xmin").val());
    var xmax = parseInt($("#xmax").val());
    var ymin = parseInt($("#ymin").val());
    var ymax = parseInt($("#ymax").val());

    // calculate how many times the row and column for() loops will have to iterate,
    // +2 because: +1 to account for including the ending number, +1 to account for the header
    var colCount = Math.abs(xmin - xmax) + 2;
    var rowCount = Math.abs(ymin - ymax) + 2;

    // generate the table
    for (var y = 0; y < rowCount; y++) {
        // create a table row
        var row = $("<tr></tr>");

        for (var x = 0; x < colCount; x++) {
            // top left corner cell is just empty
            if (y == 0 && x == 0) {
                row.append($('<th class="table-dark"></th>'));
                continue;
            }

            // calculate the current position, accounting
            // for backwards order (in case the table is in reverse order)
            var xVal;
            if (xmin < xmax) {
                xVal = xmin - 1 + x;
            } else {
                xVal = xmin + 1 - x;
            }
            var yVal;
            if (ymin < ymax) {
                yVal = ymin - 1 + y;
            } else {
                yVal = ymin + 1 - y;
            }
            var value = xVal * yVal;

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
        $("#table").append(row);
    }
});
