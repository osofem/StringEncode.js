/**
 * Encodes string into Base85.
 * @input {String} - The data to be encoded. This is passed to the function via the "this" keyword
 * @returns {String} The Base85 encoded data as string.
 */
String.prototype.toAscii85 = function(){
	/**
 	* Turns a single character (it ASCII code) to binary padded to 8 figures when necessary.
 	* @param {String} n - The single character whose ASCII code is to be converted to binary
 	* @returns {String} The binary of the ASCII code of n padded to 8 figures when necessary.
 	*/
	var encodeToBinary = function(n){
		let bin = n.charCodeAt(0);
		bin = bin.toString(2);
		bin = "0".repeat(8-bin.length) + bin;
		return bin;
	}
	let txt = [...this];
	let bin = "";
	for(let i = 0; i < txt.length; i++) bin += encodeToBinary(txt[i]);
	
	/* Pad the binary so it length is exactly divisible by 32 
	 * because we are going to divide it into chucks of 32's 
	 * We pad with "0"
	*/
	let padding = (32-(bin.length%32)); 
	if(padding%32 == 0) padding = 0; //If length is exactly divisible by 32 padding returns 32, so we reset it to 0
	for(let counter = 0; padding > 0 && counter < padding; counter++)
		bin += "0";
	
	//Divide whole binary to chunk of 32 characters
	let chunk = [];
	for(let i = 32; i <= bin.length; i += 32)
		chunk.push(bin.slice(i-32, i));
	
	/* Each chunk should be converted from binary to base 10
	 * The value should then be splitted into five integers
	 * chunk value (in base 10) = (int1*85^4) + (int2*85^3) + (int3*85^2) + (int4*85^1) + int5
	*/
	var ASCII = ""; 
	for(let i = 0; i < chunk.length; i++){
		let sub = parseInt(chunk[i], 2);
		let w1 = Math.floor(sub/Math.pow(85, 4));
		let w2 = Math.floor((sub-(w1*Math.pow(85, 4)))/Math.pow(85, 3));
		let w3 = Math.floor((sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3)))/Math.pow(85, 2));
		let w4 = Math.floor((sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3))-(w3*Math.pow(85, 2)))/Math.pow(85, 1));
		let w5 = sub-(w1*Math.pow(85, 4))-(w2*Math.pow(85, 3))-(w3*Math.pow(85, 2))-(w4*Math.pow(85, 1));
		
		//33 is added to each integer and convert to it corresponding ASCII character
		let sub1 = String.fromCharCode(w1+33);
		let sub2 = String.fromCharCode(w2+33);
		let sub3 = String.fromCharCode(w3+33);
		let sub4 = String.fromCharCode(w4+33);
		let sub5 = String.fromCharCode(w5+33);
		sub = sub1 + sub2 + sub3 + sub4 + sub5;
		
		//If chunk is just bunch of 0's just represent it with z
		if(sub == "!!!!!") sub = "z";
			
		ASCII += sub;
	}
	
	//Remove (padding/8) numbers of character from the final encoded characters
	for(let i = 0; (padding/8) != 0 && i < (padding/8); i++){
		if(ASCII == "z") ASCII = "!!!!!";
		ASCII = ASCII.substr(0, ASCII.length-1);
	}
	return "<~" + ASCII + "~>";
}

/**
 * Decodes Base85 encoded data into it original string.
 * @input {String} - The data to be decoded. This is passed to the function via the "this" keyword
 * @returns {String} The original decoded string from Base85.
 */
String.prototype.fromAscii85 = function(){
	//Remove white space and new lines
	let code = this.replace(/\s|\n/g,"");
	//remove beginning <~ and ending ~>
	code = code.replace(/^<~|~>$/g,"");
	//Replace all "z" with "!!!!!"
	code = code.replace(/z/g,"!!!!!");
	
	/* Pad the data so it length is exactly divisible by 5 
	 * because we are going to divide it into chucks of 5's 
	 * We pad with "u"
	*/
	let padding = 5 - (code.length%5); 
	if(padding%5 == 0) padding = 0; //If length is exactly divisible by 5 padding returns 5, so we reset it to 0
	code += "u".repeat(padding);
	
	//Divide padded data to chunk of 5 characters
	let chunk = [];
	for(let i = 5; i <= code.length; i += 5) chunk.push(code.slice(i-5, i));
	
	/*
	* Take each character in a chunk
	* Convert it to it ASCII code and subtract 33 from it
	* Raise it to the corresponding power of 85
	* And add the integers together
	* Convert it base 2 and pad it to 32 characters when necessary
	* Slice the 32 characters into 8 characters in 4 places
	* Convert each slice to base 10 and to the corresponding character of ASCII
	*/
	let txt = "";
	for(let i = 0; i < chunk.length; i++){
		let w1 = ((chunk[i][0]).charCodeAt(0)-33)*Math.pow(85,4);
		let w2 = ((chunk[i][1]).charCodeAt(0)-33)*Math.pow(85,3);
		let w3 = ((chunk[i][2]).charCodeAt(0)-33)*Math.pow(85,2);
		let w4 = ((chunk[i][3]).charCodeAt(0)-33)*Math.pow(85,1);
		let w5 = ((chunk[i][4]).charCodeAt(0)-33);
		let sub = w1+w2+w3+w4+w5;
		sub = sub.toString(2);
		sub = "0".repeat(32-sub.length)+sub;
		
		w1 = String.fromCharCode(parseInt(sub.slice(0, 8), 2));
		w2 = String.fromCharCode(parseInt(sub.slice(8, 16), 2));
		w3 = String.fromCharCode(parseInt(sub.slice(16, 24), 2));
		w4 = String.fromCharCode(parseInt(sub.slice(24, 32), 2));
		txt += w1+w2+w3+w4;
	}
	
	//Remove the number of padding added above from the strings
	for(let i = 0; i < padding; i++) txt = txt.substr(0, txt.length-1);
	
	return txt;
}

