import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Input } from '../input';

const props = {
  name: 'myTextInput',
  value: 'My text input value'
};

describe('<Input /> Component', function() {
  const component = renderer.create(<Input {...props} />);
  const tree = component.toJSON();

  it("renders and matches our snapshot", () => {
    expect(tree).toMatchSnapshot();
  });
});
