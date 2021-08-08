import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLeague, getLeagues } from '../../../api/league';
import { createPlayer } from '../../../api/player';
import { getTeam, getTeams } from '../../../api/team';
import { UserNav, CreatePlayerForm } from '../../../components';

const CreatePlayer = ({ history }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const initialValues = {
        user: user._id,
        name: '',
        image: 'https://static.turbosquid.com/Preview/2016/07/07__07_23_35/3.jpg0B912EB0-D087-4ECB-8DAC-F8D7613B7D19Original.jpg',
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
    const [leagues, setLeagues] = useState([]);
    const [league, setLeague] = useState('');
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    useEffect(() => {
        loadLeagues(user._id)
    }, [])

    const loadLeagues = (id) => {
        setLoading(true)
        getLeagues(id)
            .then(res => {
                setLoading(false)
                setLeagues(res.data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.response.data)
            })
    }

    const loadTeams = (id) => {
        setLoading(true)
        getTeams(id)
            .then(res => {
                setLoading(false)
                setTeams(res.data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.response.data)
            })
    }

    const handleLeagueChange = e => {
        e.preventDefault();
        setChange(true)
        if (e.target.value != 'Select League') {
            getLeague(e.target.value)
                .then(res => {
                    setValues({
                        ...values, leagues_teams: [{
                            league: {
                                l_id: e.target.value,
                                l_name: res.data.league_name
                            }, team: {
                                t_id: '',
                                t_name: ''
                            }
                        }]
                    })
                    setLeague({
                        l_id: e.target.value,
                        l_name: res.data.league_name
                    })
                    setChange(false)
                })
                .catch(err => {
                    setChange(false)
                    console.log(err)
                })
            loadTeams(e.target.value)
        }
        else if (e.target.value == 'Select League') {
            setValues({ ...values, leagues_teams: [{ league: { l_id: '', l_name: '' }, team: { t_id: '', t_name: '' } }] })
            setTeams([])
            setChange(false)
        }
    }
    const handleTeamChange = e => {
        e.preventDefault();
        setChange(true)
        if (e.target.value != 'Select Team') {
            getTeam(e.target.value)
                .then(res => {
                    setValues({ ...values, leagues_teams: [{ league: league, team: { t_id: e.target.value, t_name: res.data.team_name } }] })
                    setChange(false)
                })
                .catch(err => {
                    setChange(false)
                    console.log(err)
                })
        }
        else if (e.target.value == 'Select Team') {
            setValues({ ...values, leagues_teams: [{ league: league, team: { t_id: '', t_name: '' } }] })
            setChange(false)
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const setGender = e => {
        setValues({ ...values, gender: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.leagues_teams[0].league.l_id.trim() && values.leagues_teams[0].team.t_id.trim()) {
            createPlayer(user.token, values)
                .then((res) => {
                    toast.success(`"${res.data.name}" is created`);
                    history.push("/user/players");
                })
                .catch((error) => {
                    toast.error(error.response.data);
                    console.log(error.response);
                });
        }
        else
            toast.error('please fill the form');

    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <div className="head container">
                        <h4 style={{ textTransform: 'uppercase', textAlign: 'center', padding: 20, margin: 0 }}>Create New Player</h4>
                    </div>
                    <CreatePlayerForm
                        values={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setGender={setGender}
                        handleLeagueChange={handleLeagueChange}
                        handleTeamChange={handleTeamChange}
                        leagues={leagues}
                        teams={teams}
                        change={change}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePlayer;