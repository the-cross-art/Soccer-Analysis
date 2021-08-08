import React, { useEffect, useState } from 'react';
import { PlayerCard, UserNav } from '../../../components';
import { getPlayers } from '../../../api/player';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyPlayers = ({ history }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [players, setPlayers] = useState([])
    useEffect(() => {
        loadPlayers(user._id)
    }, [])
    const loadPlayers = (id) => {
        getPlayers(id)
            .then(res => {
                setPlayers(res.data)
            })
            .catch((error) => {
                toast.error(error.response.data);
            });
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <div className="all-players" style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {
                            (players && players.length) ?
                                (players.map(each => (<PlayerCard key={each._id} player={each} history={history} />)))
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPlayers;