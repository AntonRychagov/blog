const BASE_URL = "https://jsonplaceholder.typicode.com";



export function getPosts() {
  return fetch(`${BASE_URL}/posts`).then((response) => {
    if (!response.ok) {
      throw new Error("API response failed");
    }
    return response.json();
  });
}

export function addPost(newPost: any) {
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export function deletePost(id: number | string) {
  fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
}
