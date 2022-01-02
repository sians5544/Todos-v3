const get = (url, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

const post = (url, onSuccess, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      setTodos(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

const remove = (url, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

const patch = (url, onSuccess, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PATCH', url);
  xhr.setRequestHeader('content-type', 'application/json');
  // xhr.send(JSON.stringify({ id: generateId(), content, completed: false }));
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

const editMyRequest = (method, url, onSuccess, payload) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  console.log(payload);
  xhr.send(JSON.stringify(payload));

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
      onSuccess(JSON.parse(xhr.response));
    } else {
      console.error(xhr.status);
    }
  };
};

const req = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

// 객체 프로퍼티로 받아서 넘긴다
// 이렇게 쓰면 모듈로 인식한다
export default {
  get(url) {
    return req('GET', url);
  },
  post(url, payload) {
    return req('POST', url, payload);
  },
  patch(url, payload) {
    return req('PATCH', url, payload);
  },
  delete(url) {
    return req('DELETE', url);
  },
};
