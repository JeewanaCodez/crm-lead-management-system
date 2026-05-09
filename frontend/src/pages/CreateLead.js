import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

function CreateLead() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        lead_name: "",
        company_name: "",
        email: "",
        phone: "",
        lead_source: "",
        assigned_salesperson: "",
        status: "New",
        estimated_deal_value: ""

    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // VALIDATION
        if (
            !formData.lead_name ||
            !formData.company_name ||
            !formData.email
        ) {

            alert("Please fill required fields");

            return;

        }

        try {

            await API.post("/leads", formData);

            alert("Lead created successfully");

            navigate("/leads");

        } catch (error) {

            console.log(error);

        }

    };

    return (

    <div>

        <Navbar />

        <div className="container">

            <div className="form-page">

                <h1>Create Lead</h1>

                <form onSubmit={handleSubmit} className="lead-form">

                    <input
                        type="text"
                        name="lead_name"
                        placeholder="Lead Name"
                        value={formData.lead_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        value={formData.company_name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="lead_source"
                        placeholder="Lead Source"
                        value={formData.lead_source}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="assigned_salesperson"
                        placeholder="Assigned Salesperson"
                        value={formData.assigned_salesperson}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>

                    <input
                        type="number"
                        name="estimated_deal_value"
                        placeholder="Deal Value"
                        value={formData.estimated_deal_value}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Create Lead
                    </button>

                </form>

            </div>

        </div>

    </div>

);

}

export default CreateLead;