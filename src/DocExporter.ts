import { Document, Paragraph, TextRun } from "docx"

export class DocExporter {
	public create(text: string): Document {
		const doc = new Document({
			sections: [{
				properties: {},
				children: [
					new Paragraph({
						children: [
							new TextRun(text),
						],
					}),
				],
			}],
		})

		return doc
	}
}