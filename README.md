# HTYF OVC CMS - Child Management System

A comprehensive Child Management System designed specifically for managing Orphans and Vulnerable Children (OVC) programs. This system provides caseworkers, social workers, and program administrators with the tools needed to effectively track, assess, and support children in care.

## 🎯 Project Objectives

### Primary Mission
To create a centralized, user-friendly platform that streamlines the management of children in OVC programs, ensuring better outcomes through data-driven decision making and comprehensive case management.

### Key Objectives

1. **Centralized Child Management**
   - Maintain comprehensive profiles for all children in the program
   - Track demographic information, living situations, and care arrangements
   - Monitor educational status and health information

2. **Risk Assessment & Monitoring**
   - Conduct systematic risk assessments using standardized criteria
   - Track risk factors including housing stability, food security, health status, and exposure to harm
   - Generate risk scores and recommendations for intervention

3. **Case Management & Documentation**
   - Maintain detailed case notes and documentation
   - Track caseworker assignments and responsibilities
   - Monitor task completion and follow-up requirements

4. **Sponsor Matching & Management**
   - Manage sponsor relationships and capacity
   - Use AI-powered matching algorithms to connect children with appropriate sponsors
   - Track sponsorship outcomes and relationships

5. **Alert & Notification System**
   - Generate alerts for high-risk situations
   - Notify caseworkers of urgent needs or missed appointments
   - Prioritize cases based on risk levels and urgency

6. **Reporting & Analytics**
   - Provide dashboard views with key performance indicators
   - Generate reports for program evaluation and compliance
   - Track trends and outcomes across the program

## 🚀 Key Features

### Dashboard & Overview
- **Real-time KPIs**: Active children, high-risk cases, pending alerts, and sponsor matches
- **Risk Distribution**: Visual breakdown of children by risk level
- **Recent Alerts**: Latest notifications requiring attention
- **Task Management**: Daily tasks and priorities for caseworkers

### Child Management
- **Comprehensive Profiles**: Detailed information including demographics, living situation, and care arrangements
- **Risk Assessment**: Multi-factor risk evaluation with scoring system
- **Document Management**: Secure storage and access to case documents
- **Educational Tracking**: Monitor school enrollment and academic progress

### Assessment System
- **Standardized Risk Assessment**: Six-factor evaluation system
- **AI-Powered Justification**: Automated generation of assessment justifications
- **Progress Tracking**: Monitor changes in risk levels over time
- **Recommendation Engine**: Evidence-based intervention suggestions

### Sponsor Management
- **Capacity Tracking**: Monitor sponsor availability and current matches
- **Smart Matching**: Algorithm-based matching considering location, age preferences, and needs
- **Relationship Management**: Track sponsorship history and outcomes
- **Preference Management**: Maintain sponsor preferences and capabilities

### Alert System
- **Priority-Based Alerts**: Urgent, high, medium, and low priority notifications
- **Automated Triggers**: System-generated alerts based on risk factors
- **Caseworker Notifications**: Direct alerts for assigned caseworkers
- **Follow-up Tracking**: Monitor alert resolution and outcomes

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel
- **AI Integration**: OpenAI API (optional)

## 📊 Assessment Framework

The system uses a comprehensive 6-factor risk assessment model:

1. **Housing Stability** (1-5 scale)
2. **Food Security** (1-5 scale)
3. **Health Status** (1-5 scale)
4. **Schooling Consistency** (1-5 scale)
5. **Caregiver Availability** (1-5 scale)
6. **Exposure to Harm** (1-5 scale)

**Risk Bands:**
- **Low Risk**: 0-30 points
- **Medium Risk**: 31-60 points
- **High Risk**: 61+ points

## 🎯 Target Users

- **Caseworkers**: Primary users managing individual child cases
- **Social Workers**: Conducting assessments and interventions
- **Program Managers**: Overseeing program operations and outcomes
- **Administrators**: Managing system settings and user access
- **Sponsors**: Viewing matched children and providing support

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd htyf-ovc-cms

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key for AI features (optional)

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Environment Variables
```env
# Optional: For AI-powered features
OPENAI_API_KEY=your_openai_api_key_here
```

## 📱 Application Structure

```
app/
├── page.tsx                 # Dashboard
├── children/               # Child management
│   ├── page.tsx           # Children list
│   └── [id]/page.tsx      # Individual child profile
├── assessments/           # Risk assessments
│   ├── page.tsx           # Assessments list
│   ├── new/page.tsx       # New assessment
│   └── [id]/page.tsx      # Assessment details
├── sponsors/              # Sponsor management
│   └── page.tsx           # Sponsors list and matching
├── alerts/                # Alert management
│   └── page.tsx           # Alerts dashboard
├── settings/              # System settings
│   └── page.tsx           # Configuration
└── api/                   # API endpoints
    └── ai/                # AI-powered features
        ├── check-availability/
        └── generate-justification/
```

## 🔒 Security & Privacy

- **Data Protection**: Secure handling of sensitive child information
- **Access Control**: Role-based permissions for different user types
- **Audit Trail**: Comprehensive logging of all system activities
- **Compliance**: Designed to meet child welfare data protection requirements

## 🤝 Contributing

This project is designed to support child welfare organizations. Contributions that improve child safety, case management efficiency, or user experience are welcome.

## 📄 License

This project is developed for the benefit of children in need. Please ensure any use complies with local child welfare regulations and data protection laws.

## 🆘 Support

For technical support or questions about implementation, please contact the development team or refer to the project documentation.

---

**Note**: This system is designed to support child welfare professionals in their critical work. Always prioritize child safety and follow established protocols for child protection and data privacy.