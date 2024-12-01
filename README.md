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

This project for Agnos utilize Clean architecture to outline the project

> Folder structure options and naming conventions for software projects

### A typical top-level directory layout

    .
    ├── app                                 # App Router for Agnos
    ├   ├── patient                             # Patient Route
    ├   ├── staff                               # Staff View Route
    ├── core                                # Entity and UseCase Layer (Entity & Business Logic)
    ├   ├── entities                            # Entity and UseCase
    ├       ├── PatientForm                         # PatientForm Entity
    ├           ├── entity                              # PatientForm Entity and Repository
    ├       ├── User                                # User Entity
    ├           ├── entity                              # User Entity and Repository
    ├── features                            # Feature folder
    ├   ├── patientForm                         # PatientForm Feature
    ├       ├── components                          # Reusable Components for PatientForm Feature
    ├       ├── hooks                               # Reusable Hooks for PatientForm Feature
    ├           ├── coordinators                        # Reusable Coordinator Hooks for Patient Feature
    ├           ├── viewModel                           # Reusable ViewModel Hooks for Patient Feature
    ├── infrastructures                     # Infrastructure Layer
    ├   ├── socket-io                           # Socket.IO infrastructure
    ├       ├── config                          # Config folder for Socket.IO
    └── shared                              # Global Reusable
        ├── components                          # Global Reusable component
        ├── hooks                               # Global Reusable hooks

> Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md`

│── app/ # Next.js Pages (Routing and API routes) 
├── patient/ # Patient (route)
│   └── page.tsx 
├── staff/ # Staff View (route)
│   └── page.tsx 
│ ├── page.tsx # Homepage (entry point) 
│── core/ # Entity and UseCase Business logic Layer
│ ├── entities/ 
│ │ └── PatientForm
│ │   └── entity
│ │    └── PatientForm.entity.ts # Contain PatientForm Entity
│ │    └── PatientForm.entity.ts # Contain PatientForm Entity
│ │ └── User
│ │   └── entity
│ │     └── User.repository.ts # Contain User Role
├── styles/ # Styling (using Tailwind CSS) 
│ └── globals.css # Global styles 
├── utils/ # Utility files 
│ └── socket.js # Socket.IO client instance 
├── README.md # Project documentation 
├── package.json # Project dependencies and scripts 