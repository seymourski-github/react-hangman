import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Label } from '../../components';
import './field.css';

const defaultProps = {
  getId: (item, props) => {
    return `${props.name}-${item}`;
  },
  getStyle: (item, props) => {
    return props.styles[item];
  },
  handleChange: () => console.log('handleChange not setup'),
  handleButton: false,
  labels: {
    button: 'ok',
    label: 'Type n submit',
    input: ''
  },
  names: {
    button: 'buttonNameNeedsAdding',
    input: 'inputNameNeedsAdding'
  },
  nodes: {
    button: true,
    input: true,
    label: true,
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
    getStyle: PropTypes.func,
    handleButton: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.func
    ]),
    handleChange: PropTypes.func,
    action: PropTypes.string,
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
    nodes: PropTypes.shape({
      button: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.node
      ]),
      input: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.node
      ]),
      label: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.node
      ]),
    }),
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

  getId = item => {
    return this.props.getId(item, this.props);
  };

  getStyle = item => {
    return this.props.getStyle(item, this.props);
  };

  getProps = item => {
    return {
      id: this.getId(item),
      name: this.props.names[item],
      style: this.getStyle(item),
      text: this.props.labels[item],
    };
  };

  renderButton = props => {
    const { action, disabled, nodes, value, handleButton } = props;

    if(handleButton===false) {
      return null;
    } else if(nodes.button!==true) {
      return nodes.button;
    }

    return (
      <Button {...this.getProps('button')} flexItem="none"
        action={action}
        disabled={disabled}
        value={value}
        handleAction={handleButton}
      />
    );
  };

  renderInput = props => {
    const { disabled, labels, nodes, value, handleChange } = props;

    if(nodes.input!==true) return nodes.input;
    return (
      <Input {...this.getProps('input')}
        autoFocus flexItem="auto"
        disabled={disabled}
        placeholder={labels.placeholder||labels.input}
        handleChange={handleChange}
        value={value}
      />
    );
  };

  renderLabel = props => {
    const { nodes } = props;
    if(nodes.label!==true) return nodes.label;
    return (
      <Label {...this.getProps('label')}
        flexItem="1 1 100%"
        htmlFor={this.getId('input')}
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
