"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard,
  Users, 
  Layers, 
  Briefcase, 
  Factory,
  GraduationCap,
  FileText,
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
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Download,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Check
} from "lucide-react";

// ==========================================
// DATA INTERFACES
// ==========================================

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
  category: string;
  short_desc: string;
  image_url: string;
  details: string;
  display_order: number;
}

interface Industry {
  id?: number;
  title: string;
  category: string;
  scope: string;
  description: string;
  key_services: string;
  image_url: string;
  display_order: number;
}

interface TrainingProgram {
  id?: number;
  title: string;
  badge: string;
  target_audience: string;
  description: string;
  topics: string;
  duration: string;
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

interface ResourceItem {
  id?: number;
  title: string;
  category: string;
  description: string;
  tags: string;
  file_format: string;
  file_size: string;
  file_url: string;
  display_order: number;
}

const API_BASE = "https://acms.harshaicreations.com/api.php";

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Login Form
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "services" | "industries" | "training" | "projects" | "resources">("dashboard");

  // Data States
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [leadFilter, setLeadFilter] = useState<string>("all");

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Active Lead Details Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Modals & Forms State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [serviceForm, setServiceForm] = useState<Service>({
    title: "",
    category: "Industrial Consultancy",
    short_desc: "",
    image_url: "",
    details: "",
    display_order: 0
  });

  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState<boolean>(false);
  const [industryForm, setIndustryForm] = useState<Industry>({
    title: "",
    category: "Heavy & Engineering",
    scope: "",
    description: "",
    key_services: "",
    image_url: "",
    display_order: 0
  });

  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState<boolean>(false);
  const [trainingForm, setTrainingForm] = useState<TrainingProgram>({
    title: "",
    badge: "Auditor Certification",
    target_audience: "",
    description: "",
    topics: "",
    duration: "2-5 Days",
    display_order: 0
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [projectForm, setProjectForm] = useState<Project>({
    service_id: null,
    title: "",
    category_name: "ISO & IMS Consultancy",
    description: "",
    image_url: "",
    project_url: "",
    tag_style: "bg-accent/20 text-accent border border-accent/30",
    featured: false,
    display_order: 0
  });

  const [isResourceModalOpen, setIsResourceModalOpen] = useState<boolean>(false);
  const [resourceForm, setResourceForm] = useState<ResourceItem>({
    title: "",
    category: "QMS & Compliance",
    description: "",
    tags: "",
    file_format: "PDF Document",
    file_size: "1.5 MB",
    file_url: "",
    display_order: 0
  });

  const [savingEntity, setSavingEntity] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check Auth
  useEffect(() => {
    const token = localStorage.getItem("axar_admin_token");
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);
  }, []);

  // Fetch all data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllData();
    }
  }, [isLoggedIn]);

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const [leadsRes, servicesRes, industriesRes, trainingRes, projectsRes, resourcesRes] = await Promise.all([
        fetch(`${API_BASE}?action=get_leads`),
        fetch(`${API_BASE}?action=get_services`),
        fetch(`${API_BASE}?action=get_industries`),
        fetch(`${API_BASE}?action=get_training_programs`),
        fetch(`${API_BASE}?action=get_projects`),
        fetch(`${API_BASE}?action=get_resources`)
      ]);

      if (leadsRes.ok) {
        const d = await leadsRes.json();
        if (d.success && Array.isArray(d.data)) setLeads(d.data);
      }
      if (servicesRes.ok) {
        const d = await servicesRes.json();
        if (d.success && Array.isArray(d.data)) setServices(d.data);
      }
      if (industriesRes.ok) {
        const d = await industriesRes.json();
        if (d.success && Array.isArray(d.data)) setIndustries(d.data);
      }
      if (trainingRes.ok) {
        const d = await trainingRes.json();
        if (d.success && Array.isArray(d.data)) setTrainingPrograms(d.data);
      }
      if (projectsRes.ok) {
        const d = await projectsRes.json();
        if (d.success && Array.isArray(d.data)) setProjects(d.data);
      }
      if (resourcesRes.ok) {
        const d = await resourcesRes.json();
        if (d.success && Array.isArray(d.data)) setResources(d.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Login Handler
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
        showToast("Welcome back! Login successful.");
      } else {
        showToast(data.error || "Invalid username or password.", "error");
      }
    } catch (err) {
      showToast("Unable to reach authentication server.", "error");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("axar_admin_token");
    setIsLoggedIn(false);
    showToast("Signed out successfully.");
  };

  // Image Upload to Cloudinary
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, targetForm: "service" | "industry" | "project" | "resource") => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);
    try {
      const res = await fetch(`${API_BASE}?action=upload_image`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (targetForm === "service") setServiceForm(prev => ({ ...prev, image_url: data.url }));
        if (targetForm === "industry") setIndustryForm(prev => ({ ...prev, image_url: data.url }));
        if (targetForm === "project") setProjectForm(prev => ({ ...prev, image_url: data.url }));
        if (targetForm === "resource") setResourceForm(prev => ({ ...prev, file_url: data.url }));
        showToast("File uploaded successfully to Cloudinary!");
      } else {
        showToast(data.error || "Upload failed.", "error");
      }
    } catch (err) {
      showToast("Error uploading file.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Leads Actions
  const handleLeadStatusChange = async (id: number, status: "new" | "contacted" | "closed") => {
    try {
      const res = await fetch(`${API_BASE}?action=update_lead_status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
        showToast("Lead status updated.");
      }
    } catch (err) {
      showToast("Failed to update status.", "error");
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showToast("Lead removed.");
      }
    } catch (err) {
      showToast("Failed to delete lead.", "error");
    }
  };

  // Service Save & Delete
  const handleSaveService = async (e: FormEvent) => {
    e.preventDefault();
    setSavingEntity(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(serviceForm.id ? "Service updated successfully!" : "Service created successfully!");
        setIsServiceModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save service.", "error");
      }
    } catch (err) {
      showToast("Error saving service.", "error");
    } finally {
      setSavingEntity(false);
    }
  };

  const handleDeleteService = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setServices(prev => prev.filter(s => s.id !== id));
        showToast("Service deleted.");
      }
    } catch (err) {
      showToast("Error deleting service.", "error");
    }
  };

  // Industry Save & Delete
  const handleSaveIndustry = async (e: FormEvent) => {
    e.preventDefault();
    setSavingEntity(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_industry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(industryForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(industryForm.id ? "Industry updated!" : "Industry created!");
        setIsIndustryModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save industry.", "error");
      }
    } catch (err) {
      showToast("Error saving industry.", "error");
    } finally {
      setSavingEntity(false);
    }
  };

  const handleDeleteIndustry = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this industry sector?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_industry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setIndustries(prev => prev.filter(item => item.id !== id));
        showToast("Industry deleted.");
      }
    } catch (err) {
      showToast("Error deleting industry.", "error");
    }
  };

  // Training Program Save & Delete
  const handleSaveTraining = async (e: FormEvent) => {
    e.preventDefault();
    setSavingEntity(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_training_program`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainingForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(trainingForm.id ? "Training program updated!" : "Training program created!");
        setIsTrainingModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save training program.", "error");
      }
    } catch (err) {
      showToast("Error saving training program.", "error");
    } finally {
      setSavingEntity(false);
    }
  };

  const handleDeleteTraining = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this training program?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_training_program`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setTrainingPrograms(prev => prev.filter(item => item.id !== id));
        showToast("Training program deleted.");
      }
    } catch (err) {
      showToast("Error deleting training program.", "error");
    }
  };

  // Project Save & Delete
  const handleSaveProject = async (e: FormEvent) => {
    e.preventDefault();
    setSavingEntity(true);
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
        showToast(data.error || "Failed to save project.", "error");
      }
    } catch (err) {
      showToast("Error saving project.", "error");
    } finally {
      setSavingEntity(false);
    }
  };

  const handleDeleteProject = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.filter(item => item.id !== id));
        showToast("Project deleted.");
      }
    } catch (err) {
      showToast("Error deleting project.", "error");
    }
  };

  // Resource Save & Delete
  const handleSaveResource = async (e: FormEvent) => {
    e.preventDefault();
    setSavingEntity(true);
    try {
      const res = await fetch(`${API_BASE}?action=save_resource`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resourceForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast(resourceForm.id ? "Resource updated!" : "Resource created!");
        setIsResourceModalOpen(false);
        fetchAllData();
      } else {
        showToast(data.error || "Failed to save resource.", "error");
      }
    } catch (err) {
      showToast("Error saving resource.", "error");
    } finally {
      setSavingEntity(false);
    }
  };

  const handleDeleteResource = async (id?: number) => {
    if (!id || !confirm("Are you sure you want to delete this resource item?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete_resource`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setResources(prev => prev.filter(item => item.id !== id));
        showToast("Resource item deleted.");
      }
    } catch (err) {
      showToast("Error deleting resource item.", "error");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#b3282d] mx-auto" />
          <p className="text-xs text-[#64748b]">Verifying corporate credentials...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGIN SCREEN (Clean White Corporate)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#e2e8f0] shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#b3282d] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-[#0f172a]">
              Axar Management Portal
            </h1>
            <p className="text-xs text-[#64748b]">
              Secure administration desk for leads, services, industries, and resources.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3.5 py-2.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                </>
              ) : (
                "Authenticate & Sign In"
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#f1f5f9]">
            <Link href="/" className="text-xs text-[#64748b] hover:text-[#b3282d] transition-colors flex items-center justify-center">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesFilter = leadFilter === "all" || lead.status === leadFilter;
    const matchesSearch = !searchQuery || 
      lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company_name && lead.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.service_interested && lead.service_interested.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // ==========================================
  // ADMIN DASHBOARD SHELL
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg border text-xs flex items-center space-x-2 animate-in slide-in-from-top-2 duration-200 ${
          toast.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Axar Logo" width={40} height={40} className="h-8 w-auto" />
            <span className="font-heading font-extrabold text-sm text-[#0f172a] hidden sm:inline">
              Axar Admin Portal
            </span>
          </Link>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#fef2f2] text-[#b3282d] border border-[#fecaca]">
            Production CMS
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAllData}
            disabled={dataLoading}
            className="p-2 rounded-lg bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-xs font-medium flex items-center"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? "animate-spin text-[#b3282d]" : ""}`} />
          </button>
          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] text-xs font-medium"
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-[#b3282d]" /> Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold flex items-center transition-colors shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-[#e2e8f0] hidden lg:flex flex-col justify-between p-4 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] px-3 mb-2 block">
              Management Modules
            </span>

            {[
              { id: "dashboard", label: "Overview Dashboard", icon: LayoutDashboard },
              { id: "leads", label: `Inquiries & Quotes (${leads.filter(l => l.status === 'new').length} New)`, icon: Users },
              { id: "services", label: `Services (${services.length})`, icon: Layers },
              { id: "industries", label: `Industries We Serve (${industries.length})`, icon: Factory },
              { id: "training", label: `Training Programs (${trainingPrograms.length})`, icon: GraduationCap },
              { id: "projects", label: `Projects / Clients (${projects.length})`, icon: Briefcase },
              { id: "resources", label: `Resources (${resources.length})`, icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-heading font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#fef2f2] text-[#b3282d] border border-[#fecaca] shadow-xs"
                      : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#b3282d]" : "text-[#64748b]"}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-xs text-[#64748b] space-y-1">
            <span className="font-bold text-[#0f172a] block">Axar CMS Engine</span>
            <p className="text-[11px]">Synced with MySQL & Cloudinary CDN</p>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* ========================================================================= */}
          {/* 1. OVERVIEW DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                  Operations & Content Overview
                </h2>
                <p className="text-xs text-[#64748b]">
                  Real-time status of client inquiries, service offerings, industry verticals, and training programs.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "New Leads", count: leads.filter(l => l.status === 'new').length, color: "text-[#b3282d]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]" },
                  { label: "Total Leads", count: leads.length, color: "text-[#0f172a]", bg: "bg-[#f8fafc]", border: "border-[#e2e8f0]" },
                  { label: "Services", count: services.length, color: "text-[#0f172a]", bg: "bg-[#f8fafc]", border: "border-[#e2e8f0]" },
                  { label: "Industries", count: industries.length, color: "text-[#0f172a]", bg: "bg-[#f8fafc]", border: "border-[#e2e8f0]" },
                  { label: "Training", count: trainingPrograms.length, color: "text-[#0f172a]", bg: "bg-[#f8fafc]", border: "border-[#e2e8f0]" },
                  { label: "Resources", count: resources.length, color: "text-[#0f172a]", bg: "bg-[#f8fafc]", border: "border-[#e2e8f0]" },
                ].map((stat, idx) => (
                  <div key={idx} className={`${stat.bg} ${stat.border} border p-4 rounded-xl shadow-xs`}>
                    <span className="text-[11px] font-bold text-[#64748b] block mb-1 uppercase tracking-wider">{stat.label}</span>
                    <span className={`text-2xl font-heading font-extrabold ${stat.color}`}>{stat.count}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent Inquiries */}
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
                    <h3 className="font-heading font-bold text-sm text-[#0f172a] flex items-center">
                      <Users className="w-4 h-4 mr-2 text-[#b3282d]" /> Recent Submissions
                    </h3>
                    <button 
                      onClick={() => setActiveTab("leads")} 
                      className="text-xs font-bold text-[#b3282d] hover:underline"
                    >
                      View All Leads →
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <p className="text-xs text-[#64748b] py-6 text-center">No inquiry records in database yet.</p>
                  ) : (
                    <div className="divide-y divide-[#f1f5f9]">
                      {leads.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#0f172a] block">{lead.full_name}</span>
                            <span className="text-[11px] text-[#64748b]">{lead.company_name || lead.email} • {lead.service_interested || "General"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              lead.status === 'new' ? 'bg-red-50 text-red-700 border border-red-200' :
                              lead.status === 'contacted' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {lead.status}
                            </span>
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1 rounded bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#475569]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-3">
                  <h3 className="font-heading font-bold text-sm text-[#0f172a] border-b border-[#f1f5f9] pb-3">
                    Quick Management
                  </h3>
                  <div className="space-y-2 text-xs">
                    <button
                      onClick={() => { setServiceForm({ title: "", category: "Industrial Consultancy", short_desc: "", image_url: "", details: "", display_order: services.length + 1 }); setIsServiceModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between"
                    >
                      <span>+ Add New Service</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setIndustryForm({ title: "", category: "Heavy & Engineering", scope: "", description: "", key_services: "", image_url: "", display_order: industries.length + 1 }); setIsIndustryModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between"
                    >
                      <span>+ Add Industry Sector</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setTrainingForm({ title: "", badge: "Auditor Certification", target_audience: "", description: "", topics: "", duration: "2-5 Days", display_order: trainingPrograms.length + 1 }); setIsTrainingModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between"
                    >
                      <span>+ Add Training Program</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setResourceForm({ title: "", category: "QMS & Compliance", description: "", tags: "", file_format: "PDF Document", file_size: "1.5 MB", file_url: "", display_order: resources.length + 1 }); setIsResourceModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between"
                    >
                      <span>+ Add Resource Guide</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. LEADS / INQUIRIES & QUOTES */}
          {/* ========================================================================= */}
          {activeTab === "leads" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Contact Submissions & Quote Requests
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage incoming industrial leads, quote requests, and follow-up statuses.
                  </p>
                </div>

                {/* Filter & Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white border border-[#cbd5e1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                  </div>
                  <select
                    value={leadFilter}
                    onChange={(e) => setLeadFilter(e.target.value)}
                    className="bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No matching leads found.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3.5">Client & Company</th>
                        <th className="p-3.5">Service Interested</th>
                        <th className="p-3.5">Contact Details</th>
                        <th className="p-3.5">Submitted</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-[#0f172a] block">{lead.full_name}</span>
                            <span className="text-[#64748b] text-[11px]">{lead.company_name || "Direct Individual"}</span>
                          </td>
                          <td className="p-3.5 max-w-[200px]">
                            <span className="font-medium text-[#334155] line-clamp-1">{lead.service_interested || "General Inquiry"}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-[#0f172a] block font-mono text-[11px]">{lead.phone || "—"}</span>
                            <span className="text-[#64748b] text-[11px]">{lead.email}</span>
                          </td>
                          <td className="p-3.5 text-[#64748b] text-[11px] whitespace-nowrap">
                            {new Date(lead.submitted_at).toLocaleDateString()}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as any)}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase border cursor-pointer ${
                                lead.status === 'new' ? 'bg-red-50 text-red-700 border-red-200' :
                                lead.status === 'contacted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569]"
                              title="View Full Scope Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-red-700"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SERVICES MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Services (7 Official Industrial Pillars)
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage QMS/ISO, laboratory setup, QHSE training, industrial insurance, Six Sigma, and export marketing services.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setServiceForm({ title: "", category: "Industrial Consultancy", short_desc: "", image_url: "", details: "", display_order: services.length + 1 });
                    setIsServiceModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Service
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                          {srv.category}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] font-mono">Order #{srv.display_order}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0f172a]">{srv.title}</h3>
                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">{srv.short_desc}</p>
                    </div>

                    <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#64748b]">ID #{srv.id}</span>
                      <div className="space-x-1.5">
                        <button
                          onClick={() => { setServiceForm(srv); setIsServiceModalOpen(true); }}
                          className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. INDUSTRIES WE SERVE */}
          {/* ========================================================================= */}
          {activeTab === "industries" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Industries We Serve
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage sector verticals (Manufacturing, Chemical, Pharma, Testing Labs, Construction, Oil & Gas, etc.)
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIndustryForm({ title: "", category: "Heavy & Engineering", scope: "", description: "", key_services: "", image_url: "", display_order: industries.length + 1 });
                    setIsIndustryModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Industry Sector
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {industries.map((ind) => (
                  <div key={ind.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                          {ind.category}
                        </span>
                        <span className="text-[10px] text-[#94a3b8] font-mono">Order #{ind.display_order}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0f172a]">{ind.title}</h3>
                      <p className="text-[11px] text-[#b3282d] font-semibold">{ind.scope}</p>
                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">{ind.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#64748b]">ID #{ind.id}</span>
                      <div className="space-x-1.5">
                        <button
                          onClick={() => { setIndustryForm(ind); setIsIndustryModalOpen(true); }}
                          className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteIndustry(ind.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. TRAINING PROGRAMS */}
          {/* ========================================================================= */}
          {activeTab === "training" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Training Programs & Courses
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage Lead Auditor, QHSE, Food Safety, and Lean Six Sigma curriculum and course modules.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTrainingForm({ title: "", badge: "Auditor Certification", target_audience: "", description: "", topics: "", duration: "2-5 Days", display_order: trainingPrograms.length + 1 });
                    setIsTrainingModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Training Program
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {trainingPrograms.map((prog) => (
                  <div key={prog.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                          {prog.badge}
                        </span>
                        <span className="text-[11px] font-bold text-[#64748b] flex items-center">
                          <Calendar className="w-3 h-3 mr-1" /> {prog.duration}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0f172a]">{prog.title}</h3>
                      <p className="text-[11px] text-[#64748b] font-medium">Target: {prog.target_audience}</p>
                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">{prog.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#64748b]">ID #{prog.id}</span>
                      <div className="space-x-1.5">
                        <button
                          onClick={() => { setTrainingForm(prog); setIsTrainingModalOpen(true); }}
                          className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTraining(prog.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. PROJECTS & CLIENTS */}
          {/* ========================================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Projects / Clients Portfolio
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage implementation track record, multi-site certifications, NABL clearances, and plant risk audits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setProjectForm({ service_id: null, title: "", category_name: "ISO & IMS Consultancy", description: "", image_url: "", project_url: "", tag_style: "bg-accent/20 text-accent border border-accent/30", featured: false, display_order: projects.length + 1 });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Project
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                          {proj.category_name}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0f172a]">{proj.title}</h3>
                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#64748b]">ID #{proj.id}</span>
                      <div className="space-x-1.5">
                        <button
                          onClick={() => { setProjectForm(proj); setIsProjectModalOpen(true); }}
                          className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. RESOURCES & DOWNLOADS */}
          {/* ========================================================================= */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Resources & Compliance Documentation
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage implementation checklists, NABL blueprints, HIRA safety scorecards, and toolkits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setResourceForm({ title: "", category: "QMS & Compliance", description: "", tags: "", file_format: "PDF Document", file_size: "1.5 MB", file_url: "", display_order: resources.length + 1 });
                    setIsResourceModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Resource Item
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((res) => (
                  <div key={res.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                          {res.category}
                        </span>
                        <span className="text-[10px] text-[#64748b]">{res.file_format} • {res.file_size}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#0f172a]">{res.title}</h3>
                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">{res.description}</p>
                      <span className="text-[10px] font-mono text-[#64748b] block">{res.tags}</span>
                    </div>

                    <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#64748b]">ID #{res.id}</span>
                      <div className="space-x-1.5">
                        <button
                          onClick={() => { setResourceForm(res); setIsResourceModalOpen(true); }}
                          className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteResource(res.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: LEAD DETAILS */}
      {/* ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-3">
              <div>
                <h3 className="text-base font-heading font-bold text-[#0f172a]">{selectedLead.full_name}</h3>
                <p className="text-xs text-[#64748b]">{selectedLead.company_name || "Direct Individual Inquiry"}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 rounded text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#475569]">
              <div className="grid grid-cols-2 gap-3 bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Corporate Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#b3282d] hover:underline truncate block">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Phone / WhatsApp</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-[#0f172a] hover:underline block">
                    {selectedLead.phone || "—"}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">Service Interested</span>
                <p className="font-bold text-[#0f172a] bg-[#f8fafc] p-2 rounded border border-[#e2e8f0]">
                  {selectedLead.service_interested || "General Industrial Inquiry"}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-1">Scope & Message</span>
                <p className="bg-[#f8fafc] p-3 rounded border border-[#e2e8f0] whitespace-pre-wrap leading-relaxed text-[#334155]">
                  {selectedLead.message}
                </p>
              </div>

              <div className="text-[10px] text-[#94a3b8] flex items-center justify-between pt-1">
                <span>Submitted: {new Date(selectedLead.submitted_at).toLocaleString()}</span>
                <span className="font-mono">IP: {selectedLead.id}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] text-xs font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SERVICE CREATE/EDIT */}
      {/* ========================================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-heading font-bold text-[#0f172a]">
                {serviceForm.id ? "Edit Service" : "Add New Service"}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Service Title *</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  required
                  placeholder="e.g. QMS & ISO Consultancy"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={serviceForm.display_order}
                    onChange={(e) => setServiceForm({ ...serviceForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Short Summary *</label>
                <textarea
                  value={serviceForm.short_desc}
                  onChange={(e) => setServiceForm({ ...serviceForm, short_desc: e.target.value })}
                  required
                  rows={2}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Details / Scope (One per line)</label>
                <textarea
                  value={serviceForm.details}
                  onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                  rows={4}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Image URL or Cloudinary Upload</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={serviceForm.image_url}
                    onChange={(e) => setServiceForm({ ...serviceForm, image_url: e.target.value })}
                    placeholder="/images/example.jpg or https://..."
                    className="flex-1 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                  <label className="px-3 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded-lg font-bold cursor-pointer text-[#475569]">
                    <UploadCloud className="w-4 h-4" />
                    <input type="file" onChange={(e) => handleImageUpload(e, "service")} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg"
                >
                  {savingEntity ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INDUSTRY CREATE/EDIT */}
      {/* ========================================================================= */}
      {isIndustryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-heading font-bold text-[#0f172a]">
                {industryForm.id ? "Edit Industry Sector" : "Add Industry Sector"}
              </h3>
              <button onClick={() => setIsIndustryModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveIndustry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Industry Title *</label>
                <input
                  type="text"
                  value={industryForm.title}
                  onChange={(e) => setIndustryForm({ ...industryForm, title: e.target.value })}
                  required
                  placeholder="e.g. Chemical & Petrochemical"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={industryForm.category}
                    onChange={(e) => setIndustryForm({ ...industryForm, category: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={industryForm.display_order}
                    onChange={(e) => setIndustryForm({ ...industryForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Scope Line *</label>
                <input
                  type="text"
                  value={industryForm.scope}
                  onChange={(e) => setIndustryForm({ ...industryForm, scope: e.target.value })}
                  required
                  placeholder="e.g. Specialty Chemicals, Polymers & Bulk Reagents"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  value={industryForm.description}
                  onChange={(e) => setIndustryForm({ ...industryForm, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Key Services (One per line)</label>
                <textarea
                  value={industryForm.key_services}
                  onChange={(e) => setIndustryForm({ ...industryForm, key_services: e.target.value })}
                  rows={3}
                  placeholder="HIRA & Process Safety Audits&#10;ISO 45001 & ISO 14001 Certification"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsIndustryModalOpen(false)}
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg"
                >
                  {savingEntity ? "Saving..." : "Save Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TRAINING PROGRAM CREATE/EDIT */}
      {/* ========================================================================= */}
      {isTrainingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-heading font-bold text-[#0f172a]">
                {trainingForm.id ? "Edit Training Program" : "Add Training Program"}
              </h3>
              <button onClick={() => setIsTrainingModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTraining} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Program Title *</label>
                <input
                  type="text"
                  value={trainingForm.title}
                  onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                  required
                  placeholder="e.g. Lead Auditor & Internal Auditor Training"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Badge / Tag</label>
                  <input
                    type="text"
                    value={trainingForm.badge}
                    onChange={(e) => setTrainingForm({ ...trainingForm, badge: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Duration</label>
                  <input
                    type="text"
                    value={trainingForm.duration}
                    onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Target Audience *</label>
                <input
                  type="text"
                  value={trainingForm.target_audience}
                  onChange={(e) => setTrainingForm({ ...trainingForm, target_audience: e.target.value })}
                  required
                  placeholder="Plant Managers, EHS Officers, Engineers..."
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  value={trainingForm.description}
                  onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Curriculum Topics (One per line)</label>
                <textarea
                  value={trainingForm.topics}
                  onChange={(e) => setTrainingForm({ ...trainingForm, topics: e.target.value })}
                  rows={4}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsTrainingModalOpen(false)}
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg"
                >
                  {savingEntity ? "Saving..." : "Save Training"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PROJECT CREATE/EDIT */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-heading font-bold text-[#0f172a]">
                {projectForm.id ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  placeholder="e.g. Multi-Site IMS Certification (ISO 9001, 14001, 45001)"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Category Name</label>
                  <input
                    type="text"
                    value={projectForm.category_name}
                    onChange={(e) => setProjectForm({ ...projectForm, category_name: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Display Order</label>
                  <input
                    type="number"
                    value={projectForm.display_order}
                    onChange={(e) => setProjectForm({ ...projectForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Image URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                  <label className="px-3 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded-lg font-bold cursor-pointer text-[#475569]">
                    <UploadCloud className="w-4 h-4" />
                    <input type="file" onChange={(e) => handleImageUpload(e, "project")} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="rounded text-[#b3282d] focus:ring-[#b3282d]"
                />
                <label htmlFor="featured" className="font-bold text-[#0f172a] cursor-pointer">
                  Featured Case Study (Highlight on Homepage)
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg"
                >
                  {savingEntity ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESOURCE CREATE/EDIT */}
      {/* ========================================================================= */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-[#e2e8f0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-heading font-bold text-[#0f172a]">
                {resourceForm.id ? "Edit Resource" : "Add Resource Guide"}
              </h3>
              <button onClick={() => setIsResourceModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Resource Title *</label>
                <input
                  type="text"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  required
                  placeholder="e.g. ISO Management Systems Implementation Checklist"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Category</label>
                  <input
                    type="text"
                    value={resourceForm.category}
                    onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">File Format / Size</label>
                  <input
                    type="text"
                    value={resourceForm.file_size}
                    onChange={(e) => setResourceForm({ ...resourceForm, file_size: e.target.value })}
                    placeholder="e.g. PDF • 1.8 MB"
                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Description *</label>
                <textarea
                  value={resourceForm.description}
                  onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={resourceForm.tags}
                  onChange={(e) => setResourceForm({ ...resourceForm, tags: e.target.value })}
                  placeholder="ISO 9001, ISO 14001, Checklist"
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#475569] uppercase tracking-wider mb-1">Download / File URL</label>
                <input
                  type="text"
                  value={resourceForm.file_url}
                  onChange={(e) => setResourceForm({ ...resourceForm, file_url: e.target.value })}
                  placeholder="https://... or /downloads/..."
                  className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={() => setIsResourceModalOpen(false)}
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg"
                >
                  {savingEntity ? "Saving..." : "Save Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
