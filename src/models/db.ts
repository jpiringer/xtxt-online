// db.ts
// uses dexie
// https://dexie.org

import Dexie, { Table } from 'dexie'
import ProjectItem from "./ProjectItem"
import { Project } from "../Project"

export class xTXTDB extends Dexie {
	projects!: Table<ProjectItem, number>;

	populate() {
    	new Project(() => {}, "", "", "", "", "")
	}

	constructor() {
		super('xTXTDatabase');

		this.version(0.1).stores({
			projects: '++id', // Primary key and indexed props
		})

		this.on("populate", this.populate)

		this.open()
	}

	deleteProject(projectId: number) {
		return this.transaction('rw', this.projects, () => {
			this.projects.delete(projectId)
		})
	}

	async addProject(project: Project) {
		const id = await this.projects.add({
			title: project.getTitle(),
			resultsContent: project.getResults(),
			markovContent: project.getMarkov(),
			llmContent: project.getLLM(),
			lSystemContent: project.getLSystem(),
			grammarContent: project.getGrammar()
		})

		return id
	}

	async updateProject(project: Project) {
		await this.projects.update(project.getId(), {
			title: project.getTitle(),
			resultsContent: project.getResults(),
			markovContent: project.getMarkov(),
			llmContent: project.getLLM(),
			lSystemContent: project.getLSystem(),
			grammarContent: project.getGrammar()
		})
	}

	async getProjects(): Promise<ProjectItem[]> {
		return this.projects.toArray()
	}

	async getProjectCount(): Promise<number> {
		return this.projects.count()
	}
}

export const db = new xTXTDB()
