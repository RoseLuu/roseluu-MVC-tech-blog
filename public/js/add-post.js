const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector(`#post-title`).value;
  const content = document.querySelector("#post-content").value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await console.log(response.body);
  if (await response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("hello there 2");
  }
};
document
  .querySelector("#add-post-form")
  .addEventListener("submit", newFormHandler);
