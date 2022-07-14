
const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  };

 const apiOrder = (data)=> {
    return fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(onResponce)
      .catch((err) => console.log(err));
  }
  export default apiOrder;