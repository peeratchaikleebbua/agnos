<div align="center">
  <a href="https://www.linkedin.com/in/peeratchai-kleebbua/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://media.licdn.com/dms/image/v2/C5603AQER-pOTPo7xkQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1637471096087?e=1738195200&v=beta&t=-yYgkdMRHV_R6hJ0yYJEhykfQ3VDXf5GCLcoQRUIH5Q">
      <img alt="Peeratcha Kleebbua Picture" src="https://media.licdn.com/dms/image/v2/C5603AQER-pOTPo7xkQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1637471096087?e=1738195200&v=beta&t=-yYgkdMRHV_R6hJ0yYJEhykfQ3VDXf5GCLcoQRUIH5Q" height="128">
    </picture>
  </a>
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img alt="Next.js logo" src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
  </a>
  <h1>Agnos Project By Peeratchai Kleebbua</h1>

<a href="https://www.linkedin.com/in/peeratchai-kleebbua/"><img alt="🔗 My Profile" src="https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"></a>

</div>

## Project Instruction

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

- This project for Agnos utilize Clean architecture to outline the project
  ![Logo](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
  ![Logo](https://storage.googleapis.com/bitloops-github-assets/Documentation%20Images/clean-architecture-and-ddd.png)

- For Client Component Management, I use MVVM-C and Group by feature
  ![Logo](https://raya.engineering/wp-content/uploads/2022/02/Bildschirmfoto-2021-01-07-um-16.25.53-1024x501-1.png)

### Top-level Project Structure layout

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

> Note: This Project is small, so I do not have interface-adaptor layer
