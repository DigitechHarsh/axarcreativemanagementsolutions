"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
    tagStyle: "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    service_id: 2,
    service_title: "Laboratory Consultancy & Accreditation",
    title: "NABL Accreditation for Chemical Testing Laboratory",
    category: "Laboratory & NABL",
    desc: "Laboratory layout design, SOP formulation, equipment validation, and NABL accreditation clearance in record 6-month timeframe.",
    tagStyle: "bg-[#fefce8] text-[#a16207] border border-[#fef08a]",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    service_id: 4,
    service_title: "Industrial Insurance Solutions",
    title: "Engineering Plant Risk Audit & Asset Insurance",
    category: "Industrial Insurance",
    desc: "Structured comprehensive risk coverage protecting heavy machinery, fire perils, boilers, and transit cargo for an engineering firm.",
    tagStyle: "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]",
    image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    service_id: 3,
    service_title: "QHSE & Food Safety Training",
    title: "Hazard Identification (HIRA) & Safety Culture Overhaul",
    category: "QHSE & Training",
    desc: "Trained 150+ shop-floor supervisors on risk assessment, emergency preparedness, and behavior-based safety protocols.",
    tagStyle: "bg-[#fefce8] text-[#a16207] border border-[#fef08a]",
    image_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    service_id: 5,
    service_title: "Six Sigma Training",
    title: "Lean DMAIC Process Variation Reduction",
    category: "Six Sigma (DMAIC)",
    desc: "Deployed DMAIC tools to reduce production line scrap rate by 34% and improve overall equipment effectiveness (OEE).",
    tagStyle: "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]",
    image_url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    service_id: 7,
    service_title: "Export & International Marketing",
    title: "International Market Entry & Buyer Identification",
    category: "Export & Global Trade",
    desc: "Facilitated international buyer connections and export documentation for an Indian chemical manufacturer expanding to European markets.",
    tagStyle: "bg-[#fefce8] text-[#a16207] border border-[#fef08a]",
    image_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
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
            tagStyle: item.tag_style || "bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]"
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
    <div className="relative min-h-screen bg-white text-[#0f172a] pb-20">
      {/* Header Section */}
      <section className="pt-16 pb-12 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white border border-[#e2e8f0] text-[#b3282d] shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#b3282d]" /> Proven Track Record
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0f172a]">
              Projects & Client Engagements
            </h1>
            <p className="text-xs md:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Explore recent implementations across ISO certifications, NABL laboratory setups, safety overhauls, and risk management engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] py-2.5 shadow-xs">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto hide-scrollbar space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#fef2f2] border-[#b3282d] text-[#b3282d] shadow-xs"
                    : "bg-white border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] hover:border-[#cbd5e1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Projects */}
      <section className="py-14 bg-[#f8fafc]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all"
              >
                {item.image_url && (
                  <div className="relative h-44 w-full bg-[#f1f5f9]">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.tagStyle}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {!item.image_url && (
                      <div className="mb-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.tagStyle}`}>
                          {item.category}
                        </span>
                      </div>
                    )}

                    <h3 className="text-base font-heading font-bold text-[#0f172a] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748b] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                    <span className="text-[#64748b] text-[11px] font-medium">Audit: 100% Passed</span>
                    <Link
                      href={`/contact?project=${encodeURIComponent(item.title)}&type=quote`}
                      className="text-[#b3282d] hover:text-[#8c1e22] font-bold inline-flex items-center"
                    >
                      Inquire <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
