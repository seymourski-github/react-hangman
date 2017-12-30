import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Hangman from '../view';

const props = {
  alphabet: ['a','b','c','d','e','f','g','h','i','j','k','l','m'],
  mystery: 'My secret word'
};

describe('<Hangman /> Component', function() {
  let component;
  let wrapper;

  beforeEach(() => {
    component = renderer.create(<Hangman {...props} />);
    wrapper = shallow(<Hangman {...props} />);
  });

  it("renders and matches our snapshot", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
