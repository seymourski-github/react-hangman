import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Guesses } from '../guesses';

const props = {
  id: 'my-guesses-panel',
  label: 'My guesses label'
};

describe('<Guesses /> Component', function() {

  const component = renderer.create(<Guesses {...props} />);
  let wrapper = shallow(<Guesses {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
