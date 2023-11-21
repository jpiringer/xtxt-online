import './App.css';

import React from "react";

import {Row, Col, Container} from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Speech from 'speak-tts';

import parser from "./grammar.js";

const Markov = require('js-markov');

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

let findPermutations = (string) => {
  if (!string || typeof string !== "string"){
    return "Please enter a string"
  }

  if (!!string.length && string.length < 2 ){
    return string
  }

  let permutationsArray = []

  for (let i = 0; i < string.length; i++){
    let char = string[i]

    if (string.indexOf(char) !== i) {
        continue
    }

    let remainder = string.slice(0, i) + string.slice(i + 1, string.length)

    for (let permutation of findPermutations(remainder)){
      permutationsArray.push(char + permutation) }
  }
  return permutationsArray
}

function filterString(string, filter) {
  const json_string = JSON.stringify(string)

  let filterd_string = ''

  for (let i = 0; i < json_string.length; i++) {
    let char = json_string[i]
    let index = filter.indexOf(char)
    if (index > -1) {
      filterd_string += filter[index]
    }
  }

  return filterd_string
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.speech = new Speech()
        this.speech.init({
            'volume': 1,
            'lang': 'de-DE',
            'rate': 1,
            'pitch': 1
        }).then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })

        this.state = {text: "", undoText: "", sourceText:"", markovVisible: false, prefix: 3, grammarVisible: false}
        this.speak = this.speak.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);

        this.rip = this.rip.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.sort = this.sort.bind(this)
        this.duplicate = this.duplicate.bind(this)
        this.reverse = this.reverse.bind(this)

        this.noise = this.noise.bind(this)
        this.part = this.part.bind(this)
        this.split = this.split.bind(this)
        this.condense = this.condense.bind(this)
        this.stretch = this.stretch.bind(this)
        this.vowelsOnly = this.vowelsOnly.bind(this)
        this.consOnly = this.consOnly.bind(this)
        this.permutate = this.permutate.bind(this)
        this.markov = this.markov.bind(this)
        this.grammar = this.grammar.bind(this)
        this.applyMarkov = this.applyMarkov.bind(this)
        this.applyGrammar = this.applyGrammar.bind(this)
        this.undo = this.undo.bind(this)
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSourceChange(event) {
        this.setState({sourceText: event.target.value});
    }

    speak() {
        this.speech.speak({
            text: this.state.text,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        });
    }

    stop() {
        console.log("stop speak");
        window.speechSynthesis.cancel();
    }

    changeText(func) {
        let textVal = this.refs.inputText;
        let cursorStart = textVal.selectionStart;
        let cursorEnd = textVal.selectionEnd;

        this.setState({undoText: this.state.text});
        if (cursorStart === cursorEnd) { // process whole text
            this.setState({text: func(this.state.text)});
        }
        else { // process only a part
            let str = func(this.state.text.substring(cursorStart,cursorEnd));

            this.setState({text: this.state.text.substring(0, cursorStart)+str+this.state.text.substring(cursorEnd)});
        }
    }

    shuffle() {
        this.changeText((txt) => {
            let arr = txt.split("");
            shuffleArray(arr);
            return arr.join("");
        });
    }

    sort() {
        this.changeText((txt) => txt.split("").sort().join(""));
    }

    reverse() {
        this.changeText((txt) => txt.split("").reverse().join(""));
    }

    duplicate() {
        this.changeText((txt) => txt+txt);
    }

    rip() {
        this.changeText((txt) => {
            var str = "";
            let sz = txt.length;

            for (var cnt = 0; cnt < sz;) {
                let c = txt[cnt];

                if (c !== '\n' && c !== '\r') {
                    switch(getRandomInt(7)) {
                        case 1:
                            str += c;
                        case 2:
                            var c2 = txt[cnt%sz];
                            if (c2 !== '\n' && c2 !== '\n') {
                                str += c2;
                            }
                        default:
                            str += c;
                            cnt++;
                            break;
                    }
                }
                else {
                    str += c;
                    cnt++;
                }
            }
            return str;
        });
    }

    noise() {
        const noiseChars = ",.-;:_#+*!$%&/()=?^°<>~";

        this.changeText((txt) => {
            var str = "";
            var counter = 0;
            var segmentLen = getRandomInt(8);

            for (var i = 0; i < txt.length; i++) {
                str += txt[i];
                if (counter >= segmentLen) {
                    segmentLen = getRandomInt(10);
                    str += noiseChars[getRandomInt(noiseChars.length)];
                    counter = 0;
                }
                counter++;
            }
            return str;
        });
    }

    part() {
        this.changeText((txt) => {
            var str = "";
            var counter = 0;
            var segmentLen = getRandomInt(8);

            for (var i = 0; i < txt.length; i++) {
                str += txt[i];
                if (counter >= segmentLen) {
                    segmentLen = getRandomInt(10);
                    str += " ";
                    counter = 0;
                }
                counter++;
            }
            return str;
        });
    }

    split() {
        this.changeText((txt) => txt.split("").join(" "));
    }

    condense() {
        this.changeText((txt) =>
            txt.replace(/\s+/g, " ")
        );
    }

    stretch() {
        const stretchable = "aefhilmnorsuyzäöüAEFHILMNORSUYZÄÖÜ";

        this.changeText((txt) => {
            var str = "";

            for (var i = 0; i < txt.length; i++) {
                str += txt[i];
                if (stretchable.indexOf(txt[i]) >= 0) {
                    str += txt[i];
                }
            }
            return str;
        });
    }

    vowelsOnly() {
        this.changeText((txt) => filterString(txt, "aeiouäöüyáàóòíìAEIOUÄÖÜÁÀÓÒY "));
    }

    consOnly() {
        this.changeText((txt) => filterString(txt, "bcdfghjklmnpqrstvwxzñßBCDFGHJKLMNPQRSTVWXZÑ "));
    }

    permutate() {
        this.changeText((txt) => {
            if (txt.length <= 0) {
                return "";
            }
            if (txt.length > 8) {
                return "input text is too long. should not be longer than 8 characters!";
            }
            else {
                return findPermutations(txt).join(" ");
            }
        });
    }

    markov() {
        this.setState({markovVisible: !this.state.markovVisible, grammarVisible: false});
    }

    applyMarkov() {
        this.changeText((txt) => {
            let markovChain = new Markov()
            markovChain.addStates(this.state.sourceText)
            markovChain.train(this.state.prefix)

            return markovChain.generateRandom(1000)
        });
    }

    grammar() {
        this.setState({grammarVisible: !this.state.grammarVisible, markovVisible: false});
    }

    applyGrammar() {
        this.changeText((txt) => {
            var rules;

            try {
                rules = parser.parse(this.state.sourceText)
            }
            catch (e) {
                return "ERROR: "+e.name + ': ' + e.message;
            }
            //console.log(rules);

            let findRule = (ruleName) => {
                for (var r of rules) {
                    if (r.rule === ruleName) {
                        return r.tail;
                    }
                }
                return undefined;
            }

            let expandRule = (ruleName) => {
                let ruleTail = findRule(ruleName);

                if (ruleTail === undefined) {
                    return "ERROR: rule "+ruleName+" not found!";
                }

                const randomElement = ruleTail[Math.floor(Math.random() * ruleTail.length)];
                var str = "";
                for (var verb of randomElement) {
                    //console.log("type: ", verb.type)
                    if (verb.type === "symbol") {
                        if (str.length > 0) {
                            str += " ";
                        }
                        str += expandRule(verb.text);
                    }
                    else if (verb.type === "text") {
                        if (str.length > 0) {
                            str += " ";
                        }
                        str += verb.text;
                    }
                    else if (verb.type === "punctuation") {
                        str += verb.text;
                    }
                }
                //console.log("str: ",str);
                return str;
            }

            return expandRule("START");
        });
    }

    undo() {
        let t = this.state.text
        this.setState({text: this.state.undoText});
        this.setState({undoText: t});
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1>xTXT online</h1>
          </header>
          <div className="App-buttons">
              <Button variant="outline-primary" onClick={this.rip}>rip</Button>{' '}
              <Button variant="outline-primary" onClick={this.shuffle}>shuffle</Button>{' '}
              <Button variant="outline-primary" onClick={this.sort}>sort</Button>{' '}
              <Button variant="outline-primary" onClick={this.reverse}>reverse</Button>{' '}<br />

              <Button variant="outline-primary" onClick={this.noise}>noise</Button>{' '}
              <Button variant="outline-primary" onClick={this.part}>part</Button>{' '}
              <Button variant="outline-primary" onClick={this.split}>split</Button>{' '}
              <Button variant="outline-primary" onClick={this.condense}>condense</Button>{' '}<br />

              <Button variant="outline-primary" onClick={this.stretch}>stretch</Button>{' '}
              <Button variant="outline-primary" onClick={this.vowelsOnly}>vowels only</Button>{' '}
              <Button variant="outline-primary" onClick={this.consOnly}>cons only</Button>{' '}
              <Button variant="outline-primary" onClick={this.duplicate}>duplicate</Button>{' '}<br />
              <Button variant="outline-danger" onClick={this.permutate}>permutate</Button>{' '}
              <Button variant="outline-danger" onClick={this.markov}>markov</Button>{' '}<br />
              {this.state.markovVisible ?
                  <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
             ref="sourceText" placeholder="enter markov source text here..." />

                    <Form.Group as={Row}>
                        <Form.Label>prefix {this.state.prefix} </Form.Label>
                        <Form.Range value={this.state.prefix} min={1} max={10} onChange={e => this.setState({prefix: parseInt(e.target.value, 10)})}/>
                    </Form.Group>
                    </Form>
                    <Button variant="outline-danger" onClick={this.applyMarkov}>apply</Button>{' '}<br />
                    </div>
                  :
                  <>
                  </>
              }
              <Button variant="outline-danger" onClick={this.grammar}>grammar</Button>{' '}<br />
              {this.state.grammarVisible ?
                  <div className="App-text">
                    <Form>
                        <Form.Control as="textarea" rows={12} value={this.state.sourceText} onChange={this.handleSourceChange} style={{backgroundColor: "#999999", color: "black"}}
             ref="sourceText" placeholder="enter grammar rules here..." />

                    </Form>
                    <Button variant="outline-danger" onClick={this.applyGrammar}>generate</Button>{' '}<br />
                    </div>
                  :
                  <>
                  </>
              }

              <Button variant="outline-success" onClick={this.undo}>undo</Button>{' '}<br />
            </div>
            <div className="App-text">
                <Form>
                    <Form.Control as="textarea" rows={12} value={this.state.text} onChange={this.handleChange} style={{backgroundColor: "#999999", color: "black"}}
           ref="inputText" autoFocus placeholder="input here..." />
                </Form>
            </div>
            <div className="App-buttons">
                <Button variant="outline-success" onClick={this.speak}>speak</Button>{' '}
                <Button variant="outline-danger" onClick={this.stop}>stop</Button>{' '}
            </div>
            <div>
                <p>this is a project by <a href="https://joerg.piringer.net/">jörg piringer</a></p>
            </div>
        </div>
      );
    }
}

export default App;
