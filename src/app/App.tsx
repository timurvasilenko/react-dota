import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import RandomHeroPage from "@/features/random-hero-featrue/RandomHeroPage";
import RuinerPage from "@/features/ruiner-feature/RuinerPage";
import { Routes, Route, NavLink } from "react-router";

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
                        <NavLink to="/random-hero">
                            <NavigationMenuLink>Random Hero</NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink to="/ruiner">
                            <NavigationMenuLink>Ruiner</NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

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
            </Routes>
        </div>
    );
}

export default App;
