import React from 'react';

// import { Task } from './Task';
// import { LoginForm } from '../imports/ui/LoginForm';
import { Task } from '../imports/ui/Task';

export default {
  title: 'Example/LoginForm',
  component: Task,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Task {...args} />;

export const Check = Template.bind({});
Check.args = {
  user: {
    name: 'Jane Doe',
  },
  name : '',
  key:'sjdscsdkjh',
  task:{isChecked : true, text : 'do it'},
  onCheckboxClick:true,
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {};
