import {TextInput} from "../TextInput";
import useStyles from './AppSearch.styles';
import {TerminalIcon} from "../../icons/TerminalIcon";
import {CommonProps} from "../../theme";
import cx from "clsx";

export interface AppSearchProps extends CommonProps {

}

export function AppSearch(
    {
        className
    }: AppSearchProps) {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <TextInput
                className={cx(classes.input, className)}
                icon={<TerminalIcon/>}
                variant={'filled'}/>
        </div>
    )
}