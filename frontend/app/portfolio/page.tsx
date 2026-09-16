"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter, ShieldCheck, Sparkles } from "lucide-react";
import TypewriterText from "../../components/TypewriterText";

interface ProjectItem {
  id: number;
  service_id?: number | null;
  service_title?: string | null;
  title: string;
  category: string;
  desc: string;
  image_url?: string;
  project_url?: string;
  tagStyle: string;
}

const defaultPortfolioItems: ProjectItem[] = [
  {
    id: 1,
    service_id: 1,
    service_title: "QMS & ISO Consultancy",
    title: "Multi-Site IMS Certification (ISO 9001, 14001, 45001)",
    category: "ISO & IMS Consultancy",
    desc: "Complete Integrated Management System rollout across 3 manufacturing plants in Gujarat with zero non-conformances on final audit.",
    tagStyle: "bg-primary/20 text-primary border border-primary/40",
  },
  {
    id: 2,
    service_id: 2,
    service_title: "Laboratory Consultancy & Accreditation",
    title: "NABL Accreditation for Chemical Testing Laboratory",
    category: "Laboratory & NABL",
    desc: "Laboratory layout design, SOP formulation, equipment validation, and NABL accreditation clearance in record 6-month timeframe.",
    tagStyle: "bg-accent/20 text-accent border border-accent/40",
  },
  {
    id: 3,
    service_id: 4,
    service_title: "Industrial Insurance Solutions",
    title: "Engineering Plant Risk Audit & Asset Insurance",
    category: "Industrial Insurance",
    desc: "Structured comprehensive risk coverage protecting heavy machinery, fire perils, boilers, and transit cargo for an engineering firm.",
    tagStyle: "bg-primary/20 text-primary border border-primary/40",
  },
  {
    id: 4,
    service_id: 3,
    service_title: "QHSE & Food Safety Training",
    title: "Hazard Identification (HIRA) & Safety Culture Overhaul",
    category: "QHSE & Training",
    desc: "Trained 150+ shop-floor supervisors on risk assessment, emergency preparedness, and behavior-based safety protocols.",
    tagStyle: "bg-accent/20 text-accent border border-accent/40",
  },
  {
    id: 5,
    service_id: 5,
    service_title: "Six Sigma Training",
    title: "Lean DMAIC Process Variation Reduction",
    category: "Six Sigma (DMAIC)",
    desc: "Deployed DMAIC tools to reduce production line scrap rate by 34% and improve overall equipment effectiveness (OEE).",
    tagStyle: "bg-primary/20 text-primary border border-primary/40",
  },
  {
    id: 6,
    service_id: 7,
    service_title: "Export & International Marketing",
    title: "International Market Entry & Buyer Identification",
    category: "Export & Global Trade",
    desc: "Facilitated international buyer connections and export documentation for an Indian chemical manufacturer expanding to European markets.",
    tagStyle: "bg-accent/20 text-accent border border-accent/40",
  }
];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<ProjectItem[]>(defaultPortfolioItems);
  const [categories, setCategories] = useState<string[]>([
    "All", 
    "ISO & IMS Consultancy", 
    "Laboratory & NABL", 
    "Industrial Insurance", 
    "QHSE & Training", 
    "Six Sigma (DMAIC)", 
    "Export & Global Trade"
  ]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("https://acms.harshaicreations.com/api.php?action=get_projects");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiItems: ProjectItem[] = data.data.map((item: {
            id: number;
            service_id?: number;
            service_title?: string;
            title: string;
            category_name: string;
            description: string;
            image_url?: string;
            project_url?: string;
            tag_style?: string;
          }) => ({
            id: item.id,
            service_id: item.service_id,
            service_title: item.service_title,
            title: item.title,
            category: item.category_name || "General",
            desc: item.description,
            image_url: item.image_url,
            project_url: item.project_url,
            tagStyle: item.tag_style || "bg-accent/20 text-accent border border-accent/40"
          }));

          setPortfolioItems(apiItems);

          const uniqueCats = Array.from(new Set(apiItems.map(p => p.category)));
          setCategories(["All", ...uniqueCats]);
        }
      } catch (err) {
        console.warn("Using fallback static portfolio items:", err);
      }
    }
    fetchProjects();
  }, []);

  const filteredItems = portfolioItems.filter(
    item => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="relative min-h-screen bg-background pb-24">
      {/* Header Section */}
      <section className="pt-20 pb-10 bg-background border-b border-border relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accent/10 border border-accent/30 text-accent">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Client Engagements & Case Studies
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
              <TypewriterText text="Projects & Case Studies" />
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
              A showcase of our industrial consulting success stories, NABL testing laboratory accreditations, and regulatory compliance milestones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 md:top-20 z-40 bg-[#0d1117]/90 backdrop-blur-xl border-b border-border/80 py-3.5 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center md:hidden mb-2 text-text-secondary">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider">Filter Projects</span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-heading font-bold whitespace-nowrap transition-all rounded-full cursor-pointer ${
                  activeCategory === cat 
                    ? "bg-gradient-to-r from-accent to-accent-light text-background font-extrabold shadow-md shadow-accent/20" 
                    : "text-text-secondary hover:text-white bg-surface border border-border"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pt-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-surface relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-text-secondary opacity-50 group-hover:scale-110 transition-transform duration-500">
                      {item.image_url ? (
                        <Image 
                          src={item.image_url} 
                          alt={item.title} 
                          fill 
                          className="object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-alt flex items-center justify-center">
                          <ShieldCheck className="w-12 h-12 text-primary/60" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex flex-wrap gap-2 items-center">
                      <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full ${item.tagStyle}`}>
                        {item.category}
                      </span>
                      {item.service_title && (
                        <span className="inline-block px-2 py-0.5 text-[10px] text-text-secondary bg-surface rounded-md border border-border">
                          {item.service_title}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-6 flex-grow">{item.desc}</p>
                    
                    {item.project_url ? (
                      <a 
                        href={item.project_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center text-accent font-semibold text-xs hover:text-accent-light transition-colors mt-auto"
                      >
                        View Project Document
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    ) : (
                      <Link 
                        href={`/contact?project=${encodeURIComponent(item.title)}&type=quote`}
                        className="flex items-center text-accent font-bold text-xs hover:underline transition-colors mt-auto"
                      >
                        Request Similar Engagement
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State Fallback */}
          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-text-secondary text-sm"
            >
              No projects found in this category yet.
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
