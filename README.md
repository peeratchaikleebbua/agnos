## Getting Started

```bash
# clone repository
git clone https://github.com/peeratchaikleebbua/agnos.git
cd your-repo
# install dependency
pnpm install
# start dev
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) in any browser to see the web.

# Project Folder Structure

This pro

├── pages/ # Next.js Pages (Routing and API routes) 
│ ├── api/ # API Routes (Socket.IO server) 
│ │ └── socket.js # Real-time Socket.IO server logic 
│ ├── index.js # Homepage (entry point) 
│ ├── patient-form.js # Patient form page 
│ └── staff-view.js # Staff view page 
├── components/ # Reusable React components 
│ ├── PatientForm.js # Patient form component 
│ └── StaffView.js # Staff view component 
├── styles/ # Styling (using Tailwind CSS) 
│ └── globals.css # Global styles 
├── utils/ # Utility files 
│ └── socket.js # Socket.IO client instance 
├── README.md # Project documentation 
├── package.json # Project dependencies and scripts 