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