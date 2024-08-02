import * as React from 'react';
import { ChangeEvent } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import lsystem from "./lsystem.js"

import { IExample } from './Examples'

const examples: IExample[] = [
    {title: "b-language", content: "# b-language\na = aba;\ne = ebe;\ni = ibi;\no = obo;\nu = ubu;\ny = yby;\nä = äbä;\nö = öbö;\nü = übü;"},
    {title: "buchstabieralphabet", content: "# österreichisches buchstabieralphabet\na = anton ;\nb = berta ;\nc = cäsar ;\nd = dora ;\ne = emil ;\nf = friedrich ;\ng = gustav ;\nh = heinrich ;\ni = ida ;\nj = julius ;\nk = konrad ;\nl = ludwig ;\nm = martha ;\nn = nordpol ;\no = otto ;\np = paula ;\nq = quelle ;\nr = richard ;\ns = samuel ;\nt = theodor ;\nu = ulrich ;\nv = viktor ;\nw = wilhelm ;\nx = xaver ;\ny = ypsilon ;\nz = zeppelin ;\nä = ärger ;\nö = ökonom ;\nü = übermut ;\nß = scharfes s ;"},
    {title: "rhythm 1", content: "# rhythm 1 - start with s\ns = ska;\nt = atts;\nk = kakap;\np = kpki kik po po;\no = op rop po;"},
    {title: "rhythm 2", content: "# rhythm 2 - start with l\nl = lü;\nü = ülüm;\nm = ilimmi;\ni = linnih;\nh = heumü;\n"},
    {title: "rhythm 3", content: "# rhythm 3 - start with i\ni = ix;\nx = xixa;\na = aksi;\nk = kassik;\n"},
    {title: "rhythm 4", content: "# rhythm 4 - start with a\na = aaif;\ni = iof;\no = oaouf;\nu = ufuue;\ne = effei;\n"},
];

export interface ILindenmayerSystemProps {
	changeText: (func: (txt: string) => string) => void
	handleSourceChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	setExamples: (content: IExample[]) => void
	sourceText: string
}

export interface ILindenmayerSystemState {
}

export default class LindenmayerSystem extends React.Component<ILindenmayerSystemProps, ILindenmayerSystemState> {
    private sourceRef: React.RefObject<HTMLTextAreaElement>;

	constructor(props: ILindenmayerSystemProps) {
		super(props);

		this.sourceRef = React.createRef();

		this.state = {
		}

		this.apply = this.apply.bind(this)
	}

    componentDidMount(): void {
		this.props.setExamples(examples)
	}

    apply() {
         this.props.changeText((txt) => {
            var rules: any;

            try {
                rules = lsystem.parse(this.props.sourceText)
            }
            catch (e: any) {
                return "ERROR: "+e.name + ': ' + e.message;
            }

            let findRule = (ruleName: string) => {
                for (var r of rules) {
                    if (r.rule === ruleName) {
                        return r.tail;
                    }
                }
                return undefined;
            }

            var str = "";

            for (var i = 0; i < txt.length; i++) {
                var c = txt[i];
                var tail = findRule(c);

                str += tail === undefined ? c : tail; 
            }
            return str;
        });
    }

	public render() {
		return (
			<>
                <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.props.sourceText} onChange={this.props.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                                        ref={this.sourceRef} placeholder="enter l-system rules here..." />

                    </Form>
                    <Button variant="outline-danger" onClick={this.apply}>apply</Button>{' '}
				</div>
			</>
		);
	}
}
