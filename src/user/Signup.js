import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../component/Layout';
import { signup } from "../auth";


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} onChange={handleChange('email')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} onChange={handleChange('password')} className="form-control" />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : 'none' }}>
            New account is created. Please <Link to="/signin">signin</Link>
        </div>
    )
    return (
        <Layout title="Signup Page" description="React" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup;