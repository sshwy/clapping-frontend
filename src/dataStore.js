class DataStore {
  constructor() {
    this.store = new Map();
  }
  set (key, val) {
    this.store.set(key, val);
  }
  get (key) {
    return this.store.get(key);
  }
  delete (key) {
    this.store.delete(key);
  }
}

const dataStore = new DataStore();

export default dataStore;