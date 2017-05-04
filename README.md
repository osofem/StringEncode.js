# StringEncode.js
Encode and Decode string to various bases in JavaScript.

INTRODUCTION

This library build on String.prototype to encode/decode strings to/from various bases. 

SUPPORTED BASES

The currently supported bases are 
1. ASCII85 (also known as Base85 and Z85)
2. Base64

HOWTO

Example of how to use the library

<script src="https://rawgit.com/osofem/StringEncode.js/master/StringEncode.js">

	//Encoding to ASCII85
	
	document.writeln("Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.".toAscii85());
	
	//Decoding from ASCII85 to normal string
	
	document.writeln("<~9jqo^BlbD-BleB1DJ+*+F(f,q/0JhKF<GL>Cj@.4Gp$d7F!,L7@<6@)/0JDEF<G%<+EV:2F!,O<DJ+*.@<*K0@<6L(Df-\0Ec5e;DffZ(EZee.Bl.9pF"AGXBPCsi+DGm>@3BB/F*&OCAfu2/AKYi(DIb:@FD,*)+C]U=@3BN#EcYf8ATD3s@q?d$AftVqCh[NqF<G:8+EV:.+Cf>-FD5W8ARlolDIal(DId<j@<?3r@:F%a+D58'ATD4$Bl@l3De:,-DJs`8ARoFb/0JMK@qB4^F!,R<AKZ&-DfTqBG%G>uD.RTpAKYo'+CT/5+Cei#DII?(E,9)oF*2M7/c~>".fromAscii85());
	
	//Encoding to Base64
	
	document.writeln("Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.".toBase64());
	
	//Decoding from ASCII85 to normal string
	
	document.writeln("TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=".fromAscii85());

</script>


FUTURE EXTENSION 

Bases planned to be added in the future include 
1. 8BITMIME
2. Base58 (Integer?)
3. Base36
4. Base32
5. Base16 (hexadecimal) though JS can do this readily
6. Base122
