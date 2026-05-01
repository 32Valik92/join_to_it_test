const Header = () => {
  return (
    <header className="flex h-[86px] items-center justify-between border-b border-border bg-header-background px-8 text-header-foreground">
      <div className="w-full max-w-[420px]">
        <input
          type="search"
          placeholder="Search"
          className="h-11 w-full rounded-2xl border border-border bg-input px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="hidden xl:block">
            <p className="text-sm font-bold text-foreground">John Doe</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
