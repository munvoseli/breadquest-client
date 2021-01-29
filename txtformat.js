// It should be noted that this program freezes my Ubuntu 20.04 when using Firefox
var fileInput = document.createElement("input");
fileInput.setAttribute("type", "file");
fileInput.multiple = true;
function loadFile(file) {
    var fileReader = new FileReader();
    fileReader.addEventListener("loadend", function(e) {
	var result = fileReader.result;
	result = result.replaceAll("\u2014", "--");
	result = result.replaceAll("\u2019", "'");
	result = result.replaceAll("\u201c", '"');
	result = result.replaceAll("\u201d", '"');
	result = result.replaceAll("\u2026", '...');
	var paras = result.split(/\n[\n ]+/);
	var lineLength = 30;
	for (var k = 0; k < paras.length; k++)
	{
	    var words = paras[k].split(" ");
	    var lines = [""];
	    var line = 0;
	    for (var i = 0; i < words.length; i++)
	    {
		var word = words[i];
		if (lines[line].length + word.length < lineLength)
		{
		    lines[line] += (lines[line].length ? " " : "") + word;
		}
		else
		{
		    line++;
		    i--;
		    lines[line] = [];
		}
	    }
	    paras[k] = lines.join("\n");
	}
	result = paras.join("\n");
	var lines = result.split("\n");
	for (var line = 0; line < lines.length; line++)
	    for (var j = lines[line].length; j < lineLength; j++)
		lines[line] += " ";
	console.log(lines.length);
	result = lines.join("\n");
	for (var i = 0; i < result.length; i++)
	{
	    if (result.charCodeAt(i) >= 128)
		console.log(result[i]);
	}
	console.log(result);
    }, false);
    
    // only choose one of these
    fileReader.readAsText(file);
}
fileInput.addEventListener("change", function() {
    var files = fileInput.files;
    for (var file of files) {
	loadFile(file);
    }
}, false);



document.body.appendChild(fileInput);