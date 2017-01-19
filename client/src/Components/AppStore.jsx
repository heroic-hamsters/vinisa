import { observable } from 'mobx';

export class AppStore {
  @observable sitename = 'Vinisa';
  @observable username = '';
  @observable password = '';
  @observable nativeLanguage = '';
  @observable learnLanguage = '';
  @observable nativeLanguageCode = '';
  @observable learnLanguageCode = '';
  @observable nativeLanguageSpeechCode = '';
  @observable learnLanguageSpeechCode = '';
  @observable word = '';
  @observable translatedWord = '';
  @observable showUpload = '';
  @observable savedWords = {};
  @observable audioFile = {};
}

export default new AppStore;
