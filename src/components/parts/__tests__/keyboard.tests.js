import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Keyboard } from '../keyboard';

const props = {
  id: 'my-keyboard-panel',
  keys: [{
    name: 'a'
  }, {
    name: 'b'
  }, {
    name: 'c'
  }]
};

describe('<Keyboard /> Component', function() {

  const component = renderer.create(<Keyboard {...props} />);
  let wrapper = shallow(<Keyboard {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
