import { observable } from 'mobx';

export class AppStore {
  @observable sitename = "Translate Hamsters";
  @observable username = "";
  @observable languages = {};
}

export default new AppStore;