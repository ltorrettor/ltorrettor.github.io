var page = document.getElementById("page");
var list = page.getElementsByTagName("ul")[0];

// ADD NEW ITEM TO END OF LIST
var cream = document.createElement("li");
cream.innerHTML = "cream";
list.append(cream);

// ADD NEW ITEM START OF LIST
var kale = document.createElement("li");
kale.innerHTML = "kale";
list.prepend(kale);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for (var i = 0; i < list.children.length; i++) {
	list.children[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var count = document.createElement("span");
count.innerHTML = list.children.length;
page.getElementsByTagName("h2")[0].append(count);
