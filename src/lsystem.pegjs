start 		= 	rules:rules {return rules;}

rules 		= 	rules:(comment / (rule:rule _ ";" _ {return rule;}))+ {return rules;}

rule 		=	symbol:symbol _ "=" _ ruleTail:string {return {rule: symbol.text, tail: ruleTail};}

symbol 		= 	char:[^;=] {return {type: "symbol", text: char};}

string 		= 	chars:[^;]+ {return chars.join("");}

comment     =   "#" [^\n]* "\n"

_ "whitespace" = [ \t\n\r]* {return " ";}
