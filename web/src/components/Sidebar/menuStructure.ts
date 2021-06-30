import {FramerIcon} from "../../icons/FramerIcon";
import {BellIcon} from "../../icons/BellIcon";
import {LayerIcon} from "../../icons/LayerIcon";
import {UsersIcon} from "../../icons/UsersIcon";


export function createMenuStructure() {
    return [
        {
            label: 'Обзор',
            icon: LayerIcon,
            to: '/'
        },
        {
            label: 'Участники',
            icon: UsersIcon,
            to: '/members'
        },
        {
            label: 'Безопасность',
            icon: FramerIcon,
            to: '/members'
        },
        {
            label: 'Приложения',
            icon: BellIcon,
            to: '/members'
        },
        {
            label: 'Цели',
            icon: BellIcon,
            to: '/members'
        },
        {
            label: 'Отчеты',
            icon: BellIcon,
            to: '/members'
        }
    ]
}