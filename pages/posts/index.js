import Link from 'next/link'
import axios from 'axios'

const Posts = ({ posts }) => {
   return (
      <div className='container py-4'>
         <h1 className='mb-3'>POSTS</h1>
         {posts.length !== 0 && posts.map(post => (
            <div key={post.id} class="card mb-3">
               <div class="card-header">
                  <Link href={`/posts/${post.id}`}>
                     <a>{post.title}</a>
                  </Link>
                  <br />
                  <p className='m-0'><small>Author: {post.userId.name}</small></p>
               </div>
               <div class="card-body">
                  {post.body}
               </div>
            </div>
         ))}
      </div>
   )
}

export const getServerSideProps = async () => {
   try {
      let { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');

      posts = posts.map(post => {
         const user = users.filter(user => user.id === post.userId)

         return { ...post, userId: user[0] }
      })

      return { props: { posts } }
   } catch (err) {
      console.error(err);
      throw new Error(err.message)
   }
}

export default Posts
