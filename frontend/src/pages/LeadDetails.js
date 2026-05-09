import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

function LeadDetails() {

    const { id } = useParams();

    const [lead, setLead] = useState({});

    const [notes, setNotes] = useState([]);

    const [noteContent, setNoteContent] = useState("");

    const fetchLead = useCallback(async () => {

        try {

            const response = await API.get(`/leads/${id}`);

            setLead(response.data);

        } catch (error) {

            console.log(error);

        }

    }, [id]);

    const fetchNotes = useCallback(async () => {

        try {

            const response = await API.get(`/notes/${id}`);

            setNotes(response.data);

        } catch (error) {

            console.log(error);

        }

    }, [id]);

    useEffect(() => {

        fetchLead();

        fetchNotes();

    }, [fetchLead, fetchNotes]);

    const addNote = async () => {

        if (!noteContent) return;

        try {

            await API.post(`/notes/${id}`, {
                note_content: noteContent,
                created_by: "Admin"
            });

            setNoteContent("");

            fetchNotes();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container">

                <h1>Lead Details</h1>

                <div className="details-card">

                    <p><strong>Name:</strong> {lead.lead_name}</p>

                    <p><strong>Company:</strong> {lead.company_name}</p>

                    <p><strong>Email:</strong> {lead.email}</p>

                    <p><strong>Phone:</strong> {lead.phone}</p>

                    <p><strong>Status:</strong> {lead.status}</p>

                    <p><strong>Deal Value:</strong> ${lead.estimated_deal_value}</p>

                </div>

                <div className="notes-section">

                    <h2>Notes</h2>

                    <textarea
                        placeholder="Add note..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />

                    <button onClick={addNote}>
                        Add Note
                    </button>

                    <div className="notes-list">

                        {notes.map((note) => (

                            <div key={note.id} className="note-card">

                                <p>{note.note_content}</p>

                                <small>
                                    By {note.created_by}
                                </small>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LeadDetails;