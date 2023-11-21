## Need to changes in react template

=============================================

1.  remove react-router-dom & convert all react-router-dom Link to Nextjs Link
2.  src/index file convert to RootAppProvider component
3.  src/app file wrap with RootAppProvider component
4.  change all link path
5.  need to be added dashboard layout in every dashboard pages
6.  change path in src/components/Layouts/topMenuList.tsx
7.  convert "import Chart from "react-apexcharts" to const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
