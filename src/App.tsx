import './App.scss'

import React, { Component, ChangeEvent } from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Offcanvas from 'react-bootstrap/Offcanvas'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import Info from "./Info"
import Methods from "./Methods"
import MarkovChain from "./MarkovChain"
import FormalGrammar from './FormalGrammar'
import LindenmayerSystem from './LindenmayerSystem'
import LargeLanguageModel from './LargeLanguageModel'

import Speech from 'speak-tts'

import * as webllm from "@mlc-ai/web-llm"

import { DocExporter } from './DocExporter'
import { saveAs } from "file-saver"
import { Packer } from "docx"

import { IExample, Examples } from './Examples'

const modes = [
    { name: 'methods', value: 'methods' },
    { name: 'markov', value: 'markov' },
    { name: 'language model', value: 'llm' },
    { name: 'l-system', value: 'lsystem' },
    { name: 'grammar', value: 'grammar' },
]

interface xTXTState {
    mode: string
    text: string
    undoText: string
    sourceText: string
    showInfo: boolean
    showSettings: boolean
    selectedLanguage: string
    selectedLLMModelID: string
    selectedTTSVoice: string
    llmEngine?: webllm.MLCEngineInterface
    examples: IExample[]
}
 
interface xTXTProps {
}

const examples: IExample[] = [
];

