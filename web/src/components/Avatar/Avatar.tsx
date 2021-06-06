import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React, {useEffect, useState} from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles from './Avatar.styles';
import cx from "clsx";
import {PlaceholderIcon} from "../../icons/PlaceholderIcon";

export interface AvatarProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {

    /** Image url */
    src?: string;

    /** Image alt text or title for placeholder variant */
    alt?: string;

    /** Avatar width and height */
    size?: ThemeNumberSize;

    /** Predefined border-radius value */
    radius?: ThemeNumberSize;

    /** Color from theme used for letter */
    color?: ThemeColorKeys;
}

export function Avatar(
    {
        className,
        size = 'md',
        src,
        alt,
        radius = 'sm',
        children,
        color = 'gray',
        colorScheme,
        ...props
    }: AvatarProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        color,
        radius,
        size,
        theme
    });

    const [error, setError] = useState(!src);

    useEffect(() => {
        src ? setError(false) : setError(true)
    }, [src]);

    return (
        <div {...props} className={cx(classes.avatar, className)}>
            {error ? (
                <div className={classes.placeholder} title={alt}>
                    {children || <PlaceholderIcon className={classes.placeholderIcon}/>}
                </div>
            ) : (
                <img className={classes.image} src={src} alt={alt} onError={() => setError(true)}/>
            )}
        </div>
    )
}