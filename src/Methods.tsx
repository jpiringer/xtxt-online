import * as React from 'react';

import Button from 'react-bootstrap/Button'

import superstring from "./superstring"

export interface MethodsProps {
	changeText: (func: (txt: string) => string) => void
}

export default class Methods extends React.Component<MethodsProps> {
	changer(func: (txt: string) => string) {
		return () => {
			this.props.changeText(func)
		}
	}

	public render() {
		return (
			<>
				<Button variant="outline-primary" onClick={this.changer(superstring.rip)}>rip</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.shuffle)}>shuffle</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.sort)}>sort</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.reverse)}>reverse</Button>{' '}

				<Button variant="outline-primary" onClick={this.changer(superstring.noise)}>noise</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.part)}>part</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.split)}>split</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.condense)}>condense</Button>{' '}

				<Button variant="outline-primary" onClick={this.changer(superstring.stretch)}>stretch</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.vowelsOnly)}>vowels only</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.consOnly)}>cons only</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.duplicate)}>duplicate</Button>{' '}
				<Button variant="outline-primary" onClick={this.changer(superstring.permutate)}>permutate</Button>{' '}<br />
			</>
		);
	}
}
