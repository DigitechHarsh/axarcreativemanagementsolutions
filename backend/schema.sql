-- ==========================================================
-- Axar Creative Management Solutions - Complete Database Schema
-- Run this SQL in phpMyAdmin or MySQL Console on Hostinger
-- ==========================================================

-- 1. Contact Submissions (Inquiries & Quote Requests)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    company_name VARCHAR(150),
    service_interested VARCHAR(255),
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    status ENUM('new','contacted','closed') DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Services (7 Official Industrial Services)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Industrial Consultancy',
    short_desc TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT '',
    details TEXT DEFAULT '',
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Industries We Serve
CREATE TABLE IF NOT EXISTS industries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Heavy & Engineering',
    scope VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    key_services TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Training Programs
CREATE TABLE IF NOT EXISTS training_programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    badge VARCHAR(100) NOT NULL DEFAULT 'Auditor Certification',
    target_audience VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    topics TEXT NOT NULL,
    duration VARCHAR(100) DEFAULT '2-5 Days',
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Projects & Clients (Portfolio)
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NULL,
    title VARCHAR(200) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT '',
    project_url VARCHAR(255) DEFAULT '',
    tag_style VARCHAR(100) DEFAULT 'bg-primary/20 text-primary border border-primary/30',
    featured TINYINT(1) DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Resources & Documentation
CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    tags VARCHAR(255) NOT NULL,
    file_format VARCHAR(50) DEFAULT 'PDF Document',
    file_size VARCHAR(50) DEFAULT '1.8 MB',
    file_url VARCHAR(255) DEFAULT '',
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- SEED DATA
-- ==========================================================

-- Seed Services
INSERT INTO services (id, title, category, short_desc, image_url, details, display_order) VALUES
(1, 'QMS & ISO Consultancy', 'Industrial Consultancy', 'Complete support for management-system implementation, improvement and certification (ISO 9001, 14001, 45001, 50001, 22301, 37001, 20000-1, 27001, IMS).', '/images/carousel_business_consulting_1788288885191.jpg', 'ISO 9001, 14001, 45001, 50001, 22301, 37001, 20000-1, 27001, IMS\nDocumentation and SOP implementation\nInternal audit & management review support\nCertification preparation & CAPA root-cause closure\nLead Auditor & Internal Auditor competency training', 1),
(2, 'Laboratory Consultancy & Accreditation', 'Industrial Consultancy', 'From laboratory feasibility and layout planning to testing SOPs, quality manuals, and NABL accreditation readiness.', '/images/service_supply_chain_1788290674649.jpg', 'Laboratory feasibility, layout and infrastructure guidance\nTesting equipment selection and calibration support\nSOP, method validation and Quality Manual preparation\nLaboratory management system (ISO/IEC 17025) implementation\nNABL audit preparation & inter-laboratory testing comparisons', 2),
(3, 'QHSE & Food Safety Training', 'Workforce Training', 'Practical training designed for industrial personnel, plant supervisors, managers and management teams.', '/images/service_corporate_strategy_1788290688199.jpg', 'Quality, Environmental and Occupational Health & Safety (OH&S)\nRisk Assessment, HIRA and Workplace Incident Investigation\nInternal Auditor Training, CAPA and Emergency Preparedness\nFood Safety Awareness, HACCP, GMP and GHP Implementation\nFood Safety Management Systems (ISO 22000) & Culture Building', 3),
(4, 'Industrial Insurance Solutions', 'Risk Management', 'We assist industrial organizations in identifying and arranging appropriate insurance solutions through suitable insurance partners.', '/images/carousel_tech_dev_1788288897978.jpg', 'Industrial property, plant & machinery risk covers\nFire and special perils & Machinery Breakdown (MBD)\nMarine, transit and freight cargo insurance\nPublic liability, product liability and Workmen Compensation\nEngineering insurance & erection risk management', 4),
(5, 'Six Sigma Training', 'Workforce Training', 'Develop a data-driven culture of continuous improvement using Lean Six Sigma and DMAIC methodology.', '/images/carousel_business_consulting_1788288885191.jpg', 'Six Sigma Awareness & Lean manufacturing principles\nDMAIC methodology: Define, Measure, Analyze, Improve, Control\nProcess improvement, Root Cause Analysis (RCA) and 5-Why\nVariation reduction, waste reduction (Muda) and defect elimination\nGreen Belt and advanced programs through specialized arrangements', 5),
(6, 'Marketing Flyers & Business Communication', 'Business Development', 'Professional marketing collateral converting technical specifications into clear, compelling B2B communication.', '/images/carousel_ai_video_1788289531842.jpg', 'Industrial product flyers & technical data sheets\nComprehensive company profiles & capability pitch decks\nIndustrial service brochures and digital marketing creatives\nProduct/service value proposition communication\nTrade show and promotional presentation material', 6),
(7, 'Export & International Marketing Services', 'Business Development', 'Helping Indian businesses explore and develop international markets with buyer identification and market-entry support.', '/images/carousel_tech_dev_1788288897978.jpg', 'Export-market research and country feasibility\nInternational buyer and importer identification\nExport-ready product presentation & cataloging\nExport marketing material and business introduction\nMarket-entry assistance & distributor development support', 7)
ON DUPLICATE KEY UPDATE title=VALUES(title), short_desc=VALUES(short_desc), details=VALUES(details);

