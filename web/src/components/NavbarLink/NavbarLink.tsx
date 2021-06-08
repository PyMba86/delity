import React from "react";
import useStyles from './NavbarLink.styles';
import cx from "clsx";

interface NavbarLinkProps {
    className?: string;
    children: React.ReactNode;
}

export function NavbarLink(
    {
        className,
        children
    }: NavbarLinkProps) {

    const classes = useStyles();

    return (
        <div className={cx(classes.mainLink, className)}>
            <div className={classes.body}>{children}</div>
        </div>
    )

}