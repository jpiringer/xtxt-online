import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

export interface IExample {
  title: string
  content: string
}

export interface IExamplesProps {
  examples: IExample[]
  setExample: (content: string) => void
  disabled: boolean
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
      <DropdownButton disabled={this.props.disabled} id="dropdown-basic-button" title="examples" variant="outline-success">
        {this.props.examples.map((example: any, index: number) => (
          <Dropdown.Item key={example.title} onClick={()=>{this.props.setExample(example.content);}}>{example.title}</Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
}