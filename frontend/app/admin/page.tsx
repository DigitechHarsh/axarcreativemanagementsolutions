"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard,
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
  X,
  Menu,
  Globe,
  RefreshCw,
  ShieldCheck
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

  // Mobile Menu Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Login Form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "services" | "projects">("dashboard");

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
      showToast("Failed to sync database data", "error");
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
        showToast(data.error || "Invalid username or password", "error");
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
    setIsMobileMenuOpen(false);
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
        showToast("Lead status updated successfully");
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
        showToast("Image uploaded to Cloudinary successfully!");
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
    if (!confirm("Are you sure you want to delete this service? Linked projects will become unlinked.")) return;
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

  // Switch tab & auto-close mobile drawer
  const switchTab = (tab: "dashboard" | "leads" | "services" | "projects") => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Stats Breakdown for Dashboard
  const newLeadsCount = leads.filter(l => l.status === "new").length;
  const contactedLeadsCount = leads.filter(l => l.status === "contacted").length;
  const closedLeadsCount = leads.filter(l => l.status === "closed").length;

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN (Brand White Card on Soft Neutral Background)
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center p-4 relative">
        {/* Toast */}
        {toast && (
          <div className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded-xl shadow-2xl text-sm font-medium ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
            {toast.message}
          </div>
        )}

        <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-md relative z-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center justify-center mb-4 p-2">
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
            <div className="inline-block px-3 py-1 bg-red-50 text-primary font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-red-100">
              Admin Portal
            </div>
            <p className="text-gray-500 text-xs mt-1">Sign in to manage services, portfolio & leads</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary hover:bg-red-800 text-white font-heading font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center text-sm disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN ADMIN DASHBOARD (Mobile + Tablet Responsive White Theme)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center px-4 py-3 rounded-xl shadow-2xl text-sm font-medium ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" /> : <AlertCircle className="w-4 h-4 mr-2 shrink-0" />}
          {toast.message}
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MOBILE / TABLET TOP HEADER BAR (< md) */}
      {/* ----------------------------------------------------------- */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Axar Mark"
            width={34}
            height={34}
            className="object-contain h-8 w-auto"
            priority
          />
          <Image
            src="/logotext.png"
            alt="Axar Creative Solutions"
            width={120}
            height={28}
            className="object-contain h-5 w-auto -ml-1"
            priority
          />
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* ----------------------------------------------------------- */}
      {/* VERTICAL SIDEBAR (Desktop Fixed / Mobile Slide-Over Drawer) */}
      {/* ----------------------------------------------------------- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out shadow-xl md:shadow-sm
        md:static md:translate-x-0 md:w-64 lg:w-72 md:sticky md:top-0 md:h-screen md:shrink-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Axar Mark"
              width={38}
              height={38}
              className="object-contain h-9 w-auto"
              priority
            />
            <Image
              src="/logotext.png"
              alt="Axar Creative Solutions"
              width={130}
              height={32}
              className="object-contain h-6 w-auto -ml-1"
              priority
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Menu
          </div>

          {/* 1. Dashboard Tab */}
          <button
            onClick={() => switchTab("dashboard")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-3 shrink-0" />
              <span>Dashboard</span>
            </div>
          </button>

          {/* 2. Leads Tab */}
          <button
            onClick={() => switchTab("leads")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-3 shrink-0" />
              <span>Contact Leads</span>
            </div>
            {leads.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === "leads" ? "bg-white/20 text-white" : "bg-red-50 text-primary border border-red-100"
              }`}>
                {leads.length}
              </span>
            )}
          </button>

          {/* 3. Manage Services Tab */}
          <button
            onClick={() => switchTab("services")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-3 shrink-0" />
              <span>Manage Services</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === "services" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
            }`}>
              {services.length}
            </span>
          </button>

          {/* 4. Manage Projects Tab */}
          <button
            onClick={() => switchTab("projects")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-3 shrink-0" />
              <span>Manage Projects</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeTab === "projects" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
            }`}>
              {projects.length}
            </span>
          </button>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50/60">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 mr-2 text-primary" /> View Live Website <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ----------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4 items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-xl font-heading font-bold text-gray-900 capitalize">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "leads" && "Contact Submissions"}
              {activeTab === "services" && "Services Management"}
              {activeTab === "projects" && "Portfolio & Projects"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Axar Creative Management Solutions Control Panel</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAllData}
              disabled={dataLoading}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin text-primary" : ""}`} />
            </button>
            <div className="hidden sm:flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Live Sync
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          {dataLoading && leads.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-3" />
              <span className="text-gray-500 font-medium">Loading control panel data...</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Total Leads */}
                <div 
                  onClick={() => switchTab("leads")}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Leads</span>
                    <div className="p-2.5 rounded-xl bg-red-50 text-primary group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-bold text-gray-900 mb-1">{leads.length}</div>
                  <div className="flex items-center text-xs">
                    <span className="inline-flex items-center font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mr-2">
                      {newLeadsCount} New
                    </span>
                    <span className="text-gray-500">{contactedLeadsCount} Contacted</span>
                  </div>
                </div>

                {/* 2. Total Services */}
                <div 
                  onClick={() => switchTab("services")}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Services</span>
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-bold text-gray-900 mb-1">{services.length}</div>
                  <div className="text-xs text-gray-500 font-medium">Consulting & Technical divisions</div>
                </div>

                {/* 3. Portfolio Projects */}
                <div 
                  onClick={() => switchTab("projects")}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portfolio Items</span>
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-bold text-gray-900 mb-1">{projects.length}</div>
                  <div className="text-xs text-emerald-600 font-semibold">
                    {projects.filter(p => p.featured).length} Featured on Home
                  </div>
                </div>

                {/* 4. Closed Deals */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resolved Leads</span>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-heading font-bold text-gray-900 mb-1">{closedLeadsCount}</div>
                  <div className="text-xs text-gray-500 font-medium">Successfully processed inquiries</div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-heading font-bold mb-1">Quick Content Actions</h3>
                  <p className="text-gray-300 text-xs">Create new services or portfolio showcases directly from here.</p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
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
                    className="flex-1 sm:flex-initial bg-primary hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Service
                  </button>
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
                    className="flex-1 sm:flex-initial bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Project
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900">Recent Inquiries</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Latest leads submitted from website contact forms.</p>
                  </div>
                  <button
                    onClick={() => switchTab("leads")}
                    className="text-xs font-bold text-primary hover:text-red-700 cursor-pointer"
                  >
                    View All Leads &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Contact</th>
                        <th className="p-4 font-semibold">Service</th>
                        <th className="p-4 font-semibold">Message</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">No recent leads found.</td>
                        </tr>
                      ) : (
                        leads.slice(0, 5).map((sub) => (
                          <tr key={sub.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="p-4 whitespace-nowrap text-gray-500 text-xs align-top">
                              <div className="font-semibold text-gray-700">{new Date(sub.submitted_at).toLocaleDateString()}</div>
                              <div className="text-gray-400">{new Date(sub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </td>
                            <td className="p-4 align-top">
                              <div className="font-bold text-gray-900">{sub.full_name}</div>
                              <div className="text-xs text-gray-500"><a href={`mailto:${sub.email}`} className="hover:text-primary">{sub.email}</a></div>
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <span className="inline-block bg-red-50 text-primary border border-red-100 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                {sub.service_interested || "General"}
                              </span>
                            </td>
                            <td className="p-4 align-top max-w-xs">
                              <p className="text-gray-600 text-xs line-clamp-2">{sub.message}</p>
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <select
                                value={sub.status}
                                onChange={(e) => handleUpdateLeadStatus(sub.id, e.target.value as "new" | "contacted" | "closed")}
                                className={`text-xs font-bold rounded-full px-3 py-1 border outline-none cursor-pointer ${
                                  sub.status === 'new' 
                                    ? 'text-blue-700 border-blue-200 bg-blue-50' 
                                    : sub.status === 'contacted' 
                                    ? 'text-amber-700 border-amber-200 bg-amber-50' 
                                    : 'text-emerald-700 border-emerald-200 bg-emerald-50'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="closed">Closed</option>
                              </select>
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

          {/* ========================================================= */}
          {/* TAB 2: LEADS VIEW */}
          {/* ========================================================= */}
          {activeTab === "leads" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">All Contact Leads ({leads.length})</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Manage and track client inquiries submitted via website forms.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm min-w-[650px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Contact Details</th>
                        <th className="p-4 font-semibold">Service</th>
                        <th className="p-4 font-semibold">Message</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-gray-400">No contact submissions found.</td>
                        </tr>
                      ) : (
                        leads.map((sub) => (
                          <tr key={sub.id} className="hover:bg-gray-50/70 transition-colors">
                            <td className="p-4 whitespace-nowrap text-gray-500 text-xs align-top">
                              <div className="font-bold text-gray-800">{new Date(sub.submitted_at).toLocaleDateString()}</div>
                              <div className="text-gray-400">{new Date(sub.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </td>
                            <td className="p-4 align-top">
                              <div className="font-bold text-gray-900">{sub.full_name}</div>
                              <div className="text-xs text-gray-600 mt-0.5"><a href={`mailto:${sub.email}`} className="hover:text-primary underline">{sub.email}</a></div>
                              {sub.phone && <div className="text-xs text-gray-600 mt-0.5"><a href={`tel:${sub.phone}`} className="hover:text-primary">{sub.phone}</a></div>}
                              {sub.company_name && (
                                <span className="inline-block mt-1.5 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200 font-medium">
                                  {sub.company_name}
                                </span>
                              )}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <span className="inline-block bg-red-50 text-primary border border-red-100 px-2.5 py-1 rounded-full text-xs font-semibold">
                                {sub.service_interested || "General"}
                              </span>
                            </td>
                            <td className="p-4 align-top max-w-sm">
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-xs">{sub.message}</p>
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <select
                                value={sub.status}
                                onChange={(e) => handleUpdateLeadStatus(sub.id, e.target.value as "new" | "contacted" | "closed")}
                                className={`text-xs font-bold rounded-full px-3 py-1 border outline-none cursor-pointer ${
                                  sub.status === 'new' 
                                    ? 'text-blue-700 border-blue-200 bg-blue-50' 
                                    : sub.status === 'contacted' 
                                    ? 'text-amber-700 border-amber-200 bg-amber-50' 
                                    : 'text-emerald-700 border-emerald-200 bg-emerald-50'
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
                                className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded hover:bg-red-50 cursor-pointer"
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

          {/* ========================================================= */}
          {/* TAB 3: MANAGE SERVICES VIEW */}
          {/* ========================================================= */}
          {activeTab === "services" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">Manage Services ({services.length})</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Add, update, or remove business consulting and technical services.</p>
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
                  className="bg-primary hover:bg-red-800 text-white font-heading font-bold px-4 py-2.5 rounded-xl shadow-md shadow-primary/20 flex items-center text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Add New Service
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Order</th>
                        <th className="p-4 font-semibold">Service Details</th>
                        <th className="p-4 font-semibold">Category</th>
                        <th className="p-4 font-semibold">Short Description</th>
                        <th className="p-4 font-semibold">Image</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {services.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-gray-400">No services found. Click &quot;Add New Service&quot; to create one.</td>
                        </tr>
                      ) : (
                        services.map((srv) => (
                          <tr key={srv.id} className="hover:bg-gray-50/70 transition-colors">
                            <td className="p-4 font-mono text-xs text-gray-400 align-top">#{srv.display_order}</td>
                            <td className="p-4 align-top">
                              <div className="font-bold text-gray-900 text-base">{srv.title}</div>
                              {srv.details && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2 max-w-xs whitespace-pre-wrap">
                                  {srv.details}
                                </div>
                              )}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                                srv.category === 'Business Consulting'
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                  : 'bg-purple-50 text-purple-800 border border-purple-200'
                              }`}>
                                {srv.category}
                              </span>
                            </td>
                            <td className="p-4 align-top text-gray-600 max-w-sm text-xs leading-relaxed">
                              {srv.short_desc}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              {srv.image_url ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                  <Image src={srv.image_url} alt={srv.title} fill className="object-cover" />
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">Default</span>
                              )}
                            </td>
                            <td className="p-4 align-top text-right whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setServiceForm(srv);
                                  setIsServiceModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 p-1.5 mr-1 transition-colors inline-block rounded hover:bg-blue-50 cursor-pointer"
                                title="Edit Service"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => srv.id && handleDeleteService(srv.id)}
                                className="text-gray-400 hover:text-red-600 p-1.5 transition-colors inline-block rounded hover:bg-red-50 cursor-pointer"
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

          {/* ========================================================= */}
          {/* TAB 4: MANAGE PROJECTS VIEW */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">Manage Projects (Portfolio) ({projects.length})</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Showcase client case studies, videos, and websites linked to your services.</p>
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
                  className="bg-primary hover:bg-red-800 text-white font-heading font-bold px-4 py-2.5 rounded-xl shadow-md shadow-primary/20 flex items-center text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Add New Project
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm min-w-[750px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
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
                    <tbody className="divide-y divide-gray-100">
                      {projects.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-12 text-center text-gray-400">No projects found. Click &quot;Add New Project&quot; to create one.</td>
                        </tr>
                      ) : (
                        projects.map((proj) => (
                          <tr key={proj.id} className="hover:bg-gray-50/70 transition-colors">
                            <td className="p-4 font-mono text-xs text-gray-400 align-top">#{proj.display_order}</td>
                            <td className="p-4 align-top">
                              <div className="font-bold text-gray-900 text-base">{proj.title}</div>
                              {proj.project_url && (
                                <a href={proj.project_url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline mt-0.5 inline-flex items-center font-medium">
                                  Live Link <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              {proj.service_title ? (
                                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-primary border border-red-100">
                                  {proj.service_title}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400 italic">None (General)</span>
                              )}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                {proj.category_name}
                              </span>
                            </td>
                            <td className="p-4 align-top text-gray-600 max-w-sm text-xs leading-relaxed">
                              {proj.description}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              {proj.image_url ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                  <Image src={proj.image_url} alt={proj.title} fill className="object-cover" />
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">Default</span>
                              )}
                            </td>
                            <td className="p-4 align-top whitespace-nowrap">
                              {proj.featured ? (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  ★ Home
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">-</span>
                              )}
                            </td>
                            <td className="p-4 align-top text-right whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setProjectForm(proj);
                                  setIsProjectModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 p-1.5 mr-1 transition-colors inline-block rounded hover:bg-blue-50 cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => proj.id && handleDeleteProject(proj.id)}
                                className="text-gray-400 hover:text-red-600 p-1.5 transition-colors inline-block rounded hover:bg-red-50 cursor-pointer"
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
      </div>

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ----------------------------------------------------------- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col my-auto">
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 shrink-0">
              <h3 className="text-lg font-heading font-bold text-gray-900">
                {serviceForm.id ? "Edit Service" : "Add New Service"}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. ISO Management Systems"
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as "Business Consulting" | "Technical Expertise" })}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="Technical Expertise">Technical Expertise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={serviceForm.display_order}
                    onChange={(e) => setServiceForm({ ...serviceForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.short_desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, short_desc: e.target.value })}
                  placeholder="Brief summary of service..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Image</label>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="cursor-pointer inline-flex items-center px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-sm">
                    {serviceUploading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-primary" /> : <UploadCloud className="w-4 h-4 mr-1.5 text-primary" />}
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
                    className="flex-1 bg-white border border-gray-300 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:border-primary"
                  />
                  {serviceForm.image_url && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-300 shrink-0">
                      <Image src={serviceForm.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Detailed Highlights (1 per line)</label>
                <textarea
                  rows={3}
                  value={serviceForm.details}
                  onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={serviceSaving || serviceUploading}
                  className="px-5 py-2.5 text-sm bg-primary hover:bg-red-800 text-white rounded-xl font-bold shadow-md shadow-primary/25 flex items-center disabled:opacity-50 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col my-auto">
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 shrink-0">
              <h3 className="text-lg font-heading font-bold text-gray-900">
                {projectForm.id ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Belongs to Service (Dropdown) *
                </label>
                <select
                  value={projectForm.service_id ?? ""}
                  onChange={(e) => setProjectForm({ ...projectForm, service_id: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Global Supply Chain Overhaul"
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category Filter Tag *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.category_name}
                    onChange={(e) => setProjectForm({ ...projectForm, category_name: e.target.value })}
                    placeholder="e.g. Consulting Case Studies"
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={projectForm.display_order}
                    onChange={(e) => setProjectForm({ ...projectForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Outcome, metrics and impact of this project..."
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Image</label>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="cursor-pointer inline-flex items-center px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-sm">
                    {projectUploading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin text-primary" /> : <UploadCloud className="w-4 h-4 mr-1.5 text-primary" />}
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
                    className="flex-1 bg-white border border-gray-300 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:border-primary"
                  />
                  {projectForm.image_url && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-300 shrink-0">
                      <Image src={projectForm.image_url} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Project Live URL</label>
                <input
                  type="text"
                  value={projectForm.project_url}
                  onChange={(e) => setProjectForm({ ...projectForm, project_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="project_featured_chk"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                />
                <label htmlFor="project_featured_chk" className="text-xs text-gray-700 font-bold cursor-pointer">
                  Feature on Homepage (Preview Section)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={projectSaving || projectUploading}
                  className="px-5 py-2.5 text-sm bg-primary hover:bg-red-800 text-white rounded-xl font-bold shadow-md shadow-primary/25 flex items-center disabled:opacity-50 cursor-pointer"
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
