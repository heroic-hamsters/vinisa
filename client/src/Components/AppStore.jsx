import { observable } from 'mobx';

export class AppStore {
  @observable sitename = "Translate Hamsters";
  @observable username = "";
  @observable password = "";
  @observable languages = {};
  @observable word = "";
  @observable translatedWord = "test";
  @observable showUpload = '';
  @observable audioSentence = '';
  @observable audioSentenceTranslation = '';
}

export default new AppStore;