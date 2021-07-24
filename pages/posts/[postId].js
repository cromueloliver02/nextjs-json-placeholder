import Link from 'next/link'
import axios from 'axios'

const Post = ({ post: { title, userId, body } }) => {
   return (
      <div className='container py-5'>
         <div className="py-4">
            <h4>{title}</h4>
            <h6 className='text-muted'>
               <strong>Author:</strong>{' '}
               <Link href={`/users/${userId.username.toLowerCase()}`}>
               <a>{userId.name}</a>
               </Link> | <strong>Company:</strong> {userId.company.name}</h6>
         </div>
         <p>{body}</p>
      </div>
   )
}

export const getServerSideProps = async ({ query }) => {
   try {
      let { data: post } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.postId}`)
      const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)

      post = { ...post, userId: user }

      return { props: { post } }
   } catch (err) {
      console.error(err);
      throw new Error(err.message)
   }
}

export default Post
