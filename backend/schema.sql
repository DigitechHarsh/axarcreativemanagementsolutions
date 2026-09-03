-- Axar Creative Management Solutions Database Schema
-- Run this SQL in phpMyAdmin or your MySQL database console.

-- 1. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    company_name VARCHAR(150),
    service_interested VARCHAR(100),
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    status ENUM('new','contacted','closed') DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category ENUM('Business Consulting', 'Technical Expertise') NOT NULL DEFAULT 'Business Consulting',
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
-- SEED DATA (Default Services & Portfolio Items)
-- ==========================================================

-- Insert Default Services
INSERT INTO services (id, title, category, short_desc, image_url, details, display_order) VALUES
(1, 'ISO Management Systems', 'Business Consulting', 'End-to-end implementation and auditing for ISO 9001, 14001, 27001, and more.', '/images/carousel_business_consulting_1788288885191.jpg', 'Gap analysis and system design\nDocumentation and standard operating procedures (SOPs)\nInternal auditor training and mock audits\nCertification body coordination', 1),
(2, 'IT & Risk Management', 'Business Consulting', 'Comprehensive IT governance, risk assessments, and compliance frameworks.', '/images/service_corporate_strategy_1788290688199.jpg', 'IT infrastructure security assessments\nBusiness continuity and disaster recovery planning\nCompliance with global privacy frameworks (GDPR, HIPAA)\nVendor risk management', 2),
(3, 'Supply Chain', 'Business Consulting', 'Optimization of logistics, vendor management, and supply chain resilience.', '/images/service_supply_chain_1788290674649.jpg', 'End-to-end logistics mapping\nCost reduction and route optimization\nSupplier quality audits and performance tracking\nInventory management and forecasting models', 3),
(4, 'Six Sigma', 'Business Consulting', 'Process improvement methodologies to minimize defects and maximize efficiency.', '/images/carousel_business_consulting_1788288885191.jpg', 'DMAIC methodology implementation\nLean manufacturing practices\nWaste reduction and continuous improvement\nStaff training and certification (Green/Black Belts)', 4),
(5, 'AI Video Ads & Creative', 'Technical Expertise', 'User-Generated Content, CGI, and Cinematic narrative ads powered by AI generation.', '/images/carousel_ai_video_1788289531842.jpg', 'UGC Style: Authentic, relatable content designed to drive engagement\nCGI & 3D: Computer-Generated Imagery for visual hooks\nCinematic: High-production value narrative commercials with AI models', 5),
(6, 'Website Development', 'Technical Expertise', 'Static portfolios, dynamic web apps, and CMS-driven portals built for scale.', '/images/carousel_tech_dev_1788288897978.jpg', 'Static Sites: Lightning-fast, SEO-optimized landing pages\nDynamic Web Apps: React/Next.js platforms with complex state, databases, and APIs\nTech Stack: Next.js, React, PHP, MySQL', 6)
ON DUPLICATE KEY UPDATE title=VALUES(title), short_desc=VALUES(short_desc);

-- Insert Default Projects (Linked to Services)
INSERT INTO projects (id, service_id, title, category_name, description, image_url, tag_style, featured, display_order) VALUES
(1, 3, 'Global Supply Chain Overhaul', 'Consulting Case Studies', 'Streamlined logistics for a multinational FMCG, saving 15% in operational costs.', '', 'bg-primary/20 text-primary border border-primary/30', 1, 1),
(2, 5, 'Cinematic Product Launch', 'AI Video Ads', 'A fully CGI/AI-generated commercial that drove 300% ROAS on social platforms.', '', 'bg-accent/20 text-accent border border-accent/30', 1, 2),
(3, 6, 'E-Commerce Transformation', 'Websites', 'Next.js & React powered headless commerce solution with 99/100 Core Web Vitals.', '', 'bg-accent/20 text-accent border border-accent/30', 1, 3),
(4, 1, 'ISO 27001 Implementation', 'Consulting Case Studies', 'Guided a tech startup through information security frameworks to achieve ISO certification in 4 months.', '', 'bg-primary/20 text-primary border border-primary/30', 0, 4),
(5, 5, 'UGC Social Campaign', 'AI Video Ads', 'High-volume AI-generated UGC variations for A/B testing at scale.', '', 'bg-accent/20 text-accent border border-accent/30', 0, 5)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);
