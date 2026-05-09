import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Leads() {

    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchLeads = useCallback(async () => {

        try {
            setLoading(true);
            setError("");

            let query = "/leads?";

            if (search) {
                query += `search=${search}&`;
            }

            if (status) {
                query += `status=${status}`;
            }

            const response = await API.get(query);

            setLeads(response.data);

        } catch (error) {

            console.log("Error fetching leads:", error);
            setError(error.message || "Failed to fetch leads");

        } finally {
            setLoading(false);
        }

    }, [search, status]);

    useEffect(() => {

        fetchLeads();

    }, [fetchLeads]);



    const deleteLead = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/leads/${id}`);

            fetchLeads();

        } catch (error) {

            console.log(error);

        }

    };



    return (

        <div>

            <Navbar />

            <div className="container">

                <div className="page-header">

                    <h1>Leads</h1>

                    <Link to="/create-lead">
                        <button>Add Lead</button>
                    </Link>

                </div>



                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search by name, company or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option value="">All Status</option>

                        <option value="New">New</option>

                        <option value="Contacted">Contacted</option>

                        <option value="Qualified">Qualified</option>

                        <option value="Proposal Sent">Proposal Sent</option>

                        <option value="Won">Won</option>

                        <option value="Lost">Lost</option>

                    </select>

                </div>

                {error && <div style={{color: 'red', padding: '10px', marginBottom: '10px', border: '1px solid red'}}>{error}</div>}

                {loading && <div style={{padding: '10px'}}>Loading leads...</div>}

                <table>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

    {leads.length === 0 ? (

        <tr>

            <td colSpan="6">
                No leads found
            </td>

        </tr>

    ) : (

        leads.map((lead) => (

            <tr key={lead.id}>

                <td>{lead.lead_name}</td>

                <td>{lead.company_name}</td>

                <td>{lead.email}</td>

                <td>{lead.status}</td>

                <td>${lead.estimated_deal_value}</td>

                <td>

                    <Link to={`/lead/${lead.id}`}>
                        <button>View</button>
                    </Link>

                    <Link to={`/edit-lead/${lead.id}`}>
                        <button>Edit</button>
                    </Link>

                    <button
                        onClick={() => deleteLead(lead.id)}
                    >
                        Delete
                    </button>

                </td>

            </tr>

        ))

    )}

</tbody>

                </table>

            </div>

        </div>

    );

}

export default Leads;