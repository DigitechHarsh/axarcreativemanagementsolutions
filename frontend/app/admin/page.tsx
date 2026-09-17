"use client";

import { useState, useEffect, useMemo, ChangeEvent, FormEvent } from "react";
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
  Globe,
  RefreshCw,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Download,
  Calendar,
  Sparkles
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

  // Filter & Search states per tab
  const [leadSearch, setLeadSearch] = useState<string>("");
  const [leadFilter, setLeadFilter] = useState<string>("all");

  const [serviceSearch, setServiceSearch] = useState<string>("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>("All");

  const [industrySearch, setIndustrySearch] = useState<string>("");
  const [industryCategoryFilter, setIndustryCategoryFilter] = useState<string>("All");

  const [trainingSearch, setTrainingSearch] = useState<string>("");
  const [trainingBadgeFilter, setTrainingBadgeFilter] = useState<string>("All");

  const [projectSearch, setProjectSearch] = useState<string>("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>("All");

  const [resourceSearch, setResourceSearch] = useState<string>("");
  const [resourceCategoryFilter, setResourceCategoryFilter] = useState<string>("All");

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Active Lead / Item Details Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [previewItem, setPreviewItem] = useState<{ title: string; subtitle?: string; data: Record<string, string | number | undefined> } | null>(null);

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

  // Training Save & Delete
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

  // ==========================================
  // DYNAMIC CATEGORIES FOR FILTER TAGS
  // ==========================================
  const serviceCategories = useMemo(() => {
    const list = Array.from(new Set(services.map(s => s.category?.trim()).filter(Boolean)));
    return ["All", ...list];
  }, [services]);

  const industryCategories = useMemo(() => {
    const list = Array.from(new Set(industries.map(i => i.category?.trim()).filter(Boolean)));
    return ["All", ...list];
  }, [industries]);

  const trainingBadges = useMemo(() => {
    const list = Array.from(new Set(trainingPrograms.map(t => t.badge?.trim()).filter(Boolean)));
    return ["All", ...list];
  }, [trainingPrograms]);

  const projectCategories = useMemo(() => {
    const list = Array.from(new Set(projects.map(p => p.category_name?.trim()).filter(Boolean)));
    return ["All", ...list];
  }, [projects]);

  const resourceCategories = useMemo(() => {
    const list = Array.from(new Set(resources.map(r => r.category?.trim()).filter(Boolean)));
    return ["All", ...list];
  }, [resources]);

  // ==========================================
  // FILTERED DATA SETS
  // ==========================================
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesFilter = leadFilter === "all" || lead.status === leadFilter;
      const q = leadSearch.toLowerCase().trim();
      const matchesSearch = !q || 
        lead.full_name?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        (lead.company_name && lead.company_name.toLowerCase().includes(q)) ||
        (lead.service_interested && lead.service_interested.toLowerCase().includes(q)) ||
        (lead.message && lead.message.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [leads, leadFilter, leadSearch]);

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchesCategory = serviceCategoryFilter === "All" || srv.category === serviceCategoryFilter;
      const q = serviceSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        srv.title?.toLowerCase().includes(q) ||
        srv.category?.toLowerCase().includes(q) ||
        srv.short_desc?.toLowerCase().includes(q) ||
        (srv.details && srv.details.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [services, serviceCategoryFilter, serviceSearch]);

  const filteredIndustries = useMemo(() => {
    return industries.filter(ind => {
      const matchesCategory = industryCategoryFilter === "All" || ind.category === industryCategoryFilter;
      const q = industrySearch.toLowerCase().trim();
      const matchesSearch = !q ||
        ind.title?.toLowerCase().includes(q) ||
        ind.category?.toLowerCase().includes(q) ||
        ind.scope?.toLowerCase().includes(q) ||
        ind.description?.toLowerCase().includes(q) ||
        (ind.key_services && ind.key_services.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [industries, industryCategoryFilter, industrySearch]);

  const filteredTrainingPrograms = useMemo(() => {
    return trainingPrograms.filter(prog => {
      const matchesBadge = trainingBadgeFilter === "All" || prog.badge === trainingBadgeFilter;
      const q = trainingSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        prog.title?.toLowerCase().includes(q) ||
        prog.badge?.toLowerCase().includes(q) ||
        prog.target_audience?.toLowerCase().includes(q) ||
        prog.description?.toLowerCase().includes(q) ||
        prog.duration?.toLowerCase().includes(q) ||
        (prog.topics && prog.topics.toLowerCase().includes(q));
      return matchesBadge && matchesSearch;
    });
  }, [trainingPrograms, trainingBadgeFilter, trainingSearch]);

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesCategory = projectCategoryFilter === "All" || proj.category_name === projectCategoryFilter;
      const q = projectSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        proj.title?.toLowerCase().includes(q) ||
        proj.category_name?.toLowerCase().includes(q) ||
        proj.description?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [projects, projectCategoryFilter, projectSearch]);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesCategory = resourceCategoryFilter === "All" || res.category === resourceCategoryFilter;
      const q = resourceSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        res.title?.toLowerCase().includes(q) ||
        res.category?.toLowerCase().includes(q) ||
        res.description?.toLowerCase().includes(q) ||
        res.tags?.toLowerCase().includes(q) ||
        res.file_format?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [resources, resourceCategoryFilter, resourceSearch]);

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
            className="p-2 rounded-lg bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-xs font-medium flex items-center cursor-pointer"
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
            className="px-3 py-1.5 rounded-lg bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold flex items-center transition-colors shadow-xs cursor-pointer"
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
            <p className="text-[11px]">Tabular High-Density View</p>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "New Leads", count: leads.filter(l => l.status === 'new').length, color: "text-[#b3282d]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", tab: "leads" },
                  { label: "Total Leads", count: leads.length, color: "text-[#0f172a]", bg: "bg-white", border: "border-[#e2e8f0]", tab: "leads" },
                  { label: "Services", count: services.length, color: "text-[#0f172a]", bg: "bg-white", border: "border-[#e2e8f0]", tab: "services" },
                  { label: "Industries", count: industries.length, color: "text-[#0f172a]", bg: "bg-white", border: "border-[#e2e8f0]", tab: "industries" },
                  { label: "Training", count: trainingPrograms.length, color: "text-[#0f172a]", bg: "bg-white", border: "border-[#e2e8f0]", tab: "training" },
                  { label: "Resources", count: resources.length, color: "text-[#0f172a]", bg: "bg-white", border: "border-[#e2e8f0]", tab: "resources" },
                ].map((stat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(stat.tab as any)}
                    className={`${stat.bg} ${stat.border} border p-4 rounded-xl shadow-xs text-left hover:border-[#b3282d]/50 transition-all cursor-pointer`}
                  >
                    <span className="text-[11px] font-bold text-[#64748b] block mb-1 uppercase tracking-wider">{stat.label}</span>
                    <span className={`text-2xl font-heading font-extrabold ${stat.color}`}>{stat.count}</span>
                  </button>
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
                      className="text-xs font-bold text-[#b3282d] hover:underline cursor-pointer"
                    >
                      View All Leads →
                    </button>
                  </div>

                  {leads.length === 0 ? (
                    <p className="text-xs text-[#64748b] py-6 text-center">No inquiry records in database yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px]">
                          <tr>
                            <th className="p-2.5">Client & Company</th>
                            <th className="p-2.5">Service Interested</th>
                            <th className="p-2.5">Status</th>
                            <th className="p-2.5 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f1f5f9]">
                          {leads.slice(0, 5).map((lead) => (
                            <tr key={lead.id} className="hover:bg-[#f8fafc] transition-colors">
                              <td className="p-2.5">
                                <span className="font-bold text-[#0f172a] block">{lead.full_name}</span>
                                <span className="text-[11px] text-[#64748b]">{lead.company_name || lead.email}</span>
                              </td>
                              <td className="p-2.5 text-[#475569]">{lead.service_interested || "General"}</td>
                              <td className="p-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  lead.status === 'new' ? 'bg-red-50 text-red-700 border border-red-200' :
                                  lead.status === 'contacted' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="p-2.5 text-right">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-1 rounded bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ Add New Service</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setIndustryForm({ title: "", category: "Heavy & Engineering", scope: "", description: "", key_services: "", image_url: "", display_order: industries.length + 1 }); setIsIndustryModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ Add Industry Sector</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setTrainingForm({ title: "", badge: "Auditor Certification", target_audience: "", description: "", topics: "", duration: "2-5 Days", display_order: trainingPrograms.length + 1 }); setIsTrainingModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ Add Training Program</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setProjectForm({ service_id: null, title: "", category_name: "ISO & IMS Consultancy", description: "", image_url: "", project_url: "", tag_style: "bg-accent/20 text-accent border border-accent/30", featured: false, display_order: projects.length + 1 }); setIsProjectModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>+ Add Project / Case Study</span> <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setResourceForm({ title: "", category: "QMS & Compliance", description: "", tags: "", file_format: "PDF Document", file_size: "1.5 MB", file_url: "", display_order: resources.length + 1 }); setIsResourceModalOpen(true); }}
                      className="w-full py-2 px-3 bg-[#f8fafc] hover:bg-[#b3282d] hover:text-white border border-[#e2e8f0] rounded-lg font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Contact Submissions & Quote Requests ({leads.length})
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage incoming industrial leads, quote requests, and client communications.
                  </p>
                </div>
              </div>

              {/* Search & Dynamic Filter Tags Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search inquiries by name, company, email, service..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {leadSearch && (
                      <button onClick={() => setLeadSearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredLeads.length} of {leads.length}
                    </span>
                    {(leadSearch || leadFilter !== "all") && (
                      <button
                        onClick={() => { setLeadSearch(""); setLeadFilter("all"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Filter Badges */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Status:</span>
                  {[
                    { key: "all", label: "All Leads", count: leads.length },
                    { key: "new", label: "New", count: leads.filter(l => l.status === "new").length },
                    { key: "contacted", label: "Contacted", count: leads.filter(l => l.status === "contacted").length },
                    { key: "closed", label: "Closed", count: leads.filter(l => l.status === "closed").length },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setLeadFilter(tab.key)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                        leadFilter === tab.key
                          ? "bg-[#b3282d] text-white shadow-xs"
                          : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${leadFilter === tab.key ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No matching leads found for current search/filter.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Client & Company</th>
                          <th className="p-3">Service Interested</th>
                          <th className="p-3">Contact Details</th>
                          <th className="p-3">Submitted</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredLeads.map((lead, idx) => (
                          <tr key={lead.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3">
                              <span className="font-bold text-[#0f172a] block">{lead.full_name}</span>
                              <span className="text-[#64748b] text-[11px]">{lead.company_name || "Direct Individual"}</span>
                            </td>
                            <td className="p-3 max-w-[200px]">
                              <span className="font-medium text-[#334155] line-clamp-1">{lead.service_interested || "General Inquiry"}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-[#0f172a] block font-mono text-[11px]">{lead.phone || "—"}</span>
                              <span className="text-[#64748b] text-[11px]">{lead.email}</span>
                            </td>
                            <td className="p-3 text-[#64748b] text-[11px] whitespace-nowrap">
                              {new Date(lead.submitted_at).toLocaleDateString()}
                            </td>
                            <td className="p-3">
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
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 rounded bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] cursor-pointer inline-flex items-center"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 cursor-pointer inline-flex items-center"
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
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SERVICES MANAGEMENT (Tabular Form) */}
          {/* ========================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Services Portfolio ({services.length})
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Manage QMS/ISO, laboratory setup, QHSE training, industrial insurance, Six Sigma, and export marketing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setServiceForm({ title: "", category: "Industrial Consultancy", short_desc: "", image_url: "", details: "", display_order: services.length + 1 });
                    setIsServiceModalOpen(true);
                  }}
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Service
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search services by title, category, scope..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {serviceSearch && (
                      <button onClick={() => setServiceSearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredServices.length} of {services.length}
                    </span>
                    {(serviceSearch || serviceCategoryFilter !== "All") && (
                      <button
                        onClick={() => { setServiceSearch(""); setServiceCategoryFilter("All"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Category Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Category:</span>
                  {serviceCategories.map((cat) => {
                    const count = cat === "All" ? services.length : services.filter(s => s.category?.trim() === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setServiceCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          serviceCategoryFilter === cat
                            ? "bg-[#b3282d] text-white shadow-xs"
                            : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${serviceCategoryFilter === cat ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              {filteredServices.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No services matching your filter criteria.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Service Name</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Summary</th>
                          <th className="p-3 text-center">Order</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredServices.map((srv, idx) => (
                          <tr key={srv.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#0f172a] max-w-[240px]">
                              <span className="block font-bold">{srv.title}</span>
                              {srv.details && (
                                <span className="text-[11px] text-[#64748b]">
                                  {srv.details.split("\n").filter(Boolean).length} scope items
                                </span>
                              )}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                                {srv.category}
                              </span>
                            </td>
                            <td className="p-3 text-[#475569] max-w-md">
                              <p className="line-clamp-2 leading-relaxed text-[11px]">{srv.short_desc}</p>
                            </td>
                            <td className="p-3 text-center text-[#64748b] font-mono text-[11px]">
                              #{srv.display_order}
                            </td>
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => { setServiceForm(srv); setIsServiceModalOpen(true); }}
                                className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a] cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteService(srv.id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700 cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. INDUSTRIES WE SERVE (Tabular Form) */}
          {/* ========================================================================= */}
          {activeTab === "industries" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Industries We Serve ({industries.length})
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
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Industry Sector
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search industries by sector title, category, scope..."
                      value={industrySearch}
                      onChange={(e) => setIndustrySearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {industrySearch && (
                      <button onClick={() => setIndustrySearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredIndustries.length} of {industries.length}
                    </span>
                    {(industrySearch || industryCategoryFilter !== "All") && (
                      <button
                        onClick={() => { setIndustrySearch(""); setIndustryCategoryFilter("All"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Category Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Category:</span>
                  {industryCategories.map((cat) => {
                    const count = cat === "All" ? industries.length : industries.filter(i => i.category?.trim() === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setIndustryCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          industryCategoryFilter === cat
                            ? "bg-[#b3282d] text-white shadow-xs"
                            : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${industryCategoryFilter === cat ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              {filteredIndustries.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No industry sectors matching your filter criteria.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Sector & Focus</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Scope & Description</th>
                          <th className="p-3 text-center">Order</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredIndustries.map((ind, idx) => (
                          <tr key={ind.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#0f172a] max-w-[240px]">
                              <span className="block font-bold">{ind.title}</span>
                              <span className="text-[11px] text-[#b3282d] font-medium">{ind.scope}</span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                                {ind.category}
                              </span>
                            </td>
                            <td className="p-3 text-[#475569] max-w-md">
                              <p className="line-clamp-2 leading-relaxed text-[11px]">{ind.description}</p>
                            </td>
                            <td className="p-3 text-center text-[#64748b] font-mono text-[11px]">
                              #{ind.display_order}
                            </td>
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => { setIndustryForm(ind); setIsIndustryModalOpen(true); }}
                                className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a] cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteIndustry(ind.id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700 cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. TRAINING PROGRAMS (Tabular Form) */}
          {/* ========================================================================= */}
          {activeTab === "training" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Training Programs & Courses ({trainingPrograms.length})
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
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Training Program
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search training programs by title, tag, target audience..."
                      value={trainingSearch}
                      onChange={(e) => setTrainingSearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {trainingSearch && (
                      <button onClick={() => setTrainingSearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredTrainingPrograms.length} of {trainingPrograms.length}
                    </span>
                    {(trainingSearch || trainingBadgeFilter !== "All") && (
                      <button
                        onClick={() => { setTrainingSearch(""); setTrainingBadgeFilter("All"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Badge Filter Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Badge / Tag:</span>
                  {trainingBadges.map((badge) => {
                    const count = badge === "All" ? trainingPrograms.length : trainingPrograms.filter(t => t.badge?.trim() === badge).length;
                    return (
                      <button
                        key={badge}
                        onClick={() => setTrainingBadgeFilter(badge)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          trainingBadgeFilter === badge
                            ? "bg-[#b3282d] text-white shadow-xs"
                            : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <span>{badge}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${trainingBadgeFilter === badge ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              {filteredTrainingPrograms.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No training programs matching your search or filter.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Course / Certification</th>
                          <th className="p-3">Badge & Duration</th>
                          <th className="p-3">Target Audience</th>
                          <th className="p-3 text-center">Order</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredTrainingPrograms.map((prog, idx) => (
                          <tr key={prog.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#0f172a] max-w-[240px]">
                              <span className="block font-bold">{prog.title}</span>
                              <p className="text-[11px] text-[#64748b] line-clamp-1">{prog.description}</p>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca] mr-2">
                                {prog.badge}
                              </span>
                              <span className="text-[11px] text-[#475569] font-medium inline-flex items-center">
                                <Calendar className="w-3 h-3 mr-1 text-[#64748b]" /> {prog.duration}
                              </span>
                            </td>
                            <td className="p-3 text-[#475569] max-w-[200px]">
                              <span className="line-clamp-1 text-[11px]">{prog.target_audience}</span>
                            </td>
                            <td className="p-3 text-center text-[#64748b] font-mono text-[11px]">
                              #{prog.display_order}
                            </td>
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => { setTrainingForm(prog); setIsTrainingModalOpen(true); }}
                                className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a] cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteTraining(prog.id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700 cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. PROJECTS & CLIENTS (Tabular Form) */}
          {/* ========================================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Projects / Clients Portfolio ({projects.length})
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
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Project
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search projects by title, category, description..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {projectSearch && (
                      <button onClick={() => setProjectSearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredProjects.length} of {projects.length}
                    </span>
                    {(projectSearch || projectCategoryFilter !== "All") && (
                      <button
                        onClick={() => { setProjectSearch(""); setProjectCategoryFilter("All"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Category Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Category:</span>
                  {projectCategories.map((cat) => {
                    const count = cat === "All" ? projects.length : projects.filter(p => p.category_name?.trim() === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setProjectCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          projectCategoryFilter === cat
                            ? "bg-[#b3282d] text-white shadow-xs"
                            : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${projectCategoryFilter === cat ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              {filteredProjects.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No projects matching your search or category filter.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Project Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Featured</th>
                          <th className="p-3">Description</th>
                          <th className="p-3 text-center">Order</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredProjects.map((proj, idx) => (
                          <tr key={proj.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#0f172a] max-w-[240px]">
                              <span className="block font-bold">{proj.title}</span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                                {proj.category_name}
                              </span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              {proj.featured ? (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  Featured
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#94a3b8]">Standard</span>
                              )}
                            </td>
                            <td className="p-3 text-[#475569] max-w-md">
                              <p className="line-clamp-2 leading-relaxed text-[11px]">{proj.description}</p>
                            </td>
                            <td className="p-3 text-center text-[#64748b] font-mono text-[11px]">
                              #{proj.display_order}
                            </td>
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => { setProjectForm(proj); setIsProjectModalOpen(true); }}
                                className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a] cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700 cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. RESOURCES & DOWNLOADS (Tabular Form) */}
          {/* ========================================================================= */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0f172a]">
                    Resources & Compliance Documentation ({resources.length})
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
                  className="px-3.5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white text-xs font-heading font-bold rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Resource Item
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Search resources by title, category, tags, format..."
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#b3282d]"
                    />
                    {resourceSearch && (
                      <button onClick={() => setResourceSearch("")} className="absolute right-2.5 top-2 text-[#94a3b8] hover:text-[#0f172a]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#64748b] font-medium whitespace-nowrap">
                      Showing {filteredResources.length} of {resources.length}
                    </span>
                    {(resourceSearch || resourceCategoryFilter !== "All") && (
                      <button
                        onClick={() => { setResourceSearch(""); setResourceCategoryFilter("All"); }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#b3282d] bg-[#fef2f2] hover:bg-[#fee2e2] rounded border border-[#fecaca] cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Dynamic Category Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#f1f5f9]">
                  <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Category:</span>
                  {resourceCategories.map((cat) => {
                    const count = cat === "All" ? resources.length : resources.filter(r => r.category?.trim() === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setResourceCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                          resourceCategoryFilter === cat
                            ? "bg-[#b3282d] text-white shadow-xs"
                            : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${resourceCategoryFilter === cat ? "bg-white/20 text-white" : "bg-[#e2e8f0] text-[#475569]"}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              {filteredResources.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-12 text-center text-xs text-[#64748b]">
                  No resources matching your search or category filter.
                </div>
              ) : (
                <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3 w-12 text-center">#</th>
                          <th className="p-3">Resource Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Format / Size</th>
                          <th className="p-3">Tags</th>
                          <th className="p-3 text-center">Order</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f5f9]">
                        {filteredResources.map((res, idx) => (
                          <tr key={res.id} className="hover:bg-[#f8fafc] transition-colors">
                            <td className="p-3 text-center text-[#94a3b8] font-mono text-[11px]">{idx + 1}</td>
                            <td className="p-3 font-semibold text-[#0f172a] max-w-[240px]">
                              <span className="block font-bold">{res.title}</span>
                              <p className="text-[11px] text-[#64748b] line-clamp-1">{res.description}</p>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b3282d] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                                {res.category}
                              </span>
                            </td>
                            <td className="p-3 whitespace-nowrap text-[#64748b] text-[11px]">
                              {res.file_format} • {res.file_size}
                            </td>
                            <td className="p-3 text-[#64748b] font-mono text-[10px] max-w-[180px]">
                              <span className="line-clamp-1">{res.tags || "—"}</span>
                            </td>
                            <td className="p-3 text-center text-[#64748b] font-mono text-[11px]">
                              #{res.display_order}
                            </td>
                            <td className="p-3 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => { setResourceForm(res); setIsResourceModalOpen(true); }}
                                className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#cbd5e1] rounded font-medium text-[#0f172a] cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteResource(res.id)}
                                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-medium text-red-700 cursor-pointer inline-flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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
              <button onClick={() => setSelectedLead(null)} className="p-1 rounded text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                <span className="font-mono">ID: #{selectedLead.id}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#f1f5f9]">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] text-xs font-bold rounded-lg cursor-pointer"
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
              <button onClick={() => setIsServiceModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg cursor-pointer"
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
              <button onClick={() => setIsIndustryModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg cursor-pointer"
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
              <button onClick={() => setIsTrainingModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg cursor-pointer"
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
              <button onClick={() => setIsProjectModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg cursor-pointer"
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
              <button onClick={() => setIsResourceModalOpen(false)} className="p-1 text-[#64748b] hover:text-[#0f172a] cursor-pointer">
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
                  className="px-4 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEntity}
                  className="px-5 py-2 bg-[#b3282d] hover:bg-[#8c1e22] text-white font-heading font-bold rounded-lg cursor-pointer"
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
