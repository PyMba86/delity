import {createMenuStructure} from "./menuStructure";
import {SidebarLink} from "../SidebarLink";
import useStyles from './Sidebar.styles';
import cx from "clsx";

interface SidebarProps {
    opened: boolean;
    onClose: () => void;
}

export function Sidebar({opened, onClose}: SidebarProps) {

    const classes = useStyles();

    const menuStructure = createMenuStructure();

    const menuMarkup = menuStructure.map(
        ({label, to, icon: Icon}) => (
        <SidebarLink onClick={onClose} icon={<Icon/>} to={to}>
            {label}
        </SidebarLink>
    ));

    return (
        <nav className={cx(classes.sidebar, {
            [classes.opened]: opened
        })}>
            <div className={classes.body}>
                {menuMarkup}
            </div>
        </nav>
    )
}