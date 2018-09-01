import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('NoArticleMessage ', () => {
  const wrapper = Enzyme.shallow(<div />);

  it('should render message', () => {
    expect(wrapper.find('.title')).toHaveLength(5);
  });
});
