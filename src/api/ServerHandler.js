import axios from "axios";
export async function addToServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("VideoAuthDetails"));
  const token = localUser.id;
  try {
    await axios.post(
      `https://videoplex-backend.herokuapp.com/user/${route}`,
      data,
      {
        headers: { authorization: token },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("VideoAuthDetails"));
  const token = localUser.id;
  try {
    await axios.delete(
      `https://videoplex-backend.herokuapp.com/user/${route}`,
      {
        headers: { authorization: token },
        data,
      }
    );
  } catch (err) {
    console.error(err);
  }
}