-- Seed Industries
INSERT INTO industries (id, title, category, scope, description, key_services, display_order) VALUES
(1, 'Manufacturing', 'Heavy & Engineering', 'Heavy Machinery, Assembly Lines & Discrete Production', 'From lean layout design and Six Sigma process optimization to ISO 9001 and ISO 14001 certification, we streamline manufacturing shop floors for higher throughput and lower defects.', 'ISO 9001 QMS & ISO 14001 EMS\nLean Six Sigma & DMAIC Defect Reduction\nPlant & Machinery Breakdown Insurance\nInternal Quality Auditor Competency', 1),
(2, 'Engineering', 'Heavy & Engineering', 'Precision Fabrication, Electrical & Mechanical Units', 'We assist engineering units in developing robust Quality Assurance (QA/QC) documentation, precision calibration protocols, and comprehensive risk management.', 'Integrated Management Systems (IMS)\nEquipment Calibration & Layout Readiness\nEngineering & Project Risk Insurance\nWorkplace Safety & OHS Training', 2),
(3, 'Chemical & Petrochemical', 'Process & Chemicals', 'Specialty Chemicals, Polymers & Bulk Reagents', 'High-hazard chemical processing plants require stringent Hazard Identification and Risk Assessment (HIRA), Environmental Management (ISO 14001), and emergency preparedness.', 'HIRA & Process Safety Audits\nISO 45001 & ISO 14001 Certification\nEmergency Preparedness & Mock Drills\nSpecial Perils & Chemical Transit Insurance', 3),
(4, 'Pharmaceutical & Healthcare', 'Life Sciences', 'Formulations, APIs & Medical Devices', 'Strict compliance with Good Manufacturing Practices (GMP), ISO 13485 / ISO 9001, cleanroom protocols, and testing laboratory readiness.', 'GMP / GLP Documentation & Audit Prep\nTesting Laboratory ISO/IEC 17025 Setup\nCAPA & Cleanroom SOP Development\nProduct Liability & Cold-Chain Transit Cover', 4),
(5, 'Food & Beverage', 'Life Sciences', 'Food Processing, Packaging & Dairy', 'Ensuring uncompromising hygiene and regulatory compliance through HACCP, GMP, GHP, and ISO 22000 / FSSC 22000 food safety management systems.', 'HACCP & Food Safety Culture Training\nGMP / GHP Inspection & Gap Analysis\nISO 22000 FSMS Certification Support\nExport Readiness for Processed Foods', 5),
(6, 'Laboratory & Testing', 'Life Sciences', 'Analytical, Chemical, Calibration & R&D Labs', 'Complete operational and technical readiness for laboratories aiming for NABL accreditation, ISO/IEC 17025 compliance, and testing excellence.', 'NABL Accreditation Consultancy\nQuality Manual & Method SOP Development\nInter-Laboratory Testing Comparisons\nEquipment Qualification & Selection Support', 6),
(7, 'Construction & Infrastructure', 'Infrastructure', 'Commercial, Industrial & Civil Projects', 'Managing high-risk construction environments with robust site safety plans, ISO 45001 systems, incident investigation, and contractor risk coverage.', 'Site Safety Inspection & HIRA Protocols\nContractor & Worker Safety Training\nPublic Liability & Contractor All Risk (CAR)\nEnvironmental Management for Sites', 7)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);

