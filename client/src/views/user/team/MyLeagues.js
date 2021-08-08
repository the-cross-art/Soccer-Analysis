import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getLeagues } from '../../../api/league';
import { LeaguesCard, UserNav } from '../../../components';

const MyLeagues = ({history}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [leagues, setLeagues] = useState([]);
    useEffect(() => {
        loadLeagues(user._id)
    }, [])
    const loadLeagues = (id) => {
        getLeagues(id)
            .then(res => {
                setLeagues(res.data)
            })
            .catch(err => {
                history.push("/")
                toast.error("Some error in fetching the data");
            })
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col text-center">
                        <h1>Please select the league </h1>
                        <div className="my-leagues" style={{display:'flex', flexWrap:'wrap', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                        {
                            (leagues && leagues.length )?(
                                leagues.map(each => (<LeaguesCard key={each._id} eachLeague={each} history={history}/>))
                            )
                            :''
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLeagues;