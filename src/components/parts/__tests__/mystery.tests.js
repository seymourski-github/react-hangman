import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Mystery } from '../mystery';

const props = {
  id: 'my-mystery-panel',
  activeWord: 'My secret word',
  activeLetters: {
    e: true
  }
};

describe('<Mystery /> Component', function() {

  const component = renderer.create(<Mystery {...props} />);
  let wrapper = shallow(<Mystery {...props} />);

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
