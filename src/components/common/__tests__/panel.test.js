import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Panel } from '../panel';

const props = {
  id: 'my-panel' 
};

describe('<Panel /> Component', function() {
  const component = renderer.create(<Panel {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
