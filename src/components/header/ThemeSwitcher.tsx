import type {ThemeName} from "../../style/theme.ts";

interface Props {
    themeName?: ThemeName;
    setThemeName?: (themeName: ThemeName) => void;
}

export default function ThemeSwitcher({themeName, setThemeName}: Props) {
    const toggleTheme = () => {
        setThemeName(themeName === "light"? "dark": "light")
    }
    return <button onClick={toggleTheme}>{themeName}</button>
}