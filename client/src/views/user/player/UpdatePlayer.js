import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { getLeagues } from '../../../api/league';
import { getPlayer, updatePlayer } from '../../../api/player';
import { UpdatePlayerForm, UserNav } from '../../../components';

const UpdatePlayer = ({ history }) => {
    const initialValues = {
        user: '',
        name: '',
        image: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        leagues_teams: [{
            league: {
                l_id: '',
                l_name: ''
            },
            team: {
                t_id: '',
                t_name: ''
            }
        }]
    }
    const [values, setValues] = useState(initialValues);
    // const [leagues, setLeagues] = useState([]);
    // const [league, setLeague] = useState('');
    // const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const { id } = useParams();

    useEffect(() => {
        loadPlayer(id)
    }, [])
    const loadPlayer = (id) => {
        setLoading(true)
        getPlayer(id)
            .then(res => {
                setValues(res.data)
                setLoading(false)
                // loadLeagues(id)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
    }
    // const loadLeagues = (id) => {
    //     getLeagues(id)
    //         .then(res => {
    //             setLeagues(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         })
    // }
    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const setGender = e => {
        setValues({ ...values, gender: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        updatePlayer(user.token,id,values)
        .then(res=>{
            history.push("/user/players");
            toast.success(`${res.data.name} updated`)
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
                <div className="col-md-10">
                    <div className="head container">
                        <h4 style={{ textTransform: 'uppercase', textAlign: 'center', padding: 20, margin: 0 }}>Update Player</h4>
                    </div>
                    <UpdatePlayerForm 
                    handleSubmit={handleSubmit} 
                    values={values} 
                    setValues={setValues}
                    handleChange={handleChange}
                    setGender={setGender}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdatePlayer;