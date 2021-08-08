import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { getLeague } from '../../../api/league';
import { createTeam, getTeams, removeTeam } from '../../../api/team';
import { CreateTeamForm, TeamCard, UserNav } from '../../../components';

const CreateTeam = (p) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { lid } = useParams();
    const initialValues = {
        team_name:'',
        league:lid,
        image:''
    }
    const [loading, setLoading] = useState(false);
    const [league, setleague] = useState('')
    const [teams, setTeams] = useState('')
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        loadDetails()
    }, [])
    const loadteams = (id) => {
        getTeams(id)
        .then(res => {
            setTeams(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }
    const loadDetails = () => {
        setLoading(true)
        getLeague(lid)
            .then(res => {
                setleague(res.data)
                loadteams(lid)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createTeam(user.token, values)
            .then((res) => {
                setLoading(false);
                setValues(initialValues);
                loadDetails()
                toast.success(`"${res.data.team_name}" is created`);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data);
                console.log(err);
            });
    };

    const handleRemove = (id) => {
        if (window.confirm("Delete?")) {
            removeTeam(user.token, id)
                .then(res => {
                    toast.success(`"${res.data.team_name}" is deleted`);
                    loadDetails()
                })
                .catch(err => {
                    toast.error('Some error in del plaease try later');
                })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <div className='loading'>
                        {loading ? (<LoadingOutlined className="text-info h1" />) : ''}
                    </div>
                    <div className="create-team">
                        <div className="create-team-top">
                            <h1>{league.league_name}</h1>
                        </div>
                        <div className="create-team-bottom">
                            <div className='all-teams' style={{ display: 'flex', justifyContent: 'flex-start', margin: '25px 0' }}>
                            {
                                (teams && teams.length) ?
                                    teams.map(each => {
                                        return <TeamCard key={each._id} team={each} handleRemove={handleRemove} />
                                    })
                                    : ''
                            }
                        </div>
                            <div className="create-team-new">
                                <h3>Create new team </h3>
                                <CreateTeamForm handleSubmit={handleSubmit} values={values} setValues={setValues} league={league} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTeam;