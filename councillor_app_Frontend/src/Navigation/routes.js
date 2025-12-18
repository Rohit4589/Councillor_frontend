export const routesConfig = {
  login: {
    path: "/login",
    title: "Login",
    subtitle: "Login to the system",
  },

  dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    subtitle: "Overview of the complaint management system",
  },

  categories: {
    path: "/categories",
    title: "Category Management",
    subtitle: "Manage complaint categories",

    // ✅ TOPBAR ACTION BUTTON
    action: {
      label: "Add Category",
      onClick: () => {
        console.log("Add Category clicked");
        // later: open modal
      },
    },
  },

  citizens: {
    path: "/citizens",
    title: "Citizens",
    subtitle: "Manage registered citizens",
  },

  complaints: {
    path: "/complaints",
    title: "Complaints",
    subtitle: "Track and manage complaints",
  },

  officers: {
    path: "/officers",
    title: "Citizens Details",
    
  },

  createEvent: {
  path: "/create-event",
  title: "Create Event",
  subtitle: "Create and manage ward events",
},

};
