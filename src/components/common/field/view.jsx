import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Label } from '../../common';
import './field.css';

const mapChildProps = (child, props) => {
  const { value } = props;
  return {
    id: props.getId(child, props),
    name: (child!=='label') && props.getName(child, props),
    style: props.getStyle(child, props),
    text: props.getText(child, props),
    value: (child!=='label') && value
  };
};

const defaultProps = {
  getId: (child, props) => {
    return `${props.name}-${child}`;
  },
  getName: (child, props) => {
    return props.names[child];
  },
  getStyle: (child, props) => {
    return props.styles[child];
  },
  getText: (child, props) => {
    return props.labels[child];
  },
  handleChange: () => console.log('handleChange not setup'),
  handleButton: false,
  fieldButton: true,
  fieldInput: true,
  fieldLabel: true,
  labels: {
    button: 'ok',
    label: 'Type n submit',
    input: ''
  },
  names: {
    button: 'buttonNameNeedsAdding',
    input: 'inputNameNeedsAdding'
  },
  styles: {
    button: {},
    input: {},
    label: {}
  },
  value: ''
};

export default class Field extends Component {
  static defaultProps = defaultProps;
  static propTypes = {
    getId: PropTypes.func,
    getName: PropTypes.func,
    getStyle: PropTypes.func,
    getText: PropTypes.func,
    handleButton: PropTypes.func,
    handleChange: PropTypes.func,
    action: PropTypes.string,
    fieldButton: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.node
    ]),
    fieldInput: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.node
    ]),
    fieldLabel: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.node
    ]),
    id: PropTypes.string.isRequired,
    labels: PropTypes.shape({
      button: PropTypes.string,
      input: PropTypes.string,
      label: PropTypes.string
    }),
    names: PropTypes.shape({
      button: PropTypes.string.isRequired,
      input: PropTypes.string.isRequired
    }).isRequired,
    styles: PropTypes.shape({
      button: PropTypes.object,
      input: PropTypes.object,
      label: PropTypes.object
    }),
    value: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])
  };

 /**
  * render methods ...
  */

  renderButton = props => {
    const { action, disabled, fieldButton, value, handleButton } = props;

    if(!handleButton||fieldButton===false) {
      return null;
    } else if(fieldButton!==true) {
      return fieldButton;
    }

    return (
      <Button {...mapChildProps('button', props)}
        action={action}
        disabled={disabled}
        value={value}
        handleClick={handleButton}
      />
    );
  };

  renderInput = props => {
    const { autoFocus, disabled, labels, fieldInput, handleChange } = props;

    if(fieldInput!==true) return fieldInput;
    return (
      <Input {...mapChildProps('input', props)}
        flexItem="auto"
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={labels.placeholder||labels.input}
        handleChange={handleChange}
      />
    );
  };

  renderLabel = props => {
    const { fieldLabel } = props;
    if(fieldLabel!==true) return fieldLabel;
    return (
      <Label {...mapChildProps('label', props)}
        flexItem="1 1 100%"
        htmlFor={props.getId('input', props)}
        visible={!props.disabled}
      />
    );
  };

  render() {
    return (
      <div className="field" id={this.props.id}>
        <div className="field-content zen-box zen-flex-row">
          {this.renderInput(this.props)}
          {this.renderButton(this.props)}
          {this.renderLabel(this.props)}
        </div>
      </div>
    );
  }
}
