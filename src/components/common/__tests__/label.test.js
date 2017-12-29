import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Label } from '../label';

describe('<Label /> Component', function() {
  const component = renderer.create(<Label text="My label" />);
  const tree = component.toJSON();

  it("renders and matches our snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
