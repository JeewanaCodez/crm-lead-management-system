import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

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

    // ✅ FIX: safe numeric conversion (VERY IMPORTANT)
    const chartData = [
        { name: "New", value: Number(stats.new_leads) || 0 },
        { name: "Qualified", value: Number(stats.qualified_leads) || 0 },
        { name: "Won", value: Number(stats.won_leads) || 0 },
        { name: "Lost", value: Number(stats.lost_leads) || 0 }
    ];

    const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

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

                {/* STATS CARDS */}
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

                </div>

                {/* CHART SECTION */}
                <div className="chart-container">

                    {/* BAR CHART */}
                    <div className="card chart-card">

                        <h3>Leads Overview</h3>

                        <ResponsiveContainer width="100%" height={300}>

                            <BarChart data={chartData}>

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar dataKey="value" fill="#3b82f6" />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    {/* PIE CHART */}
                   
<div className="card chart-card">

    <h3>Lead Distribution</h3>

    <ResponsiveContainer width="100%" height={300}>

        <PieChart>

            <Pie
                data={chartData.filter(item => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={100}
                label
            >

                {chartData.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}

            </Pie>

            <Tooltip />

        </PieChart>

    </ResponsiveContainer>

    {/* LEGEND */}
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "10px"
        }}
    >
        {chartData.map((entry, index) => (
            <div
                key={index}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}
            >
                <div
                    style={{
                        width: "14px",
                        height: "14px",
                        backgroundColor: COLORS[index],
                        borderRadius: "3px"
                    }}
                ></div>

                <span>{entry.name}</span>
            </div>
        ))}
    </div>

</div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;