/**
 * Encodes string to Base64.
 * *****NOTICE the inbuilt btoa() can do this, this is just to understand what's going on under the hood******
 * @input {String} - The string to be encoded. This is passed to the function via the "this" keyword
 * @returns {String} The Base64 encoded data as string
 */
String.prototype.toBase64 = function(){
	var __codeString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	/**
 	* Turns a single character (it ASCII code) to binary padded to 8 figures when necessary.
 	* @param {String} n - The single character whose ASCII code is to be converted to binary
 	* @returns {String} The binary of the ASCII code of n padded to 8 figures when necessary.
 	*/
	var encodeToBinary = function(n){
		let bin = n.charCodeAt(0);
		bin = bin.toString(2);
		bin = "0".repeat(8-bin.length) + bin;
		return bin;
	}

	let txt = [...this];
	let bin = "";
	for(let i = 0; i < txt.length; i++) bin += encodeToBinary(txt[i]);
	
	/* Pad the data so it length is exactly divisible by 24 
	 * because we are going to divide it into chucks of 24's 
	 * We pad with "0"
	*/
	let padding = (24-(bin.length%24)); 
	if(padding%24 == 0) padding = 0; //If length is exactly divisible by 24 padding returns 24, so we reset it to 0
	for(let counter = 0; padding > 0 && counter < padding; counter++)
		bin += "0";
	
	//Divide padded data to chunk of 24 characters
	let chunk = [];
	for(let i = 24; i <= bin.length; i += 24) chunk.push(bin.slice(i-24, i));
	
	/*
	* Slice the 24 characters in each chunk into 6 characters in 4 places
	* If a 6 character chunk is "000000" encode it as "="
	* Else convert the chunk to base10 and map it to our __codeString variable
	* i.e. if the chunk in base10 is 0, it is encoded as "A" (__codeString[0])
	*/
	let BASE64 = ""; 
	for(let i = 0; i < chunk.length; i++){
		let w1 = (chunk[i].slice(0, 6) == "000000")?"=":__codeString[parseInt(chunk[i].slice(0, 6), 2)];
		let w2 = (chunk[i].slice(6, 12) == "000000")?"=":__codeString[parseInt(chunk[i].slice(6, 12), 2)];
		let w3 = (chunk[i].slice(12, 18) == "000000")?"=":__codeString[parseInt(chunk[i].slice(12, 18), 2)];
		let w4 = (chunk[i].slice(18, 24) == "000000")?"=":__codeString[parseInt(chunk[i].slice(18, 24), 2)];
		let sub = w1+w2+w3+w4;
		BASE64 += sub;
	}
	return BASE64;
}

/**
 * Decodes Base64 encoded data to it original string.
 * *****NOTICE the inbuilt atob() can do this, this is just to understand what's going on under the hood******
 * @input {String} - The string to be decoded. This is passed to the function via the "this" keyword
 * @returns {String} The original decoded string form Base64
 */
String.prototype.fromBase64 = function(){
	var __codeString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	let txt = [...this];
	
	/*Find the index of character inthe encoded data in our __codeString
	* Convert it to binary and padd it to 6 chcracters when necessary
	*/
	let decode = "";
	for(let i = 0; i < txt.length; i++){
		let tx = ((__codeString.indexOf(txt[i])>0)?__codeString.indexOf(txt[i]):0).toString(2);
		tx = "0".repeat(6-tx.length) + tx;
		decode += tx;
	}
	
	//Break the whole binary into chunks of 8 characters
	let chunk = [];
	for(let i = 8; i <= decode.length; i += 8) chunk.push(decode.slice(i-8, i));
	
	//Take each chunk of 8 characters and convert it to base10 and to the corresponding character of ASCII
	let realText = ""; 
	for(let i = 0; i < chunk.length; i++){
		if(parseInt(chunk[i],2) == 0) continue;
		realText += String.fromCharCode(parseInt(chunk[i],2));
	}
	return realText;
}