import axios from "axios";
export async function addToServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("VideoAuthDetails"));
  const id = localUser.id;
  try {
    await axios.post(
      `https://videoplex-backend.herokuapp.com/user/${id}/${route}`,
      data
    );
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromServer(route, data) {
  const localUser = JSON.parse(localStorage.getItem("VideoAuthDetails"));
  const id = localUser.id;
  try {
    await axios.delete(
      `https://videoplex-backend.herokuapp.com/user/${id}/${route}`,
      { data: data }
    );
  } catch (err) {
    console.error(err);
  }
}
