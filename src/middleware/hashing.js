'use strict';

const hash = (password, salt = 10) => {
  let hashedValue = 0;
  for (var i = 0; i < salt; i++) {
    for (var j = 0; j < password.length; j++) {
      hashedValue += (password.charCodeAt(j) * 256);
    }
  }

  const newHash = hashedValue.toString();
  return Promise.resolve(newHash);
};

const compare = (password, storedPass) => {

  // const hashedPass = Promise.resolve(hash(password));
  // console.log(hashedPass);

  return hash(password)
    .then(hashedPass => Promise.resolve(hashedPass === storedPass));




  // return Promise.resolve(hashedPass === storedPass);

};

export default { hash, compare };