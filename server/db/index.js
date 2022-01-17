const uniqid = require('uniqid');

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

const handleData = data => {
  let datas = data;
  return {
    get() {
      return datas;
    },
    create(newData) {
      const _newData = { id: uniqid(), ...newData };
      datas = [_newData, ...datas];
      return _newData;
    },
    createBack(newData) {
      const _newData = { id: uniqid(), ...newData };
      datas = [...datas, _newData];
      return _newData;
    },
    delete(id) {
      datas = datas.filter(data => data.id !== id);
    },
    filter(payload) {
      let filtered = datas;
      Object.keys(payload).forEach(key => {
        filtered = filtered.filter(data => data[key] === payload[key]);
      });
      return filtered;
    },
    update(id, payload) {
      datas = datas.map(data => (data.id === id ? { ...data, ...payload } : data));
      return datas.find(data => data.id === id);
    },
    search(payload) {
      return datas.filter(
        data =>
          data.title.includes(payload.title) || data.animal.includes(payload.title) || data.type.includes(payload.title)
      );
    },
  };
};

module.exports = {
  users: handleData(users),
  posts: handleData(posts),
  comments: handleData(comments),
};
