


export function fetchLoggedInUserOrders(userId) {

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/user/'+userId);
    const data = await response.json();

    resolve({ data });
  }
  );
}

export function fetchLoggedInUser(userId) {

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+userId);
    const data = await response.json();

    resolve({ data });
  }
  );
}

export function updateUser(userData) {
  
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+userData.id, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    });

    const data = await response.json();

    resolve({ data });
  }
  );
}









// export function updateCart(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/cart/' + update.id, {
//       method: 'PATCH',
//       body: JSON.stringify(update),
//       headers: { 'content-type': 'application/json' },
//     });

//     const data = await response.json();

//     resolve({ data });
//   }
//   );
// }


// export function deleteItemFromCart(productId) {

//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/cart/' + productId, {
//       method: 'DELETE',
//       headers: { 'content-type': 'application/json' },
//     });

//     const data = await response.json();
//     resolve({ data: { id: productId } });
//   }
//   );
// }


// export function resetCart(userId) {
//   return new Promise(async (resolve) => {
//       // get all items of user's cart and then delete each
//       const response = await fetchItemsByUserId(userId);
//       const items = response.data;

//       for (let item of items) {
//         await deleteItemFromCart(item.id);
//       }

//       resolve({status: 'Success'})
//   });
 
// }