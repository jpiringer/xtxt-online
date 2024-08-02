import * as React from 'react'
import { ChangeEvent } from 'react'

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import * as webllm from "@mlc-ai/web-llm"

import { IExample, Examples } from './Examples'

const examples: IExample[] = [
    {title: "poem", content: "write a poem"},
    {title: "poem 2", content: "write a funny poem"},
    {title: "poem 3", content: "write a sad poem in spanish"},
    {title: "poem 4", content: "write a crazy poem by using only numbers and uppercase letters"},
    {title: "poem 5", content: "write an experimental poem titled 'neverland'"},
    {title: "poem 6", content: "write a nasty poem titled 'hurribly'"},
    {title: "poem 7", content: "write a childish ode in viennese dialect in the style of hildegard von bingen on the topic of love and camping"},
    {title: "poem 8", content: "write a nice poem in swedish in the style of jorge luis borges on the topic of hate and homesickness"},
    {title: "recipe", content: "write an absurd recipe"},
    {title: "weather", content: "what will the weather be like on april 1st, 2047?"},
    {title: "joke", content: "tell me a joke please, that start with the phrase 'a microbe, the pope and darth vader walk into a bar'"},
    {title: "word", content: "invent a new and unknown english word"}
]

export interface ILargeLanguageModelProps {
	changeText: (func: (txt: string) => string) => void
	handleSourceChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	setExample: (content: string) => void
	sourceText: string
    selectedLLMModelID: string
    llmEngine?: webllm.MLCEngineInterface
    setLLMEngine: (engine: webllm.MLCEngineInterface) => void
}

export interface ILargeLanguageModelState {
    statusLabel: string
    generating: boolean
    loading: boolean
    temperature: number
}

export default class LargeLanguageModel extends React.Component<ILargeLanguageModelProps, ILargeLanguageModelState> {
    private sourceRef: React.RefObject<HTMLTextAreaElement>;

	constructor(props: ILargeLanguageModelProps) {
		super(props);

		this.sourceRef = React.createRef();

		this.state = {
            statusLabel: "",
            generating: false, 
            loading: false, 
            temperature: 0.7,
		}

		this.apply = this.apply.bind(this)
        this.loadModel = this.loadModel.bind(this)
	}

    async loadModelIfCached() {
        if (await this.modelCached()) {
            this.loadModel()
        }  
    }

    async componentDidMount() {
        this.loadModelIfCached()
    }

    async componentDidUpdate(prevProps: Readonly<ILargeLanguageModelProps>, prevState: Readonly<ILargeLanguageModelState>, snapshot?: any) {
        if (this.props.selectedLLMModelID !== prevProps.selectedLLMModelID) {
            this.loadModelIfCached()
        }
    }

    setLoading(loa: boolean) {
        this.setState( {loading: loa})
    }

    setStatusLabel(text: string) {
        this.setState({ statusLabel: text })
    }

    setGenerating(gen: boolean) {
        this.setState( {generating: gen})
    }

    async loadLLMModel() {
        const selectedModel = this.props.selectedLLMModelID

        const initProgressCallback = (report: webllm.InitProgressReport) => {
            this.setStatusLabel(report.text);
        }

        console.log("loading LLM...")

        const engine: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
            selectedModel,
            {
                initProgressCallback: initProgressCallback,
                logLevel: "INFO", // specify the log level
            },
            // customize kv cache, use either context_window_size or sliding_window_size (with attention sink)
            {
                context_window_size: 2048,
                // sliding_window_size: 1024,
                // attention_sink_size: 4,
            },
        )

        return engine
    }

    async loadModel() {
        this.setLoading(true);

        this.loadLLMModel().then(engine => {
            console.log("engine:", engine)
            //this.setState({ llmEngine: engine });
            this.props.setLLMEngine(engine)
            this.setLoading(false)
            this.setStatusLabel("")
        });
    }

    async modelCached() {
        const appConfig = webllm.prebuiltAppConfig
        const selectedModel = this.props.selectedLLMModelID

        let modelCached = await webllm.hasModelInCache(selectedModel, appConfig);
        return modelCached
    }

    async generate() {
        try {
            const reply = this.props.llmEngine?.chat.completions.create({
            messages: [{ role: "user", content: this.props.sourceText }],
            // below configurations are all optional
            n: 1,
            temperature: this.state.temperature,
            max_tokens: 256,
            logprobs: true,
            top_logprobs: 2,
            })

            return reply
        }
        catch (error) {
            console.log(error)
        }
        return null
    }

    async apply() {
        this.setGenerating(true);

        this.generate().then(reply => {
            console.log("reply:", reply)

            const result = reply?.choices[0].message.content ?? "an error occured"

            this.props.changeText((txt) => {
                return result
            })
            this.setGenerating(false)
        });
    }

    getVRAMMB() {
        const model = webllm.prebuiltAppConfig.model_list.find((model) => model.model_id === this.props.selectedLLMModelID) 
                
        return model?.vram_required_MB
    }

    loadModelButton() {
        return <>
            <Button variant="outline-danger" onClick={this.loadModel}>Load Model</Button>{' '}<br />
            <p>{this.getVRAMMB()}{'MB of video ram required'}</p>
        </>
    }

	public render() {
		return (
            <>
            <Examples examples={examples} setExample={this.props.setExample} />

			<div className="App-text">
            {this.props.llmEngine !== undefined ?
                <>
                <Form>
                <Form.Control as="textarea" rows={5} value={this.props.sourceText} onChange={this.props.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
                ref={this.sourceRef} placeholder="enter prompt..." />

                <Form.Group as={Row}>
                <Form.Label>temperature {this.state.temperature} </Form.Label>
                <Form.Range value={(this.state.temperature-0.1)*100} min={0} max={200} onChange={e => this.setState({temperature: 0.1+parseFloat(e.target.value)/100})}/>
                </Form.Group>                 
                </Form>
                <Button variant="outline-danger" onClick={this.apply}>generate</Button>{' '}<br />
                {this.state.generating ?
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                : <></>
                }
                </>
                :
                <>
                { this.loadModelButton() }
                <p>{this.state.statusLabel}</p>
                {this.state.loading ?
                <>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading Model...</p>
                </> : <></>}
                </>
            }
            </div>
            </>
		);
	}
}
