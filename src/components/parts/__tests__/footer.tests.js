import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Footer } from '../footer';

const props = {
  id: 'my-footer-panel',
  name: 'restart',
  labels: {
    counter: props => 'my counter'
  }
};

describe('<Guesses /> Component', function() {

  const component = renderer.create(<Footer {...props} />);
  let wrapper = shallow(<Footer {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
