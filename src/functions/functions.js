const getCurrentUser = () => {
  const userString = localStorage.getItem("user");
  return userString && JSON.parse(userString);
};

const setCurrentUser = (user) => {
  if (!user) {
    localStorage.removeItem("user");
    return;
  }
  const userString = JSON.stringify(user);
  localStorage.setItem("user", userString);
};

const loginUser = ({ cardNumber, pin }) => {
  setCurrentUser({
    name: "Bruce Wanyama",
    id: "72eb882b-720a-4729-9663-ef8531f90aa9",
    cardNumber: "4716789282808067",
    cardId: "aba82cb3-e50f-4b5a-b615-b1fb7e5cbf5c",
  });
};

const logoutUser = () => {
  setCurrentUser(null);
};

const formatNumber = (num) => {
  return Intl.NumberFormat("en-US").format(num);
};

export { getCurrentUser, setCurrentUser, loginUser, logoutUser, formatNumber };
