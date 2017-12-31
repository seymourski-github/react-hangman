import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Circle, Text } from 'react-konva';
import { Container } from '../../components';
import { itemsList } from './cfg';

export default class Gallows extends Component {
  static defaultProps = {
    activeIndex: 0,
    height: 200,
    width: 400,
    itemList: itemsList,
    itemOrder: ({ itemList }) => Object.keys(itemList),
    itemVisible: (itemIdx, stateIdx) => itemIdx <= stateIdx
  }

  static propTypes = {
    activeIndex: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    itemList: PropTypes.object,
    itemOrder: PropTypes.func,
    itemVisible: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.getItems = props => {
      const { itemOrder, itemList } = props;
      return itemOrder(props).map(key => ({
        name: key,
        ...itemList[key]
      }));
    };
  }

  componentDidMount() {
    this.setState({index: this.props.activeIndex});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({index: nextProps.activeIndex});
  }

  renderItems = (items, { itemList, itemVisible }) => {
    return items.map((item, i) => {
      const Compontent = item.type || Circle;
      return (
        <Compontent {...item.config}
          key={`${item.name}`}
          visible={itemVisible(i, this.state.index)}
        />
      );
    });
  }

  render() {
    const { height, width } = this.props;
    const items = this.getItems(this.props);
    const item = items[this.state.index];
    return (
      <Container>
        <Stage width={width} height={height}>
          <Layer>
            {this.renderItems(items, this.props)}
            <Text x={width-180} y={height-40}
              text={(item && item.text) || null} fontSize={16}
            />
          </Layer>
        </Stage>
      </Container>
    );
  }
}
