import {Route, RouteProps} from "react-router-dom";
import {PermissionEnum} from "../../../types/globalTypes";
import {useUser} from "../../../hooks/useUser";
import {hasPermission} from "../../misc";

interface SectionRouteProps extends RouteProps {
    permissions?: PermissionEnum[];
}

export function SectionRoute(
    {
        permissions,
        ...props
    }: SectionRouteProps) {

    const {user} = useUser();

    const hasPermissions = !permissions
        || !user
        || permissions.map(permission => hasPermission(permission, user))
            .reduce((prev, curr) => prev && curr);

    return hasPermissions ? <Route {...props} /> : <div>Not found</div>;
}