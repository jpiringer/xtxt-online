import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export interface IExample {
    title: string
    content: string
}

export interface IExamplesProps {
    examples: IExample[]
    setExample: (content: string) => void
}

export interface IExamplesState {
}

export class Examples extends React.Component<IExamplesProps, IExamplesState> {
  constructor(props: IExamplesProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                examples
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {this.props.examples.map((example: any, index: number) => (
                <Dropdown.Item onClick={()=>{this.props.setExample(example.content);}}>{example.title}</Dropdown.Item>
            ))}
            </Dropdown.Menu>
        </Dropdown>
    );
  }
}