import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export const getLeads = () => API.get("/leads");

export const createLead = (lead) => API.post("/leads", lead);

export const deleteLead = (id) => API.delete(`/leads/${id}`);

export const updateLead = (id, data) => API.put(`/leads/${id}`, data);

export const updateLeadStatus = (id, status) =>
    API.put(`/leads/${id}`, { status });

export const addNote = (id, note) => API.post(`/leads/${id}/notes`, { note });