-- Seed Training Programs
INSERT INTO training_programs (id, title, badge, target_audience, description, topics, duration, display_order) VALUES
(1, 'Lead Auditor & Internal Auditor Training', 'Auditor Certification', 'Quality Managers, Technical Leads, Compliance Officers & Engineers', 'Professional training programs designed for personnel seeking to develop rigorous internal-auditor and lead-auditor competencies across international standards.', 'ISO 9001:2015 Quality Management Systems (QMS) Auditing\nISO 14001:2015 Environmental Management Systems (EMS) Auditing\nISO 45001:2018 Occupational Health & Safety (OH&S) Auditing\nISO 27001 Information Security Management Systems (ISMS) Auditing\nISO 20000-1 IT Service Management (ITSM) Auditing\nAudit Planning, Checklist Creation, Opening/Closing Meetings\nNon-Conformance Reporting (NCR) and Objective Evidence Evaluation\nCorrective & Preventive Action (CAPA) Root-Cause Verification', '2-5 Days', 1),
(2, 'QHSE (Quality, Health, Safety & Environment) Training', 'Industrial Safety', 'Plant Supervisors, Safety Officers, EHS Teams & Shop-Floor Workers', 'Practical, behavior-based workplace training to ensure employee safety, minimize occupational hazards, and uphold environmental compliance.', 'Industrial Quality Awareness & Standard Work Principles\nEnvironmental Awareness & Waste Segregation / Spillage Control\nOccupational Health & Safety (OH&S) Core Rules & PPE Compliance\nRisk Assessment & Hazard Identification (HIRA) Methodology\nWorkplace Incident Investigation & 5-Why Root Cause Diagnostics\nInternal Auditor Skills & Corrective Action (CAPA) Support\nEmergency Preparedness, Evacuation Plans & Mock Drill Execution\nShop-Floor Machine Guarding, Chemical Handling & Electrical Safety', '2-3 Days', 2),
(3, 'Food Safety & Hygiene Training', 'HACCP & GMP', 'Food Processors, Kitchen Supervisors, Quality Controllers & Packaging Staff', 'Comprehensive modules designed to safeguard food products from biological, chemical, and physical contamination throughout the production chain.', 'Food Safety Awareness & Biological / Allergen Hazard Control\nHazard Analysis and Critical Control Points (HACCP) Implementation\nGood Manufacturing Practice (GMP) for Food Facilities\nGood Hygiene Practice (GHP) & Personal Sanitation Protocols\nFood Safety Management Systems (ISO 22000 / FSSC 22000 Standards)\nFood Safety Internal Auditor Competencies\nBuilding a Resilient Food Safety & Sanitation Culture\nPest Control, Water Quality & Cold-Chain Integrity', '2 Days', 3),
(4, 'Six Sigma & Continuous Improvement Training', 'Lean DMAIC', 'Continuous Improvement Managers, Production Heads & Process Engineers', 'Data-driven problem solving and statistical methodologies to reduce process variation, eliminate shop-floor waste, and maximize throughput.', 'Six Sigma Awareness & Culture of Continuous Improvement\nLean Manufacturing & 5S Visual Workplace Management\nDMAIC Roadmap: Define • Measure • Analyze • Improve • Control\nProcess Flow Mapping & Value Stream Mapping (VSM)\nRoot Cause Analysis (RCA) using Ishikawa Fishbone & Pareto Charts\nProcess Variation Reduction & Statistical Defect Elimination\nIndustrial Waste Reduction (Eliminating 8 Types of Muda)\nGreen Belt & Advanced Programs through Specialized Arrangements', '3-5 Days', 4)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);

