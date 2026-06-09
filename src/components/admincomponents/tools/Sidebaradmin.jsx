import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider, 
  SidebarTrigger
} from "@/components/ui/sidebar";



const Sidebaradmin = () => {
  return (
    <>
    {/* <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      </SidebarProvider> */}
      <div>
        <div className="sidebarbody">
          <div className="menuOne"></div>
          <div className="menuTwo"></div>
          <div className="menuThree"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebaradmin;
