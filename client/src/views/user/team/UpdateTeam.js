import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UpdateTeamForm, UserNav } from '../../../components';
import { useSelector } from 'react-redux';
import { getTeam, updateTeam } from '../../../api/team';

const UpdateTeam = ({ history }) => {
    const initialValues = {
        team_name:'',
        league: '',
        image: '',
        user: ''
    }
    const [values, setValues] = useState(initialValues);
    const { user } = useSelector((state) => ({ ...state }));
    const { id } = useParams();

    useEffect(() => {
        loadTeam(id)
    }, [])
    const loadTeam = (id) => {
        getTeam(id)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        console.log(values)
        updateTeam(user.token,id,values)
        .then(res=>{
            history.push(`/user/${values.league}/team/new`);
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
                    <UpdateTeamForm handleSubmit={handleSubmit} values={values} setValues={setValues} />
                </div>
            </div>
        </div>
    );
};

export default UpdateTeam;