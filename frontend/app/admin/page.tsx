"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Layers, 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  UploadCloud, 
  LogOut, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  X
} from "lucide-react";

interface Lead {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  service_interested?: string;
  message: string;
  submitted_at: string;
  status: "new" | "contacted" | "closed";
}

interface Service {
  id?: number;
  title: string;
  category: "Business Consulting" | "Technical Expertise";
  short_desc: string;
  image_url: string;
  details: string;
  display_order: number;
}

interface Project {
  id?: number;
  service_id: number | null;
  service_title?: string | null;
  title: string;
  category_name: string;
  description: string;
  image_url: string;
  project_url: string;
  tag_style: string;
  featured: boolean;
  display_order: number;
}

const API_BASE = "https://acms.harshaicreations.com/api.php";

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Login Form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"leads" | "services" | "projects">("leads");

  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [serviceForm, setServiceForm] = useState<Service>({
    title: "",
    category: "Business Consulting",
    short_desc: "",
    image_url: "",
    details: "",
    display_order: 0
  });
  const [serviceSaving, setServiceSaving] = useState<boolean>(false);
  const [serviceUploading, setServiceUploading] = useState<boolean>(false);

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [projectForm, setProjectForm] = useState<Project>({
    service_id: null,
    title: "",
    category_name: "Consulting Case Studies",
    description: "",
    image_url: "",
    project_url: "",
    tag_style: "bg-accent/20 text-accent border border-accent/30",
    featured: false,
    display_order: 0
  });
  const [projectSaving, setProjectSaving] = useState<boolean>(false);
  const [projectUploading, setProjectUploading] = useState<boolean>(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check saved login session
  useEffect(() => {
    const token = localStorage.getItem("axar_admin_token");
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);
  }, []);

  // Fetch data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const [leadsRes, servicesRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE}?action=get_leads`),
        fetch(`${API_BASE}?action=get_services`),
        fetch(`${API_BASE}?action=get_projects`)
      ]);

      const leadsData = await leadsRes.json();
      const servicesData = await servicesRes.json();
      const projectsData = await projectsRes.json();

      if (leadsData.success) setLeads(leadsData.data || []);
      if (servicesData.success) setServices(servicesData.data || []);
      if (projectsData.success) {
        setProjects(
          (projectsData.data || []).map((p: Project & { featured: number | boolean }) => ({
            ...p,
            featured: Boolean(p.featured)
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      showToast("Failed to fetch latest database data", "error");
    } finally {
      setDataLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("axar_admin_token", data.token);
        setIsLoggedIn(true);
        showToast("Welcome to Axar Admin Dashboard!");
      } else {
        showToast(data.error || "Invalid login credentials", "error");
      }
    } catch (err) {
      showToast("Network error. Could not connect to backend.", "error");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("axar_admin_token");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // -------------------------------------------------------------
  // LEADS ACTIONS
  // -------------------------------------------------------------
  const handleUpdateLeadStatus = async (id: number, status: "new" | "contacted" | "closed") => {
    try {
      const res = await fetch(`${API_BASE}?action=update_lead_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
        showToast("Lead status updated");
      } else {
        showToast(data.error || "Failed to update status", "error");
      }
    } catch (err) {
      showToast("Network error while updating status", "error");
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter(l => l.id !== id));
        showToast("Lead deleted successfully");
      } else {
        showToast(data.error || "Failed to delete lead", "error");
      }
    } catch (err) {
      showToast("Network error while deleting lead", "error");
    }
  };

  // -------------------------------------------------------------
  // CLOUDINARY UPLOAD HANDLER
  // -------------------------------------------------------------
  const handleImageUpload = async (
    file: File, 
    onSuccess: (url: string) => void, 
    setUploading: (val: boolean) => void
  ) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}?action=upload_image`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        onSuccess(data.url);
        showToast("Image uploaded to Cloudinary!");
      } else {
        showToast(data.error || "Image upload failed", "error");
      }
    } catch (err) {
      showToast("Network error uploading image", "error");
    } finally {
      setUploading(false);
    }
  };

  // -------------------------------------------------------------
  // SERVICES ACTIONS
  // -------------------------------------------------------------
  const handleSaveService = async (e: FormEvent) => {
    e.preventDefault();
    setServiceSaving(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(serviceForm.id ? "Service updated!" : "Service created!");
        setIsServiceModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save service", "error");
      }
    } catch (err) {
      showToast("Network error saving service", "error");
    } finally {
      setServiceSaving(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service? Linked projects will become general.")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Service deleted");
        fetchAllData();
      } else {
        showToast(data.error || "Failed to delete service", "error");
      }
    } catch (err) {
      showToast("Network error deleting service", "error");
    }
  };

  // -------------------------------------------------------------
  // PROJECTS ACTIONS
  // -------------------------------------------------------------
  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    setProjectSaving(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(projectForm.id ? "Project updated!" : "Project created!");
        setIsProjectModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save project", "error");
      }
    } catch (err) {
      showToast("Network error saving project", "error");
    } finally {
      setProjectSaving(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Project deleted");
        fetchAllData();
      } else {
        showToast(data.error || "Failed to delete project", "error");
      }
    } catch (err) {
      showToast("Network error deleting project", "error");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded-lg shadow-xl text-sm font-medium ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
            {toast.message}
          </div>
        )}

        <div className="bg-[#111622] border border-gray-800 p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-full max-w-md relative z-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center justify-center mb-4 bg-white/95 px-5 py-3 rounded-2xl shadow-md">
              <Image
                src="/logo.png"
                alt="Axar Logo"
                width={48}
                height={48}
                className="object-contain h-10 w-auto"
                priority
              />
              <Image
                src="/logotext.png"
                alt="Axar Creative Management Solutions"
                width={160}
                height={40}
                className="object-contain h-7 w-auto -ml-1"
                priority
              />
            </div>
            <div className="inline-block px-3 py-1 bg-red-950/80 text-red-400 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-red-800/40">
              Admin Portal
            </div>
            <p className="text-gray-400 text-xs mt-1">Sign in to manage services, portfolio & leads</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-[#182030] border border-gray-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#182030] border border-gray-700/80 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary hover:bg-red-700 text-white font-heading font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center text-sm disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded-lg shadow-2xl text-sm font-medium backdrop-blur-md ${toast.type === 'success' ? 'bg-green-600/90 text-white border border-green-500' : 'bg-red-600/90 text-white border border-red-500'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> : <AlertCircle className="w-4 h-4 mr-2 shrink-0" />}
          {toast.message}
        </div>
      )}

      {/* Top Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 shadow-xl">
        <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
              <h1 className="text-xl font-heading font-bold tracking-wider text-white">
                AXAR <span className="text-primary font-normal">ADMIN</span>
              </h1>
            </div>

            {/* Tabs */}
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors ${
                  activeTab === "leads" 
                    ? "bg-primary text-white shadow-md shadow-primary/30" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors ${
                  activeTab === "services" 
                    ? "bg-primary text-white shadow-md shadow-primary/30" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Layers className="w-4 h-4 mr-2" />
                Manage Services ({services.length})
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-colors ${
                  activeTab === "projects" 
                    ? "bg-primary text-white shadow-md shadow-primary/30" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Manage Projects ({projects.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3.5 py-2 rounded-lg transition-colors inline-flex items-center border border-gray-700"
            >
              View Site <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-800/50 px-3.5 py-2 rounded-lg transition-colors flex items-center"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {dataLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
            <span className="text-gray-400 text-sm">Syncing with database...</span>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 1: LEADS VIEW */}
        {/* ----------------------------------------------------------- */}
        {!dataLoading && activeTab === "leads" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Contact Submissions</h2>
                <p className="text-gray-400 text-sm mt-0.5">Manage and track client inquiries submitted via contact forms.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg text-sm">
                <span className="text-gray-400">Total Leads:</span> <span className="font-bold text-white ml-1">{leads.length}</span>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-800/60 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">Date</th>
                      <th className="p-4 font-semibold">Contact Details</th>
                      <th className="p-4 font-semibold">Service</th>
                      <th className="p-4 font-semibold">Message</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-gray-500">No contact submissions found yet.</td>
                      </tr>
                    ) : (
                      leads.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 whitespace-nowrap text-gray-400 align-top">
                            <div className="font-medium text-gray-300">{new Date(sub.submitted_at).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{new Date(sub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                          <td className="p-4 align-top">
                            <div className="font-bold text-white">{sub.full_name}</div>
                            <div className="text-xs text-gray-400 mt-0.5"><a href={`mailto:${sub.email}`} className="hover:text-primary underline">{sub.email}</a></div>
                            {sub.phone && <div className="text-xs text-gray-400 mt-0.5"><a href={`tel:${sub.phone}`} className="hover:text-primary">{sub.phone}</a></div>}
                            {sub.company_name && (
                              <span className="inline-block mt-1.5 px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                                {sub.company_name}
                              </span>
                            )}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            <span className="inline-block bg-red-950/60 text-red-300 border border-red-800/40 px-2.5 py-1 rounded-full text-xs font-semibold">
                              {sub.service_interested || "General"}
                            </span>
                          </td>
                          <td className="p-4 align-top max-w-sm">
                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-xs">{sub.message}</p>
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            <select
                              value={sub.status}
                              onChange={(e) => handleUpdateLeadStatus(sub.id, e.target.value as "new" | "contacted" | "closed")}
                              className={`text-xs font-bold rounded-full px-3 py-1 border outline-none cursor-pointer bg-gray-900 ${
                                sub.status === 'new' 
                                  ? 'text-blue-400 border-blue-500/40 bg-blue-950/30' 
                                  : sub.status === 'contacted' 
                                  ? 'text-yellow-400 border-yellow-500/40 bg-yellow-950/30' 
                                  : 'text-green-400 border-green-500/40 bg-green-950/30'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4 align-top text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteLead(sub.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 2: MANAGE SERVICES VIEW */}
        {/* ----------------------------------------------------------- */}
        {!dataLoading && activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Manage Services</h2>
                <p className="text-gray-400 text-sm mt-0.5">Add, update, or remove consulting and technical services.</p>
              </div>
              <button
                onClick={() => {
                  setServiceForm({
                    title: "",
                    category: "Business Consulting",
                    short_desc: "",
                    image_url: "",
                    details: "",
                    display_order: services.length + 1
                  });
                  setIsServiceModalOpen(true);
                }}
                className="bg-primary hover:bg-red-700 text-white font-heading font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-primary/20 flex items-center text-sm transition-all"
              >
                <Plus className="w-4 h-4 mr-1.5" /> + Add New Service
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-800/60 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">Order</th>
                      <th className="p-4 font-semibold">Service Details</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Short Description</th>
                      <th className="p-4 font-semibold">Image</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-gray-500">No services found. Click &quot;+ Add New Service&quot; to create one.</td>
                      </tr>
                    ) : (
                      services.map((srv) => (
                        <tr key={srv.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 font-mono text-xs text-gray-500 align-top">#{srv.display_order}</td>
                          <td className="p-4 align-top">
                            <div className="font-bold text-white text-base">{srv.title}</div>
                            {srv.details && (
                              <div className="text-xs text-gray-400 mt-1 line-clamp-2 max-w-xs whitespace-pre-wrap">
                                {srv.details}
                              </div>
                            )}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                              srv.category === 'Business Consulting'
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                                : 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                            }`}>
                              {srv.category}
                            </span>
                          </td>
                          <td className="p-4 align-top text-gray-300 max-w-sm text-xs leading-relaxed">
                            {srv.short_desc}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            {srv.image_url ? (
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-700">
                                <Image src={srv.image_url} alt={srv.title} fill className="object-cover" />
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">Default</span>
                            )}
                          </td>
                          <td className="p-4 align-top text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setServiceForm(srv);
                                setIsServiceModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-300 p-1.5 mr-2 transition-colors inline-block"
                              title="Edit Service"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => srv.id && handleDeleteService(srv.id)}
                              className="text-gray-500 hover:text-red-400 p-1.5 transition-colors inline-block"
                              title="Delete Service"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 3: MANAGE PROJECTS VIEW */}
        {/* ----------------------------------------------------------- */}
        {!dataLoading && activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Manage Projects (Portfolio)</h2>
                <p className="text-gray-400 text-sm mt-0.5">Showcase client case studies, videos, and websites linked to your services.</p>
              </div>
              <button
                onClick={() => {
                  setProjectForm({
                    service_id: services.length > 0 ? (services[0].id || null) : null,
                    title: "",
                    category_name: "Consulting Case Studies",
                    description: "",
                    image_url: "",
                    project_url: "",
                    tag_style: "bg-accent/20 text-accent border border-accent/30",
                    featured: false,
                    display_order: projects.length + 1
                  });
                  setIsProjectModalOpen(true);
                }}
                className="bg-primary hover:bg-red-700 text-white font-heading font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-primary/20 flex items-center text-sm transition-all"
              >
                <Plus className="w-4 h-4 mr-1.5" /> + Add New Project
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-800/60 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">Order</th>
                      <th className="p-4 font-semibold">Project Title</th>
                      <th className="p-4 font-semibold">Linked Service</th>
                      <th className="p-4 font-semibold">Category Tag</th>
                      <th className="p-4 font-semibold">Description</th>
                      <th className="p-4 font-semibold">Image</th>
                      <th className="p-4 font-semibold">Featured</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-12 text-center text-gray-500">No projects found. Click &quot;+ Add New Project&quot; to create one.</td>
                      </tr>
                    ) : (
                      projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="p-4 font-mono text-xs text-gray-500 align-top">#{proj.display_order}</td>
                          <td className="p-4 align-top">
                            <div className="font-bold text-white text-base">{proj.title}</div>
                            {proj.project_url && (
                              <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline mt-0.5 inline-flex items-center">
                                Live Link <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            {proj.service_title ? (
                              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/60 text-red-300 border border-red-800/40">
                                {proj.service_title}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-500 italic">None (General)</span>
                            )}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                              {proj.category_name}
                            </span>
                          </td>
                          <td className="p-4 align-top text-gray-300 max-w-sm text-xs leading-relaxed">
                            {proj.description}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            {proj.image_url ? (
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-700">
                                <Image src={proj.image_url} alt={proj.title} fill className="object-cover" />
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">Default</span>
                            )}
                          </td>
                          <td className="p-4 align-top whitespace-nowrap">
                            {proj.featured ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-950 text-green-400 border border-green-800/50">
                                ★ Home
                              </span>
                            ) : (
                              <span className="text-gray-500 text-xs">-</span>
                            )}
                          </td>
                          <td className="p-4 align-top text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setProjectForm(proj);
                                setIsProjectModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-300 p-1.5 mr-2 transition-colors inline-block"
                              title="Edit Project"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => proj.id && handleDeleteProject(proj.id)}
                              className="text-gray-500 hover:text-red-400 p-1.5 transition-colors inline-block"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ----------------------------------------------------------- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gray-800/80 px-6 py-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-lg font-heading font-bold text-white">
                {serviceForm.id ? "Edit Service" : "Add New Service"}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. ISO Management Systems"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as "Business Consulting" | "Technical Expertise" })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="Technical Expertise">Technical Expertise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={serviceForm.display_order}
                    onChange={(e) => setServiceForm({ ...serviceForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.short_desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, short_desc: e.target.value })}
                  placeholder="Brief summary of service..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Service Image</label>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs font-semibold text-gray-300 transition-colors">
                    {serviceUploading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-primary" /> : <UploadCloud className="w-4 h-4 mr-1.5 text-accent" />}
                    {serviceUploading ? "Uploading to Cloudinary..." : "Upload File (Cloudinary)"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], (url) => setServiceForm({ ...serviceForm, image_url: url }), setServiceUploading);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={serviceForm.image_url}
                    onChange={(e) => setServiceForm({ ...serviceForm, image_url: e.target.value })}
                    placeholder="Or enter image URL directly..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  {serviceForm.image_url && (
                    <div className="relative w-9 h-9 rounded overflow-hidden border border-gray-700 shrink-0">
                      <Image src={serviceForm.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Detailed Highlights (1 per line)</label>
                <textarea
                  rows={3}
                  value={serviceForm.details}
                  onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={serviceSaving || serviceUploading}
                  className="px-5 py-2 text-sm bg-primary hover:bg-red-700 text-white rounded-lg font-bold shadow-lg shadow-primary/30 flex items-center disabled:opacity-50"
                >
                  {serviceSaving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT PROJECT (With Service Dropdown) */}
      {/* ----------------------------------------------------------- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-gray-800/80 px-6 py-4 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-lg font-heading font-bold text-white">
                {projectForm.id ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4">
              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Belongs to Service (Dropdown) *
                </label>
                <select
                  value={projectForm.service_id ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, service_id: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                >
                  <option value="">-- General / No Service Linked --</option>
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} ({srv.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Global Supply Chain Overhaul"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Category Filter Tag *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.category_name}
                    onChange={(e) => setProjectForm({ ...projectForm, category_name: e.target.value })}
                    placeholder="e.g. Consulting Case Studies"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={projectForm.display_order}
                    onChange={(e) => setProjectForm({ ...projectForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Project Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Outcome, metrics and impact of this project..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Project Image</label>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs font-semibold text-gray-300 transition-colors">
                    {projectUploading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-primary" /> : <UploadCloud className="w-4 h-4 mr-1.5 text-accent" />}
                    {projectUploading ? "Uploading to Cloudinary..." : "Upload File (Cloudinary)"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], (url) => setProjectForm({ ...projectForm, image_url: url }), setProjectUploading);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    placeholder="Or enter image URL directly..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  {projectForm.image_url && (
                    <div className="relative w-9 h-9 rounded overflow-hidden border border-gray-700 shrink-0">
                      <Image src={projectForm.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Project Live URL</label>
                <input
                  type="text"
                  value={projectForm.project_url}
                  onChange={(e) => setProjectForm({ ...projectForm, project_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="project_featured_chk"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-gray-700 bg-gray-800 focus:ring-primary"
                />
                <label htmlFor="project_featured_chk" className="text-sm text-gray-300 font-semibold cursor-pointer">
                  Feature on Homepage (Preview Carousel / Grid)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={projectSaving || projectUploading}
                  className="px-5 py-2 text-sm bg-primary hover:bg-red-700 text-white rounded-lg font-bold shadow-lg shadow-primary/30 flex items-center disabled:opacity-50"
                >
                  {projectSaving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
