import Icons from "icons/sidebar";

const index = [
  {
    title: "Dashboard",
    Icon: Icons.DashboardIcon,
    children: [
      {
        subTitle: "Dashboards",
        subCategories: [
          { name: "Saas", path: "/dashboards/SaaS" },
          { name: "Sales", path: "/dashboards/Sales" },
          { name: "Project Management", path: "/dashboards/ProjectManagement" },
          { name: "Project Management V2", path: "/dashboards/ProjectManagementV2" },
        ],
        path: "",
      },
    ],
  },
  {
    title: "Pages",
    Icon: Icons.PagesIcon,
    path: "/blank",
  },
  // {
  //   title: "Account Settings",
  //   Icon: Icons.AccountSettingsIcon,
  //   path: "/dashboard/account-settings",
  // },
  // {
  //   title: "User Profile",
  //   Icon: Icons.UserProfileIcon,
  //   path: "/dashboard/user-profile",
  // },
  // {
  //   title: "Data Table",
  //   Icon: Icons.DataTableIcon,
  //   children: [
  //     {
  //       subTitle: "Data Table V1",
  //       path: "/dashboard/data-table-v1",
  //     },
  //     {
  //       subTitle: "Data Table V2",
  //       path: "/dashboard/data-table-v2",
  //     },
  //   ],
  // },
  // {
  //   title: "Admin Ecommerce",
  //   Icon: Icons.AdminEcommerceIcon,
  //   children: [
  //     {
  //       subTitle: "Product management",
  //       path: "/dashboard/product-list",
  //     },
  //     {
  //       subTitle: "Order management",
  //       path: "/dashboard/order-list",
  //     },
  //     {
  //       subTitle: "Customer management",
  //       path: "/dashboard/customer-list",
  //     },
  //   ],
  // },
  // {
  //   title: "Ecommerce",
  //   Icon: Icons.EcommerceIcon,
  //   children: [
  //     {
  //       subTitle: "Shop",
  //       path: "/dashboard/shop",
  //     },
  //     {
  //       subTitle: "Cart",
  //       path: "/dashboard/cart",
  //     },
  //     {
  //       subTitle: "Checkout",
  //       path: "/dashboard/payment",
  //     },
  //     {
  //       subTitle: "Purchase Confirmation",
  //       path: "/dashboard/payment-success",
  //     },
  //   ],
  // },
  // {
  //   title: "Invoice",
  //   Icon: Icons.InvoiceIcon,
  //   children: [
  //     {
  //       subTitle: "Invoice List",
  //       path: "/dashboard/invoice-list",
  //     },
  //     {
  //       subTitle: "Add Invoice",
  //       path: "/dashboard/add-invoice",
  //     },
  //     {
  //       subTitle: "Invoice Details",
  //       path: "/dashboard/invoice-details",
  //     },
  //   ],
  // },
  // {
  //   title: "User Management",
  //   Icon: Icons.UserManagementIcon,
  //   children: [
  //     {
  //       subTitle: "User Grid",
  //       path: "/dashboard/user-grid",
  //     },
  //     {
  //       subTitle: "User List",
  //       path: "/dashboard/user-list",
  //     },
  //     {
  //       subTitle: "Add User",
  //       path: "/dashboard/add-user",
  //     },
  //   ],
  // },
  // {
  //   title: "Projects",
  //   Icon: Icons.ProjectIcon,
  //   children: [
  //     {
  //       subTitle: "Project List V1",
  //       path: "/dashboard/uko-project-v1",
  //     },
  //     {
  //       subTitle: "Project List V2",
  //       path: "/dashboard/uko-project-v2",
  //     },
  //     {
  //       subTitle: "Project List V3",
  //       path: "/dashboard/uko-project-v3",
  //     },
  //     {
  //       subTitle: "Project Details",
  //       path: "/dashboard/project-details",
  //     },
  //     {
  //       subTitle: "Team Member",
  //       path: "/dashboard/team-member",
  //     },
  //   ],
  // },
  // {
  //   title: "Kanban",
  //   Icon: Icons.KanbanIcon,
  //   path: "/dashboard/todo-list",
  // },
  // {
  //   title: "Chat",
  //   Icon: Icons.ChatIcon,
  //   path: "/dashboard/chat",
  // },
  // {
  //   title: "Calendar",
  //   Icon: Icons.CalendarIcon,
  //   path: "/dashboard/calendar",
  // },
  {
    title: "Sessions",
    Icon: Icons.SessionsIcon,
    children: [
      {
        subTitle: "Login",
        path: "authentication/Login",
      },
      {
        subTitle: "Register",
        path: "authentication/Register",
      }
    ],
  },
//   {
//     title: "Pages",
//     Icon: Icons.PagesIcon,
//     path: "/about",
    // children: [
    //   {
    //     subTitle: "About",
    //     path: "/dashboard/about",
    //   },
    //   {
    //     subTitle: "Contact",
    //     path: "/dashboard/contact",
    //   },
    //   {
    //     subTitle: "Pricing",
    //     path: "/dashboard/pricing",
    //   },
    //   {
    //     subTitle: "Privacy",
    //     path: "/dashboard/privacy",
    //   },
    // ],
//   },
];

export default index;
