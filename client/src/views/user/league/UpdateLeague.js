import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UpdateLeagueForm, UserNav } from '../../../components';
import { getLeague, updateLeague } from '../../../api/league'
import { useSelector } from 'react-redux';

const UpdateLeague = ({ history }) => {
    const initialValues = {
        league_name: '',
        image: '',
        user: ''
    }
    const [values, setValues] = useState(initialValues);
    const { user } = useSelector((state) => ({ ...state }));
    const { id } = useParams();

    useEffect(() => {
        loadLeague(id)
    }, [])
    const loadLeague = (id) => {
        getLeague(id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        updateLeague(user.token,id,values)
        .then(res=>{
            history.push("/user/leagues/new");
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <UpdateLeagueForm handleSubmit={handleSubmit} values={values} setValues={setValues} />
                </div>
            </div>
        </div>
    );
};

export default UpdateLeague;