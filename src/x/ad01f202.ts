import type { UserRole } from "@/x/c0183428";
import { NavGroup } from "@/x/80a83887";

export interface SidebarData_2 {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
  };
  navGroups: Record<UserRole, NavGroup[]>;
  userNav: Record<UserRole, { title: string; url: string; icon: string }[]>;
}

export const sidebarData: SidebarData_2 = {
  user: {
    name: "Student",
    email: "student@iiinternship.com",
    avatar: "",
    role: "STUDENT",
  },

    userNav: {
    STUDENT: [
      { title: "My Profile", url: "/student/profile", icon: "User" },
      {
        title: "My Internships",
        url: "/student/internships",
        icon: "Briefcase",
      },
      { title: "Certificates", url: "/student/certificates", icon: "Award" },
      { title: "Notifications", url: "/student/notifications", icon: "Bell" },
    ],
    INSTITUTE: [
      { title: "My Profile", url: "/institute/settings", icon: "User" },
      { title: "Student Roster", url: "/institute/students", icon: "Users" },
      { title: "Placements", url: "/institute/placements", icon: "Briefcase" },
      { title: "Notifications", url: "/institute/notifications", icon: "Bell" },
    ],
    INSTRUCTOR: [
      {
        title: "Dashboard",
        url: "/instructors/dashboard",
        icon: "LayoutDashboard",
      },
      { title: "My Profile", url: "/instructor/profile", icon: "User" },
      { title: "Notifications", url: "/instructors/notices", icon: "Bell" },
    ],
    IMMERSION_USER: [
      { title: "My Profile", url: "/immersion/profile", icon: "User" },
      {
        title: "My Application",
        url: "/immersion/application",
        icon: "ClipboardList",
      },
    ],
    RECRUIT_USER: [
      {
        title: "My Dashboard",
        url: "/recruit/dashboard",
        icon: "LayoutDashboard",
      },
      {
        title: "My Profile",
        url: "/recruit/profile",
        icon: "User",
      },
    ],
    SUPER_ADMIN: [
      { title: "My Profile", url: "/super-admin/settings", icon: "User" },
      { title: "Audit Logs", url: "/super-admin/logs", icon: "ShieldCheck" },
      {
        title: "System Settings",
        url: "/super-admin/config",
        icon: "Settings",
      },
    ],
  },

    navGroups: {
        STUDENT: [
      {
        title: "Internship Portal",
        items: [
          {
            title: "Dashboard",
            url: "/student/dashboard",
            icon: "LayoutDashboard",
          },
          {
            title: "Browse Internships",
            url: "/student/internships",
            icon: "Briefcase",
          },
          {
            title: "My Applications",
            url: "/student/applications",
            icon: "ClipboardList",
          },
        ],
      },
      {
        title: "Learning",
        items: [
          {
            title: "ID Cards",
            url: "/student/id-card",
            icon: "IdCard",
          },
          {
            title: "Certificates",
            url: "/student/certificates",
            icon: "Award",
          },
        ],
      },
      {
        title: "Account",
        items: [
          {
            title: "Notifications",
            url: "/student/notifications",
            icon: "Bell",
          },
          { title: "Payments", url: "/student/payments", icon: "CreditCard" },
          {
            title: "Registration Profile",
            url: "/student/profile",
            icon: "GraduationCap",
          },
          { title: "Settings", url: "/student/settings", icon: "Settings" },
          { title: "Support", url: "/student/support", icon: "Headset" },
          {
            title: "Testimonials",
            url: "/student/reviews",
            icon: "MessageSquare",
          },
        ],
      },
    ],

        INSTITUTE: [
      {
        title: "Cohort Management",
        items: [
          {
            title: "Dashboard",
            url: "/institute/dashboard",
            icon: "LayoutDashboard",
          },
          { title: "Students List", url: "/institute/students", icon: "Users" },
          {
            title: "Cohort Performance",
            url: "/institute/performance",
            icon: "TrendingUp",
          },
        ],
      },
      {
        title: "Placements",
        items: [
          {
            title: "Job Openings",
            url: "/institute/placements",
            icon: "Briefcase",
          },
          { title: "Reports", url: "/institute/reports", icon: "BarChart" },
        ],
      },
      {
        title: "Account",
        items: [
          {
            title: "Notifications",
            url: "/institute/notifications",
            icon: "Bell",
          },
          { title: "Settings", url: "/institute/settings", icon: "Settings" },
        ],
      },
    ],

        INSTRUCTOR: [
      {
        title: "Teaching Hub",
        items: [
          {
            title: "Dashboard",
            url: "/instructor/dashboard",
            icon: "LayoutDashboard",
          },
          {
            title: "My Profile",
            url: "/instructor/profile",
            icon: "UserCheck",
          },
          {
            title: "Internships",
            url: "/instructor/internships",
            icon: "Briefcase",
          },
          {
            title: "My ID Card",
            url: "/instructor/id-card",
            icon: "IdCard",
          },
        ],
      },
      {
        title: "Communication & Grading",
        items: [
          { title: "Notices", url: "/instructor/notices", icon: "BellRing" },
          {
            title: "Support Center",
            url: "/instructor/support",
            icon: "HelpCircle",
          },
        ],
      },
    ],

        IMMERSION_USER: [
      {
        title: "Immersion Program",
        items: [
          {
            title: "Dashboard",
            url: "/immersion/dashboard",
            icon: "LayoutDashboard",
          },
          {
            title: "Browse Programs",
            url: "/immersion/programs",
            icon: "Compass",
          },
          {
            title: "My Application",
            url: "/immersion/application",
            icon: "ClipboardList",
          },
          {
            title: "Certificates",
            url: "/immersion/certificates",
            icon: "Award",
          },
          {
            title: "ID Card",
            url: "/immersion/id-card",
            icon: "IdCard",
          },
        ],
      },
      {
        title: "Account",
        items: [
          { title: "My Profile", url: "/immersion/profile", icon: "User" },
          {
            title: "Notifications",
            url: "/immersion/notifications",
            icon: "Bell",
          },
          { title: "Settings", url: "/immersion/settings", icon: "Settings" },
          { title: "Support", url: "/immersion/support", icon: "Headset" },
          {
            title: "Payments",
            url: "/immersion/payments",
            icon: "CreditCard",
          },
          {
            title: "Testimonials",
            url: "/immersion/reviews",
            icon: "MessageSquare",
          },
        ],
      },
    ],
        RECRUIT_USER: [
      {
        title: "Recruitment Portal",
        items: [
          {
            title: "Home",
            url: "/recruit/dashboard",
            icon: "LayoutDashboard",
          },
          {
            title: "Current Job Opening",
            url: "/recruit/openings",
            icon: "Briefcase",
          },
          {
            title: "My Profile",
            url: "/recruit/profile",
            icon: "User",
          },
          {
            title: "Change Password",
            url: "/recruit/settings",
            icon: "Lock",
          },
        ],
      },
    ],

        SUPER_ADMIN: [
      {
        title: "Platform Governance",
        items: [
          {
            title: "Overview",
            url: "/super-admin/dashboard",
            icon: "LayoutDashboard",
          },
          { title: "User Accounts", url: "/super-admin/users", icon: "Users" },
          {
            title: "Registrations",
            url: "/super-admin/registrations",
            icon: "GraduationCap",
          },
        ],
      },
      {
        title: "Internships & Jobs",
        items: [
          {
            title: "Internships",
            url: "/super-admin/internships",
            icon: "Activity",
          },
          {
            title: "Immersion Programs",
            url: "/super-admin/immersions",
            icon: "Workflow",
          },
          {
            title: "Recruitment Openings",
            url: "/super-admin/recruitment",
            icon: "Briefcase",
          },
          {
            title: "Partners Onboard",
            url: "/super-admin/partners",
            icon: "Handshake",
          },
        ],
      },
      {
        title: "CMS & Moderation",
        items: [
          { title: "Blogs Board", url: "/super-admin/blogs", icon: "FileText" },
          { title: "Media Desk", url: "/super-admin/media", icon: "Image" },
          {
            title: "Reviews Moderation",
            url: "/super-admin/reviews",
            icon: "Star",
          },
          { title: "Notice Board", url: "/super-admin/notices", icon: "Bell" },
        ],
      },
      {
        title: "Finance & Support",
        items: [
          {
            title: "Donation Logs",
            url: "/super-admin/donations",
            icon: "Heart",
          },
          {
            title: "Support Tickets",
            url: "/super-admin/tickets",
            icon: "Headset",
          },
        ],
      },
      {
        title: "Account",
        items: [
          {
            title: "Settings",
            url: "/super-admin/settings",
            icon: "Settings",
          },
        ],
      },
    ],
  },
};
