import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Container } from '../container';

const props = {
  id: "my-container"
};

describe('<Container /> Component', function() {

  const component = renderer.create(<Container {...props} />);
  let wrapper = shallow(<Container {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
