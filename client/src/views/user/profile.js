import React from 'react';
import { UserNav } from '../../components';

const profile = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h1>Profile</h1>
                </div>
            </div>
        </div>
    );
};

export default profile;