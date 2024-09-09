// Project

import adjectives from "./Adjectives"
import nouns from "./Nouns"
import { db } from "./models/db"
import ProjectItem from "./models/ProjectItem"

const getRandomWord = (array: string[]) => {
  return array[Math.floor(Math.random() * (array.length - 1))];
};

function generateTitle() {
	return getRandomWord(adjectives)+" "+getRandomWord(nouns);
}

export class Project implements ProjectItem {
	public id: number = -1

	title: string
	resultsContent: string
	markovContent: string
	llmContent: string
	lSystemContent: string
	grammarContent: string

	protected updater: () => void

	constructor(updater: () => void, results: string, markov: string, llm: string, lSystem: string, grammar: string) {
		this.updater = updater
		this.resultsContent = results
		this.markovContent = markov
		this.llmContent = llm
		this.lSystemContent = lSystem
		this.grammarContent = grammar

		this.title = generateTitle()

		db.addProject(this).then((value: number) => {this.id = value}, (error) => {})
	}

	clone() {
		var newProject = new Project(this.updater, this.resultsContent, this.markovContent, this.llmContent, this.lSystemContent, this.grammarContent)

		newProject.id = this.id
		newProject.title = this.title
		
		return newProject
	}

	setUpdater(updater: () => void) {
		this.updater = updater
	}

	updateState() {
		db.updateProject(this)
		this.updater()
	}

	// id

	getId() {
		return this.id
	}

	// title

	setTitle(title: string) {
		this.title = title
		this.updateState()
	}

	getTitle() {
		return this.title
	}

	// results

	setResults(results: string) {
		this.resultsContent = results
		this.updateState()
	}

	getResults() {
		return this.resultsContent
	}

	// markov

	setMarkov(markov: string) {
		this.markovContent = markov
		this.updateState()
	}

	getMarkov() {
		return this.markovContent
	}

	// llm

	setLLM(llm: string) {
		this.llmContent = llm
		this.updateState()
	}

	getLLM() {
		return this.llmContent
	}

	// lSystem

	setLSystem(lSystem: string) {
		this.lSystemContent = lSystem
		this.updateState()
	}

	getLSystem() {
		return this.lSystemContent
	}

	// grammar

	setGrammar(grammar: string) {
		this.grammarContent = grammar
		this.updateState()
	}

	getGrammar() {
		return this.grammarContent
	}

	exportToJSON() {
		var json = {
			title: this.title,
			results: this.resultsContent,
			markov: this.markovContent,
			llm: this.llmContent,
			lSystem: this.lSystemContent,
			grammar: this.grammarContent
		}

		let stringified = JSON.stringify(json)

		return stringified
	}
}

export default Project;