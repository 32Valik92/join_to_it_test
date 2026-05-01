import clsx from "clsx";

const menuItems = ["Dashboard", "Analytics", "Calendar", "Messages", "Settings"];

const Sidebar = () => {
  return (
    <aside className="hidden w-[260px] shrink-0 bg-sidebar px-6 py-8 text-sidebar-foreground lg:block">
      <div className="mb-10 font-bold">IMPEKABLE</div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = item === "Calendar";

          return (
            <button
              key={item}
              className={clsx(
                "flex h-12 w-full items-center rounded-2xl px-4 text-left text-sm font-semibold transition-colors",
                isActive
                  ? "bg-sidebar-active-bg text-sidebar-active"
                  : "text-sidebar-foreground hover:bg-sidebar-active-bg hover:text-sidebar-active",
              )}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
