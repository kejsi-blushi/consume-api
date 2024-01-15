//AXOS
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AddPost from "./components/addPost";
import Post from "./components/post";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts",
  });

  const fetchPosts = async () => {
    const response = await client.get("?_limit=4");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (title, body) => {
    const response = await client.post("", {
      title,
      body,
    });
    setPosts((prevPosts) => [response.data, ...prevPosts]);
  };

  const deletePost = async (id) => {
    const response = await client.delete(`${id}`);
    setPosts(
      posts.filter((post) => {
        return post.id !== id;
      })
    );
    console.log(id);
  };


  return (
    <main>
      <h1>Consuming REST api tutorial</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            deletePost={deletePost}
          />
        ))}
      </section>
    </main>
  );
}
export default App;

//FETCH
// import { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import AddPost from "./components/addPost";
// import Post from "./components/post";
// import "./App.css";
// function App() {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts?_limit=4"
//       );
//       const data = await response.json();
//       setPosts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const addPost = async (title, body) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title: title,
//         body: body,
//         userId: Math.random().toString(36).slice(2),
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//     const data = await response.json();
//     setPosts((prevPosts) => [data, ...prevPosts]);
//     setTitle("");
//     setBody("");
//   };
//   const deletePost = (id) => {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//       method: "DELETE",
//     }).then((response) => {
//       if (response.status === 200) {
//         setPosts(
//           posts.filter((post) => {
//             return post.id !== id;
//           })
//         );
//       }
//     });
//   };

//   return (
//     <main>
//       <h1>Consuming REST api tutorial</h1>
//       <AddPost addPost={addPost} />
//       <section className="posts-container">
//         <h2>Posts</h2>
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             id={post.id}
//             title={post.title}
//             body={post.body}
//             deletePost={deletePost}
//           />
//         ))}
//       </section>
//     </main>
//   );
// }
// export default App;
