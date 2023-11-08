// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();

    resolve({data});
  }
  );
}

export function fetchProductById(id) {
 
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+id);
    const data = await response.json();

    resolve({data});
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    });

    const data = await response.json();

    resolve({ data });
  }
  );
}


export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone", "laptops"]}
  // pagination = {_page:1, _limit:10} //_page=1&_limit=10
  // sort = {_sort: "price", _order: "desc"}
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length > 0){
      queryString += `${key}=${categoryValues}&`

    }
  }

  for(let key in sort){
      queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
}

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?'+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products: data, totalItems: totalItems }});
  }
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories');
    const data = await response.json();

    resolve({data});
  }
  );
}



export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands');
    const data = await response.json();

    resolve({data});
  }
  );
}

export function updateProduct(updatedProduct) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/' + updatedProduct.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedProduct),
      headers: { 'content-type': 'application/json' },
    });

    const data = await response.json();

    resolve({ data });
  }
  );
}

export function deleteProduct(productId) {

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+productId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });

    const data = await response.json();
    resolve({ data: { id: productId } });
  }
  );
}