-- Seed Projects
INSERT INTO projects (id, service_id, title, category_name, description, image_url, tag_style, featured, display_order) VALUES
(1, 1, 'Multi-Site IMS Certification (ISO 9001, 14001, 45001)', 'ISO & IMS Consultancy', 'Complete Integrated Management System rollout across 3 manufacturing plants in Gujarat with zero non-conformances.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 1, 1),
(2, 2, 'NABL Accreditation for Chemical Testing Laboratory', 'Laboratory & NABL', 'Laboratory layout design, SOP formulation, equipment validation, and NABL accreditation clearance in record 6 months.', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 1, 2),
(3, 4, 'Engineering Plant Risk Audit & Asset Insurance', 'Industrial Insurance', 'Structured comprehensive risk coverage protecting heavy machinery, fire perils, boilers, and transit cargo.', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 1, 3),
(4, 3, 'Hazard Identification (HIRA) & Safety Culture Overhaul', 'QHSE & Training', 'Trained 150+ shop-floor supervisors on risk assessment, emergency preparedness, and behavior-based safety protocols.', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 0, 4),
(5, 5, 'Lean DMAIC Process Variation Reduction', 'Six Sigma (DMAIC)', 'Deployed DMAIC tools to reduce production line scrap rate by 34% and improve overall equipment effectiveness.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 0, 5),
(6, 7, 'International Market Entry & Buyer Identification', 'Export & Global Trade', 'Facilitated international buyer connections and export documentation for an Indian chemical manufacturer.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 0, 6)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);

-- Seed Resources
INSERT INTO resources (id, title, category, description, tags, file_format, file_size, display_order) VALUES
(1, 'ISO Management Systems Implementation Checklist', 'QMS & Compliance', 'A step-by-step readiness matrix covering ISO 9001, 14001, 45001, 27001, and 20000-1 gap analysis and audit preparation.', 'ISO 9001, ISO 14001, ISO 45001, ISO 27001', 'PDF Document', '1.4 MB', 1),
(2, 'NABL Laboratory Setup & Accreditation Blueprint', 'Laboratory Standards', 'Comprehensive guidelines detailing laboratory layout, environmental controls, equipment calibration logs, and SOP structures.', 'ISO/IEC 17025, NABL Readiness, Quality Manual', 'PDF Document', '2.1 MB', 2),
(3, 'Hazard Identification & Risk Assessment (HIRA) Guide', 'QHSE & Safety', 'Standard industrial risk scoring matrix, 5-Why root cause methodology, and CAPA resolution workflows for safety managers.', 'HIRA, Incident Investigation, CAPA', 'PDF Document', '1.8 MB', 3),
(4, 'Lean Six Sigma DMAIC Process Toolkit', 'Operational Excellence', 'Practical templates for Process Capability (Cp/Cpk), Value Stream Mapping, 8D problem solving, and 5S audit scoresheets.', 'DMAIC, Lean 5S, RCA Ishikawa', 'PDF Document', '2.4 MB', 4),
(5, 'Industrial Plant Insurance Coverage Checklist', 'Risk Management', 'Summary checklist for assessing asset values across fire perils, machinery breakdown, transit marine covers, and employee liability.', 'Asset Protection, MBD Insurance, Liability Covers', 'PDF Document', '1.1 MB', 5),
(6, 'Export Market Readiness & Buyer Identification Guide', 'International Trade', 'Strategic guide for Indian manufacturers preparing company profiles, technical flyers, and international inquiry handling protocols.', 'Export Trade, B2B Marketing, Buyer Inquiries', 'PDF Document', '1.9 MB', 6)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);
