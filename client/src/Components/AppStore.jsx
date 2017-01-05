import { observable } from 'mobx';

export class AppStore {
  @observable sitename = "Translate Hamsters";
  @observable username = "";
  @observable languages = {};
  @observable word = "";
  @observable translatedWord = "test";
}

export default new AppStore;