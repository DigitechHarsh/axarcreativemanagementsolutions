-- Axar Creative Management Solutions Database Schema
-- Run this SQL in phpMyAdmin or your MySQL database console.

-- 1. Contact Submissions Table
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

-- 2. Services Table
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

-- 3. Projects (Portfolio) Table
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

-- ==========================================================
-- SEED DATA (Official 7 Industrial Services & Default Projects)
-- ==========================================================

-- Insert Official Services
INSERT INTO services (id, title, category, short_desc, image_url, details, display_order) VALUES
(1, 'QMS & ISO Consultancy', 'Industrial Consultancy', 'Complete support for management-system implementation, improvement and certification (ISO 9001, 14001, 45001, 50001, 22301, 37001, 20000-1, 27001, IMS).', '/images/carousel_business_consulting_1788288885191.jpg', 'ISO 9001, 14001, 45001, 50001, 22301, 37001, 20000-1, 27001, IMS\nDocumentation and SOP implementation\nInternal audit & management review support\nCertification preparation & CAPA root-cause closure\nLead Auditor & Internal Auditor competency training', 1),
(2, 'Laboratory Consultancy & Accreditation', 'Industrial Consultancy', 'From laboratory feasibility and layout planning to testing SOPs, quality manuals, and NABL accreditation readiness.', '/images/service_supply_chain_1788290674649.jpg', 'Laboratory feasibility, layout and infrastructure guidance\nTesting equipment selection and calibration support\nSOP, method validation and Quality Manual preparation\nLaboratory management system (ISO/IEC 17025) implementation\nNABL audit preparation & inter-laboratory testing comparisons', 2),
(3, 'QHSE & Food Safety Training', 'Workforce Training', 'Practical training designed for industrial personnel, plant supervisors, managers and management teams.', '/images/service_corporate_strategy_1788290688199.jpg', 'Quality, Environmental and Occupational Health & Safety (OH&S)\nRisk Assessment, HIRA and Workplace Incident Investigation\nInternal Auditor Training, CAPA and Emergency Preparedness\nFood Safety Awareness, HACCP, GMP and GHP Implementation\nFood Safety Management Systems (ISO 22000) & Culture Building', 3),
(4, 'Industrial Insurance Solutions', 'Risk Management', 'We assist industrial organizations in identifying and arranging appropriate insurance solutions through suitable insurance partners.', '/images/carousel_tech_dev_1788288897978.jpg', 'Industrial property, plant & machinery risk covers\nFire and special perils & Machinery Breakdown (MBD)\nMarine, transit and freight cargo insurance\nPublic liability, product liability and Workmen Compensation\nEngineering insurance & erection risk management', 4),
(5, 'Six Sigma Training', 'Workforce Training', 'Develop a data-driven culture of continuous improvement using Lean Six Sigma and DMAIC methodology.', '/images/carousel_business_consulting_1788288885191.jpg', 'Six Sigma Awareness & Lean manufacturing principles\nDMAIC methodology: Define, Measure, Analyze, Improve, Control\nProcess improvement, Root Cause Analysis (RCA) and 5-Why\nVariation reduction, waste reduction (Muda) and defect elimination\nGreen Belt and advanced programs through specialized arrangements', 5),
(6, 'Marketing Flyers & Business Communication', 'Business Development', 'Professional marketing collateral converting technical specifications into clear, compelling B2B communication.', '/images/carousel_ai_video_1788289531842.jpg', 'Industrial product flyers & technical data sheets\nComprehensive company profiles & capability pitch decks\nIndustrial service brochures and digital marketing creatives\nProduct/service value proposition communication\nTrade show and promotional presentation material', 6),
(7, 'Export & International Marketing Services', 'Business Development', 'Helping Indian businesses explore and develop international markets with buyer identification and market-entry support.', '/images/carousel_tech_dev_1788288897978.jpg', 'Export-market research and country feasibility\nInternational buyer and importer identification\nExport-ready product presentation & cataloging\nExport marketing material and business introduction\nMarket-entry assistance & distributor development support', 7)
ON DUPLICATE KEY UPDATE title=VALUES(title), short_desc=VALUES(short_desc), details=VALUES(details);

-- Insert Default Projects
INSERT INTO projects (id, service_id, title, category_name, description, image_url, tag_style, featured, display_order) VALUES
(1, 1, 'Multi-Site IMS Certification (ISO 9001, 14001, 45001)', 'ISO & IMS Consultancy', 'Complete Integrated Management System rollout across 3 manufacturing plants in Gujarat with zero non-conformances.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 1, 1),
(2, 2, 'NABL Accreditation for Chemical Testing Laboratory', 'Laboratory & NABL', 'Laboratory layout design, SOP formulation, equipment validation, and NABL accreditation clearance in record 6 months.', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 1, 2),
(3, 4, 'Engineering Plant Risk Audit & Asset Insurance', 'Industrial Insurance', 'Structured comprehensive risk coverage protecting heavy machinery, fire perils, boilers, and transit cargo.', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 1, 3),
(4, 3, 'Hazard Identification (HIRA) & Safety Culture Overhaul', 'QHSE & Training', 'Trained 150+ shop-floor supervisors on risk assessment, emergency preparedness, and behavior-based safety protocols.', 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 0, 4),
(5, 5, 'Lean DMAIC Process Variation Reduction', 'Six Sigma (DMAIC)', 'Deployed DMAIC tools to reduce production line scrap rate by 34% and improve overall equipment effectiveness.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', 'bg-primary/20 text-primary border border-primary/30', 0, 5),
(6, 7, 'International Market Entry & Buyer Identification', 'Export & Global Trade', 'Facilitated international buyer connections and export documentation for an Indian chemical manufacturer.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 'bg-accent/20 text-accent border border-accent/30', 0, 6)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);
