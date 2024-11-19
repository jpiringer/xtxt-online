import * as React from 'react';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import superstring from "./superstring"
import { IExample } from './Examples'

const WordDataBaseURL = "https://worddatabase-943338cbb7f8.herokuapp.com" // "http://localhost:3001" //

const examples: IExample[] = [
];

export interface MethodsProps {
	changeText: (func: (txt: string) => string) => void
	changeTextAsync: (promise: (txt: string) => Promise<string>) => void
	setExamples: (content: IExample[]) => void
    language: string
}

export default class Methods extends React.Component<MethodsProps> {
	constructor(props: MethodsProps) {
		super(props);

		this.randomWord = this.randomWord.bind(this)
		this.prefix = this.prefix.bind(this)
		this.postfix = this.postfix.bind(this)
		this.containing = this.containing.bind(this)
		this.letters = this.letters.bind(this)
		this.vowels = this.vowels.bind(this)
		this.wordsOfLength = this.wordsOfLength.bind(this)
		this.wordsOfLengthShorterEq = this.wordsOfLengthShorterEq.bind(this)
		this.wordsOfLengthLonger = this.wordsOfLengthLonger.bind(this)
	}

	changer(func: (txt: string) => string) {
		return () => {
			this.props.changeText(func)
		}
	}

	changerAsync(promise: (text: string) => Promise<string>) {
		return () => {
			this.props.changeTextAsync(promise)
		}
	}

	componentDidMount(): void {
		this.props.setExamples(examples)
	}

	wordLines(text: string): string {
		const words = text.split(" ")
		return words.join("\n")
	}

	fetchPromise(URL: string) {
		const lang = this.props.language

		return fetch(URL+"/?lang="+lang, {method: 'GET', headers : {'Accept': 'application/json'}, mode: 'cors'})
		.then(function(response) {
			return response.json()
		})
	}

	randomWord(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/random"

		return this.fetchPromise(URL)
	}

	prefix(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/prefix/"+encodeURI(text.toLowerCase())

		return this.fetchPromise(URL)
	}

	postfix(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/postfix/"+encodeURI(text.toLowerCase())

		return this.fetchPromise(URL)
	}

	containing(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/containing/"+encodeURI(text.toLowerCase())

		return this.fetchPromise(URL)
	}

	letters(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/letters/"+encodeURI(text.toLowerCase())

		return this.fetchPromise(URL)
	}

	vowels(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/vowels/"+encodeURI(text.toLowerCase())

		return this.fetchPromise(URL)
	}

	wordsOfLength(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/length/"+encodeURI(text.length.toString())

		return this.fetchPromise(URL)
	}

	wordsOfLengthShorterEq(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/maximum/"+encodeURI(text.length.toString())

		return this.fetchPromise(URL)
	}

	wordsOfLengthLonger(text: string): Promise<string> {
		const URL = WordDataBaseURL+"/longer/"+encodeURI(text.length.toString())

		return this.fetchPromise(URL)
	}

	public render() {
		return (
			<>
				<br />
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
				<DropdownButton id="dropdown-basic-button" title="words" variant="outline-primary">
					<Dropdown.Item onClick={this.changerAsync(this.randomWord)}>random word</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.prefix)}>words with prefix</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.postfix)}>words with postfix</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.containing)}>words containing string</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.letters)}>words containing letters</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.vowels)}>words containing vowels</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.wordsOfLength)}>words of length</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.wordsOfLengthShorterEq)}>words of length shorter or equal</Dropdown.Item>
					<Dropdown.Item onClick={this.changerAsync(this.wordsOfLengthLonger)}>words of length longer</Dropdown.Item>
				</DropdownButton>
				</Col>
				</Row>
			</>
		);
	}
}
