import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Field, Form, Formik, } from 'formik'
import { userPayload } from '../../utils/generate-payload'

const Home = () => {

  const [data, setData] = useState([])

  const handleSubmit = async (values) => {
    const payload = userPayload(values);
    try {
      const result = await axios.post('http://localhost:4000/user',
        payload
      )

      if (result.status(200)) {
        console.log("Redvs")
        const result = await axios.get('http://localhost:4000/user')
        if (result.data.data) {
          setData(prev => prev = result.data?.data)
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:4000/user')
        if (result.data.data) {
          setData(prev => prev = result.data?.data)
        }
      } catch (error) {
        console.log('error: ', error);
      }
    })()

  }, [])

  return (
    <div className='ctr'>
      <div className='form-container'>
        <h3>
          Sign Up
        </h3>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form className='form'>
            <div className='field-container'>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" className='field' placeholder="Jane" />
            </div>
            <div className='field-container'>
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" className='field' placeholder="Doe" />
            </div>
            <div className='field-container'>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                className='field'
              />
            </div>
            <button type="submit" className='submit-btn'>Submit</button>
          </Form>
        </Formik>
      </div>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 && data?.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.user_firstname}</td>
                  <td>{val.user_lastname}</td>
                  <td>{val.user_email}</td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Home