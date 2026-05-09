import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {

            const response = await API.get("/dashboard");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container">

                <div className="page-header">

                    <h1>CRM Dashboard</h1>

                    <Link to="/leads">
                        <button>View Leads</button>
                    </Link>

                </div>

                <div className="dashboard-grid">

                    <div className="card">
                        <h3>Total Leads</h3>
                        <p>{stats.total_leads || 0}</p>
                    </div>

                    <div className="card">
                        <h3>New Leads</h3>
                        <p>{stats.new_leads || 0}</p>
                    </div>

                    <div className="card">
                        <h3>Qualified Leads</h3>
                        <p>{stats.qualified_leads || 0}</p>
                    </div>

                    <div className="card">
                        <h3>Won Leads</h3>
                        <p>{stats.won_leads || 0}</p>
                    </div>

                    <div className="card">
                        <h3>Lost Leads</h3>
                        <p>{stats.lost_leads || 0}</p>
                    </div>

                    <div className="card">
                        <h3>Total Deal Value</h3>
                        <p>${stats.total_value || 0}</p>
                    </div>

                    <div className="card">
                        <h3>Won Deal Value</h3>
                        <p>${stats.won_value || 0}</p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;