String.prototype.toAscii85 = function()
{
	var encodeToBinary = function(n)
	{
		let bin = n.charCodeAt(0);
		bin = bin.toString(2);
		for(let i = bin.length; i < 8; i++)//Pad to 8 figures with "0"
		{
			bin = "0" + bin;
		}
		return bin;
	}
	let txt = [...this];
	let bin = "";
	for(let i = 0; i < txt.length; i++)
	{
		bin += encodeToBinary(txt[i]);
	}

	let padding = (32-(bin.length%32)); 
	if(padding%32 == 0) padding = 0;
	for(let counter = 0; padding > 0 && counter < padding; counter++)
	{
		bin += "0";
	}
	
	let chunk = [];
	for(let i = 32; i <= bin.length; i += 32)//Divide whole binary to chunk of 32 figures
	{
		chunk.push(bin.slice(i-32, i));
	}
	
	var ASCII = ""; 
	for(let i = 0; i < chunk.length; i++)
	{
		let sub = parseInt(chunk[i], 2);
		let w1 = Math.floor(sub/Math.pow(85, 4));
		let w2 = Math.floor((sub-(w1*Math.pow(85, 4)))/Math.pow(85, 3));
		let w3 = Math.floor((sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3)))/Math.pow(85, 2));
		let w4 = Math.floor((sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3))-(w3*Math.pow(85, 2)))/Math.pow(85, 1));
		let w5 = sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3))-(w3*Math.pow(85, 2))-(w4*Math.pow(85, 1));
		
		//For first char
		let sub1 = String.fromCharCode(w1+33);
		//Second char
		let sub2 = String.fromCharCode(w2+33);
		//Third char
		let sub3 = String.fromCharCode(w3+33);
		//Fourth char
		let sub4 = String.fromCharCode(w4+33);
		//Fiveth char
		let sub5 = String.fromCharCode(w5+33);
		sub = sub1 + sub2 + sub3 + sub4 + sub5;
		if(sub == "!!!!!")
			sub = "z";
		ASCII += sub;
	}
	for(let i = 0; (padding/8) != 0 && i < (padding/8); i++)
	{
		if(ASCII == "z")
			ASCII = "!!!!!";
		ASCII = ASCII.substr(0, ASCII.length-1);
	}
	return "<~" + ASCII + "~>";
}

String.prototype.fromAscii85 = function()
{
	//Remove white space and new lines
	let code = this.replace(/\s|\n/g,"");
	//remove beginning <~ and ending ~>
	code = code.replace(/^<~|~>$/g,"");
	//Replace all "z" with "!!!!!"
	code = code.replace(/z/g,"!!!!!");
	
	let padding = 5 - (code.length%5); 
	if(padding%5 == 0) padding = 0;
	for(let i = 0; i < padding; i++)
	{
		code += "u";
	}
	
	//Take chunk of 5 characters
	let chunk = [];
	for(let i = 5; i <= code.length; i += 5)
	{
		chunk.push(code.slice(i-5, i));
	}
	
	let txt = "";
	for(let i = 0; i < chunk.length; i++)
	{
		let w1 = ((chunk[i][0]).charCodeAt(0)-33)*Math.pow(85,4);
		let w2 = ((chunk[i][1]).charCodeAt(0)-33)*Math.pow(85,3);
		let w3 = ((chunk[i][2]).charCodeAt(0)-33)*Math.pow(85,2);
		let w4 = ((chunk[i][3]).charCodeAt(0)-33)*Math.pow(85,1);
		let w5 = ((chunk[i][4]).charCodeAt(0)-33);
		let sub = w1+w2+w3+w4+w5;
		sub = sub.toString(2);
		
		for(let v = sub.length; v < 32; v++)//Pad to 8 digits
		{
			sub = "0" + sub;
		}
		w1 = String.fromCharCode(parseInt(sub.slice(0, 8), 2));
		w2 = String.fromCharCode(parseInt(sub.slice(8, 16), 2));
		w3 = String.fromCharCode(parseInt(sub.slice(16, 24), 2));
		w4 = String.fromCharCode(parseInt(sub.slice(24, 32), 2));
		txt += w1+w2+w3+w4;
	}
	
	//Remove padded strings
	for(let i = 0; i < padding; i++)
	{
		txt = txt.substr(0, txt.length-1);
	}
	return txt;
}
