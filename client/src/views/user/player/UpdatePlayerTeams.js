import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { getPlayer, updatePlayerTeam } from '../../../api/player';
import { DynamicSelect, UserNav, PlayerDetailsCard } from '../../../components';

const UpdatePlayerTeams = ({ history }) => {
    const initialVal = {
        league: {
            l_id: '',
            l_name: ''
        },
        team: {
            t_id: '',
            t_name: ''
        }
    }
    const { id } = useParams();
    const { user } = useSelector((state) => ({ ...state }));
    const [player, setPlayer] = useState('')
    const [newVal, setNewVal] = useState(initialVal)
    const [oldwVal, setOldVal] = useState([])

    useEffect(() => {
        loadPlayer(id)
    }, [])

    const loadPlayer = id => {
        getPlayer(id)
            .then(res => {
                setOldVal(res.data.leagues_teams)
                setPlayer(res.data)
            })
            .catch((error) => {
                toast.error(error.response.data);
                console.log(error);
            });
    }
    const handleAdd = (e) => {
        e.preventDefault();
        if (newVal.league.l_id && newVal.team.t_id) {
            updatePlayerTeam(user.token, id, newVal)
                .then(res => {
                    loadPlayer(id)
                    toast.success(`${res.data.name} updated`);
                })
                .catch((error) => {
                    toast.error(error.response.data);
                    console.log(error);
                });
        } else {
            toast.error("please select 1st");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-4">
                    {(oldwVal.length) ? (<PlayerDetailsCard player={player} oldwVal={oldwVal} history={history} user={user} />) : ''}
                </div>
                <div className="col-md-6">
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }} onSubmit={handleAdd}>
                        {(oldwVal.length) ? (<DynamicSelect newVal={newVal} setNewVal={setNewVal} initialVal={initialVal} oldwVal={oldwVal} />) : ''}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePlayerTeams;