import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Button } from '../button';

const props = {
  name: "myButton"
};

describe('<Button /> Component', function() {

  const component = renderer.create(<Button {...props} />);
  let wrapper = shallow(<Button {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
