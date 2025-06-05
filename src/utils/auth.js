export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};
// const summerCheckbox = document.querySelector("#summer");

// summerCheckbox.addEventListener("change", () => {
//   if (summerCheckbox.checked) {
//     document.documentElement.style.setProperty("--base", "#E5FF9D");
//   } else {
//     document.documentElement.style.setProperty("--base", "white");
//   }
// });