class App extends Component<xTXTProps, xTXTState> {
    speech: any
    private inputRef: React.RefObject<HTMLTextAreaElement>;
    private sourceRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: xTXTProps) {
        super(props)

        this.inputRef = React.createRef();
        this.sourceRef = React.createRef();

        this.speech = new Speech()
        this.speech.init({
            'volume': 1,
            'lang': 'de-DE',
            'rate': 1,
            'pitch': 1
        }).then((data: any) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch((e: Error) => {
            console.error("An error occured while initializing : ", e)
        })

        var text = localStorage.getItem("xtxt-text");

        if (text === undefined || text === null) {
            text = "";
        }
        this.state = {
            mode: "methods", 
            text: text, 
            undoText: "", 
            sourceText:"", 
            showInfo: false,
            showSettings: false,
            selectedLanguage: this.getLocalStorage<string>("selectedLanguage", "en"),
            selectedLLMModelID: this.getLocalStorage<string>("selectedLLMModelID", "Llama-3.1-8B-Instruct-q4f32_1-MLC"),
            selectedTTSVoice: this.getLocalStorage<string>("selectedTTSVoice", ""),
            examples: examples
        }          

        this.changeText = this.changeText.bind(this)
        this.changeTextAsync = this.changeTextAsync.bind(this)
        this.setExample = this.setExample.bind(this)
        this.setExamples = this.setExamples.bind(this)

        this.speak = this.speak.bind(this)
        this.stopSpeech = this.stopSpeech.bind(this)

        this.handleChange = this.handleChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);

        this.undo = this.undo.bind(this)
        this.clear = this.clear.bind(this)

        this.exportDoc = this.exportDoc.bind(this)

        this.changeLanguage = this.changeLanguage.bind(this)
        this.changeLLMModel = this.changeLLMModel.bind(this)
        this.changeTTSVoice = this.changeTTSVoice.bind(this)
    }

    setExamples(examples: IExample[]) {
        this.setState({examples: examples})
    }

    storeText(text: string) {
        localStorage.setItem("xtxt-text", text);
    }

    handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({text: event.target.value});
        this.storeText(event.target.value);
    }

    handleSourceChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({sourceText: event.target.value});
        this.storeSource(event.target.value);
    }

    speak() {
        this.stopSpeech()
        if (this.state.selectedTTSVoice !== "") {
            this.speech.setVoice(this.state.selectedTTSVoice)
        }

        this.speech.speak({
            text: this.state.text,
        }).then(() => {
            console.log("Success !")
        }).catch((e: Error) => {
            console.error("An error occurred :", e)
        });
    }

    stopSpeech() {
        window.speechSynthesis.cancel();
    }

    setText(str: string) {
        this.setState({undoText: this.state.text})
        this.setState({text: str})
        this.storeText(str)
    }

    changeText(func: (txt: string) => string) {
        let textVal = this.inputRef.current!
        let cursorStart = textVal.selectionStart!
        let cursorEnd = textVal.selectionEnd!

        var newText = "";
        if (cursorStart === cursorEnd) { // process whole text
            newText = func(this.state.text);
        }
        else { // process only a part
            let str = func(this.state.text.substring(cursorStart,cursorEnd));

            newText = this.state.text.substring(0, cursorStart)+str+this.state.text.substring(cursorEnd);
        }
        this.setText(newText)
    }

    changeTextAsync(promise: (txt: string) => Promise<string>) {
        let textVal = this.inputRef.current!
        let cursorStart = textVal.selectionStart!
        let cursorEnd = textVal.selectionEnd!

        let convertToString = (result: string|Array<string>) => {
            if (typeof result === "string") {
                    return result as string
                }
                else {
                    return (result as Array<string>).join(" ")
                }
        }

        if (cursorStart === cursorEnd) { // process whole text
            promise(this.state.text).then((result: string|Array<string>) => {
                this.setText(convertToString(result))
            })
        }
        else { // process only a part
            promise(this.state.text.substring(cursorStart,cursorEnd)).then((result: string|Array<string>) => {
                let newText = this.state.text.substring(0, cursorStart)+convertToString(result)+this.state.text.substring(cursorEnd);

                this.setState({undoText: this.state.text})
                this.setState({text: newText})
                this.storeText(newText)
            })
        }
    }

    undo() {
        let t = this.state.text
        this.storeText(this.state.undoText);
        this.setState({text: this.state.undoText});
        this.setState({undoText: t});
    }

    clear() {
        this.changeText(() => {return "";});
    }

    setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage<T>(key: string, defaultValue: T): T {
        let storedValue = localStorage.getItem(key);
        if (storedValue == null) {
            this.setLocalStorage(key, defaultValue);
            return defaultValue;
        }
        return JSON.parse(storedValue);
    }

    storeSource(sourceText: string) {
        localStorage.setItem("xtxt-modestorage-"+this.state.mode, sourceText)
    }

    setMode(m: string) {
        this.storeSource(this.state.sourceText);

        var stored = localStorage.getItem("xtxt-modestorage-"+m)

        if (stored === undefined || stored === null) {
            stored = "";
        }
        
        this.setState({mode: m, sourceText: stored});
    }

    setExample(ex: string) {
        this.storeSource(ex)
        this.setState({sourceText: ex})
    }

    changeLanguage(event: ChangeEvent<HTMLSelectElement>) {
        let language = event.target.value;
        this.setLocalStorage("selectedLanguage", language);
        this.setState({selectedLanguage: language});
    }

    changeLLMModel(event: ChangeEvent<HTMLSelectElement>) {
        let modelID = event.target.value;
        if (modelID !== this.state.selectedLLMModelID) {
            this.setLocalStorage("selectedLLMModelID", modelID);
            this.setState({selectedLLMModelID: modelID, llmEngine: undefined});
        }
    }

    changeTTSVoice(event: ChangeEvent<HTMLSelectElement>) {
        let voiceName = event.target.value;
        this.setLocalStorage("selectedTTSVoice", voiceName);
        this.setState({selectedTTSVoice: voiceName});
    }

    languageSettings() {
        return <>
            Choose language:
            <Form.Select aria-label="select language" value={this.state.selectedLanguage} onChange={this.changeLanguage}>
                <option value={'en'} key={'en'}>English</option>
                <option value={'de'} key={'de'}>German</option>
            </Form.Select>
        </>
    }

    languageModelSettings() {
        return <>
            Choose large language model:
            <Form.Select aria-label="select large language model" value={this.state.selectedLLMModelID} onChange={this.changeLLMModel}>
                {webllm.prebuiltAppConfig.model_list.map(model => {
                    return <option value={model.model_id} key={model.model_id}>{model.model_id}{' - '}{model.vram_required_MB}{'MB'}</option>
                })}
            </Form.Select>  
        </>
    }

    speechSettings() {
        const voices = speechSynthesis.getVoices();
        const voiceNames = voices.map(voice => {
            return voice.name
        })

        let uniqueVoiceNames = voiceNames.filter((voiceName, index) => {
            return voiceNames.indexOf(voiceName) === index;
        });

        let getLanguage = (voiceName: string) => {
            const voice = voices.find(voice => voice.name === voiceName)

            return voice?.lang
        }

        return <>
            Choose text to speech voice:
            <Form.Select aria-label="select tts voice" value={this.state.selectedTTSVoice} onChange={this.changeTTSVoice}>
                {uniqueVoiceNames.map(voiceName => {
                    return <option value={voiceName} key={voiceName}>{voiceName}{' - '}{getLanguage(voiceName)}</option>
                })}
            </Form.Select>  
        </>
    }

    settings() {
        return (
            <Offcanvas show={this.state.showSettings} onHide={() => {this.setState({showSettings: false})}}>
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>     
                    {this.languageSettings()}  
                    {this.speechSettings()}
                    {this.languageModelSettings()}
                </Offcanvas.Body>
            </Offcanvas>
        );
    }

    exportDoc() {
        const docExporter = new DocExporter();
        const doc = docExporter.create(this.state.text);

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "generated-text.docx");
        });
    }

    render() {
      return (
        <div className="App">
            <header className="App-header">
                xTXT online
            </header>
            <div className="App-buttons">
                <Row>
                <Col>
                    <Button variant="outline-success" onClick={() => {this.setState({showInfo: true})}} ><i className="bi bi-info-circle"></i></Button>{' '}
                    <Button variant="outline-danger" onClick={() => {this.setState({showSettings: true})}}><i className="bi bi-gear"></i></Button>
                </Col>
                <Col xs={8}>
                <ButtonGroup>
                    {modes.map((radio, idx) => (
                        <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={this.state.mode === radio.value}
                        onChange={(e) => this.setMode(e.currentTarget.value)}
                        >
                        {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                </Col>
                <Col>
                    <Examples disabled={this.state.examples.length === 0} examples={this.state.examples} setExample={this.setExample} />
                </Col>
                </Row>
                {this.state.mode === "methods" &&
                    <Methods 
                    changeText={this.changeText} 
                    changeTextAsync={this.changeTextAsync} 
                    setExamples={this.setExamples} 
                    language={this.state.selectedLanguage} />
                }      
                {this.state.mode === "llm" &&
                    <LargeLanguageModel 
                        changeText={this.changeText} 
                        handleSourceChange={this.handleSourceChange} 
                        setExamples={this.setExamples}
                        sourceText={this.state.sourceText} 
                        selectedLLMModelID= {this.state.selectedLLMModelID} 
                        llmEngine={this.state.llmEngine}
                        language={this.state.selectedLanguage}
                        setLLMEngine={(engine) => {this.setState({llmEngine: engine})}}/>
                }
                {this.state.mode === "markov" &&
                    <MarkovChain 
                        changeText={this.changeText} 
                        handleSourceChange={this.handleSourceChange} 
                        setExamples={this.setExamples}
                        language={this.state.selectedLanguage}
                        sourceText={this.state.sourceText} />
                }
                {this.state.mode === "lsystem" &&
                    <LindenmayerSystem
                        changeText={this.changeText} 
                        handleSourceChange={this.handleSourceChange} 
                        setExamples={this.setExamples}
                        language={this.state.selectedLanguage}
                        sourceText={this.state.sourceText} />
                }
                {this.state.mode === "grammar" &&
                    <FormalGrammar
                        changeText={this.changeText} 
                        handleSourceChange={this.handleSourceChange} 
                        setExamples={this.setExamples}
                        language={this.state.selectedLanguage}
                        sourceText={this.state.sourceText} />
                } 
            </div>
            <div className="App-text">
                <Form>
                    <Form.Control as="textarea" rows={12} value={this.state.text} onChange={this.handleChange} style={{backgroundColor: "#999999", color: "black"}}
                                    ref={this.inputRef} autoFocus placeholder="input here..." />
                </Form>
            </div>
            <div className="App-buttons">
                <Row>
                <Col>
                <Button variant="outline-success" onClick={this.undo}>undo</Button>{' '}
                <Button variant="outline-success" onClick={this.clear}>clear</Button>{' '}<br />
                </Col>
                <Col>
                <Button variant="outline-success" onClick={this.speak}>speak</Button>{' '}
                <Button variant="outline-danger" onClick={this.stopSpeech}>stop</Button>{' '}<br />
                </Col>
                <Col>
                <Button variant="outline-success" onClick={this.exportDoc}>export .docx</Button>{' '}
                </Col>
                </Row>
            </div>
            <div>
                <p>this is a project by <a href="https://joerg.piringer.net/">jörg piringer</a></p>
            </div>
            <Info show={this.state.showInfo} onHide={() => {this.setState({showInfo: false})}} />
            { this.settings() }
        </div>
      );
    }
}

export default App;
