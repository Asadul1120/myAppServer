

const datpost = async () => {
  const response = await fetch("http://localhost:3045/user/create", {
    method: "POST",
    body: JSON.stringify({
      name : "test",
      email : "test",
      subject : "test",
      message : "test"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  console.log(result);
  return result;

}