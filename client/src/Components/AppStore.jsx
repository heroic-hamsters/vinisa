import { observable } from 'mobx';

export class AppStore {
  @observable sitename = "Translate Hamsters";
  @observable username = "";
  @observable languages = {};
  @observable word = "";
}

export default new AppStore;