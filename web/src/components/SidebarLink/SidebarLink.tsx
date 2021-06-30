import React from "react";
import useStyles from './SidebarLink.styles';
import {Link} from 'react-router-dom';
import cx from "clsx";

interface SidebarLinkProps {
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
    icon: React.ReactNode;
    to: string;
}

export function SidebarLink(
    {
        className,
        onClick,
        icon,
        to,
        children
    }: SidebarLinkProps) {

    const classes = useStyles();

    return (
        <Link to={to} className={cx(classes.mainLink, className)}
           onClick={onClick}>
            <div className={classes.icon}>
                {icon}
            </div>
            <div className={classes.body}>{children}</div>
        </Link>
    )
}