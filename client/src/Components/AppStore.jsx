import { observable } from 'mobx';

export class AppStore {
  @observable sitename = 'Translate Hamsters';
  @observable username = '';
  @observable password = '';
  @observable nativeLanguage = 'English';
  @observable learnLanguage = 'Chinese';
  @observable nativeLanguageCode = 'en';
  @observable learnLanguageCode = 'zh';
  @observable nativeLanguageSpeechCode = 'en-US';
  @observable learnLanguageSpeechCode = 'zh-CN';
  @observable word = '';
  @observable translatedWord = '';
  @observable showUpload = '';
  @observable savedWords = [];
  @observable savedSentences = ['hiiiii'];
  @observable audioSentence = '';
  @observable audioSentenceTranslation = '';
}

export default new AppStore;
