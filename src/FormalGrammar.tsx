import * as React from 'react';
import { ChangeEvent } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import parser from "./grammar.js"

import { IExample, Examples } from './Examples'

const examples: IExample[] = [
	{title: "tutorial 1", content: "# tutorial 1\nSTART = begin; # a START symbol is always needed\n# don't forget the semicolon ; at the end of each line\n"},
	{title: "tutorial 2", content: "# tutorial 2\nSTART = SECOND; # a START symbol is always needed\nSECOND = all words written only in capital letters (and numbers) are substitued by their definition;\n"},
	{title: "tutorial 3", content: "# tutorial 3\nSTART = EITHER | OR; # symbols separated by | are chosen randomly, try it a couple of times\nEITHER = this;\nOR = that;\n"},
	{title: "tutorial 4", content: "# tutorial 4\nSTART = EITHER OR; # symbols separated by a space are joined\nEITHER = this;\nOR = that;\n"},
	{title: "tutorial 5", content: "# tutorial 5\nSTART = FIRST+SECOND; # symbols separated by + are joined without a space\nFIRST = ver;\nSECOND = bindung;"},
	{title: "tutorial 6", content: "# tutorial 6\nSTART = A A A A A A;\nA = but | though| and | too| B;\nB = i | you | he | she | START; # you can use symbols in symbol definitions\n"},
	{title: "tutorial 7", content: "# tutorial 7\nSTART = infinite START; # but don't do this!!!\n"},
	{title: "tempora", content: "START = SATZ.;\n\nSATZ = TEMPPRAES SATZPRAES | TEMPPAST SATZPAST | TEMPFUT SATZFUT;\n\nSATZPRAES = VERBPRAESSING SATZCONTSING | VERBPRAESPLUR SATZCONTPLUR;\nSATZPAST = VERBPASTSING SATZCONTSING | VERBPASTPLUR SATZCONTPLUR;\nSATZFUT = VERBFUTSING1 SATZCONTSING VERBFUTSING2 | VERBFUTPLUR1 SATZCONTPLUR VERBFUTPLUR2;\n\nVERBPRAESSING = ist;\nVERBPRAESPLUR = sind;\n\nVERBPASTSING = war;\nVERBPASTPLUR = waren;\n\nVERBFUTSING1 = wird;\nVERBFUTSING2 = gewesen sein;\nVERBFUTPLUR1 = werden;\nVERBFUTPLUR2 = gewesen sein;\n\nSATZCONTSING = alles besser | nichts wie zuvor | alles vergeblich | alles einerlei | alles schlechter | uns alles einerlei;\nSATZCONTPLUR = wir glücklich | wir unerfahren | wir unvorsichtig | wir übervorsichtig | wir genau | wir entschlossen zu allem;\n\nTEMPPRAES = heute | momentan | jetzt | in diesem moment;\nTEMPPAST = vorgestern | gestern | vor einem jahr | vor einer woche | gerade eben | voriges monat;\nTEMPFUT = morgen | übermorgen | bald | gleich | in einer woche | in einem jahr | in der zukunft | in einem monat;\n"},
	{title: "wittgenstein", content: "START = PARAGRAPH PARAGRAPH PARAGRAPH PARAGRAPHS PARAGRAPHS;\n\nPARAGRAPHS = PARAGRAPH PARAGRAPHS | PARAGRAPH;\nPARAGRAPH = START1 START1 SENTENCES\\n\\n;\nSENTENCES = START1 SENTENCES | START1;\n\nSTART1 = START1A. | START1A. | START1A. | START1A. | PREFIX START1A. | PREFIXQ START1A? | FRAGE;\nSTART1A = SATZ1 | SATZ2 | SATZ3 | SATZ4;\n\nPREFIX    = ich kann mich darin nicht irren: | ich könnte sagen: | wenn ich sagte: | das heisst: | die antwort kann auch sein: | es ist seltsam: | man sagt nicht: | und dennoch: | wir sagen: | ich könnte auch so sagen: | man könnte auch sagen: | es scheint: | das wichtigste ist hier dies:;\nPREFIXQ    = soll ich sagen: | heißt das nun: | ist es falsch, zu sagen:;\n\nSATZ1 = SPTRANS OBJEKT;\nSATZ2 = SPINTRANS;\nSATZ1O2 = SATZ1 | SATZ2;\nSATZ3 = SATZ1O2, CONJ CONDSATZ;\nSATZ4 = wenn CONDSATZ, dann CONDSATZ2;\n\n\nCONDSATZ = CONDSATZTRANS | CONDSATZINTRANS;\nCONDSATZTRANS = SUBJEKTSING OBJEKTSING PREDTRANSSING | SUBJEKTPLUR OBJEKTPLUR PREDTRANSPLUR;\nCONDSATZINTRANS    = SUBJEKTSING PREDINTRANSSING | SUBJEKTPLUR PREDINTRANSPLUR;\n\nCONDSATZ2 = CONDSATZTRANS2 | CONDSATZINTRANS2;\nCONDSATZTRANS2 = PREDTRANSSING SUBJEKTSING OBJEKTSING | PREDTRANSPLUR SUBJEKTPLUR OBJEKTPLUR;\nCONDSATZINTRANS2 = PREDINTRANSSING SUBJEKTSING | PREDINTRANSPLUR SUBJEKTPLUR;\n\nFRAGE = FRAGEPREFIX FRAGE1A | FRAGE1A | FRAGE1A;\nFRAGEPREFIX = man möchte fragen: | frage:;\nFRAGE1A = FRAGEWORT PREDINTRANSSING SUBJEKTSING? | FRAGEWORT PREDINTRANSPLUR SUBJEKTPLUR?;\nFRAGEWORT = was | wie | wo;\n\nSPTRANS = SUBJEKTSING PREDTRANSSING | SUBJEKTPLUR PREDTRANSPLUR;\nSPINTRANS = SUBJEKTSING PREDINTRANSSING | SUBJEKTPLUR PREDINTRANSPLUR;\n\nOBJEKT = OBJEKTSING | OBJEKTPLUR;\n\nARTIKELSINGW = die;\nARTIKELSINGM = der;\nARTIKELSINGN = das;\n\nSUBJEKTSING1W = wahrheit | vorstellung | antwort | frage | negation | sprachverwendung | absicht | erwartung | philosophie | frage;\nSUBJEKTSING1M = satz | verstand | sinn | mensch;\nSUBJEKTSING1N = wort | erkennen | sprachspiel | wissen | experiment;\n\nGENITIVSING1M = satzes | verstandes | sinns | menschens;\nGENITIVSING1N = wortes | erkennens | sprachspiels | wissens | kindes;\n\nGENITIVSING    = der SUBJEKTSING1W | des GENITIVSING1M | des GENITIVSING1N;\n\nADJSINGDET = unzweifelhafte | unbeabsichtigte | zweifelhafte | überprüfte | unfehlbare | zusammenhanglose;\n\nSUBJEKTSING1A = ARTIKELSINGN SUBJEKTSING1N | ARTIKELSINGM SUBJEKTSING1M | ARTIKELSINGW SUBJEKTSING1W;\nSUBJEKTSING1ADJ    = ARTIKELSINGN ADJSINGDET SUBJEKTSING1N | ARTIKELSINGM ADJSINGDET SUBJEKTSING1M | ARTIKELSINGW ADJSINGDET SUBJEKTSING1W;\nSUBJEKTSING = SUBJEKTSING1A | SUBJEKTSING1ADJ | SUBJEKTSING1A GENITIVSING | SUBJEKTSING1ADJ GENITIVSING;\nPREDTRANSSING = sieht | untersucht | teilt | liest;\nPREDINTRANSSING    = spricht | lernt | irrt;\nOBJEKTSING = den satz | mich | den sinn | den zweifel | das spiel | das gedächtnis;\n\nSUBJEKTPLUR1 = gedanken | farben | sätze | antworten | fragen | worte | dinge | fragen;\nSUBJEKTPLUR    = SUBJEKTPLUR1 | ADJPLUR SUBJEKTPLUR1;\nPREDTRANSPLUR = sprechen | lehren | lesen;\nPREDINTRANSPLUR    = sprechen | spielen | beginnen | lernen;\nOBJEKTPLUR = die sätze | die zweifel | die wörter;\n\nADJPLUR = eindeutige | einzigartige | verschiedene | unzweifelhafte | unmittelbare;\n\nCONJ = während | wo | wenn | weshalb | worauf;\n"},
	{title: "rhythm", content: "START = S. S. S. S.;\nS = tri XI | ti XF | dha XH;\nXI = ikt dha tri ikt dha ge na XD | ikt XJ | ikt XG;\nXF = dha XJ | XG;\nXH = ti dha tri ikt XB | tri ikt dha XC;\nXD = dha ti dha ge dhee na ge na;\nXJ = tri ikt XA;\nXG = dha ti XA;\nXB = dha tri ikt XD;\nXC = ti XB | ti dha ti XD | tri ikt dha XE;\nXA = dha XB;\nXE = dha XD | ge XD;\n"},
	{title: "prompt generator", content:"START = dear ai, please write a POEMADJ GENRE in LANGUAGE in the style of AUTHOR on the topic of TOPIC1 and TOPIC2;\nPOEMADJ = sad|happy|fearsome|bad|childish|funny|terrible|nice|long|short|humorous;\nGENRE = poem|haiku|sonnet|song|recipe|word list|tweet|ballad|epitaph|aphorism|ode;\nLANGUAGE = english|german|chinese|swedish|klingonian|esperanto|farsi|viennese dialect|starckdeutsch|yiddish;\nAUTHOR = robert burns|jörg piringer|william shakespeare|basho|rupi kaur|donald trump|the swedish chef from the muppet show|ingeborg bachmann|hildegard von bingen|gertrude stein|elizabeth barrett browning|konrad bayer|h.c. artmann|erich fried|laurie anderson|jorge luis borges;\nTOPIC1 = love|hate|life|growing older|the colour blue|falling asleep|waking up|ghosts|jealosy|the ocean|loss of memory;\nTOPIC2 = nothingness|despair|wlan connectivity|nostalgia|being invisible|homesickness|dancing in the rain|camping|a zoo|attraction|affection|success;\n"},
];

