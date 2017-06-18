import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import ChatSettings from '../components/ChatSettings';

describe('ChatSettings', () => {
  const chatSettingsProp = "oldName";
  const chatSettingsnew = "newName";
  const onSettingsChange = jest.fn();

  const ChatSettingsInstance = shallow(<ChatSettings
    chatSettings={chatSettingsProp}
    onSettingsChange={onSettingsChange} />);

  it('should set the initial value of chatSettings to the given prop', () => {
    expect(ChatSettingsInstance.state('chatSettings')).toEqual(chatSettingsProp);
  });

  it('should clear the chatSettings on focus', () => {
    ChatSettingsInstance.find('input').simulate('focus');

    expect(ChatSettingsInstance.state('chatSettings')).toEqual('');
  })

  it('should change the chatSettings with given value', () => {
    ChatSettingsInstance.find('input').simulate('change', {target: {value: chatSettingsnew}});

    expect(ChatSettingsInstance.state('chatSettings')).toEqual(chatSettingsnew);
  });

  it('should send the given value to the parent and clear', () => {
    ChatSettingsInstance.find('button').simulate('click', { preventDefault: () => {} });

    expect(onSettingsChange).toHaveBeenCalledWith(chatSettingsnew);
    expect(ChatSettingsInstance.state('chatSettings')).toEqual('');
  });

});
