import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import RandomHeroPage from "@/features/random-hero-featrue/RandomHeroPage";
import RuinerPage from "@/features/ruiner-feature/RuinerPage";
import TestPage from "@/features/test-feature/TestPage";
import { cn } from "@/lib/utils";
import { Routes, Route, NavLink } from "react-router";

const getClassesByActiveState = ({ isActive }: { isActive: boolean }) =>
    cn(
        isActive &&
            "focus:bg-accent hover:bg-accent bg-accent/50 text-accent-foreground",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
    );

function App() {
    return (
        <div className="w-full flex flex-col justify-center items-center pt-2 gap-4">
            <NavigationMenu className="w-full">
                <NavLink
                    to="/"
                    className="mr-4 font-bold text-blue-400/80 bg-blue-900/50 rounded-tl-2xl rounded-tr-md rounded-bl-md rounded-br-2xl py-2 px-3 text-sm"
                >
                    ZXC Helper 2
                </NavLink>
                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <NavLink
                            to="/random-hero"
                            className={getClassesByActiveState}
                        >
                            Random Hero
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/ruiner"
                            className={getClassesByActiveState}
                        >
                            Ruiner
                        </NavLink>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <NavLink to="/test" className={getClassesByActiveState}>
                            TEST
                        </NavLink>
                    </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="w-full max-w-[1200px]">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="text-lg mt-10 text-primary">
                                Ozh icha gluth izh sol
                            </div>
                        }
                    />
                    <Route path="/random-hero" element={<RandomHeroPage />} />
                    <Route path="/ruiner" element={<RuinerPage />} />
                    <Route path="/test" element={<TestPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
