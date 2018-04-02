import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as Enzyme from 'enzyme';

import { WelcomeMessage } from '../WelcomeMessage';

Enzyme.configure({ adapter: new Adapter() });

describe('NoArticleMessage ', () => {
  const wrapper = Enzyme.shallow(<WelcomeMessage />);

  it('should render message', () => {
    expect(wrapper.find('.title')).toHaveLength(5);
  });
});