export interface IFormalGrammarProps {
	changeText: (func: (txt: string) => string) => void
	handleSourceChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	setExamples: (content: IExample[]) => void
	sourceText: string
}

export interface IFormalGrammarState {
}

export default class FormalGrammar extends React.Component<IFormalGrammarProps, IFormalGrammarState> {
    private sourceRef: React.RefObject<HTMLTextAreaElement>;

	constructor(props: IFormalGrammarProps) {
		super(props);

		this.sourceRef = React.createRef();

		this.state = {
		}

		this.apply = this.apply.bind(this)
		this.convert = this.convert.bind(this)
	}

	componentDidMount(): void {
		this.props.setExamples(examples)
	}

  	apply() {
        this.props.changeText((txt) => {
            var rules: any;

            try {
                rules = parser.parse(this.props.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }
            console.log(rules);

            let findRule = (ruleName: string) => {
                for (var r of rules) {
                    if (r.rule === ruleName) {
                        return r.tail;
                    }
                }
                return undefined;
            }

            let expandRule = (ruleName: string) => {
                let ruleTail = findRule(ruleName);

                if (ruleTail === undefined) {
                    return "ERROR: rule "+ruleName+" not found!";
                }

                const randomElement = ruleTail[Math.floor(Math.random() * ruleTail.length)];
                var str = "";
                var concatStr = " ";
                for (var verb of randomElement) {
                    if (verb.type === "symbol") {
                        if (str.length > 0) {
                            str += concatStr;
                        }
                        str += expandRule(verb.text);
                        concatStr = " ";
                    }
                    else if (verb.type === "text") {
                        if (str.length > 0) {
                            str += concatStr;
                        }
                        str += verb.text;
                        concatStr = " ";
                    }
                    else if (verb.type === "punctuation") {
                        str += verb.text;
                        concatStr = " ";
                    }
                    else if (verb.type === "concat") {
                        concatStr = "";
                    }
                }
                return str;
            }

            var result = "";
            try {
                result = expandRule("START");
            }
            catch (e: any) {
                result = "ERROR: "+e.name + ': ' + e.message;
            }
            return result;
        });
    }

    convert() {
        this.props.changeText((txt) => {
            var rules: any;
            var output = "";

            try {
                rules = parser.parse(this.props.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }

            let out = (txt: string) => {
                output += txt;
            }

            let removeComma = (comma: string) => {
                if (output.substring(output.length-comma.length, output.length) === comma) {
                    output = output.substring(0, output.length-comma.length);
                }
            }

            let outTail = (tail: any) => {
                console.log(tail);

                for (let tailAlternative of tail) {
                    out("\"");

                    for (var verb of tailAlternative) {
                        if (verb.type === "symbol") {
                            out("#");
                            out(verb.text);
                            out("# ");
                        }
                        else {
                            out(verb.text);
                            out(" ");
                        }
                    }
                    removeComma(" ");
                    out("\",");
                }
                removeComma(",");
            }

            out("// this is a grammar for the javascript generative grammar system tracery: https://www.tracery.io\nconst grammar = \n{\n");
            for (var r of rules) {
                var ruleName = r.rule;
                if (ruleName === "START") {
                    ruleName = "origin";
                }
                if (r.tail !== undefined) {
                    out("\""+ruleName+"\":[");
                    outTail(r.tail);
                    out("],\n");
                }
            }
            removeComma(",\n");
            out("\n}");

            return output;
        });
    }

	public render() {
		return (
			<>
				<div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.props.sourceText} onChange={this.props.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                                        ref={this.sourceRef} placeholder="enter grammar rules here..." />
                    </Form>
                    <Button variant="outline-danger" onClick={this.apply}>generate</Button>{' '}
                    <Button variant="outline-success" onClick={this.convert}>convert</Button>{' '}<br />
				</div>
			</>
		);
	}
}
