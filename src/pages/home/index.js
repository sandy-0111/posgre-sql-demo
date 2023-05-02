import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { Field, Form, Formik, } from 'formik'
import { userPayload } from '../../utils/generate-payload'
import { useParams, useSearchParams } from 'react-router-dom'

const Home = () => {

  const [data, setData] = useState([])
  const [updateMode, setUpdateMode] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { userId } = useParams();
  const mainFormRef = useRef(null);

  const handleSubmit = useCallback(async (values) => {
    const payload = userPayload(values);
    try {
      const result = await axios.post('http://localhost:4000/user',
        payload
      )

      if (result.status === 200) {
        const result = await axios.get('http://localhost:4000/user')
        if (result.data.data) {
          setData(prev => prev = result.data?.data)
        }
      }
      mainFormRef.current.resetForm({ values: '' })
    } catch (error) {
      console.log('error: ', error);
    }
  }, [])

  const handleDelete = useCallback((userId) => async (e) => {
    try {
      const result = await axios.delete(`http://localhost:4000/user/${userId}`)

      if (result.status === 200) {
        const result = await axios.get('http://localhost:4000/user')
        if (result.data.data) {
          setData(prev => prev = result.data?.data)
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }, [])

  const fetchDetail = useCallback((userId) => async (e) => {

    searchParams.set('userId', userId)
    setSearchParams(searchParams);
    try {
      const result = await axios.get(`http://localhost:4000/user/${userId}`);

      if (result.data.data) {
        const fields = Object.keys(mainFormRef.current.initialValues);
        fields.forEach(field => mainFormRef.current.setFieldValue(field, result.data?.data?.[field], false));
      }
      setUpdateMode(true)
    } catch (error) {
      console.log('error: ', error);
    }
  }, [])

  const handleUpdate = useCallback(async (e) => {
    const payload = mainFormRef.current.values;
    const userId = searchParams.get('userId');

    try {
      const result = await axios.put(`http://localhost:4000/user/${userId}`, payload);
      console.log('result: ', result);
      if (result.status === 200) {
        const result = await axios.get('http://localhost:4000/user')
        if (result.data.data) {
          setData(prev => prev = result.data?.data)
        }
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      searchParams.delete('userId');
      setSearchParams(searchParams)
    }
    mainFormRef.current.resetForm({ values: '' })
    setUpdateMode(false)
  }, [])

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
            user_firstname: '',
            user_lastname: '',
            user_email: '',
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => {
            mainFormRef.current = formik
            return (
              <Form className='form'>
                <div className='field-container'>
                  <label htmlFor="user_firstname">First Name</label>
                  <Field id="user_firstname" name="user_firstname" className='field' placeholder="Jane" />
                </div>
                <div className='field-container'>
                  <label htmlFor="user_lastname">Last Name</label>
                  <Field id="user_lastname" name="user_lastname" className='field' placeholder="Doe" />
                </div>
                <div className='field-container'>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="user_email"
                    name="user_email"
                    placeholder="jane@acme.com"
                    type="email"
                    className='field'
                  />
                </div>{updateMode ?
                  <button type="button" className='submit-btn' onClick={handleUpdate} >Update</button> :
                  <button type="submit" className='submit-btn'>Submit</button>
                }
              </Form>
            )
          }
          }
        </Formik>
      </div>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 && data?.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.user_firstname}</td>
                  <td>{val.user_lastname}</td>
                  <td>{val.user_email}</td>
                  <td className='delete-btn'><button type="button" onClick={handleDelete(val.user_id)} className='submit-btn'>Delete</button></td>
                  <td className='delete-btn'><button type="button" onClick={fetchDetail(val.user_id)} className='submit-btn'>Edit</button></td>
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