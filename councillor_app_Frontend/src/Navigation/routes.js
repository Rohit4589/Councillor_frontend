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
  action: {
    label: "+ Add Category",
  },
},

  citizens: {
    path: "/citizens",
    title: "Citizens Details",
    
  },

   complaints: {
    path: "/complaints",
    title: "Complaints Overview",
    subtitle: "",
    topbarActions: {
      search: true,
      sort: true,
      filter: true,
      searchPlaceholder: "Search by ID, category, or citizen name...",
    },
  },

    complaintDetails: {
    key: "complaintDetails",
    path: "/complaints/:id",
    title: "Complaint Details",
    
  },
 officers: {
  path: "/officers",
  title: "Officers Details",
  subtitle: "Manage ward officers",
  action: {
    label: "+ Add Officer",
  },
},

  createEvent: {
  path: "/create-event",
  title: "Create Event",
  subtitle: "Create and manage ward events",
},

};
