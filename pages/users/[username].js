import axios from 'axios'

const User = ({ user: { name, username, email, address, phone, website, company } }) => {
   return (
      <div className='container py-5'>
         <h1 className='mb-4'>Profile</h1>

         <ul className="list-group">
            <li className="list-group-item"><strong>Name:</strong> {name}</li>
            <li className="list-group-item"><strong>Username:</strong> {username}</li>
            <li className="list-group-item"><strong>Email:</strong> {email}</li>
            <li className="list-group-item"><strong>Address:</strong> {address.suite}, {address.street}, {address.city}, {address.zipcode}</li>
         </ul>
      </div>
   )
}

export const getServerSideProps = async ({ query }) => {
   try {
      const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users')
      const user = users.filter(user => user.username.toLowerCase() === query.username)

      return { props: { user: user[0] } }
   } catch (err) {
      console.error(err);
      throw new Error(err.message)
   }
}

export default User
