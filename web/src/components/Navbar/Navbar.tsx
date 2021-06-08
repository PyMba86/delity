import {createMenuStructure} from "./menuStructure";
import {NavbarLink} from "../NavbarLink";
import useStyles from './Navbar.styles';
import cx from "clsx";

interface NavbarProps {
    opened: boolean;
    onClose: () => void;
}

export function Navbar({opened, onClose}: NavbarProps) {

    const classes = useStyles();

    const menuStructure = createMenuStructure();

    const menuMarkup = menuStructure.map(item => (
        <NavbarLink>
            {item.label}
        </NavbarLink>
    ));

    return (
        <nav className={cx(classes.navbar, {
            [classes.opened]: opened
        })}>
            <div className={classes.body}>
                {menuMarkup}
            </div>
        </nav>
    )
}