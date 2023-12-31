export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    });

    const data = await response.json();

    resolve({ data });
  }
  );
}


export function logInUser(loginInfo) {
  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' }
      });

      if(response.ok){
        const data = await response.json();
        resolve({ data });
      }
      else{
        const error = await response.json();
        reject(error)
      }
    }
    catch (error) {
      reject( error );
    }
  });
}




export function fetchUserInfo(userId) {
  
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+userId);

    const data = await response.json();

    resolve({ data });
  }
  );
}
