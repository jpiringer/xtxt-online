start 		= 	rules:rules {return rules;}

rules 		= 	rules:(comment / (rule:rule _ ";" _ {return rule;}))+ {return rules;}

rule 		=	symbol:symbol _ "=" _ ruleTail:ruleTail {return {rule: symbol.text, tail: ruleTail};}

symbol 		= 	chars:[A-Z0-9]+ {return {type: "symbol", text: chars.join("")};}

string 		= 	chars:[A-Za-zäöüÄÖÜßñÑáàÁÀéèÉÈóòÓÒúùÙÚ]+ {return {type: "text", text: chars.join("")};}

concat      =   "+" {return {type: "concat", text: ""};}

punctuation = 	chars:[\.\!\?\,:\(\)]+ {return {type: "punctuation", text: chars.join("")};}

ruleTail 	= 	rulePart:rulePart ruleTail2:ruleTail2 {return ruleTail2 === undefined ? [rulePart] : [rulePart].concat(ruleTail2);}
ruleTail2 	=	tail:(_ "|" _ ruleTail:ruleTail {return ruleTail;})* {return tail[0];}

rulePart	= 	verbs:(verb:ruleVerb _ {return verb;})+ {return verbs;}

ruleVerb 	= 	symbol:symbol {return symbol;}
			/	string:string {return string;}
			/	concat:concat {return concat;}
            / 	punctuation:punctuation {return punctuation;}

_ "whitespace" = chars:([ \t\n\r] / "\\n" {return "\n";})* {return chars.join("");}

comment     =   "#" [^\n]* "\n"
