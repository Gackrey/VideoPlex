let Users = [
  {
    name: "Gaurav",
    email: "gauravdey625@gmail.com",
    password: "123456",
  },
];

const findUserandUpdate = (oldname, oldpassword, name, email, password) => {
  const foundUser = Users.find((user) => user.name === oldname && user.password === oldpassword);
  Users = Users.map(user =>
    user.name === foundUser.name && user.password === foundUser.password ?
      { ...user, name, email, password } :
      user
  )
  return { name, email, password }
};

const findUserByEmail = (email) => {
  return Users.find((user) => user.email === email);
}
export const loginUserApi = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByEmail(email);
      if (user === null || user === undefined) {
        reject({ success: false, status: 404 });
      }
      if (user?.password === password) {
        resolve({ success: true, data: user, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 1000);
  });
};

export const signupUserApi = (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Users.push({ name, email, password });
      const user = findUserByEmail(email);
      if (user) {
        resolve({ success: true, data: user, status: 201 });
      }
      reject({ success: false, status: 401 });
    }, 1000);
  });
};

export const updateUserApi = (oldname, oldpassword, name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserandUpdate(oldname, oldpassword, name, email, password);
      if (user === null || user === undefined) {
        reject({ success: false, status: 404 });
      }
      if (user?.password === password) {
        console.log(Users);
        resolve({ success: true, data: user, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 1000);
  });
};
