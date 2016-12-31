import { observable } from 'mobx';

export class AppStore {
  @observable sitename = "Translate Hamsters";
}

export default new AppStore;