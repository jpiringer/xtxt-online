import * as React from 'react';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import superstring from "./superstring"
import { IExample, Examples } from './Examples'

const examples: IExample[] = [
];

export interface MethodsProps {
	changeText: (func: (txt: string) => string) => void
	setExamples: (content: IExample[]) => void
}

export default class Methods extends React.Component<MethodsProps> {
	changer(func: (txt: string) => string) {
		return () => {
			this.props.changeText(func)
		}
	}

	componentDidMount(): void {
		this.props.setExamples(examples)
	}

	wordLines(text: string): string {
		const words = text.split(" ")
		return words.join("\n")
	}

	public render() {
		return (
			<>
				{' '}
				<Row>
				<Col>
				<Button variant="outline-primary" onClick={this.changer(superstring.rip)}>rip</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.shuffle)}>shuffle</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.sort)}>sort</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.reverse)}>reverse</Button>{' '}

				<Button variant="outline-primary" onClick={this.changer(superstring.noise)}>noise</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.part)}>part</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.split)}>split</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(this.wordLines)}>word lines</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.condense)}>condense</Button>{' '}

				<Button variant="outline-primary" onClick={this.changer(superstring.stretch)}>stretch</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.vowelsOnly)}>vowels only</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.consOnly)}>cons only</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.duplicate)}>duplicate</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.permutate)}>permutate</Button>{' '}
				</Col>
				</Row>
			</>
		);
	}
}
